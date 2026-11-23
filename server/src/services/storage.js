const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, '../../data/db.json');

// Liste des offres d'emploi par défaut (vide initialement)
const defaultJobOffers = [];

// Articles par défaut
const defaultArticles = [
  {
    id: 'art-1',
    title: "Participation au Forum Énergie & Climat d'Afrique de l'Ouest",
    category: "Événement",
    date: "15 Octobre 2026",
    summary: "SEnergyS Africa est intervenue lors de la table ronde sur la décarbonation des filières industrielles et l'accès aux financements climat concessionnels.",
    content: "SEnergyS Africa a pris part aux travaux de haut niveau du Forum Énergie & Climat d'Afrique de l'Ouest. Nos experts ont partagé leurs retours d'expérience sur la mise en œuvre de diagnostics énergétiques industriels et la structuration de plans de transition bas-carbone.\n\nLes échanges ont notamment porté sur la mobilisation des guichets de refinancement vert et les opportunités offertes par le marché carbone (Article 6) pour accélérer l'investissement dans les technologies propres en zone UEMOA.",
    location: "Dakar, Sénégal",
    author: "Direction Technique SESA",
    published: true,
    created_at: "2026-10-15T10:00:00Z"
  },
  {
    id: 'art-2',
    title: "Lancement de la plateforme propriétaire e-Audit pour les PME-PMI",
    category: "Innovation",
    date: "28 Septembre 2026",
    summary: "Notre outil digital permet désormais aux équipes techniques d'accélérer les diagnostics énergétiques terrain et de suivre en direct leurs ratios de performance ISO 50001.",
    content: "Dans le cadre de son pôle Innovation et Outils Digitaux, SEnergyS Africa déploie officiellement sa suite logicielle e-Audit.\n\nCette solution permet un recueil automatisé des données de consommation sur site, l'analyse en temps réel des courbes de charge thermique et électrique, et l'édition instantanée des plans de comptage conformes aux exigences de la norme ISO 50001.",
    location: "Diamniadio, Sénégal",
    author: "Équipe R&D SESA",
    published: true,
    created_at: "2026-09-28T09:00:00Z"
  },
  {
    id: 'art-3',
    title: "Atelier de Renforcement des Capacités : Analyse des Projets Verts pour Banques",
    category: "Formation",
    date: "12 Septembre 2026",
    summary: "Formation certifiante dispensée à plus de 40 analystes et gestionnaires de risques de banques partenaires sur les critères d'éligibilité et la taxonomie verte.",
    content: "SEnergyS Africa a animé un cycle intensif de formation dédié aux cadres dirigeants et analystes crédits du secteur bancaire ouest-africain.\n\nAu programme : méthodologies d'évaluation des risques environnementaux et sociaux (E&S), calcul des tonnes de CO2 évitées par projet, et conformité avec les taxonomies des bailleurs internationaux (GCF, AFD, BAD).",
    location: "Abidjan, Côte d'Ivoire",
    author: "Pôle Finance Durable SESA",
    published: true,
    created_at: "2026-09-12T14:30:00Z"
  }
];

// Données initiales vierges
const initialData = {
  admin: {
    email: 'admin@senergysafrica.com',
    password: 'admin123',
    name: 'Administrateur SESA',
    role: 'Super Admin'
  },
  contacts: [],
  diagnostics: [],
  careers: [],
  jobs: defaultJobOffers,
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

  // Candidatures & Recrutement (Carrières)
  getCareers() {
    const db = readDB();
    return (db.careers || []).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  },

  getCareerById(id) {
    const db = readDB();
    return (db.careers || []).find(c => c.id === id) || null;
  },

  addCareer(data) {
    const db = readDB();
    const newCareer = {
      id: 'car-' + Date.now(),
      fullName: data.fullName || '',
      email: data.email || '',
      phone: data.phone || '',
      location: data.location || '',
      position: data.position || 'Candidature Spontanée',
      experience: data.experience || '',
      linkedin: data.linkedin || '',
      motivation: data.motivation || '',
      cvName: data.cvName || '',
      cvType: data.cvType || 'application/pdf',
      cvSize: data.cvSize || 0,
      cvData: data.cvData || '', // Base64 data URL
      status: 'nouveau', // 'nouveau' | 'en_revue' | 'entretien' | 'retenu' | 'refuse'
      notes: '',
      created_at: new Date().toISOString()
    };
    db.careers = db.careers || [];
    db.careers.unshift(newCareer);
    writeDB(db);
    return newCareer;
  },

  updateCareerStatus(id, status, notes) {
    const db = readDB();
    const index = (db.careers || []).findIndex(c => c.id === id);
    if (index !== -1) {
      if (status !== undefined) db.careers[index].status = status;
      if (notes !== undefined) db.careers[index].notes = notes;
      writeDB(db);
      return db.careers[index];
    }
    return null;
  },

  deleteCareer(id) {
    const db = readDB();
    db.careers = (db.careers || []).filter(c => c.id !== id);
    writeDB(db);
    return true;
  },

  // Offres d'Emploi (Gestion par l'administrateur)
  getJobOffers({ activeOnly = false } = {}) {
    const db = readDB();
    const jobs = db.jobs || defaultJobOffers;
    if (activeOnly) {
      return jobs.filter(j => j.active !== false);
    }
    return jobs;
  },

  getJobOfferById(id) {
    const db = readDB();
    const jobs = db.jobs || defaultJobOffers;
    return jobs.find(j => j.id === id) || null;
  },

  addJobOffer(data) {
    const db = readDB();
    db.jobs = db.jobs || [...defaultJobOffers];
    const newJob = {
      id: 'job-' + Date.now(),
      title: data.title || 'Nouvelle opportunité',
      pole: data.pole || 'Énergie Durable',
      location: data.location || 'Dakar, Sénégal',
      type: data.type || 'CDI - Temps Plein',
      experience: data.experience || '',
      description: data.description || '',
      tags: Array.isArray(data.tags)
        ? data.tags
        : (data.tags ? data.tags.split(',').map(t => t.trim()).filter(Boolean) : []),
      active: data.active !== false,
      created_at: new Date().toISOString()
    };
    db.jobs.unshift(newJob);
    writeDB(db);
    return newJob;
  },

  updateJobOffer(id, data) {
    const db = readDB();
    db.jobs = db.jobs || [...defaultJobOffers];
    const index = db.jobs.findIndex(j => j.id === id);
    if (index !== -1) {
      if (data.title !== undefined) db.jobs[index].title = data.title;
      if (data.pole !== undefined) db.jobs[index].pole = data.pole;
      if (data.location !== undefined) db.jobs[index].location = data.location;
      if (data.type !== undefined) db.jobs[index].type = data.type;
      if (data.experience !== undefined) db.jobs[index].experience = data.experience;
      if (data.description !== undefined) db.jobs[index].description = data.description;
      if (data.tags !== undefined) {
        db.jobs[index].tags = Array.isArray(data.tags)
          ? data.tags
          : data.tags.split(',').map(t => t.trim()).filter(Boolean);
      }
      if (data.active !== undefined) db.jobs[index].active = Boolean(data.active);
      writeDB(db);
      return db.jobs[index];
    }
    return null;
  },

  deleteJobOffer(id) {
    const db = readDB();
    db.jobs = (db.jobs || defaultJobOffers).filter(j => j.id !== id);
    writeDB(db);
    return true;
  },

  // Articles & Actualités
  getArticles({ publishedOnly = false } = {}) {
    const db = readDB();
    const articles = db.articles || defaultArticles;
    if (publishedOnly) {
      return articles.filter(a => a.published !== false);
    }
    return articles;
  },

  getArticleById(id) {
    const db = readDB();
    const articles = db.articles || defaultArticles;
    return articles.find(a => a.id === id) || null;
  },

  addArticle(articleData) {
    const db = readDB();
    db.articles = db.articles || [...defaultArticles];
    const newArticle = {
      id: 'art-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      title: articleData.title,
      category: articleData.category || 'Actualité',
      date: articleData.date || new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
      summary: articleData.summary || '',
      content: articleData.content || '',
      location: articleData.location || 'Dakar, Sénégal',
      author: articleData.author || 'Direction Technique SESA',
      imageUrl: articleData.imageUrl || '',
      published: articleData.published !== undefined ? Boolean(articleData.published) : true,
      created_at: new Date().toISOString()
    };
    db.articles.unshift(newArticle);
    writeDB(db);
    return newArticle;
  },

  updateArticle(id, data) {
    const db = readDB();
    db.articles = db.articles || [...defaultArticles];
    const index = db.articles.findIndex(a => a.id === id);
    if (index !== -1) {
      if (data.title !== undefined) db.articles[index].title = data.title;
      if (data.category !== undefined) db.articles[index].category = data.category;
      if (data.date !== undefined) db.articles[index].date = data.date;
      if (data.summary !== undefined) db.articles[index].summary = data.summary;
      if (data.content !== undefined) db.articles[index].content = data.content;
      if (data.location !== undefined) db.articles[index].location = data.location;
      if (data.author !== undefined) db.articles[index].author = data.author;
      if (data.imageUrl !== undefined) db.articles[index].imageUrl = data.imageUrl;
      if (data.published !== undefined) db.articles[index].published = Boolean(data.published);
      writeDB(db);
      return db.articles[index];
    }
    return null;
  },

  deleteArticle(id) {
    const db = readDB();
    db.articles = (db.articles || defaultArticles).filter(a => a.id !== id);
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

    const totalLeads = contacts.length + diagnostics.length + (db.careers || []).length;
    const conversionRate = totalVisits > 0 ? ((totalLeads / totalVisits) * 100).toFixed(1) : 0;

    return {
      totalVisits,
      visitsToday,
      visitsLast7Days,
      totalContacts: contacts.length,
      unreadContacts: contacts.filter(c => c.status === 'new').length,
      totalDiagnostics: diagnostics.length,
      newDiagnostics: diagnostics.filter(d => d.status === 'new').length,
      totalCareers: (db.careers || []).length,
      newCareers: (db.careers || []).filter(c => c.status === 'nouveau').length,
      conversionRate,
      topPages,
      deviceCounts,
      referrerCounts,
      dailyTraffic
    };
  }
};
