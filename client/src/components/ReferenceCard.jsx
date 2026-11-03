import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Calendar, Clock, DollarSign, Award, ChevronDown, ChevronUp, MapPin, Building2 } from 'lucide-react';

export default function ReferenceCard({ item }) {
  const [showDetails, setShowDetails] = useState(false);

  const countryFlag = item.country?.toLowerCase().includes('bénin') || item.country?.toLowerCase().includes('benin')
    ? '🇧🇯'
    : '🇸🇳';

  return (
    <div className="card reference-card card-interactive" style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
      
      {/* En-tête : Client, Secteur & Pays */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
          <span className="badge" style={{ fontSize: '11.5px', padding: '4px 10px', background: 'rgba(232, 113, 43, 0.12)', color: 'var(--color-orange)', fontWeight: 700 }}>
            {item.clientBadge || item.client}
          </span>
          <span className="badge" style={{ fontSize: '11px', padding: '4px 8px', background: 'var(--theme-surface-alt)', color: 'var(--theme-text-muted)' }}>
            {item.sectorLabel}
          </span>
        </div>
        <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--theme-text-muted)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <span>{countryFlag}</span> {item.country || 'Sénégal'}
        </span>
      </div>

      {/* Titre du projet officiel */}
      <h3 style={{ fontSize: '1.25rem', color: 'var(--theme-text)', marginBottom: '12px', lineHeight: 1.35, fontWeight: 700 }}>
        {item.title}
      </h3>

      {/* Barre Métadonnées : Période, Durée & Montant Contractuel */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '12px',
        padding: '10px 14px',
        background: 'var(--theme-surface-alt)',
        borderRadius: '8px',
        border: '1px solid var(--theme-border)',
        marginBottom: '16px',
        fontSize: '12.5px',
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
        {item.contractValue && (
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            color: 'var(--color-gold)',
            fontWeight: 700,
            marginLeft: 'auto'
          }}>
            <span>💰 {item.contractValue}</span>
          </div>
        )}
      </div>

      {/* Client complet si différent du badge */}
      {item.client && item.client !== item.clientBadge && (
        <div style={{ fontSize: '12.5px', color: 'var(--theme-text-muted)', marginBottom: '12px' }}>
          <strong>Commanditaire :</strong> {item.client}
        </div>
      )}

      {/* Impact / Résultat clé */}
      {item.keyImpact && (
        <div style={{
          background: 'rgba(63, 122, 90, 0.08)',
          borderLeft: '3px solid var(--color-green-mid)',
          padding: '10px 14px',
          borderRadius: '0 8px 8px 0',
          marginBottom: '16px',
          fontSize: '13px',
          color: 'var(--theme-text)'
        }}>
          <strong style={{ color: 'var(--color-green-mid)', display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>
            Impact & Livrable Clé :
          </strong>
          {item.keyImpact}
        </div>
      )}

      {/* Déroulé des Objectifs / Activités principales */}
      {item.objectives && item.objectives.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <button
            type="button"
            onClick={() => setShowDetails(!showDetails)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-orange)',
              fontSize: '12.5px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 0'
            }}
          >
            {showDetails ? (
              <>Masquer les livrables <ChevronUp size={14} /></>
            ) : (
              <>Voir les activités & livrables ({item.objectives.length}) <ChevronDown size={14} /></>
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
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12.5px', color: 'var(--theme-text)', lineHeight: 1.45 }}>
                  <Check size={14} color="var(--color-orange)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Bouton contact */}
      <div style={{ marginTop: 'auto', paddingTop: '12px' }}>
        <Link
          to="/contact"
          className="btn btn-secondary btn-sm"
          style={{ width: '100%', justifyContent: 'center' }}
        >
          Consulter sur ce type de projet <ArrowRight size={14} />
        </Link>
      </div>

    </div>
  );
}
