import React, { useState, useEffect } from 'react';
import { Calendar, FileText, Download, ArrowRight, BookOpen, Tag, Newspaper, MapPin, X, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const defaultNewsList = [
  {
    id: "art-1",
    title: "Participation au Forum Énergie & Climat d'Afrique de l'Ouest",
    category: "Événement",
    date: "15 Octobre 2026",
    summary: "SEnergyS Africa est intervenue lors de la table ronde sur la décarbonation des filières industrielles et l'accès aux financements climat concessionnels.",
    content: "SEnergyS Africa a pris part aux travaux de haut niveau du Forum Énergie & Climat d'Afrique de l'Ouest. Nos experts ont partagé leurs retours d'expérience sur la mise en œuvre de diagnostics énergétiques industriels et la structuration de plans de transition bas-carbone.\n\nLes échanges ont notamment porté sur la mobilisation des guichets de refinancement vert et les opportunités offertes par le marché carbone (Article 6) pour accélérer l'investissement dans les technologies propres en zone UEMOA.",
    location: "Dakar, Sénégal",
    author: "Direction Technique SESA"
  },
  {
    id: "art-2",
    title: "Lancement de la plateforme propriétaire e-Audit pour les PME-PMI",
    category: "Innovation",
    date: "28 Septembre 2026",
    summary: "Notre outil digital permet désormais aux équipes techniques d'accélérer les diagnostics énergétiques terrain et de suivre en direct leurs ratios de performance ISO 50001.",
    content: "Dans le cadre de son pôle Innovation et Outils Digitaux, SEnergyS Africa déploie officiellement sa suite logicielle e-Audit.\n\nCette solution permet un recueil automatisé des données de consommation sur site, l'analyse en temps réel des courbes de charge thermique et électrique, et l'édition instantanée des plans de comptage conformes aux exigences de la norme ISO 50001.",
    location: "Diamniadio, Sénégal",
    author: "Équipe R&D SESA"
  },
  {
    id: "art-3",
    title: "Atelier de Renforcement des Capacités : Analyse des Projets Verts pour Banques",
    category: "Formation",
    date: "12 Septembre 2026",
    summary: "Formation certifiante dispensée à plus de 40 analystes et gestionnaires de risques de banques partenaires sur les critères d'éligibilité et la taxonomie verte.",
    content: "SEnergyS Africa a animé un cycle intensif de formation dédié aux cadres dirigeants et analystes crédits du secteur bancaire ouest-africain.\n\nAu programme : méthodologies d'évaluation des risques environnementaux et sociaux (E&S), calcul des tonnes de CO2 évitées par projet, et conformité avec les taxonomies des bailleurs internationaux (GCF, AFD, BAD).",
    location: "Abidjan, Côte d'Ivoire",
    author: "Pôle Finance Durable SESA"
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
  const [articles, setArticles] = useState(defaultNewsList);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    fetch('/api/articles')
      .then(res => res.json())
      .then(json => {
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setArticles(json.data);
        }
      })
      .catch(() => {});
  }, []);

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
            {articles.map((item) => (
              <div key={item.id} className="card card-interactive" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span className="badge" style={{ fontSize: '11px', padding: '4px 10px' }}>
                    {item.category || 'Actualité'}
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
                  <span style={{ fontSize: '12px', color: 'var(--color-orange)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={12} style={{ flexShrink: 0 }} /> {item.location || 'Dakar, Sénégal'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedArticle(item)}
                    className="nav-dropdown-item"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px', fontSize: '12px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--color-navy)' }}
                  >
                    Lire l'article <ArrowRight size={13} />
                  </button>
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

        {/* Bannière Veille Stratégique & Publications */}
        <div className="card" style={{ marginTop: '60px', padding: '40px', background: 'linear-gradient(135deg, rgba(232, 113, 43, 0.08) 0%, rgba(242, 200, 139, 0.08) 100%)', borderColor: 'var(--color-orange)', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--theme-text)', marginBottom: '12px' }}>
            Restez informés de l'actualité de la transition durable en Afrique
          </h2>
          <p style={{ color: 'var(--theme-text-muted)', maxWidth: '680px', margin: '0 auto 24px', lineHeight: 1.6 }}>
            Nos experts publient régulièrement des analyses sectorielles, des notes de cadrage réglementaire et des retours d'expérience opérationnels.
          </p>
          <Link to="/contact" className="btn btn-primary" style={{ padding: '14px 28px' }}>
            Recevoir nos prochaines publications techniques <ArrowRight size={16} />
          </Link>
        </div>

        {/* Modal de Lecture Complète d'Article */}
        {selectedArticle && (
          <div
            onClick={() => setSelectedArticle(null)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              background: 'rgba(15, 23, 42, 0.75)',
              backdropFilter: 'blur(4px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
          >
            <div
              className="card"
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '720px',
                width: '100%',
                maxHeight: '88vh',
                overflowY: 'auto',
                padding: '32px',
                position: 'relative',
                background: 'var(--theme-card-bg)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                borderRadius: '16px'
              }}
            >
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                style={{
                  position: 'absolute',
                  top: 20,
                  right: 20,
                  background: 'var(--theme-border)',
                  border: 'none',
                  borderRadius: '50%',
                  width: 36,
                  height: 36,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'var(--theme-text)'
                }}
                aria-label="Fermer"
              >
                <X size={18} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
                <span className="badge" style={{ fontSize: '12px', padding: '4px 10px' }}>
                  {selectedArticle.category || 'Actualité'}
                </span>
                <span style={{ fontSize: '13px', color: 'var(--theme-text-muted)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  <Calendar size={13} /> {selectedArticle.date}
                </span>
                {selectedArticle.location && (
                  <span style={{ fontSize: '13px', color: 'var(--color-orange)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    <MapPin size={13} /> {selectedArticle.location}
                  </span>
                )}
              </div>

              <h2 style={{ fontSize: '1.7rem', color: 'var(--theme-text)', lineHeight: 1.35, marginBottom: 16 }}>
                {selectedArticle.title}
              </h2>

              {selectedArticle.summary && (
                <div style={{ padding: '16px 20px', background: 'rgba(235, 130, 60, 0.08)', borderLeft: '3px solid var(--color-orange)', borderRadius: 8, marginBottom: 24, fontStyle: 'italic', color: 'var(--theme-text)', lineHeight: 1.6 }}>
                  {selectedArticle.summary}
                </div>
              )}

              <div style={{ color: 'var(--theme-text)', lineHeight: 1.8, fontSize: '15px', whiteSpace: 'pre-line', marginBottom: 28 }}>
                {selectedArticle.content || selectedArticle.summary}
              </div>

              <div style={{ paddingTop: 20, borderTop: '1px solid var(--theme-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                <span style={{ fontSize: '13px', color: 'var(--theme-text-muted)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <User size={14} color="var(--color-orange)" />
                  Rédigé par : <strong>{selectedArticle.author || 'SEnergyS Africa'}</strong>
                </span>
                <Link to="/contact" className="btn btn-primary btn-sm" onClick={() => setSelectedArticle(null)}>
                  Nous contacter à ce sujet <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

