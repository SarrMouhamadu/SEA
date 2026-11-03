import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Calendar, Clock, Award, ChevronDown, ChevronUp, Trophy } from 'lucide-react';

export default function ReferenceCard({ item }) {
  const [showDetails, setShowDetails] = useState(false);

  const countryFlag = item.country?.toLowerCase().includes('bénin') || item.country?.toLowerCase().includes('benin')
    ? '🇧🇯'
    : '🇸🇳';

  // Badge de classement visuel par montant
  const renderRankBadge = () => {
    if (!item.rank) return null;
    if (item.rank === 1) {
      return (
        <span className="ref-rank-badge rank-gold" title="1ère plus grande mission par valeur contractuelle">
          <Trophy size={13} /> N°1
        </span>
      );
    }
    if (item.rank === 2) {
      return (
        <span className="ref-rank-badge rank-silver" title="2ème plus grande mission">
          <Award size={13} /> N°2
        </span>
      );
    }
    if (item.rank === 3) {
      return (
        <span className="ref-rank-badge rank-bronze" title="3ème plus grande mission">
          <Award size={13} /> N°3
        </span>
      );
    }
    return (
      <span className="ref-rank-badge rank-default" title={`Classé N°${item.rank} par montant`}>
        #{item.rank}
      </span>
    );
  };

  return (
    <div className="card reference-card card-interactive" style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
      
      {/* 1. En-tête : Logo Partenaire / Client & Classement par Montant */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        
        {/* Boîte Logo Partenaire Officiel */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
            <span className="badge" style={{ fontSize: '11px', padding: '3px 8px', background: 'rgba(232, 113, 43, 0.1)', color: 'var(--color-orange)', fontWeight: 700, display: 'inline-block' }}>
              {item.clientBadge || item.client}
            </span>
            <div style={{ fontSize: '11px', color: 'var(--theme-text-muted)', marginTop: '2px' }}>
              {item.sectorLabel}
            </div>
          </div>
        </div>

        {/* Classement & Pays */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
          {renderRankBadge()}
          <span style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--theme-text-muted)', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
            <span>{countryFlag}</span> {item.country || 'Sénégal'}
          </span>
        </div>
      </div>

      {/* 2. Titre officiel du projet */}
      <h3 style={{ fontSize: '1.22rem', color: 'var(--theme-text)', marginBottom: '12px', lineHeight: 1.35, fontWeight: 700, flex: 'none' }}>
        {item.title}
      </h3>

      {/* 3. Bandeau Valeur Contractuelle (Montant mis en valeur) */}
      <div className="ref-amount-banner">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--theme-text-muted)', fontWeight: 600 }}>
            Valeur du Contrat :
          </span>
          <span className="ref-amount-value">
            {item.contractValue}
          </span>
        </div>
      </div>

      {/* 4. Métadonnées Calendrier & Durée */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '12px',
        padding: '8px 12px',
        background: 'var(--theme-surface-alt)',
        borderRadius: '8px',
        border: '1px solid var(--theme-border)',
        marginBottom: '14px',
        fontSize: '12px',
        color: 'var(--theme-text-muted)'
      }}>
        {item.period && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <Calendar size={13} color="var(--color-orange)" />
            <span>{item.period}</span>
          </div>
        )}
        {item.duration && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <Clock size={13} color="var(--color-orange)" />
            <span>{item.duration}</span>
          </div>
        )}
      </div>

      {/* 5. Impact & Livrable clé */}
      {item.keyImpact && (
        <div style={{
          background: 'rgba(63, 122, 90, 0.08)',
          borderLeft: '3px solid var(--color-green-mid)',
          padding: '10px 14px',
          borderRadius: '0 8px 8px 0',
          marginBottom: '14px',
          fontSize: '12.5px',
          color: 'var(--theme-text)'
        }}>
          <strong style={{ color: 'var(--color-green-mid)', display: 'block', fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>
            Livrable & Impact majeur :
          </strong>
          {item.keyImpact}
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
              color: 'var(--color-orange)',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 0'
            }}
          >
            {showDetails ? (
              <>Masquer les livrables <ChevronUp size={13} /></>
            ) : (
              <>Voir les activités & livrables ({item.objectives.length}) <ChevronDown size={13} /></>
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
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', color: 'var(--theme-text)', lineHeight: 1.45 }}>
                  <Check size={13} color="var(--color-orange)" style={{ flexShrink: 0, marginTop: '2px' }} />
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
