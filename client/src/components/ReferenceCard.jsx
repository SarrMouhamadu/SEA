import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Calendar, Clock, ChevronDown, ChevronUp } from 'lucide-react';

export default function ReferenceCard({ item }) {
  const [showDetails, setShowDetails] = useState(false);

  const countryFlag = item.country?.toLowerCase().includes('bénin') || item.country?.toLowerCase().includes('benin')
    ? '🇧🇯'
    : '🇸🇳';

  return (
    <div className="card reference-card card-interactive" style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
      
      {/* 1. En-tête : Logo Partenaire / Client & Rang */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        
        {/* Boîte Logo Partenaire Officiel */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {item.clientLogo && (
            <div className="ref-card-logo-box">
              <img
                src={item.clientLogo}
                alt={`Logo ${item.clientBadge || item.client}`}
                className="ref-card-logo-img"
                loading="lazy"
              />
            </div>
          )}
          <div>
            <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--theme-text)', lineHeight: 1.25 }}>
              {item.clientBadge || item.client}
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--theme-text-muted)', marginTop: '3px' }}>
              {item.sectorLabel}
            </div>
          </div>
        </div>

        {/* Classement & Pays (Sobres) */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
          {item.rank && (
            <span className={`ref-rank-badge ${item.rank <= 3 ? 'rank-top' : ''}`}>
              N°{item.rank}
            </span>
          )}
          <span style={{ fontSize: '11px', color: 'var(--theme-text-muted)', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
            <span>{countryFlag}</span> {item.country || 'Sénégal'}
          </span>
        </div>
      </div>

      {/* 2. Titre officiel du projet */}
      <h3 style={{ fontSize: '1.2rem', color: 'var(--theme-text)', marginBottom: '14px', lineHeight: 1.35, fontWeight: 700 }}>
        {item.title}
      </h3>

      {/* 3. Ligne Montant Contractuel Sobre */}
      <div className="ref-amount-banner">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '11.5px', color: 'var(--theme-text-muted)', textTransform: 'uppercase', letterSpacing: '0.4px', fontWeight: 500 }}>
            Montant du contrat :
          </span>
          <span className="ref-amount-value">
            {item.contractValue}
          </span>
        </div>
      </div>

      {/* 4. Métadonnées Calendrier & Durée (Teintes neutres) */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '14px',
        fontSize: '12px',
        color: 'var(--theme-text-muted)'
      }}>
        {item.period && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <Calendar size={13} color="var(--theme-text-muted)" />
            <span>{item.period}</span>
          </div>
        )}
        {item.duration && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <Clock size={13} color="var(--theme-text-muted)" />
            <span>{item.duration}</span>
          </div>
        )}
      </div>

      {/* 5. Impact & Livrable clé (Encadré sobre et harmonieux) */}
      {item.keyImpact && (
        <div className="ref-impact-box">
          <span className="ref-impact-label">
            Impact & Livrable majeur :
          </span>
          <div>{item.keyImpact}</div>
        </div>
      )}

      {/* 6. Déroulé des Objectifs / Activités principales */}
      {item.objectives && item.objectives.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <button
            type="button"
            onClick={() => setShowDetails(!showDetails)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--theme-text-muted)',
              fontSize: '12px',
              fontWeight: 500,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '2px 0'
            }}
          >
            {showDetails ? (
              <>Masquer les livrables <ChevronUp size={13} /></>
            ) : (
              <>Détails des livrables ({item.objectives.length}) <ChevronDown size={13} /></>
            )}
          </button>

          {showDetails && (
            <ul style={{
              listStyle: 'none',
              padding: '12px 14px',
              margin: '8px 0 0 0',
              background: 'var(--theme-surface-alt)',
              borderRadius: '8px',
              border: '1px solid var(--theme-border)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              animation: 'fadeIn 0.2s ease'
            }}>
              {item.objectives.map((obj, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', color: 'var(--theme-text-muted)', lineHeight: 1.45 }}>
                  <Check size={13} color="var(--theme-text-muted)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* 7. Bouton contact */}
      <div style={{ marginTop: 'auto', paddingTop: '10px' }}>
        <Link
          to="/contact"
          className="btn btn-secondary btn-sm"
          style={{ width: '100%', justifyContent: 'center' }}
        >
          Consulter sur un projet similaire <ArrowRight size={14} />
        </Link>
      </div>

    </div>
  );
}
