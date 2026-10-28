import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, TrendingUp, Flame, GraduationCap, Building2, Check, ArrowRight, ShieldCheck } from 'lucide-react';

const icons = {
  Zap: Zap,
  TrendingUp: TrendingUp,
  Flame: Flame,
  GraduationCap: GraduationCap,
  Building2: Building2
};

const defaultServices = [
  {
    id: 1,
    slug: 'energie-durable',
    title: 'Énergie Durable',
    summary: 'Audits énergétiques ISO 50001, décarbonation industrielle et intégration EnR.',
    description: 'Diagnostics approfondis de vos installations thermiques et électriques, optimisation des réseaux de vapeur et d\'eau surchauffée, et déploiement de centrales solaires photovoltaïques en autoconsommation industrielle.',
    icon: 'Zap',
    highlights: ['Audits réglementaires et ISO 50001', 'Plans de mesurage & GTB / Smart metering', 'Intégration solaire PV & biomasse', 'Contrats de performance énergétique (CPE)']
  },
  {
    id: 2,
    slug: 'production-propre',
    title: 'Production Propre & Systèmes de Combustion',
    summary: 'Modernisation de brûleurs industriels, réduction des rejets et éco-parcs.',
    description: 'Fourniture, montage et maintenance de brûleurs industriels haute performance (gaz naturel, GPL, fioul lourd, bicarburation). Réduction prouvée de la consommation de combustible jusqu\'à 25% et forte diminution des oxydes d\'azote (Low-NOx).',
    icon: 'Flame',
    highlights: ['Brûleurs modulants haute efficacité', 'Régulation O2 / CO et variateurs de vitesse', 'Sécurisation et mise aux normes des chaufferies', 'Accompagnement vers les éco-parcs industriels']
  },
  {
    id: 3,
    slug: 'finance-durable-esg',
    title: 'Finance Climat & Durable (ESG)',
    summary: 'Conseil en finance verte, notations ESG et structuration de projets éligibles.',
    description: 'Accompagnement stratégique des entreprises et des institutions financières : évaluation des risques climatiques physiques et de transition, structuration de green bonds, et conformité aux standards internationaux (IFC, PRI, taxonomie verte).',
    icon: 'TrendingUp',
    highlights: ['Systèmes de gestion environnementale et sociale (ESMS)', 'Audits de conformité E&S et notation ESG', 'Montage de dossiers pour fonds climatiques (GCF, BAD, SFI)', 'Bilan carbone GES Scope 1, 2, 3']
  },
  {
    id: 4,
    slug: 'strategies-politiques-publiques',
    title: 'Stratégies & Politiques Publiques',
    summary: 'Appui aux gouvernements, agences nationales et bailleurs internationaux.',
    description: 'Élaboration de feuilles de route nationales d\'efficacité énergétique, plans directeurs de transition écologique pour zones économiques spéciales (ZES) et assistance technique aux bailleurs de fonds bilatéraux et multilatéraux.',
    icon: 'Building2',
    highlights: ['Études sectorielles de décarbonation', 'Réglementations thermiques des bâtiments', 'Cadres institutionnels pour l\'efficacité énergétique', 'Accompagnement des ZES & parcs industriels durables']
  },
  {
    id: 5,
    slug: 'formation-innovation',
    title: 'Formation & Innovation',
    summary: 'Montée en compétences certifiante des équipes techniques et managériales.',
    description: 'Programmes de formation sur mesure et certifiants : exploitation de chaufferies modernes, réglage de combustion, audits énergétiques, maintenance prédictive 4.0 et pilotage de la transition ESG en entreprise.',
    icon: 'GraduationCap',
    highlights: ['Sessions pratiques en thermique industrielle', 'Formation certifiante ISO 50001 & ESG', 'Transfert de compétences sur bancs d\'essais', 'Partenariats avec universités et écoles polytechniques']
  }
];

export default function Services() {
  const [services, setServices] = useState(defaultServices);

  useEffect(() => {
    fetch('http://localhost:5000/api/services')
      .then(res => res.json())
      .then(json => {
        if (json.data && json.data.length > 0) {
          setServices(json.data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="services-page section">
      <div className="container">
        <div className="section-title-wrapper">
          <span className="badge">Nos 5 Pôles Stratégiques</span>
          <h1 className="section-title">Pôles d'Expertise & Prestations</h1>
          <p className="section-subtitle">
            Une gamme complète de solutions d'ingénierie, de finance durable et de formation pour décupler votre compétitivité.
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
                        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
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
                      {service.slug === 'production-propre' && (
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
