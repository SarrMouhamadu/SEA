<?php
/**
 * SEnergyS Africa - API REST PHP pour Hébergement Mutualisé OVH / Apache
 * Compatible PHP 5.6, 7.x et 8.x
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$dbFile = __DIR__ . '/data/db.json';

// Helper : lecture sécurisée de la BDD JSON
function readDB($file) {
    if (!file_exists($file)) {
        $default = array(
            'admin' => array(
                'email' => 'admin@senergysafrica.com',
                'password' => 'admin123',
                'name' => 'Administrateur SESA',
                'role' => 'Super Admin'
            ),
            'contacts' => array(),
            'diagnostics' => array(),
            'visits' => array(),
            'careers' => array(),
            'jobs' => array()
        );
        @file_put_contents($file, json_encode($default, JSON_PRETTY_PRINT));
        return $default;
    }
    $raw = @file_get_contents($file);
    $data = @json_decode($raw, true);
    return is_array($data) ? $data : array();
}

// Helper : écriture avec verrouillage
function writeDB($file, $data) {
    return @file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT), LOCK_EX);
}

// Helper JSON response
function sendJson($data, $status = 200) {
    http_response_code($status);
    echo json_encode($data);
    exit;
}

$db = readDB($dbFile);
$method = $_SERVER['REQUEST_METHOD'];

// Extraction du chemin après /api
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path = preg_replace('#^.*?/api/?#i', '', $uri);
$path = trim($path, '/');

// Récupération du body JSON
$body = json_decode(file_get_contents('php://input'), true);
if (!is_array($body)) {
    $body = array();
}

// ── 1. HEALTHCHECK ──────────────────────────────────────────
if ($path === 'health' || $path === '') {
    sendJson(array(
        'status' => 'ok',
        'service' => 'SEnergyS Africa PHP/OVH API',
        'timestamp' => date('c')
    ));
}

// ── 2. AUTHENTIFICATION ─────────────────────────────────────
if ($path === 'auth/login' && $method === 'POST') {
    $email = isset($body['email']) ? trim($body['email']) : '';
    $pass  = isset($body['password']) ? trim($body['password']) : '';

    $admin = isset($db['admin']) ? $db['admin'] : array(
        'email' => 'admin@senergysafrica.com',
        'password' => 'admin123',
        'name' => 'Administrateur SESA',
        'role' => 'Super Admin'
    );

    if (strtolower($email) === strtolower($admin['email']) && $pass === $admin['password']) {
        sendJson(array(
            'success' => true,
            'message' => 'Connexion réussie',
            'user' => array(
                'email' => $admin['email'],
                'name'  => $admin['name'],
                'role'  => $admin['role']
            ),
            'token' => 'sesa_token_' . time() . '_' . mt_rand(1000, 9999)
        ));
    }

    sendJson(array(
        'success' => false,
        'message' => 'Identifiants incorrects. Veuillez vérifier votre adresse e-mail et votre mot de passe.'
    ), 401);
}

if ($path === 'auth/verify' && $method === 'GET') {
    $auth = isset($_SERVER['HTTP_AUTHORIZATION']) ? $_SERVER['HTTP_AUTHORIZATION'] : '';
    if (strpos($auth, 'Bearer ') !== 0) {
        sendJson(array('success' => false, 'message' => 'Non authentifié'), 401);
    }
    sendJson(array('success' => true, 'message' => 'Session valide'));
}

// ── 3. TABLEAU DE BORD ADMIN ────────────────────────────────
if ($path === 'admin/dashboard' && $method === 'GET') {
    $visits = isset($db['visits']) ? $db['visits'] : array();
    $contacts = isset($db['contacts']) ? $db['contacts'] : array();
    $diagnostics = isset($db['diagnostics']) ? $db['diagnostics'] : array();
    $careers = isset($db['careers']) ? $db['careers'] : array();

    $cleanCareers = array();
    foreach ($careers as $c) {
        $cCopy = $c;
        $cCopy['cvAvailable'] = !empty($c['cvData']);
        unset($cCopy['cvData']);
        $cleanCareers[] = $cCopy;
    }

    $totalVisits = count($visits);
    $totalLeads = count($contacts) + count($diagnostics) + count($careers);
    $conversionRate = $totalVisits > 0 ? round(($totalLeads / $totalVisits) * 100, 1) : 0;

    $analytics = array(
        'totalVisits' => $totalVisits,
        'visitsToday' => 0,
        'visitsLast7Days' => 0,
        'totalContacts' => count($contacts),
        'unreadContacts' => 0,
        'totalDiagnostics' => count($diagnostics),
        'newDiagnostics' => 0,
        'totalCareers' => count($careers),
        'newCareers' => 0,
        'conversionRate' => $conversionRate,
        'topPages' => array(
            array('path' => '/', 'count' => max(1, $totalVisits)),
            array('path' => '/services', 'count' => 0),
            array('path' => '/references', 'count' => 0),
            array('path' => '/carrieres', 'count' => 0)
        ),
        'deviceCounts' => array('Desktop' => $totalVisits, 'Mobile' => 0, 'Tablet' => 0),
        'referrerCounts' => array('Direct' => $totalVisits),
        'dailyTraffic' => array()
    );

    foreach ($contacts as $c) {
        if (isset($c['status']) && $c['status'] === 'new') $analytics['unreadContacts']++;
    }
    foreach ($diagnostics as $d) {
        if (isset($d['status']) && $d['status'] === 'new') $analytics['newDiagnostics']++;
    }
    foreach ($careers as $c) {
        if (isset($c['status']) && $c['status'] === 'nouveau') $analytics['newCareers']++;
    }

    sendJson(array(
        'success' => true,
        'data' => array(
            'analytics' => $analytics,
            'recentContacts' => array_slice($contacts, 0, 5),
            'recentDiagnostics' => array_slice($diagnostics, 0, 5),
            'recentCareers' => array_slice($cleanCareers, 0, 5)
        )
    ));
}

// ── 4. ADMIN : CONTACTS ─────────────────────────────────────
if ($path === 'admin/contacts' && $method === 'GET') {
    sendJson(array('success' => true, 'data' => isset($db['contacts']) ? $db['contacts'] : array()));
}

if (preg_match('#^admin/contacts/([^/]+)$#', $path, $m)) {
    $id = $m[1];
    if ($method === 'PATCH') {
        $contacts = isset($db['contacts']) ? $db['contacts'] : array();
        foreach ($contacts as &$c) {
            if ($c['id'] == $id) {
                if (isset($body['status'])) $c['status'] = $body['status'];
                $db['contacts'] = $contacts;
                writeDB($dbFile, $db);
                sendJson(array('success' => true, 'data' => $c));
            }
        }
        sendJson(array('success' => false, 'message' => 'Contact non trouvé'), 404);
    }
    if ($method === 'DELETE') {
        $contacts = isset($db['contacts']) ? $db['contacts'] : array();
        $db['contacts'] = array_values(array_filter($contacts, function($c) use ($id) { return $c['id'] != $id; }));
        writeDB($dbFile, $db);
        sendJson(array('success' => true, 'message' => 'Contact supprimé'));
    }
}

// ── 5. ADMIN : DIAGNOSTICS ──────────────────────────────────
if ($path === 'admin/diagnostics' && $method === 'GET') {
    sendJson(array('success' => true, 'data' => isset($db['diagnostics']) ? $db['diagnostics'] : array()));
}

if (preg_match('#^admin/diagnostics/([^/]+)$#', $path, $m)) {
    $id = $m[1];
    if ($method === 'PATCH') {
        $diags = isset($db['diagnostics']) ? $db['diagnostics'] : array();
        foreach ($diags as &$d) {
            if ($d['id'] == $id) {
                if (isset($body['status'])) $d['status'] = $body['status'];
                $db['diagnostics'] = $diags;
                writeDB($dbFile, $db);
                sendJson(array('success' => true, 'data' => $d));
            }
        }
        sendJson(array('success' => false, 'message' => 'Diagnostic non trouvé'), 404);
    }
    if ($method === 'DELETE') {
        $diags = isset($db['diagnostics']) ? $db['diagnostics'] : array();
        $db['diagnostics'] = array_values(array_filter($diags, function($d) use ($id) { return $d['id'] != $id; }));
        writeDB($dbFile, $db);
        sendJson(array('success' => true, 'message' => 'Diagnostic supprimé'));
    }
}

// ── 6. ADMIN : CANDIDATURES (CAREERS) ───────────────────────
if ($path === 'admin/careers' && $method === 'GET') {
    $careers = isset($db['careers']) ? $db['careers'] : array();
    $clean = array();
    foreach ($careers as $c) {
        $copy = $c;
        $copy['cvAvailable'] = !empty($c['cvData']);
        unset($copy['cvData']);
        $clean[] = $copy;
    }
    sendJson(array('success' => true, 'data' => $clean));
}

if (preg_match('#^admin/careers/([^/]+)$#', $path, $m)) {
    $id = $m[1];
    $careers = isset($db['careers']) ? $db['careers'] : array();
    if ($method === 'GET') {
        foreach ($careers as $c) {
            if ($c['id'] == $id) {
                sendJson(array('success' => true, 'data' => $c));
            }
        }
        sendJson(array('success' => false, 'message' => 'Candidature non trouvée'), 404);
    }
    if ($method === 'PATCH') {
        foreach ($careers as &$c) {
            if ($c['id'] == $id) {
                if (isset($body['status'])) $c['status'] = $body['status'];
                if (isset($body['notes'])) $c['notes'] = $body['notes'];
                $db['careers'] = $careers;
                writeDB($dbFile, $db);
                sendJson(array('success' => true, 'data' => $c));
            }
        }
        sendJson(array('success' => false, 'message' => 'Candidature non trouvée'), 404);
    }
    if ($method === 'DELETE') {
        $db['careers'] = array_values(array_filter($careers, function($c) use ($id) { return $c['id'] != $id; }));
        writeDB($dbFile, $db);
        sendJson(array('success' => true, 'message' => 'Candidature supprimée'));
    }
}

// ── 7. ADMIN : OFFRES D'EMPLOI (JOBS) ───────────────────────
if ($path === 'admin/jobs' && $method === 'GET') {
    sendJson(array('success' => true, 'data' => isset($db['jobs']) ? $db['jobs'] : array()));
}

if ($path === 'admin/jobs' && $method === 'POST') {
    if (empty($body['title'])) {
        sendJson(array('success' => false, 'message' => "L'intitulé du poste est obligatoire."), 400);
    }
    $tags = array();
    if (isset($body['tags'])) {
        $tags = is_array($body['tags']) ? $body['tags'] : array_map('trim', explode(',', $body['tags']));
    }
    $newJob = array(
        'id' => 'job-' . time() . '-' . mt_rand(100, 999),
        'title' => $body['title'],
        'pole' => isset($body['pole']) ? $body['pole'] : 'Énergie Durable',
        'location' => isset($body['location']) ? $body['location'] : 'Dakar, Sénégal',
        'type' => isset($body['type']) ? $body['type'] : 'CDI - Temps Plein',
        'experience' => isset($body['experience']) ? $body['experience'] : '',
        'description' => isset($body['description']) ? $body['description'] : '',
        'tags' => array_values(array_filter($tags)),
        'active' => isset($body['active']) ? (bool)$body['active'] : true,
        'created_at' => date('c')
    );
    if (!isset($db['jobs'])) $db['jobs'] = array();
    array_unshift($db['jobs'], $newJob);
    writeDB($dbFile, $db);
    sendJson(array('success' => true, 'message' => "Offre d'emploi créée avec succès", 'data' => $newJob), 201);
}

if (preg_match('#^admin/jobs/([^/]+)$#', $path, $m)) {
    $id = $m[1];
    $jobs = isset($db['jobs']) ? $db['jobs'] : array();
    if ($method === 'PATCH') {
        foreach ($jobs as &$j) {
            if ($j['id'] == $id) {
                if (isset($body['title'])) $j['title'] = $body['title'];
                if (isset($body['pole'])) $j['pole'] = $body['pole'];
                if (isset($body['location'])) $j['location'] = $body['location'];
                if (isset($body['type'])) $j['type'] = $body['type'];
                if (isset($body['experience'])) $j['experience'] = $body['experience'];
                if (isset($body['description'])) $j['description'] = $body['description'];
                if (isset($body['tags'])) {
                    $j['tags'] = is_array($body['tags']) ? $body['tags'] : array_values(array_filter(array_map('trim', explode(',', $body['tags']))));
                }
                if (isset($body['active'])) $j['active'] = (bool)$body['active'];
                $db['jobs'] = $jobs;
                writeDB($dbFile, $db);
                sendJson(array('success' => true, 'message' => "Offre mise à jour", 'data' => $j));
            }
        }
        sendJson(array('success' => false, 'message' => 'Offre non trouvée'), 404);
    }
    if ($method === 'DELETE') {
        $db['jobs'] = array_values(array_filter($jobs, function($j) use ($id) { return $j['id'] != $id; }));
        writeDB($dbFile, $db);
        sendJson(array('success' => true, 'message' => "Offre d'emploi supprimée"));
    }
}

// ── 8. PUBLIC : OFFRES D'EMPLOI ─────────────────────────────
if ($path === 'careers/jobs' && $method === 'GET') {
    $jobs = isset($db['jobs']) ? $db['jobs'] : array();
    $active = array();
    foreach ($jobs as $j) {
        if (!isset($j['active']) || $j['active'] !== false) {
            $active[] = $j;
        }
    }
    sendJson(array('success' => true, 'data' => $active));
}

// ── 9. PUBLIC : CANDIDATURE (POSTULATION AVEC CV) ───────────
if ($path === 'careers/apply' && $method === 'POST') {
    if (empty($body['fullName']) || empty($body['email']) || empty($body['motivation'])) {
        sendJson(array('success' => false, 'message' => 'Nom complet, adresse email et motivation sont obligatoires.'), 400);
    }
    $newCareer = array(
        'id' => 'car-' . time() . '-' . mt_rand(100, 999),
        'fullName' => $body['fullName'],
        'email' => $body['email'],
        'phone' => isset($body['phone']) ? $body['phone'] : '',
        'location' => isset($body['location']) ? $body['location'] : '',
        'position' => isset($body['position']) ? $body['position'] : 'Candidature Spontanée',
        'experience' => isset($body['experience']) ? $body['experience'] : '',
        'linkedin' => isset($body['linkedin']) ? $body['linkedin'] : '',
        'motivation' => $body['motivation'],
        'cvFileName' => isset($body['cvFileName']) ? $body['cvFileName'] : '',
        'cvFileType' => isset($body['cvFileType']) ? $body['cvFileType'] : '',
        'cvData' => isset($body['cvData']) ? $body['cvData'] : '',
        'status' => 'nouveau',
        'created_at' => date('c')
    );
    if (!isset($db['careers'])) $db['careers'] = array();
    array_unshift($db['careers'], $newCareer);
    writeDB($dbFile, $db);
    sendJson(array(
        'success' => true,
        'message' => 'Votre candidature a été transmise avec succès à notre direction technique.',
        'data' => array('id' => $newCareer['id'])
    ), 201);
}

// ── 10. PUBLIC : CONTACT ────────────────────────────────────
if ($path === 'contact' && $method === 'POST') {
    if (empty($body['name']) || empty($body['email']) || empty($body['message'])) {
        sendJson(array('success' => false, 'message' => 'Nom, email et message obligatoires.'), 400);
    }
    $newContact = array(
        'id' => 'c-' . time() . '-' . mt_rand(100, 999),
        'name' => $body['name'],
        'email' => $body['email'],
        'phone' => isset($body['phone']) ? $body['phone'] : '',
        'company' => isset($body['company']) ? $body['company'] : '',
        'subject' => isset($body['subject']) ? $body['subject'] : 'Message depuis le site web',
        'message' => $body['message'],
        'status' => 'new',
        'created_at' => date('c')
    );
    if (!isset($db['contacts'])) $db['contacts'] = array();
    array_unshift($db['contacts'], $newContact);
    writeDB($dbFile, $db);
    sendJson(array('success' => true, 'message' => 'Message envoyé avec succès.', 'data' => $newContact), 201);
}

// ── 11. PUBLIC : AUTODIAGNOSTIC ─────────────────────────────
if ($path === 'diagnostics' && $method === 'POST') {
    $contact = isset($body['contact']) ? $body['contact'] : array();
    if (empty($contact['nom']) || empty($contact['email'])) {
        sendJson(array('success' => false, 'message' => 'Coordonnées (nom et email) obligatoires.'), 400);
    }
    $newDiag = array(
        'id' => 'diag-' . time() . '-' . mt_rand(100, 999),
        'contact' => $contact,
        'reponses' => isset($body['reponses']) ? $body['reponses'] : array(),
        'resultats' => isset($body['resultats']) ? $body['resultats'] : array(),
        'status' => 'new',
        'created_at' => date('c')
    );
    if (!isset($db['diagnostics'])) $db['diagnostics'] = array();
    array_unshift($db['diagnostics'], $newDiag);
    writeDB($dbFile, $db);
    sendJson(array('success' => true, 'message' => 'Autodiagnostic enregistré.', 'data' => $newDiag), 201);
}

// ── 12. PUBLIC : ANALYTICS ──────────────────────────────────
if ($path === 'analytics/visit' && $method === 'POST') {
    $visit = array(
        'id' => 'v-' . time() . '-' . mt_rand(100, 999),
        'path' => isset($body['path']) ? $body['path'] : '/',
        'referrer' => isset($body['referrer']) ? $body['referrer'] : 'Direct',
        'device' => isset($body['device']) ? $body['device'] : 'Desktop',
        'timestamp' => date('c')
    );
    if (!isset($db['visits'])) $db['visits'] = array();
    array_unshift($db['visits'], $visit);
    if (count($db['visits']) > 1000) {
        $db['visits'] = array_slice($db['visits'], 0, 1000);
    }
    writeDB($dbFile, $db);
    sendJson(array('success' => true, 'visitId' => $visit['id']));
}

// ── 13. PUBLIC : COMPANY ────────────────────────────────────
if ($path === 'company' && $method === 'GET') {
    sendJson(array(
        'success' => true,
        'data' => array(
            'name' => 'SEnergyS Africa (SESA)',
            'founded' => 2015,
            'tagline' => 'Accélérateur de performances durables',
            'email' => 'contact@senergysafrica.com',
            'phone' => '+221 77 217 33 64',
            'address' => 'P2ID · Bâtiment APROSI, 3ème étage · Diamniadio, Sénégal'
        )
    ));
}

// Route inconnue
sendJson(array('success' => false, 'message' => 'Route introuvable : ' . $path), 404);
