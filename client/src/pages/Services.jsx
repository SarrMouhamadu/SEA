import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, TrendingUp, Flame, GraduationCap, Building2, Check, ArrowRight, Briefcase, Smartphone } from 'lucide-react';

const icons = {
  Zap: Zap,
  TrendingUp: TrendingUp,
  Flame: Flame,
  GraduationCap: GraduationCap,
  Building2: Building2,
  Briefcase: Briefcase,
  Smartphone: Smartphone
};

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
    description: 'Accompagnement des industries et grandes entreprises dans leurs plans de décarbonation, la modernisation des brûleurs industriels haute performance, la mise en conformité environnementale et la réduction continue des émissions.',
    icon: 'Flame',
    highlights: ['Plans de décarbonation industrielle & feuilles de route Net-Zero', 'Brûleurs industriels haute efficacité (gaz, fioul, mixte)', 'RSE et mise à niveau environnementale', 'Accompagnement éco-parcs industriels']
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
    description: 'Programmes certifiants de renforcement des capacités pour cadres techniques, industriels et équipes bancaires : thermique industrielle, réglage de combustion, audits ISO 50001 et analyse de projets d\'énergie durable.',
    icon: 'GraduationCap',
    highlights: ['Formation des équipes industrielles & thermiciens', 'Formation des équipes bancaires aux projets énergie', 'Programmes sur mesure avec bancs de test pratiques', 'Transfert de compétences durable']
  }
];

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
    <div className="services-page section">
      <div className="container">
        <div className="section-title-wrapper">
          <span className="badge">Nos 6 Domaines d'Expertise Interne</span>
          <h1 className="section-title">Pôles d'Expertise & Prestations</h1>
          <p className="section-subtitle">
            Une chaîne complète de compétences en ingénierie, conseil stratégique, finance climat et solutions digitales pour concrétiser vos objectifs durables.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {services.map((service) => {
            const IconComp = icons[service.icon] || Zap;
            return (
              <div key={service.id || service.slug} className="card" style={{ padding: '36px' }}>
                <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '16px',
                    background: 'rgba(232, 113, 43, 0.12)',
                    color: 'var(--color-orange)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <IconComp size={32} />
                  </div>

                  <div style={{ flex: '1', minWidth: '280px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
                      <h2 style={{ fontSize: '1.6rem', color: 'var(--theme-text)', margin: 0 }}>
                        {service.title}
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
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                        gap: '10px',
                        marginBottom: '24px',
                        background: 'var(--theme-surface-alt)',
                        padding: '16px 20px',
                        borderRadius: '12px',
                        border: '1px solid var(--theme-border)'
                      }}>
                        {service.highlights.map((h, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: 'var(--theme-text)' }}>
                            <Check size={16} color="var(--color-orange)" style={{ flexShrink: 0 }} />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      <Link to="/contact" className="btn btn-primary btn-sm">
                        Demander un accompagnement <ArrowRight size={14} />
                      </Link>
                      {(service.slug.includes('developpement-durable') || service.slug.includes('production-propre')) && (
                        <Link to="/produits" className="btn btn-secondary btn-sm">
                          Voir nos brûleurs industriels <ArrowRight size={14} />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
