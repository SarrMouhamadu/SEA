import React, { useState } from 'react';
import { Calendar, FileText, Download, ArrowRight, BookOpen, Tag, Newspaper } from 'lucide-react';
import { Link } from 'react-router-dom';

const newsList = [
  {
    id: 1,
    title: "Participation au Forum Énergie & Climat d'Afrique de l'Ouest",
    category: "Événement",
    date: "15 Octobre 2026",
    summary: "SEnergyS Africa est intervenue lors de la table ronde sur la décarbonation des filières industrielles et l'accès aux financements climat concessionnels.",
    location: "Dakar, Sénégal"
  },
  {
    id: 2,
    title: "Lancement de la plateforme propriétaire e-Audit pour les PME-PMI",
    category: "Innovation",
    date: "28 Septembre 2026",
    summary: "Notre outil digital permet désormais aux équipes techniques d'accélérer les diagnostics énergétiques terrain et de suivre en direct leurs ratios de performance ISO 50001.",
    location: "Diamniadio, Sénégal"
  },
  {
    id: 3,
    title: "Atelier de Renforcement des Capacités : Analyse des Projets Verts pour Banques",
    category: "Formation",
    date: "12 Septembre 2026",
    summary: "Formation certifiante dispensée à plus de 40 analystes et gestionnaires de risques de banques partenaires sur les critères d'éligibilité et la taxonomie verte.",
    location: "Abidjan, Côte d'Ivoire"
  }
];

const publicationsList = [
  {
    id: 1,
    title: "Guide Pratique : Décarbonation & Efficacité Énergétique dans l'Industrie",
    type: "etudes",
    typeLabel: "Étude sectorielle",
    date: "Septembre 2026",
    pages: "36 pages",
    desc: "Méthodologie opérationnelle pour structurer un plan de réduction d'énergie thermique et électrique dans les unités manufacturières et agroalimentaires."
  },
  {
    id: 2,
    title: "Rapport d'Impact : Structuration de Lignes Vertes & Taxonomies Climat en Zone UEMOA",
    type: "rapports",
    typeLabel: "Rapport d'impact",
    date: "Juillet 2026",
    pages: "48 pages",
    desc: "Analyse des critères ESG, du screening environnemental et des opportunités de refinancement vert auprès des bailleurs internationaux (GCF, AFD, BAD)."
  },
  {
    id: 3,
    title: "Systèmes de Management de l'Énergie (ISO 50001) : Facteurs Clés de Succès",
    type: "articles",
    typeLabel: "Article technique",
    date: "Août 2026",
    pages: "12 pages",
    desc: "Retour d'expérience sur la digitalisation des plans de comptage et l'engagement contractuel sur les résultats d'économies d'énergie."
  },
  {
    id: 4,
    title: "Feuille de Route pour la Transition Énergétique des Zones Économiques Spéciales",
    type: "etudes",
    typeLabel: "Étude sectorielle",
    date: "Mai 2026",
    pages: "52 pages",
    desc: "Cadre réglementaire, intégration solaire photovoltaïque et mutualisation des utilités pour des éco-parcs industriels résilients."
  }
];

export default function Ressources() {
  const [pubFilter, setPubFilter] = useState('all');

  const filteredPubs = pubFilter === 'all'
    ? publicationsList
    : publicationsList.filter(p => p.type === pubFilter);

  return (
    <div className="ressources-page section">
      <div className="container">
        
        {/* Titre principal */}
        <div className="section-title-wrapper">
          <span className="badge">Centre de Connaissances & Actualités</span>
          <h1 className="section-title">Ressources & Publications</h1>
          <p className="section-subtitle">
            Consultez nos analyses techniques, retours d'expérience terrain et actualités 
            sur la transition énergétique et la finance climat en Afrique.
          </p>
        </div>

        {/* Section 1 : Actualités & Événements */}
        <section id="actualites" style={{ marginBottom: '80px', scrollMarginTop: '100px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <Newspaper size={26} color="var(--color-orange)" />
            <h2 style={{ fontSize: '1.8rem', color: 'var(--theme-text)', margin: 0 }}>
              Actualités & Événements
            </h2>
          </div>

          <div className="grid-3">
            {newsList.map((item) => (
              <div key={item.id} className="card card-interactive" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span className="badge" style={{ fontSize: '11px', padding: '4px 10px' }}>
                    {item.category}
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--theme-text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={13} /> {item.date}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.25rem', color: 'var(--theme-text)', marginBottom: '12px', lineHeight: 1.35 }}>
                  {item.title}
                </h3>

                <p style={{ color: 'var(--theme-text-muted)', fontSize: '14px', lineHeight: 1.6, flex: 1, marginBottom: '20px' }}>
                  {item.summary}
                </p>

                <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--theme-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: 'var(--color-orange)', fontWeight: 600 }}>
                    📍 {item.location}
                  </span>
                  <Link to="/contact" className="nav-dropdown-item" style={{ padding: '4px 8px', fontSize: '12px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    En savoir plus <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2 : Publications & Études */}
        <section id="publications" style={{ scrollMarginTop: '100px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <BookOpen size={26} color="var(--color-orange)" />
              <h2 style={{ fontSize: '1.8rem', color: 'var(--theme-text)', margin: 0 }}>
                Publications & Rapports d'Étude
              </h2>
            </div>

            {/* Filtres par type */}
            <div className="ref-filters">
              <button
                className={`ref-filter-btn ${pubFilter === 'all' ? 'active' : ''}`}
                onClick={() => setPubFilter('all')}
              >
                Toutes ({publicationsList.length})
              </button>
              <button
                className={`ref-filter-btn ${pubFilter === 'etudes' ? 'active' : ''}`}
                onClick={() => setPubFilter('etudes')}
              >
                Études sectorielles
              </button>
              <button
                className={`ref-filter-btn ${pubFilter === 'rapports' ? 'active' : ''}`}
                onClick={() => setPubFilter('rapports')}
              >
                Rapports d'impact
              </button>
              <button
                className={`ref-filter-btn ${pubFilter === 'articles' ? 'active' : ''}`}
                onClick={() => setPubFilter('articles')}
              >
                Articles techniques
              </button>
            </div>
          </div>

          <div className="grid-2">
            {filteredPubs.map((pub) => (
              <div key={pub.id} className="card card-interactive" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span className="badge" style={{ fontSize: '11px', padding: '4px 10px' }}>
                    {pub.typeLabel}
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--theme-text-muted)' }}>
                    {pub.pages} · {pub.date}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.3rem', color: 'var(--theme-text)', marginBottom: '10px', lineHeight: 1.35 }}>
                  {pub.title}
                </h3>

                <p style={{ color: 'var(--theme-text-muted)', fontSize: '14px', lineHeight: 1.6, flex: 1, marginBottom: '20px' }}>
                  {pub.desc}
                </p>

                <div style={{ marginTop: 'auto' }}>
                  <Link 
                    to="/contact" 
                    className="btn btn-secondary btn-sm" 
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <Download size={14} /> Demander le document complet
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

