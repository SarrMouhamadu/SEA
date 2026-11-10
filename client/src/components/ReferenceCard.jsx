import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Calendar, Clock, ChevronDown, ChevronUp, MapPin } from 'lucide-react';

export default function ReferenceCard({ item }) {
  const [showDetails, setShowDetails] = useState(false);

  const countryLabel = item.country || '';

  const hasDuration = item.duration && item.duration !== "Mission d'ingénierie";

  return (
    <div className="card reference-card card-interactive">
      
      {/* A. En-tête : Logo, Nom Client, Catégorie & Pays */}
      <div className="ref-card-header">
        <div className="ref-client-group">
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
          <div className="ref-client-meta">
            <div className="ref-client-name" title={item.clientBadge || item.client}>
              {item.clientBadge || item.client}
            </div>
            <div className="ref-client-cat" title={item.sectorLabel}>
              {item.sectorLabel}
            </div>
          </div>
        </div>

        <div className="ref-country-badge">
          <MapPin size={12} style={{ flexShrink: 0 }} />
          <span>{item.country || 'Sénégal'}</span>
        </div>
      </div>

      {/* B. Titre du projet */}
      <h3 className="ref-card-title" title={item.title}>
        {item.title}
      </h3>

      {/* C. Informations contractuelles (Période, Durée) */}
      {(item.period || hasDuration) && (
        <div className="ref-contract-block">
          <div className="ref-contract-submeta" style={{ marginTop: 0, paddingTop: 0, borderTop: 'none' }}>
            {item.period && (
              <span className="ref-meta-item">
                <Calendar size={13} />
                <span>{item.period}</span>
              </span>
            )}
            {hasDuration && (
              <span className="ref-meta-item">
                <Clock size={13} />
                <span>{item.duration}</span>
              </span>
            )}
          </div>
        </div>
      )}

      {/* D. Principale réalisation */}
      {item.keyImpact && (
        <div className="ref-realisation-block">
          <span className="ref-realisation-label">Principale réalisation</span>
          <p className="ref-realisation-text">{item.keyImpact}</p>
        </div>
      )}

      {/* E. Détails de la mission (Dépliable) */}
      {item.objectives && item.objectives.length > 0 && (
        <div>
          <button
            type="button"
            onClick={() => setShowDetails(!showDetails)}
            className="ref-details-toggle"
            aria-expanded={showDetails}
          >
            <span>
              {showDetails ? 'Masquer les détails' : `Détails de la mission (${item.objectives.length})`}
            </span>
            {showDetails ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          </button>

          {showDetails && (
            <ul className="ref-details-list">
              {item.objectives.map((obj, i) => (
                <li key={i} className="ref-details-item">
                  <Check size={13} style={{ color: 'var(--color-orange)', flexShrink: 0, marginTop: '2px' }} />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* F. Action */}
      <div className="ref-action-box">
        <Link
          to="/contact"
          className="btn btn-secondary btn-sm"
          style={{ width: '100%', justifyContent: 'center' }}
        >
          Consulter un projet similaire <ArrowRight size={14} />
        </Link>
      </div>

    </div>
  );
}
