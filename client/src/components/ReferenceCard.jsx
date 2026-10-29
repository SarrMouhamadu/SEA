import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Building2, TrendingDown, Award } from 'lucide-react';

export default function ReferenceCard({ item }) {
  return (
    <div className="card reference-card card-interactive" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px', marginBottom: '14px' }}>
        <span className="badge" style={{ fontSize: '11px', padding: '4px 10px' }}>
          {item.sectorLabel}
        </span>
        <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--theme-text-muted)' }}>
          {item.clientType}
        </span>
      </div>

      <h3 style={{ fontSize: '1.35rem', color: 'var(--theme-text)', marginBottom: '8px', lineHeight: 1.3 }}>
        {item.title}
      </h3>

      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        color: 'var(--color-orange)',
        fontSize: '13px',
        fontWeight: 700,
        marginBottom: '14px'
      }}>
        <Award size={15} />
        <span>{item.expertiseLabel}</span>
      </div>

      <p style={{ color: 'var(--theme-text-muted)', fontSize: '14px', lineHeight: 1.6, marginBottom: '20px', flex: 1 }}>
        {item.description}
      </p>

      {/* Impact / Résultat clé */}
      <div style={{
        background: 'var(--theme-surface-alt)',
        padding: '12px 16px',
        borderRadius: '10px',
        border: '1px solid var(--theme-border)',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <TrendingDown size={20} color="var(--color-orange)" style={{ flexShrink: 0 }} />
        <div>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--theme-text-muted)', fontWeight: 600 }}>
            Résultat mesurable :
          </div>
          <div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--theme-text)' }}>
            {item.keyImpact}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 'auto' }}>
        <Link to="/contact" className="btn btn-secondary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
          En savoir plus sur ce projet <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
