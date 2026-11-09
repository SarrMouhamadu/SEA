const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, '../../data/db.json');

// Données initiales de démonstration réalistes pour SEnergyS Africa
const initialData = {
  admin: {
    email: 'admin@senergysafrica.com',
    password: 'admin123', // Utilisateur par défaut
    name: 'Administrateur SESA',
    role: 'Super Admin'
  },
  contacts: [
    {
      id: 'cnt-1',
      name: 'Amadou Fall',
      email: 'a.fall@scocim-ciment.sn',
      phone: '+221 77 654 32 10',
      company: 'SCOCIM Cimenterie',
      subject: 'Optimisation brûleur et récupération de chaleur four',
      message: 'Bonjour, suite à votre présentation, nous souhaiterions réaliser une étude de faisabilité pour moderniser nos brûleurs industriels fioul/gaz et récupérer la chaleur fatale de nos fours de clinkérisation. Merci de nous contacter pour convenir d\'une visite sur site à Rufisque.',
      status: 'new',
      created_at: new Date(Date.now() - 3 * 3600 * 1000).toISOString()
    },
    {
      id: 'cnt-2',
      name: 'Fatou Kiné Diop',
      email: 'f.diop@bnde.sn',
      phone: '+221 70 892 11 45',
      company: 'Banque Nationale de Développement Économique (BNDE)',
      subject: 'Accompagnement taxonomie finance verte & ESG',
      message: 'Nous structurons une nouvelle ligne de crédit vert destinée aux PME agro-industrielles au Sénégal. Nous recherchons un partenaire technique pour élaborer la grille d\'éligibilité ESG et la due diligence technique des projets.',
      status: 'read',
      created_at: new Date(Date.now() - 26 * 3600 * 1000).toISOString()
    },
    {
      id: 'cnt-3',
      name: 'Moussa Ndiaye',
      email: 'moussa.ndiaye@soboa.sn',
      phone: '+221 77 412 88 90',
      company: 'Société de Brasseries de l\'Ouest Africain (SOBOA)',
      subject: 'Audit énergétique usine & certification ISO 50001',
      message: 'Dans le cadre de notre démarche RSE et de réduction de nos coûts énergétiques sur les utilités (froid industriel, air comprimé, vapeur), nous souhaitons planifier un audit énergétique complet et lancer notre Système de Management ISO 50001.',
      status: 'replied',
      created_at: new Date(Date.now() - 3 * 86400 * 1000).toISOString()
    },
    {
      id: 'cnt-4',
      name: 'Christian Bamba',
      email: 'cbamba@mines-senegal.com',
      phone: '+221 78 301 22 77',
      company: 'Consortium Minier du Sud',
      subject: 'Hybridation solaire PV de site minier isolé',
      message: 'Nous opérons un site minier hors-réseau alimenté par centrale thermique diesel. Nous aimerions intégrer une centrale solaire PV 8 MW avec stockage batterie pour réduire nos dépenses en gasoil.',
      status: 'new',
      created_at: new Date(Date.now() - 5 * 86400 * 1000).toISOString()
    }
  ],
  diagnostics: [
    {
      id: 'diag-1',
      contact: {
        nom: 'Ibrahima Ba',
        email: 'iba@agro-sahel.sn',
        telephone: '+221 77 555 12 34',
        fonction: 'Directeur d\'Usine',
        recontact: 'Sous 48h - Échange prioritaire',
        theme: 'Vapeur & Chaudières industrielles',
        echeance: 'Court terme (1 à 3 mois)',
        commentaire: 'Urgent car notre facture de combustible a bondi de 35% ce semestre.'
      },
      generalInfo: {
        nomEntreprise: 'Agro-Industries du Sahel',
        secteurActivite: 'Agroalimentaire & Boissons',
        pays: 'Sénégal',
        region: 'Thiès',
        factureAnnuelle: '250 à 500 millions FCFA'
      },
      scores: {
        globalScore: 54,
        niveau: 'Potentiel d\'optimisation élevé',
        priorites: [
          { title: 'Vapeur & Chaudières industrielles', scorePct: 42, recommendation: 'Purger les réseaux, calorifuger et moderniser le brûleur' },
          { title: 'Management de l\'Énergie & Mesure', scorePct: 48, recommendation: 'Déployer des compteurs communicants et préparer l\'ISO 50001' },
          { title: 'Froid Industriel & Climatisation', scorePct: 60, recommendation: 'Optimiser les cycles de condensation et récupérer la chaleur' }
        ]
      },
      status: 'new',
      created_at: new Date(Date.now() - 4 * 3600 * 1000).toISOString()
    },
    {
      id: 'diag-2',
      contact: {
        nom: 'Salimata Sow',
        email: 's.sow@textiles-senegal.sn',
        telephone: '+221 76 890 43 21',
        fonction: 'Responsable Maintenance & QHSE',
        recontact: 'Dans la semaine',
        theme: 'Air comprimé & Réseaux de distribution',
        echeance: 'Moyen terme (3 à 6 mois)',
        commentaire: 'Nous avons suspecté des fuites massives sur nos compresseurs d\'air.'
      },
      generalInfo: {
        nomEntreprise: 'Manufacture Textile Sénégalaise',
        secteurActivite: 'Textile & Confection',
        pays: 'Sénégal',
        region: 'Dakar (Zone Industrielle de Yarakh)',
        factureAnnuelle: '100 à 250 millions FCFA'
      },
      scores: {
        globalScore: 68,
        niveau: 'Performance intermédiaire',
        priorites: [
          { title: 'Air comprimé & Fuites', scorePct: 45, recommendation: 'Campagne de détection ultrasons et régulation de pression' },
          { title: 'Électricité & Variation de vitesse', scorePct: 58, recommendation: 'Installation de variateurs de fréquence sur moteurs > 15 kW' },
          { title: 'Solaire Photovoltaïque toiture', scorePct: 70, recommendation: 'Étude d\'autoconsommation sur 2 500 m² de toiture' }
        ]
      },
      status: 'contacted',
      created_at: new Date(Date.now() - 2 * 86400 * 1000).toISOString()
    },
    {
      id: 'diag-3',
      contact: {
        nom: 'Mamadou Diallo',
        email: 'm.diallo@plastique-pro.com',
        telephone: '+221 70 333 44 55',
        fonction: 'Directeur Général',
        recontact: 'Rendez-vous physique souhaité',
        theme: 'Solaire PV & Décarbonation',
        echeance: 'Immédiat',
        commentaire: 'Projet financé avec soutien bancaire, nous cherchons l\'AMO technique.'
      },
      generalInfo: {
        nomEntreprise: 'Plastiques & Polymères d\'Afrique de l\'Ouest',
        secteurActivite: 'Chimie & Plasturgie',
        pays: 'Sénégal',
        region: 'Diamniadio',
        factureAnnuelle: 'Plus de 500 millions FCFA'
      },
      scores: {
        globalScore: 41,
        niveau: 'Éligibilité prioritaire aux gains rapides',
        priorites: [
          { title: 'Optimisation des procédés thermiques', scorePct: 35, recommendation: 'Révision complète des têtes d\'extrusion et isolation' },
          { title: 'Centrale Solaire PV Toiture', scorePct: 40, recommendation: 'Dimensionnement d\'une centrale en toiture de 450 kWc' },
          { title: 'Qualité du réseau électrique & Cosinus phi', scorePct: 50, recommendation: 'Batterie de condensateurs pour effacer les pénalités Senelec' }
        ]
      },
      status: 'appointment',
      created_at: new Date(Date.now() - 6 * 86400 * 1000).toISOString()
    }
  ],
  visits: []
};

// Générer des visites pour les 14 derniers jours si vide
function generateDemoVisits() {
  const visits = [];
  const pages = ['/', '/services', '/secteurs', '/references', '/autodiagnostic', '/contact', '/a-propos'];
  const referrers = ['Google Search', 'Direct', 'LinkedIn', 'Partenaires SESA', 'Email Newsletter'];
  const devices = ['Desktop', 'Mobile', 'Tablet'];
  
  const now = Date.now();
  for (let i = 13; i >= 0; i--) {
    const dayTimestamp = now - i * 86400 * 1000;
    // Visites par jour (entre 45 et 120 visites par jour)
    const count = 55 + Math.floor(Math.sin(i) * 20) + Math.floor(Math.random() * 35);
    for (let j = 0; j < count; j++) {
      const pageIndex = Math.random() < 0.35 ? 0 : Math.floor(Math.random() * pages.length);
      const devRand = Math.random();
      const device = devRand < 0.65 ? 'Desktop' : devRand < 0.9 ? 'Mobile' : 'Tablet';
      const refRand = Math.random();
      const referrer = refRand < 0.45 ? 'Google Search' : refRand < 0.75 ? 'Direct' : refRand < 0.9 ? 'LinkedIn' : 'Partenaires SESA';

      visits.push({
        id: `v-${i}-${j}`,
        path: pages[pageIndex],
        referrer,
        device,
        timestamp: new Date(dayTimestamp + Math.floor(Math.random() * 86400 * 1000)).toISOString()
      });
    }
  }
  return visits;
}

// Initialisation du fichier DB
function initDB() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      initialData.visits = generateDemoVisits();
      fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
      console.log('[STORAGE] Base locale JSON créée avec succès :', DB_FILE);
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
    // Limiter la taille à 5000 visites récentes
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
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 86400 * 1000);

    const totalVisits = visits.length;
    const visitsToday = visits.filter(v => v.timestamp.startsWith(todayStr)).length;
    const visitsLast7Days = visits.filter(v => new Date(v.timestamp) >= sevenDaysAgo).length;

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
      const count = visits.filter(v => v.timestamp.startsWith(dateStr)).length;
      const dayLabel = d.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' });
      dailyTraffic.push({ date: dateStr, label: dayLabel, count });
    }

    // Taux de conversion : (contacts + diagnostics) / totalVisits
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
