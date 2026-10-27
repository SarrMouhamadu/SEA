import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Factory, Landmark, Fuel, Building, ArrowRight } from 'lucide-react';

const sectorIcons = {
  Factory: Factory,
  Landmark: Landmark,
  Fuel: Fuel,
  Building: Building
};

export default function Sectors() {
  const [sectors, setSectors] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/sectors')
      .then(res => res.json())
      .then(json => setSectors(json.data || []))
      .catch(() => {});
  }, []);

  return (
    <div className="sectors-page section">
      <div className="container">
        <div className="section-title-wrapper">
          <span className="badge">Champs d'Application</span>
          <h1 className="section-title">Secteurs d'Intervention</h1>
          <p className="section-subtitle">
            Des réponses adaptées aux contraintes opérationnelles et réglementaires de chaque filière économique.
          </p>
        </div>

        <div className="grid-2">
          {sectors.map((sector) => {
            const Icon = sectorIcons[sector.icon] || Factory;
            return (
              <div key={sector.id || sector.slug} className="card">
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '20px' }}>
                  <div style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '12px',
                    background: 'var(--color-accent-subtle)',
                    color: 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={28} />
                  </div>
                  <h3 style={{ fontSize: '1.4rem' }}>{sector.title}</h3>
                </div>
                <p style={{ color: 'var(--color-muted)', lineHeight: '1.7', marginBottom: '24px' }}>
                  {sector.description}
                </p>
                <Link to="/contact" className="btn btn-secondary" style={{ width: '100%' }}>
                  Nous consulter pour ce secteur <ArrowRight size={14} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
