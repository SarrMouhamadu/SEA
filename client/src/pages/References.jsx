import React, { useState } from 'react';
import ReferenceCard from '../components/ReferenceCard';

const projectsList = [
  {
    id: 1,
    title: "Audit Énergétique Instrumenté & Décarbonation des Procédés",
    sector: "industrie",
    sectorLabel: "Industrie & Agroalimentaire",
    clientType: "Industrie & Grandes Entreprises",
    expertiseLabel: "Ingénierie Énergie & ISO 50001",
    description: "Diagnostic approfondi des chaudières vapeur, des utilités d'air comprimé et du réseau de distribution thermique d'un complexe industriel manufacturier.",
    keyImpact: "-23% de consommation d'énergie et 1 200 tCO2 évitées / an"
  },
  {
    id: 2,
    title: "Structuration de Lignes de Financement Vert & Taxonomie Climat",
    sector: "finance",
    sectorLabel: "Institutions Financières",
    clientType: "Banques & Bailleurs de Fonds",
    expertiseLabel: "Finance Climatique & Marchés Carbone",
    description: "Élaboration des critères d'éligibilité E&S, outils de screening de portefeuille et accompagnement à la levée de fonds concessionnels verts.",
    keyImpact: "Portefeuille vert de 25M€ structuré selon les standards IFC / GCF"
  },
  {
    id: 3,
    title: "Stratégie Nationale d'Efficacité Énergétique & Éco-Parcs Industriels",
    sector: "public",
    sectorLabel: "Secteur Public",
    clientType: "Gouvernement & Bailleurs (GIZ, UE, BAD)",
    expertiseLabel: "Stratégies & Politiques Publiques",
    description: "Assistance technique pour la définition des cadres réglementaires MEPS, feuilles de route de transition pour Zones Économiques Spéciales et études territoriales.",
    keyImpact: "Feuille de route nationale et standardisation éco-parc adoptée"
  },
  {
    id: 4,
    title: "Digitalisation du Système de Management de l'Énergie (ISO 50001)",
    sector: "industrie",
    sectorLabel: "Industrie",
    clientType: "Grandes Entreprises & PME-PMI",
    expertiseLabel: "Innovation & Outils Digitaux (e-audit)",
    description: "Déploiement de notre solution propriétaire d'e-audit et de suivi télémesuré des flux énergétiques pour automatiser le management de l'énergie.",
    keyImpact: "Certification ISO 50001 obtenue et suivi continu des KPI en temps réel"
  },
  {
    id: 5,
    title: "Audit Thermique Global & Smart Metering d'un Complexe Tertiaire",
    sector: "batiments",
    sectorLabel: "Bâtiments & Services",
    clientType: "Secteur Tertiaire & Hôtellerie",
    expertiseLabel: "Management de Projet & AMO",
    description: "Optimisation des installations de climatisation (CVC), monitoring intelligent GTB et étude de faisabilité pour intégration solaire PV en toiture.",
    keyImpact: "-18% sur la facture électrique annuelle et monitoring 24/7"
  },
  {
    id: 6,
    title: "Programme Certifiant de Renforcement des Capacités Énergie-Climat",
    sector: "public",
    sectorLabel: "Formation & Innovation",
    clientType: "Institutions & Équipes Bancaires",
    expertiseLabel: "Formation & Renforcement des Capacités",
    description: "Cycles de formation pratique sur bancs d'essais et plateforme e-learning certifiante pour ingénieurs thermiciens et analystes de projets verts.",
    keyImpact: "+350 professionnels certifiés en efficacité énergétique et ESG"
  }
];

export default function References() {
  const [sectorFilter, setSectorFilter] = useState('all');

  const filteredProjects = sectorFilter === 'all'
    ? projectsList
    : projectsList.filter(p => p.sector === sectorFilter);

  return (
    <div className="references-page section">
      <div className="container">
        <div className="section-title-wrapper">
          <span className="badge">Nos Réalisations d'Ingénierie & Conseil</span>
          <h1 className="section-title">Références Phares & Projets Réalisés</h1>
          <p className="section-subtitle">
            Découvrez nos missions d'ingénierie énergétique, de finance climat et de transition durable menées avec engagement contractuel sur les résultats.
          </p>

          {/* Filtres par secteur / typologie */}
          <div className="products-filter-tabs">
            <button
              className={`filter-btn ${sectorFilter === 'all' ? 'active' : ''}`}
              onClick={() => setSectorFilter('all')}
            >
              Tous les projets ({projectsList.length})
            </button>
            <button
              className={`filter-btn ${sectorFilter === 'industrie' ? 'active' : ''}`}
              onClick={() => setSectorFilter('industrie')}
            >
              Industrie & Procédés
            </button>
            <button
              className={`filter-btn ${sectorFilter === 'finance' ? 'active' : ''}`}
              onClick={() => setSectorFilter('finance')}
            >
              Finance Climat & ESG
            </button>
            <button
              className={`filter-btn ${sectorFilter === 'public' ? 'active' : ''}`}
              onClick={() => setSectorFilter('public')}
            >
              Secteur Public & Bailleurs
            </button>
            <button
              className={`filter-btn ${sectorFilter === 'batiments' ? 'active' : ''}`}
              onClick={() => setSectorFilter('batiments')}
            >
              Bâtiments & Tertiaire
            </button>
          </div>
        </div>

        <div className="grid-3">
          {filteredProjects.map((project) => (
            <ReferenceCard key={project.id} item={project} />
          ))}
        </div>
      </div>
    </div>
  );
}

