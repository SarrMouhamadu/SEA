import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Factory, Landmark, Fuel, Building, Globe2, ArrowRight, Check } from 'lucide-react';

const sectorIcons = {
  Factory: Factory,
  Landmark: Landmark,
  Fuel: Fuel,
  Building: Building,
  Globe2: Globe2
};

const defaultSectors = [
  {
    id: 1,
    slug: 'institutions-publiques',
    title: 'Institutions Publiques & Gouvernementales',
    subtitle: 'Ministères, agences étatiques, collectivités territoriales & bailleurs',
    description: 'Accompagnement institutionnel de haut niveau pour élaborer les politiques publiques, structurer les programmes nationaux d\'efficacité énergétique et déployer les projets financés par les partenaires internationaux.',
    icon: 'Globe2',
    servicesList: [
      'Élaboration de stratégies énergie-climat et industrie verte',
      'Études sectorielles et diagnostics énergétiques territoriaux',
      'Appui à la mise en œuvre des CDN et des politiques publiques',
      'Planification énergétique et feuilles de route de transition',
      'Structuration de programmes d\'efficacité énergétique',
      'Appui technique aux projets financés par les partenaires (GIZ, AFD, UE, GCF, etc.)',
      'Développement de cadres réglementaires et de normes (MEPS, étiquetage, etc.)'
    ]
  },
  {
    id: 2,
    slug: 'industries-entreprises',
    title: 'Industries & Grandes Entreprises',
    subtitle: 'Agroalimentaire, cimenteries, chimie, mines & PME-PMI',
    description: 'Intervention directe sur les procédés de production et utilités industrielles pour réduire durablement la facture énergétique, fiabiliser les installations et engager une décarbonation mesurable.',
    icon: 'Factory',
    servicesList: [
      'Audits énergétiques industriels détaillés instrumentés',
      'Mise en place de Systèmes de Management de l\'Énergie (ISO 50001)',
      'Études d\'optimisation des utilités (air comprimé, vapeur, froid, récupération de chaleur)',
      'Dimensionnement de solutions ENR (solaire PV, thermique, biomasse)',
      'Plans de décarbonation industrielle et feuilles de route Net-Zero',
      'Études technico-économiques et business cases bancables',
      'Accompagnement à la certification environnementale',
      'Formation opérationnelle et renforcement des capacités'
    ]
  },
  {
    id: 3,
    slug: 'institutions-financieres',
    title: 'Institutions Financières',
    subtitle: 'Banques commerciales, banques de développement & fonds d\'impact',
    description: 'Expertise technique et climatique pour verdir les portefeuilles de crédit, sécuriser les investissements verts et structurer des instruments financiers innovants.',
    icon: 'Landmark',
    servicesList: [
      'Appui à la structuration de lignes de financement vert',
      'Élaboration de taxonomies climat et critères d\'éligibilité',
      'Analyse technique des projets financés',
      'Due diligence énergétique et environnementale (E&S)',
      'Développement d\'outils de screening des projets',
      'MRV (Monitoring Reporting Verification) climat',
      'Formation des équipes bancaires aux projets d\'énergie durable',
      'Développement de produits financiers innovants (ESCO, leasing vert…)'
    ]
  },
  {
    id: 4,
    slug: 'petrole-gaz-mines',
    title: 'Pétrole, Gaz et Mines',
    subtitle: 'Sites d\'extraction, raffineries, dépôts pétroliers & sites isolés',
    description: 'Solutions d\'efficacité énergétique et de sécurisation des sites isolés et installations hydrocarbures.',
    icon: 'Fuel',
    servicesList: [
      'Réduction du torchage et valorisation des gaz associés',
      'Efficacité des groupes thermiques autonomes et utilités de site',
      'Hybridation solaire photovoltaïque des exploitations minières',
      'Audits de sécurité thermique et conformité ATEX'
    ]
  },
  {
    id: 5,
    slug: 'batiments-tertiaire',
    title: 'Bâtiments & Secteur Tertiaire',
    subtitle: 'Sièges sociaux, hôtellerie, cliniques & centres commerciaux',
    description: 'Pilotage énergétique global et optimisation du confort thermique des grands ensembles immobiliers.',
    icon: 'Building',
    servicesList: [
      'Audits thermiques des enveloppes et systèmes CVC (climatisation)',
      'Mise en place de GTB / GTC et smart metering télérelevé',
      'Intégration d\'énergie solaire en toiture et ombrières de parking',
      'Démarches d\'éco-labellisation et de certification bâtiment durable'
    ]
  }
];

export default function Sectors() {
  const [sectors, setSectors] = useState(defaultSectors);

  useEffect(() => {
    fetch('http://localhost:5000/api/sectors')
      .then(res => res.json())
      .then(json => {
        if (json.data && json.data.length >= 5) {
          setSectors(json.data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="sectors-page section">
      <div className="container">
        <div className="section-title-wrapper">
          <span className="badge">Champs d'Application</span>
          <h1 className="section-title">Secteurs d'Intervention</h1>
          <p className="section-subtitle">
            Des réponses sur mesure adaptées aux contraintes opérationnelles, thermiques et réglementaires de chaque filière économique.
          </p>
        </div>

        <div className="grid-2">
          {sectors.map((sector) => {
            const Icon = sectorIcons[sector.icon] || Factory;
            return (
              <div key={sector.id || sector.slug} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '20px' }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '14px',
                    background: 'rgba(232, 113, 43, 0.12)',
                    color: 'var(--color-orange)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Icon size={28} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.4rem', color: 'var(--theme-text)', marginBottom: '4px' }}>
                      {sector.title}
                    </h3>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-orange)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {sector.subtitle || 'Pôle Sectoriel'}
                    </span>
                  </div>
                </div>

                <p style={{ color: 'var(--theme-text-muted)', lineHeight: '1.7', marginBottom: '20px' }}>
                  {sector.description}
                </p>

                {sector.servicesList && sector.servicesList.length > 0 && (
                  <div style={{
                    background: 'var(--theme-surface-alt)',
                    padding: '16px 20px',
                    borderRadius: '12px',
                    marginBottom: '24px',
                    border: '1px solid var(--theme-border)',
                    flex: 1
                  }}>
                    <div style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--color-orange)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Prestations & Expertises dédiées :
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {sector.servicesList.map((srv, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13.5px', color: 'var(--theme-text)', lineHeight: '1.45' }}>
                          <Check size={16} color="var(--color-orange)" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span>{srv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Link to="/contact" className="btn btn-secondary" style={{ width: '100%', marginTop: 'auto' }}>
                  Demander un accompagnement dédié <ArrowRight size={14} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
