const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const storage = require('./services/storage');

const PORT = process.env.PORT || 5001;
const DIST_DIR = path.resolve(__dirname, '../../client/dist');

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

function serveStatic(req, res, pathname) {
  let safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(DIST_DIR, safePath);

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(DIST_DIR, 'index.html');
  }

  if (!fs.existsSync(filePath)) {
    return sendJson(res, 404, { success: false, message: 'Fichier introuvable' });
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      return res.end('Erreur serveur');
    }
    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable'
    });
    res.end(content);
  });
}

// Données publiques par défaut
const defaultCompany = {
  name: 'SEnergyS Africa (SESA)',
  founded: 2015,
  tagline: 'Accélérateur de performances durables',
  presentation: "Fondée en 2015, SEnergyS Africa (SESA) est une société d'ingénierie et de conseil en développement durable...",
  address: 'P2ID · Bâtiment APROSI, 3ème étage · Diamniadio, Sénégal',
  phone: '+221 77 217 33 64',
  phone_fix: '+221 33 945 56 47',
  email: 'contact@senergysafrica.com',
  website: 'https://senergysafrica.com'
};

function parseBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      // Limite à 15 Mo pour supporter les CV en PDF / Base64
      if (body.length > 15 * 1024 * 1024) {
        req.destroy();
        resolve({});
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        resolve({});
      }
    });
  });
}

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(data));
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method.toUpperCase();

  // Handle CORS preflight
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    return res.end();
  }

  try {
    // 1. Healthcheck
    if (pathname === '/api/health') {
      return sendJson(res, 200, {
        status: 'ok',
        service: 'SEnergyS Africa API',
        timestamp: new Date().toISOString()
      });
    }

    // 2. Auth: POST /api/auth/login
    if (pathname === '/api/auth/login' && method === 'POST') {
      const body = await parseBody(req);
      const user = storage.validateAdmin(body.email, body.password);
      if (!user) {
        return sendJson(res, 401, {
          success: false,
          message: 'Identifiants incorrects. Veuillez vérifier email et mot de passe.'
        });
      }
      return sendJson(res, 200, {
        success: true,
        message: 'Connexion réussie',
        user: { email: user.email, name: user.name, role: user.role },
        token: user.token
      });
    }

    // 3. Auth: GET /api/auth/verify
    if (pathname === '/api/auth/verify' && method === 'GET') {
      const auth = req.headers.authorization;
      if (!auth || !auth.startsWith('Bearer ')) {
        return sendJson(res, 401, { success: false, message: 'Non authentifié' });
      }
      return sendJson(res, 200, { success: true, message: 'Session valide' });
    }

    // 4. Admin: GET /api/admin/dashboard
    if (pathname === '/api/admin/dashboard' && method === 'GET') {
      const analytics = storage.getAnalytics();
      const recentContacts = storage.getContacts().slice(0, 5);
      const recentDiagnostics = storage.getDiagnostics().slice(0, 5);
      const recentCareers = storage.getCareers().map(c => {
        const { cvData, ...rest } = c;
        return { ...rest, cvAvailable: !!cvData };
      }).slice(0, 5);
      return sendJson(res, 200, {
        success: true,
        data: { analytics, recentContacts, recentDiagnostics, recentCareers }
      });
    }

    // 5. Admin: Contacts
    if (pathname === '/api/admin/contacts' && method === 'GET') {
      const contacts = storage.getContacts();
      return sendJson(res, 200, { success: true, data: contacts });
    }

    if (pathname.startsWith('/api/admin/contacts/') && method === 'PATCH') {
      const id = pathname.replace('/api/admin/contacts/', '');
      const body = await parseBody(req);
      const updated = storage.updateContactStatus(id, body.status);
      if (!updated) return sendJson(res, 404, { success: false, message: 'Contact non trouvé' });
      return sendJson(res, 200, { success: true, data: updated });
    }

    if (pathname.startsWith('/api/admin/contacts/') && method === 'DELETE') {
      const id = pathname.replace('/api/admin/contacts/', '');
      storage.deleteContact(id);
      return sendJson(res, 200, { success: true, message: 'Contact supprimé' });
    }

    // 6. Admin: Diagnostics
    if (pathname === '/api/admin/diagnostics' && method === 'GET') {
      const diagnostics = storage.getDiagnostics();
      return sendJson(res, 200, { success: true, data: diagnostics });
    }

    if (pathname.startsWith('/api/admin/diagnostics/') && method === 'PATCH') {
      const id = pathname.replace('/api/admin/diagnostics/', '');
      const body = await parseBody(req);
      const updated = storage.updateDiagnosticStatus(id, body.status);
      if (!updated) return sendJson(res, 404, { success: false, message: 'Diagnostic non trouvé' });
      return sendJson(res, 200, { success: true, data: updated });
    }

    if (pathname.startsWith('/api/admin/diagnostics/') && method === 'DELETE') {
      const id = pathname.replace('/api/admin/diagnostics/', '');
      storage.deleteDiagnostic(id);
      return sendJson(res, 200, { success: true, message: 'Diagnostic supprimé' });
    }

    // 7. Admin: Analytics
    if (pathname === '/api/admin/analytics' && method === 'GET') {
      const analytics = storage.getAnalytics();
      return sendJson(res, 200, { success: true, data: analytics });
    }

    // 7bis. Admin: Careers (Recrutement & Candidatures)
    if (pathname === '/api/admin/careers' && method === 'GET') {
      const careers = storage.getCareers().map(c => {
        const { cvData, ...rest } = c;
        return { ...rest, cvAvailable: !!cvData };
      });
      return sendJson(res, 200, { success: true, data: careers });
    }

    if (pathname.startsWith('/api/admin/careers/') && method === 'GET') {
      const id = pathname.replace('/api/admin/careers/', '');
      const career = storage.getCareerById(id);
      if (!career) return sendJson(res, 404, { success: false, message: 'Candidature non trouvée' });
      return sendJson(res, 200, { success: true, data: career });
    }

    if (pathname.startsWith('/api/admin/careers/') && method === 'PATCH') {
      const id = pathname.replace('/api/admin/careers/', '');
      const body = await parseBody(req);
      const updated = storage.updateCareerStatus(id, body.status, body.notes);
      if (!updated) return sendJson(res, 404, { success: false, message: 'Candidature non trouvée' });
      return sendJson(res, 200, { success: true, data: updated });
    }

    if (pathname.startsWith('/api/admin/careers/') && method === 'DELETE') {
      const id = pathname.replace('/api/admin/careers/', '');
      storage.deleteCareer(id);
      return sendJson(res, 200, { success: true, message: 'Candidature supprimée' });
    }

    // 7ter. Admin: Offres d'Emploi (Gestion complète par l'administrateur)
    if (pathname === '/api/admin/jobs' && method === 'GET') {
      const jobs = storage.getJobOffers({ activeOnly: false });
      return sendJson(res, 200, { success: true, data: jobs });
    }

    if (pathname === '/api/admin/jobs' && method === 'POST') {
      const body = await parseBody(req);
      if (!body.title) {
        return sendJson(res, 400, { success: false, message: 'L’intitulé du poste est obligatoire.' });
      }
      const created = storage.addJobOffer(body);
      return sendJson(res, 201, { success: true, message: 'Offre d’emploi créée avec succès', data: created });
    }

    if (pathname.startsWith('/api/admin/jobs/') && method === 'PATCH') {
      const id = pathname.replace('/api/admin/jobs/', '');
      const body = await parseBody(req);
      const updated = storage.updateJobOffer(id, body);
      if (!updated) return sendJson(res, 404, { success: false, message: 'Offre non trouvée' });
      return sendJson(res, 200, { success: true, message: 'Offre d’emploi mise à jour', data: updated });
    }

    if (pathname.startsWith('/api/admin/jobs/') && method === 'DELETE') {
      const id = pathname.replace('/api/admin/jobs/', '');
      storage.deleteJobOffer(id);
      return sendJson(res, 200, { success: true, message: 'Offre d’emploi supprimée' });
    }

    // 7quater. Admin: Articles & Actualités (Gestion par l'administrateur)
    if (pathname === '/api/admin/articles' && method === 'GET') {
      const articles = storage.getArticles({ publishedOnly: false });
      return sendJson(res, 200, { success: true, data: articles });
    }

    if (pathname === '/api/admin/articles' && method === 'POST') {
      const body = await parseBody(req);
      if (!body.title) {
        return sendJson(res, 400, { success: false, message: 'Le titre de l’article est obligatoire.' });
      }
      const created = storage.addArticle(body);
      return sendJson(res, 201, { success: true, message: 'Article publié avec succès', data: created });
    }

    if (pathname.startsWith('/api/admin/articles/') && method === 'GET') {
      const id = pathname.replace('/api/admin/articles/', '');
      const article = storage.getArticleById(id);
      if (!article) return sendJson(res, 404, { success: false, message: 'Article non trouvé' });
      return sendJson(res, 200, { success: true, data: article });
    }

    if (pathname.startsWith('/api/admin/articles/') && method === 'PATCH') {
      const id = pathname.replace('/api/admin/articles/', '');
      const body = await parseBody(req);
      const updated = storage.updateArticle(id, body);
      if (!updated) return sendJson(res, 404, { success: false, message: 'Article non trouvé' });
      return sendJson(res, 200, { success: true, message: 'Article mis à jour', data: updated });
    }

    if (pathname.startsWith('/api/admin/articles/') && method === 'DELETE') {
      const id = pathname.replace('/api/admin/articles/', '');
      storage.deleteArticle(id);
      return sendJson(res, 200, { success: true, message: 'Article supprimé' });
    }

    // Public: GET /api/articles
    if (pathname === '/api/articles' && method === 'GET') {
      const articles = storage.getArticles({ publishedOnly: true });
      return sendJson(res, 200, { success: true, data: articles });
    }

    if (pathname.startsWith('/api/articles/') && method === 'GET') {
      const id = pathname.replace('/api/articles/', '');
      const article = storage.getArticleById(id);
      if (!article || article.published === false) {
        return sendJson(res, 404, { success: false, message: 'Article non trouvé ou non publié' });
      }
      return sendJson(res, 200, { success: true, data: article });
    }

    // 8. Public: GET /api/careers/jobs (Liste des postes ouverts actifs)
    if (pathname === '/api/careers/jobs' && method === 'GET') {
      const jobs = storage.getJobOffers({ activeOnly: true });
      return sendJson(res, 200, { success: true, data: jobs });
    }

    // 8bis. Public: POST /api/careers/apply
    if (pathname === '/api/careers/apply' && method === 'POST') {
      const body = await parseBody(req);
      if (!body.fullName || !body.email || !body.motivation) {
        return sendJson(res, 400, {
          success: false,
          message: 'Nom complet, adresse email et lettre de motivation sont obligatoires.'
        });
      }
      const saved = storage.addCareer(body);
      return sendJson(res, 201, {
        success: true,
        message: 'Votre candidature a bien été reçue. Notre équipe des ressources humaines l’examinera avec attention.',
        data: { id: saved.id, fullName: saved.fullName }
      });
    }

    // 8. Public: POST /api/contact
    if (pathname === '/api/contact' && method === 'POST') {
      const body = await parseBody(req);
      if (!body.name || !body.email) {
        return sendJson(res, 400, { success: false, message: 'Nom et email sont obligatoires.' });
      }
      const saved = storage.addContact(body);
      return sendJson(res, 201, {
        success: true,
        message: 'Votre message a bien été envoyé. Notre équipe vous recontactera rapidement.',
        data: saved
      });
    }

    // 9. Public: POST /api/diagnostics
    if (pathname === '/api/diagnostics' && method === 'POST') {
      const body = await parseBody(req);
      if (!body.contact || !body.contact.nom || !body.contact.email) {
        return sendJson(res, 400, { success: false, message: 'Coordonnées (nom et email) obligatoires.' });
      }
      const saved = storage.addDiagnostic(body);
      return sendJson(res, 201, {
        success: true,
        message: 'Votre autodiagnostic a été enregistré avec succès.',
        data: saved
      });
    }

    // 10. Public: POST /api/analytics/visit
    if (pathname === '/api/analytics/visit' && method === 'POST') {
      const body = await parseBody(req);
      const visit = storage.recordVisit(body);
      return sendJson(res, 200, { success: true, visitId: visit.id });
    }

    // 11. Public: Company
    if (pathname === '/api/company' && method === 'GET') {
      return sendJson(res, 200, { success: true, data: defaultCompany });
    }

    // En production : si la route n'est pas une route API et que client/dist existe, on sert le frontend React
    if (!pathname.startsWith('/api') && fs.existsSync(DIST_DIR)) {
      return serveStatic(req, res, pathname);
    }

    // Route 404
    return sendJson(res, 404, { success: false, message: 'Route non trouvée' });

  } catch (err) {
    console.error('[SERVER ERROR]', err);
    return sendJson(res, 500, { success: false, message: 'Erreur interne du serveur' });
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[SERVER] SEnergyS Africa API démarrée sur http://127.0.0.1:${PORT}`);
});

