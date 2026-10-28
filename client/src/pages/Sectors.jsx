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
    slug: 'industrie',
    title: 'Industrie & Agroalimentaire',
    description: 'Cimenteries, brasseries, huileries, minoteries et industries lourdes : audit de chaufferies, optimisation des brûleurs haute puissance, récupération de chaleur fatale et réduction des coûts de combustible.',
    icon: 'Factory',
    examples: ['Cimenteries & Mines', 'Transformation agroalimentaire', 'Industries chimiques & plastiques']
  },
  {
    id: 2,
    slug: 'batiments-services',
    title: 'Bâtiments & Services',
    description: 'Complexes hôteliers, sièges sociaux, centres hospitaliers et campus : audits thermiques, monitoring GTB, efficacité des systèmes de climatisation et intégration photovoltaïque en toiture.',
    icon: 'Building',
    examples: ['Hôtellerie & Resorts', 'Hôpitaux et cliniques', 'Immeubles de bureaux & Centres commerciaux']
  },
  {
    id: 3,
    slug: 'petrole-gaz-mines',
    title: 'Pétrole, Gaz et Mines',
    description: 'Installations offshore/onshore, dépôts pétroliers et sites miniers isolés : réduction du torchage, efficacité des groupes thermiques autonomes, valorisation des gaz associés et sécurité ATEX.',
    icon: 'Fuel',
    examples: ['Sites d\'extraction & Mines isolées', 'Raffinage & Dépôts de stockage', 'Centrales thermiques de site']
  },
  {
    id: 4,
    slug: 'institutions-financieres',
    title: 'Institutions Financières',
    description: 'Banques commerciales, fonds d\'impact et compagnies d\'assurance : évaluation des risques climatiques et ESG de portefeuilles, structuration de lignes vertes et conformité aux standards IFC.',
    icon: 'Landmark',
    examples: ['Banques de développement', 'Fonds d\'investissement d\'impact', 'Compagnies d\'assurance et de réassurance']
  },
  {
    id: 5,
    slug: 'secteur-public',
    title: 'Secteur Public & Organisations Internationales',
    description: 'Ministères de l\'Énergie, agences nationales d\'électrification, bailleurs multilatéraux (BAD, Banque Mondiale, Union Européenne) : élaboration de politiques d\'efficacité énergétique et éco-parcs.',
    icon: 'Globe2',
    examples: ['Ministères & Régulateurs de l\'énergie', 'Agences nationales pour l\'efficacité énergétique', 'Bailleurs et agences de coopération (GIZ, AFD, UE)']
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
                      Pôle Sectoriel
                    </span>
                  </div>
                </div>

                <p style={{ color: 'var(--theme-text-muted)', lineHeight: '1.7', marginBottom: '20px', flex: 1 }}>
                  {sector.description}
                </p>

                {sector.examples && sector.examples.length > 0 && (
                  <div style={{
                    background: 'var(--theme-surface-alt)',
                    padding: '14px 16px',
                    borderRadius: '10px',
                    marginBottom: '24px',
                    border: '1px solid var(--theme-border)'
                  }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--theme-text)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Segments clés :
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {sector.examples.map((ex, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--theme-text-muted)' }}>
                          <Check size={14} color="var(--color-orange)" />
                          <span>{ex}</span>
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
