const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, '../../data/db.json');

// Données initiales vierges (sans données fictives)
const initialData = {
  admin: {
    email: 'admin@senergysafrica.com',
    password: 'admin123',
    name: 'Administrateur SESA',
    role: 'Super Admin'
  },
  contacts: [],
  diagnostics: [],
  visits: []
};

// Initialisation du fichier DB
function initDB() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
      console.log('[STORAGE] Base locale JSON initialisée (vierge) :', DB_FILE);
    }
  } catch (err) {
    console.error('[STORAGE] Erreur initialisation base JSON :', err);
  }
}

initDB();

function readDB() {
  try {
    if (!fs.existsSync(DB_FILE)) initDB();
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('[STORAGE] Erreur lecture DB :', err);
    return initialData;
  }
}

function writeDB(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('[STORAGE] Erreur écriture DB :', err);
  }
}

module.exports = {
  // Authentification Admin
  validateAdmin(email, password) {
    const db = readDB();
    const admin = db.admin || initialData.admin;
    if (admin.email.toLowerCase() === (email || '').trim().toLowerCase() && admin.password === (password || '').trim()) {
      return {
        email: admin.email,
        name: admin.name,
        role: admin.role,
        token: 'sesa_admin_token_' + Date.now()
      };
    }
    return null;
  },

  // Contacts
  getContacts() {
    const db = readDB();
    return (db.contacts || []).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  },

  addContact(contactData) {
    const db = readDB();
    const newContact = {
      id: 'cnt-' + Date.now(),
      name: contactData.name || '',
      email: contactData.email || '',
      phone: contactData.phone || '',
      company: contactData.company || '',
      subject: contactData.subject || 'Demande de contact',
      message: contactData.message || '',
      status: 'new',
      created_at: new Date().toISOString()
    };
    db.contacts = db.contacts || [];
    db.contacts.unshift(newContact);
    writeDB(db);
    return newContact;
  },

  updateContactStatus(id, status) {
    const db = readDB();
    const index = (db.contacts || []).findIndex(c => c.id === id);
    if (index !== -1) {
      db.contacts[index].status = status;
      writeDB(db);
      return db.contacts[index];
    }
    return null;
  },

  deleteContact(id) {
    const db = readDB();
    db.contacts = (db.contacts || []).filter(c => c.id !== id);
    writeDB(db);
    return true;
  },

  // Diagnostics
  getDiagnostics() {
    const db = readDB();
    return (db.diagnostics || []).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  },

  addDiagnostic(diagData) {
    const db = readDB();
    const newDiag = {
      id: 'diag-' + Date.now(),
      contact: diagData.contact || {},
      generalInfo: diagData.generalInfo || {},
      scores: diagData.scores || {},
      status: 'new',
      created_at: new Date().toISOString()
    };
    db.diagnostics = db.diagnostics || [];
    db.diagnostics.unshift(newDiag);
    writeDB(db);
    return newDiag;
  },

  updateDiagnosticStatus(id, status) {
    const db = readDB();
    const index = (db.diagnostics || []).findIndex(d => d.id === id);
    if (index !== -1) {
      db.diagnostics[index].status = status;
      writeDB(db);
      return db.diagnostics[index];
    }
    return null;
  },

  deleteDiagnostic(id) {
    const db = readDB();
    db.diagnostics = (db.diagnostics || []).filter(d => d.id !== id);
    writeDB(db);
    return true;
  },

  // Visites & Analytics
  recordVisit(visitData) {
    const db = readDB();
    const visit = {
      id: 'v-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      path: visitData.path || '/',
      referrer: visitData.referrer || 'Direct',
      device: visitData.device || 'Desktop',
      timestamp: new Date().toISOString()
    };
    db.visits = db.visits || [];
    db.visits.push(visit);
    if (db.visits.length > 5000) {
      db.visits = db.visits.slice(-5000);
    }
    writeDB(db);
    return visit;
  },

  getAnalytics() {
    const db = readDB();
    const visits = db.visits || [];
    const contacts = db.contacts || [];
    const diagnostics = db.diagnostics || [];

    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    const sevenDaysAgo = new Date(now.getTime() - 7 * 86400 * 1000);

    const totalVisits = visits.length;
    const visitsToday = visits.filter(v => v.timestamp && v.timestamp.startsWith(todayStr)).length;
    const visitsLast7Days = visits.filter(v => v.timestamp && new Date(v.timestamp) >= sevenDaysAgo).length;

    // Répartition par page
    const pageCounts = {};
    visits.forEach(v => {
      const p = v.path || '/';
      pageCounts[p] = (pageCounts[p] || 0) + 1;
    });

    const topPages = Object.entries(pageCounts)
      .map(([path, count]) => ({ path, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 7);

    // Répartition par appareil
    const deviceCounts = { Desktop: 0, Mobile: 0, Tablet: 0 };
    visits.forEach(v => {
      if (deviceCounts[v.device] !== undefined) {
        deviceCounts[v.device]++;
      } else {
        deviceCounts.Desktop++;
      }
    });

    // Répartition par provenance (Referrer)
    const referrerCounts = {};
    visits.forEach(v => {
      const r = v.referrer || 'Direct';
      referrerCounts[r] = (referrerCounts[r] || 0) + 1;
    });

    // Trafic par jour sur les 14 derniers jours
    const dailyTraffic = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 86400 * 1000);
      const dateStr = d.toISOString().split('T')[0];
      const count = visits.filter(v => v.timestamp && v.timestamp.startsWith(dateStr)).length;
      const dayLabel = d.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' });
      dailyTraffic.push({ date: dateStr, label: dayLabel, count });
    }

    const totalLeads = contacts.length + diagnostics.length;
    const conversionRate = totalVisits > 0 ? ((totalLeads / totalVisits) * 100).toFixed(1) : 0;

    return {
      totalVisits,
      visitsToday,
      visitsLast7Days,
      totalContacts: contacts.length,
      unreadContacts: contacts.filter(c => c.status === 'new').length,
      totalDiagnostics: diagnostics.length,
      newDiagnostics: diagnostics.filter(d => d.status === 'new').length,
      conversionRate,
      topPages,
      deviceCounts,
      referrerCounts,
      dailyTraffic
    };
  }
};
