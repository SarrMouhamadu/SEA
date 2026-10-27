-- ========================================================
-- Base de données propre pour la refonte SEnergys Africa (SEA)
-- ========================================================

CREATE DATABASE IF NOT EXISTS `sea_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `sea_db`;

-- 1. Informations de l'entreprise
CREATE TABLE IF NOT EXISTS `company_info` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `tagline` VARCHAR(255) NOT NULL,
    `presentation` TEXT NOT NULL,
    `mission` TEXT,
    `vision` TEXT,
    `values` TEXT,
    `address` VARCHAR(255),
    `phone` VARCHAR(50),
    `email` VARCHAR(100),
    `website` VARCHAR(100),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `company_info` (`name`, `tagline`, `presentation`, `mission`, `vision`, `values`, `address`, `phone`, `email`, `website`)
VALUES (
    'SEnergys Africa',
    'Accélérateur de performances durables',
    'SEnergys Africa est une société d\'ingénierie et de conseil stratégique spécialisée dans la transition énergétique, l\'efficacité industrielle, la finance climatique/ESG et la formation professionnelle en Afrique subsaharienne.',
    'Accompagner les entreprises industrielles, le secteur financier et les institutions publiques vers une décarbonation concrète, une efficacité énergétique maximale et l\'alignement avec les standards climatiques internationaux.',
    'Devenir le partenaire de référence en Afrique de l\'Ouest pour la transition énergétique et les solutions industrielles propres de haute performance.',
    'Excellence technique, Intégrité, Innovation durable, Impact mesurable',
    'Dakar, Sénégal',
    '+221 77 217 33 64',
    'contact@senergysafrica.com',
    'https://senergysafrica.com'
);

-- 2. Pôles d'expertise & Services
CREATE TABLE IF NOT EXISTS `services` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `slug` VARCHAR(100) UNIQUE NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `summary` VARCHAR(500) NOT NULL,
    `description` TEXT NOT NULL,
    `icon` VARCHAR(50) DEFAULT 'Zap',
    `order_index` INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `services` (`slug`, `title`, `summary`, `description`, `icon`, `order_index`) VALUES
(
    'energie-durable',
    'Énergie Durable',
    'Audits énergétiques, décarbonation industrielle et intégration des énergies renouvelables.',
    'Nous réalisons des diagnostics énergétiques complets (audits conformes ISO 50001), l\'optimisation des réseaux de chaleur et de vapeur, ainsi que l\'intégration de solutions solaires et hybrides pour réduire vos coûts opérationnels et votre empreinte carbone.',
    'Zap',
    1
),
(
    'finance-durable-esg',
    'Finance Durable - ESG',
    'Conseil en finance climatique, notation ESG et structuration de projets éligibles aux fonds verts.',
    'Accompagnement des institutions financières et des investisseurs dans l\'évaluation des risques climatiques, la mise en place de politiques de gestion environnementale et sociale (ESMS) et la mobilisation de financements verts concessionnels.',
    'TrendingUp',
    2
),
(
    'production-propre',
    'Production Propre & Brûleurs',
    'Rénovation des systèmes de combustion industrielle, brûleurs haute performance et éco-parcs.',
    'Fourniture, installation et maintenance de brûleurs industriels (gaz, fioul, mixtes) de dernière génération permettant une réduction immédiate de la consommation de combustible jusqu\'à 25% et des émissions de NOx/CO2.',
    'Flame',
    3
),
(
    'formation-innovation',
    'Formation & Innovation',
    'Renforcement des capacités techniques et managériales vers l\'industrie 4.0.',
    'Programmes de formation certifiants dédiés aux ingénieurs et techniciens : efficacité énergétique, variation de vitesse, maintenance prédictive, éco-parcs industriels et conformité ESG.',
    'GraduationCap',
    4
),
(
    'facility-management',
    'Facility Management',
    'Gestion technique intégrée des bâtiments tertiaires et complexes industriels.',
    'Supervision globale des installations techniques : climatisation, ventilation, éclairage intelligent (smart metering) et gestion technique de bâtiment (GTB/GTC).',
    'Building2',
    5
);

-- 3. Secteurs d'activités
CREATE TABLE IF NOT EXISTS `sectors` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `slug` VARCHAR(100) UNIQUE NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `icon` VARCHAR(50) DEFAULT 'Factory',
    `order_index` INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `sectors` (`slug`, `title`, `description`, `icon`, `order_index`) VALUES
(
    'industries',
    'Industries Manufacturières & Agroalimentaire',
    'Optimisation des chaudières, fours, séchoirs et utilités industrielles pour maximiser la rentabilité des usines.',
    'Factory',
    1
),
(
    'secteur-financier',
    'Institutions Financières & Banques',
    'Stratégies climat, verdissement de portefeuilles de crédit et conformité aux standards internationaux (IFC, PRI).',
    'Landmark',
    2
),
(
    'oil-gas-mines',
    'Oil & Gas, Mines',
    'Efficacité énergétique des sites distants, réduction du torchage, valorisation des gaz et sécurité opérationnelle.',
    'Fuel',
    3
),
(
    'batiments-tertiaire',
    'Bâtiments & Secteur Tertiaire',
    'Performance énergétique des sièges sociaux, hôtels, hôpitaux et centres de données.',
    'Building',
    4
);

-- 4. Catalogue des Produits (Brûleurs industriels)
CREATE TABLE IF NOT EXISTS `products` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `slug` VARCHAR(100) UNIQUE NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `category` ENUM('gaz', 'fioul', 'mixte') NOT NULL,
    `model_family` VARCHAR(100) NOT NULL,
    `power_range` VARCHAR(100),
    `description` TEXT NOT NULL,
    `image_url` VARCHAR(255),
    `features` JSON
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `products` (`slug`, `name`, `category`, `model_family`, `power_range`, `description`, `image_url`, `features`) VALUES
(
    'tbg-450-750-lx',
    'Brûleur Industriel Gaz TBG 450-750 LX/MC',
    'gaz',
    'Série TBG',
    '500 à 7 500 kW',
    'Brûleur gaz basse émission (Low-NOx) conçu pour applications industrielles sévères. Gestion électronique du rapport air/gaz et régulation modulante continue.',
    '/assets/products/bruleur-tbg-450.jpg',
    '["Faibles émissions Low-NOx classe 3", "Régulation électronique modulante", "Haut rendement thermique > 93%", "Maintenance facilitée avec accès direct aux têtes de combustion"]'
),
(
    'bt-75-300-dspg',
    'Brûleur Gaz Modulant BT 75-300 DSPG',
    'gaz',
    'Série BT',
    '850 à 3 000 kW',
    'Brûleur à gaz robuste à deux allures progressives ou modulant, adapté aux chaudières à vapeur et générateurs d\'eau surchauffée.',
    '/assets/products/bruleur-bt-75.jpg',
    '["Système de came électronique", "Raccordement gaz universel", "Fiabilité éprouvée en climat tropical", "Faible niveau sonore"]'
),
(
    'tbl-1000-me',
    'Brûleur Fioul Lourd & Léger TBL 1000 ME',
    'fioul',
    'Série TBL',
    '1 000 à 10 500 kW',
    'Brûleur fioul haute puissance à commande numérique intégrée, adapté au fioul domestique, fioul lourd ou biodiésel avec système de réchauffage haute précision.',
    '/assets/products/bruleur-tbl-1000.jpg',
    '["Compatible fioul lourd et léger", "Système de réchauffeur de fioul piloté", "Régulation par servomoteur haute précision", "Conçu pour service 24/7 en continu"]'
),
(
    'btl-3-26',
    'Brûleur Compact Fioul BTL 3-26',
    'fioul',
    'Série BTL',
    '30 à 310 kW',
    'Brûleur compact pour petites et moyennes installations de chauffage et fours artisanaux. Facilité de pose et consommation maîtrisée.',
    '/assets/products/bruleur-btl-3.jpg',
    '["Encombrement ultra-réduit", "Démarrage instantané", "Faible consommation électrique", "Facilité d\'entretien"]'
),
(
    'tbml-50-me',
    'Brûleur Mixte Gaz-Fioul TBML 50 ME',
    'mixte',
    'Série TBML',
    '250 à 6 000 kW',
    'Solution bivalente assurant une continuité de production sans interruption grâce à la commutation rapide entre gaz naturel / GPL et fioul.',
    '/assets/products/bruleur-tbml-50.jpg',
    '["Bicarburation instantanée gaz/fioul", "Sécurité totale d\'approvisionnement énergétique", "Commande électronique indépendante par combustible", "Certifié CE & ISO"]'
);

-- 5. Partenaires de référence
CREATE TABLE IF NOT EXISTS `partners` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(150) NOT NULL,
    `category` VARCHAR(100),
    `logo_url` VARCHAR(255) NOT NULL,
    `website` VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `partners` (`name`, `category`, `logo_url`, `website`) VALUES
('Senelec', 'Énergie & Utilités', '/assets/partners/senelec.jpg', 'https://www.senelec.sn'),
('AXA Assurances', 'Assurances & Risques', '/assets/partners/axa.jpeg', 'https://www.axa.sn'),
('Toyota Sénégal', 'Industrie Automobile', '/assets/partners/toyota.png', 'https://toyota.sn'),
('Université Cheikh Anta Diop (UCAD)', 'Recherche & Enseignement Supérieur', '/assets/partners/ucad.jpg', 'https://www.ucad.sn');

-- 6. Messages de Contact reçus
CREATE TABLE IF NOT EXISTS `contact_messages` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(150) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `phone` VARCHAR(50),
    `company` VARCHAR(150),
    `subject` VARCHAR(200) NOT NULL,
    `message` TEXT NOT NULL,
    `status` ENUM('new', 'read', 'replied') DEFAULT 'new',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
