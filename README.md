# SEnergys Africa (SEA) - Refonte Complète

Plateforme moderne de la société **SEnergys Africa** (Accélérateur de performances durables), spécialisée dans l'ingénierie thermique, la transition énergétique, les brûleurs industriels, la finance climat/ESG et la formation en Afrique subsaharienne.

Ce projet remplace l'ancienne installation WordPress par une architecture découplée, performante, sécurisée et évolutive.

---

## 🛠️ Stack Technologique

- **Frontend** : React 18, Vite, Lucide Icons, Vanilla CSS Design System responsive.
- **Backend** : Node.js, Express, Helmet, CORS, MySQL2.
- **Base de données** : MariaDB / MySQL (schéma normalisé et optimisé).
- **Conteneurisation** : Docker & Docker Compose.

---

## 📂 Structure du Répertoire

```text
SEA/
├── client/                 # Application Frontend React (Vite)
│   ├── public/assets/      # Logos officiels & Médias des brûleurs
│   └── src/
│       ├── components/     # Navbar, Footer, Hero, Cards, Form
│       └── pages/          # Accueil, À Propos, Services, Secteurs, Produits, Contact
├── server/                 # API REST Node.js Express
│   ├── src/
│   │   ├── config/         # Connexion DB (avec fallback automatique)
│   │   └── routes/         # Endpoints (Company, Services, Products, Contact)
├── database/
│   └── init.sql            # Schéma SQL et migration des données utiles
├── docker-compose.yml      # Orchestration Docker (db, server, client)
└── README.md
```

---

## 🚀 Démarrage Rapide

### Option 1 : Avec Docker (Recommandé)

```bash
docker compose up -d --build
```

- **Frontend (Client React)** : [http://localhost:3000](http://localhost:3000)
- **API REST (Backend)** : [http://localhost:5000/api/health](http://localhost:5000/api/health)
- **Base de données MariaDB** : `localhost:3307` (`sea_db`)

### Option 2 : Développement Local

1. **Lancer le backend :**
   ```bash
   cd server
   npm install
   npm start
   ```

2. **Lancer le frontend :**
   ```bash
   cd client
   npm install
   npm run dev
   ```
   Accès direct sur [http://localhost:3000](http://localhost:3000)

---

## 📦 Données Utiles Migrées

- **Profil Entreprise** : Présentation, Mission, Vision, Valeurs, Contacts officiels.
- **5 Pôles d'Expertise** : Énergie Durable, Finance Durable - ESG, Production Propre, Formation & Innovation, Facility Management.
- **4 Secteurs Clés** : Industries, Banques & Finances, Oil & Gas / Mines, Bâtiments Tertiaires.
- **Catalogue Brûleurs** : Gamme complète Gaz, Fioul et Bicarburation (TBG, TBL, TBML, BTL).
- **Assets Médias** : Logo vectoriel officiel SESA, photos haute résolution des équipements thermiques et logos partenaires (Senelec, AXA, Toyota, UCAD).
