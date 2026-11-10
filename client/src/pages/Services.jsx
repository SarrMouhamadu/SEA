import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const defaultServices = [
  {
    id: 1,
    slug: 'ingenierie-energie-environnement',
    title: 'Ingénierie Énergie & Environnement',
    summary: 'Audit, diagnostic approfondi et conception de systèmes EnR.',
    description: 'Audits énergétiques détaillés et instrumentés (conformes ISO 50001), optimisation des utilités thermiques (vapeur, air comprimé, froid) et dimensionnement de solutions d\'énergie renouvelable (solaire PV, thermique, biomasse).',
    icon: 'Zap',
    highlights: ['Audits énergétiques industriels détaillés', 'Dimensionnement solaire PV, thermique & biomasse', 'Optimisation des utilités (vapeur, air comprimé, froid)', 'Engagement contractuel sur les résultats']
  },
  {
    id: 2,
    slug: 'conseil-strategique-developpement-durable',
    title: 'Conseil Stratégique Développement Durable',
    summary: 'RSE, production propre et mise à niveau environnementale.',
    description: 'Accompagnement des industries et grandes entreprises dans leurs plans de décarbonation, l\'optimisation des procédés industriels, la valorisation de la chaleur fatale, la mise en conformité environnementale et la réduction continue des émissions.',
    icon: 'Flame',
    highlights: ['Plans de décarbonation industrielle & feuilles de route Net-Zero', 'Optimisation des utilités industrielles (vapeur, air, chaleur)', 'RSE et mise à niveau environnementale', 'Accompagnement éco-parcs industriels']
  },
  {
    id: 3,
    slug: 'finance-climatique-marches-carbone',
    title: 'Finance Climatique & Marchés Carbone',
    summary: 'Fonds climat, MRV et structuration de projets verts.',
    description: 'Appui aux institutions financières et investisseurs pour la structuration de lignes de financement vert, l\'élaboration de taxonomies climat, la due diligence environnementale et sociale (E&S) et les mécanismes MRV.',
    icon: 'TrendingUp',
    highlights: ['Structuration de lignes de financement vert', 'Taxonomies climat & critères d\'éligibilité', 'Due diligence E&S et screening des projets', 'MRV climat & produits financiers innovants (ESCO, leasing)']
  },
  {
    id: 4,
    slug: 'management-projet-amo',
    title: 'Management de Projet et AMO',
    summary: 'Pilotage, coordination technique et suivi de performance.',
    description: 'Assistance à Maîtrise d\'Ouvrage (AMO) pour la conduite de projets de transition énergétique complexes : de l\'étude d\'opportunité et du diagnostic jusqu\'à la mise en œuvre, la réception et le suivi-évaluation des économies d\'énergie.',
    icon: 'Briefcase',
    highlights: ['Assistance à Maîtrise d\'Ouvrage (AMO)', 'Pilotage et coordination globale de chantiers', 'Suivi-évaluation indépendant des performances', 'Mesures physiques avant/après travaux']
  },
  {
    id: 5,
    slug: 'innovation-outils-digitaux',
    title: 'Innovation et Outils Digitaux Propriétaires',
    summary: 'e-audit, e-learning et digitalisation des Systèmes de Management de l\'Énergie.',
    description: 'Développement et déploiement d\'outils numériques exclusifs pour digitaliser les audits énergétiques sur le terrain, administrer les plateformes de formation en ligne et automatiser la conformité ISO 50001 en temps réel.',
    icon: 'Smartphone',
    highlights: ['Plateforme e-audit pour relevés terrain connectés', 'Digitalisation des Systèmes de Management de l\'Énergie (ISO 50001)', 'Plateforme e-learning certifiante', 'Dashboards de télémesure et suivi énergétique']
  },
  {
    id: 6,
    slug: 'formation-renforcement-capacites',
    title: 'Formation & Renforcement des Capacités',
    summary: 'Programmes sur-mesure et transfert de compétences certifiant.',
    description: 'Programmes certifiants de renforcement des capacités pour cadres techniques, industriels et équipes bancaires : thermique industrielle, audits ISO 50001 et analyse de projets d\'énergie durable.',
    icon: 'GraduationCap',
    highlights: ['Formation des équipes industrielles & thermiciens', 'Formation des équipes bancaires aux projets énergie', 'Programmes sur mesure avec bancs de test pratiques', 'Transfert de compétences durable']
  }
];

const serviceAnchors = {
  1: 'energie-durable',
  2: 'production-propre',
  3: 'finance-climat',
  4: 'strategies-politiques-publiques',
  5: 'innovation-outils-digitaux',
  6: 'formation-innovation'
};

export default function Services() {
  const [services, setServices] = useState(defaultServices);

  useEffect(() => {
    fetch('http://localhost:5000/api/services')
      .then(res => res.json())
      .then(json => {
        if (json.data && json.data.length >= 6) {
          setServices(json.data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="services-page">
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="services-hero">
        <div className="services-hero-overlay" />
        <div className="services-hero-content container">
          <span className="services-hero-label">NOS EXPERTISES</span>
          <h1 className="services-hero-title">
            Pôles d'Expertise <span className="services-hero-accent">& Prestations</span>
          </h1>
          <p className="services-hero-sub">
            Une chaîne complète de compétences en ingénierie, conseil stratégique, finance climat et solutions digitales pour concrétiser vos objectifs durables.
          </p>
        </div>
      </section>

      {/* ── LISTE DES PRESTATIONS ────────────────────────────── */}
      <div className="section" style={{ paddingTop: '30px' }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {services.map((service) => {
            const anchorId = serviceAnchors[service.id] || service.slug;
            return (
              <div 
                key={service.id || service.slug} 
                id={anchorId}
                className="card" 
                style={{ padding: '36px', scrollMarginTop: '100px' }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
                    <h2 style={{ fontSize: '1.6rem', color: 'var(--theme-text)', margin: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ color: 'var(--color-orange)', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.35rem' }}>
                        {String(service.id).padStart(2, '0')}.
                      </span>
                      <span>{service.title}</span>
                    </h2>
                    <span className="badge" style={{ fontSize: '11px', padding: '4px 10px' }}>
                      Expertise SEnergyS
                    </span>
                  </div>

                  <p style={{ fontSize: '1.05rem', fontWeight: '600', color: 'var(--color-orange)', marginBottom: '14px' }}>
                    {service.summary}
                  </p>

                  <p style={{ color: 'var(--theme-text-muted)', lineHeight: '1.7', marginBottom: '20px' }}>
                    {service.description}
                  </p>

                  {service.highlights && service.highlights.length > 0 && (
                    <div style={{
                      marginTop: '24px',
                      background: 'var(--theme-surface-alt)',
                      padding: '24px',
                      borderRadius: '16px',
                      border: '1px solid var(--theme-border)'
                    }}>
                      <div style={{
                        fontSize: '11px',
                        fontWeight: 800,
                        letterSpacing: '1.5px',
                        color: 'var(--color-orange)',
                        textTransform: 'uppercase',
                        marginBottom: '16px'
                      }}>
                        Domaines d'action & livrables clés
                      </div>

                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                        gap: '12px'
                      }}>
                        {service.highlights.map((h, i) => (
                          <div
                            key={i}
                            className="service-highlight-chip"
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              padding: '14px 18px',
                              background: 'var(--theme-surface)',
                              border: '1px solid var(--theme-border)',
                              borderLeft: '4px solid var(--color-orange)',
                              borderRadius: '10px',
                              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                              transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease'
                            }}
                          >
                            <span style={{
                              fontSize: '14.5px',
                              fontWeight: 600,
                              color: 'var(--theme-text)',
                              lineHeight: 1.45,
                              letterSpacing: '-0.01em'
                            }}>
                              {h}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bannière d'Engagement de Performance */}
        <div className="card" style={{ marginTop: '60px', padding: '40px', background: 'linear-gradient(135deg, rgba(232, 113, 43, 0.1) 0%, rgba(63, 122, 90, 0.1) 100%)', borderColor: 'var(--color-orange)', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--theme-text)', marginBottom: '12px' }}>
            Un engagement contractuel ferme sur les résultats
          </h2>
          <p style={{ color: 'var(--theme-text-muted)', maxWidth: '680px', margin: '0 auto 24px', lineHeight: 1.6 }}>
            Chez SEnergyS Africa, nos préconisations techniques s'accompagnent d'indicateurs de performance mesurables (MWh économisés, réduction de facture, tonnes de CO₂ évitées).
          </p>
          <Link to="/contact" className="btn btn-primary" style={{ padding: '14px 28px' }}>
            Planifier un échange avec un expert technique
          </Link>
        </div>
      </div>
    </div>
  </div>
  );
}
