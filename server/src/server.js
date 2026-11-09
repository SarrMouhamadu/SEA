const http = require('http');
const url = require('url');
const storage = require('./services/storage');

const PORT = process.env.PORT || 5001;

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
    req.on('data', chunk => { body += chunk.toString(); });
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
      return sendJson(res, 200, {
        success: true,
        data: { analytics, recentContacts, recentDiagnostics }
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

    // Route 404
    return sendJson(res, 404, { success: false, message: 'Route non trouvée' });

  } catch (err) {
    console.error('[SERVER ERROR]', err);
    return sendJson(res, 500, { success: false, message: 'Erreur interne du serveur' });
  }
});

server.listen(PORT, () => {
  console.log(`[SERVER] SEnergyS Africa API démarrée sur http://localhost:${PORT}`);
});
