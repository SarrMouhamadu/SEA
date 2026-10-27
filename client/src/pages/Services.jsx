import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, TrendingUp, Flame, GraduationCap, Building2, Check, ArrowRight } from 'lucide-react';

const icons = {
  Zap: Zap,
  TrendingUp: TrendingUp,
  Flame: Flame,
  GraduationCap: GraduationCap,
  Building2: Building2
};

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/services')
      .then(res => res.json())
      .then(json => setServices(json.data || []))
      .catch(() => {});
  }, []);

  return (
    <div className="services-page section">
      <div className="container">
        <div className="section-title-wrapper">
          <span className="badge">Nos Offres d'Accompagnement</span>
          <h1 className="section-title">Pôles d'Expertise & Prestations</h1>
          <p className="section-subtitle">
            Une gamme complète de solutions techniques, financières et de formation pour booster votre compétitivité durable.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {services.map((service, index) => {
            const IconComp = icons[service.icon] || Zap;
            return (
              <div key={service.id || service.slug} className="card" style={{ padding: '40px' }}>
                <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '14px',
                    background: 'var(--color-accent-subtle)',
                    color: 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <IconComp size={32} />
                  </div>

                  <div style={{ flex: '1', minWidth: '280px' }}>
                    <h2 style={{ fontSize: '1.6rem', marginBottom: '12px' }}>{service.title}</h2>
                    <p style={{ fontSize: '1.1rem', fontWeight: '500', color: 'var(--color-primary-dark)', marginBottom: '16px' }}>
                      {service.summary}
                    </p>
                    <p style={{ color: 'var(--color-muted)', lineHeight: '1.7', marginBottom: '20px' }}>
                      {service.description}
                    </p>

                    <Link to="/contact" className="btn btn-secondary">
                      Demander une proposition pour ce service <ArrowRight size={16} />
                    </Link>
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
