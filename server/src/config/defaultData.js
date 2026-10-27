module.exports = {
  company: {
    name: 'SEnergys Africa',
    tagline: 'Accélérateur de performances durables',
    presentation: 'SEnergys Africa est une société d\'ingénierie et de conseil stratégique spécialisée dans la transition énergétique, l\'efficacité industrielle, la finance climatique/ESG et la formation professionnelle en Afrique subsaharienne.',
    mission: 'Accompagner les entreprises industrielles, le secteur financier et les institutions publiques vers une décarbonation concrète, une efficacité énergétique maximale et l\'alignement avec les standards climatiques internationaux.',
    vision: 'Devenir le partenaire de référence en Afrique de l\'Ouest pour la transition énergétique et les solutions industrielles propres de haute performance.',
    values: 'Excellence technique, Intégrité, Innovation durable, Impact mesurable',
    address: 'Dakar, Sénégal',
    phone: '+221 77 217 33 64',
    email: 'contact@senergysafrica.com',
    website: 'https://senergysafrica.com'
  },
  services: [
    {
      id: 1,
      slug: 'energie-durable',
      title: 'Énergie Durable',
      summary: 'Audits énergétiques, décarbonation industrielle et intégration des énergies renouvelables.',
      description: 'Nous réalisons des diagnostics énergétiques complets (audits conformes ISO 50001), l\'optimisation des réseaux de chaleur et de vapeur, ainsi que l\'intégration de solutions solaires et hybrides pour réduire vos coûts opérationnels et votre empreinte carbone.',
      icon: 'Zap'
    },
    {
      id: 2,
      slug: 'finance-durable-esg',
      title: 'Finance Durable - ESG',
      summary: 'Conseil en finance climatique, notation ESG et structuration de projets éligibles aux fonds verts.',
      description: 'Accompagnement des institutions financières et des investisseurs dans l\'évaluation des risques climatiques, la mise en place de politiques de gestion environnementale et sociale (ESMS) et la mobilisation de financements verts concessionnels.',
      icon: 'TrendingUp'
    },
    {
      id: 3,
      slug: 'production-propre',
      title: 'Production Propre & Brûleurs',
      summary: 'Rénovation des systèmes de combustion industrielle, brûleurs haute performance et éco-parcs.',
      description: 'Fourniture, installation et maintenance de brûleurs industriels (gaz, fioul, mixtes) de dernière génération permettant une réduction immédiate de la consommation de combustible jusqu\'à 25% et des émissions de NOx/CO2.',
      icon: 'Flame'
    },
    {
      id: 4,
      slug: 'formation-innovation',
      title: 'Formation & Innovation',
      summary: 'Renforcement des capacités techniques et managériales vers l\'industrie 4.0.',
      description: 'Programmes de formation certifiants dédiés aux ingénieurs et techniciens : efficacité énergétique, variation de vitesse, maintenance prédictive, éco-parcs industriels et conformité ESG.',
      icon: 'GraduationCap'
    },
    {
      id: 5,
      slug: 'facility-management',
      title: 'Facility Management',
      summary: 'Gestion technique intégrée des bâtiments tertiaires et complexes industriels.',
      description: 'Supervision globale des installations techniques : climatisation, ventilation, éclairage intelligent (smart metering) et gestion technique de bâtiment (GTB/GTC).',
      icon: 'Building2'
    }
  ],
  sectors: [
    {
      id: 1,
      slug: 'industries',
      title: 'Industries Manufacturières & Agroalimentaire',
      description: 'Optimisation des chaudières, fours, séchoirs et utilités industrielles pour maximiser la rentabilité des usines.',
      icon: 'Factory'
    },
    {
      id: 2,
      slug: 'secteur-financier',
      title: 'Institutions Financières & Banques',
      description: 'Stratégies climat, verdissement de portefeuilles de crédit et conformité aux standards internationaux (IFC, PRI).',
      icon: 'Landmark'
    },
    {
      id: 3,
      slug: 'oil-gas-mines',
      title: 'Oil & Gas, Mines',
      description: 'Efficacité énergétique des sites distants, réduction du torchage, valorisation des gaz et sécurité opérationnelle.',
      icon: 'Fuel'
    },
    {
      id: 4,
      slug: 'batiments-tertiaire',
      title: 'Bâtiments & Secteur Tertiaire',
      description: 'Performance énergétique des sièges sociaux, hôtels, hôpitaux et centres de données.',
      icon: 'Building'
    }
  ],
  products: [
    {
      id: 1,
      slug: 'tbg-450-750-lx',
      name: 'Brûleur Industriel Gaz TBG 450-750 LX/MC',
      category: 'gaz',
      model_family: 'Série TBG',
      power_range: '500 à 7 500 kW',
      description: 'Brûleur gaz basse émission (Low-NOx) conçu pour applications industrielles sévères. Gestion électronique du rapport air/gaz et régulation modulante continue.',
      image_url: '/assets/products/bruleur-tbg-450.jpg',
      features: ['Faibles émissions Low-NOx classe 3', 'Régulation électronique modulante', 'Haut rendement thermique > 93%', 'Maintenance facilitée avec accès direct aux têtes de combustion']
    },
    {
      id: 2,
      slug: 'bt-75-300-dspg',
      name: 'Brûleur Gaz Modulant BT 75-300 DSPG',
      category: 'gaz',
      model_family: 'Série BT',
      power_range: '850 à 3 000 kW',
      description: 'Brûleur à gaz robuste à deux allures progressives ou modulant, adapté aux chaudières à vapeur et générateurs d\'eau surchauffée.',
      image_url: '/assets/products/bruleur-bt-75.jpg',
      features: ['Système de came électronique', 'Raccordement gaz universel', 'Fiabilité éprouvée en climat tropical', 'Faible niveau sonore']
    },
    {
      id: 3,
      slug: 'tbl-1000-me',
      name: 'Brûleur Fioul Lourd & Léger TBL 1000 ME',
      category: 'fioul',
      model_family: 'Série TBL',
      power_range: '1 000 à 10 500 kW',
      description: 'Brûleur fioul haute puissance à commande numérique intégrée, adapté au fioul domestique, fioul lourd ou biodiésel avec système de réchauffage haute précision.',
      image_url: '/assets/products/bruleur-tbl-1000.jpg',
      features: ['Compatible fioul lourd et léger', 'Système de réchauffeur de fioul piloté', 'Régulation par servomoteur haute précision', 'Conçu pour service 24/7 en continu']
    },
    {
      id: 4,
      slug: 'btl-3-26',
      name: 'Brûleur Compact Fioul BTL 3-26',
      category: 'fioul',
      model_family: 'Série BTL',
      power_range: '30 à 310 kW',
      description: 'Brûleur compact pour petites et moyennes installations de chauffage et fours artisanaux. Facilité de pose et consommation maîtrisée.',
      image_url: '/assets/products/bruleur-btl-3.jpg',
      features: ['Encombrement ultra-réduit', 'Démarrage instantané', 'Faible consommation électrique', 'Facilité d\'entretien']
    },
    {
      id: 5,
      slug: 'tbml-50-me',
      name: 'Brûleur Mixte Gaz-Fioul TBML 50 ME',
      category: 'mixte',
      model_family: 'Série TBML',
      power_range: '250 à 6 000 kW',
      description: 'Solution bivalente assurant une continuité de production sans interruption grâce à la commutation rapide entre gaz naturel / GPL et fioul.',
      image_url: '/assets/products/bruleur-tbml-50.jpg',
      features: ['Bicarburation instantanée gaz/fioul', 'Sécurité totale d\'approvisionnement énergétique', 'Commande électronique indépendante par combustible', 'Certifié CE & ISO']
    }
  ],
  partners: [
    { id: 1, name: 'Senelec', category: 'Énergie & Utilités', logo_url: '/assets/partners/senelec.jpg', website: 'https://www.senelec.sn' },
    { id: 2, name: 'AXA Assurances', category: 'Assurances & Risques', logo_url: '/assets/partners/axa.jpeg', website: 'https://www.axa.sn' },
    { id: 3, name: 'Toyota Sénégal', category: 'Industrie Automobile', logo_url: '/assets/partners/toyota.png', website: 'https://toyota.sn' },
    { id: 4, name: 'Université Cheikh Anta Diop (UCAD)', category: 'Recherche & Enseignement', logo_url: '/assets/partners/ucad.jpg', website: 'https://www.ucad.sn' }
  ]
};
