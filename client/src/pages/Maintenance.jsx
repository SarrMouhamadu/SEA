import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Wrench, 
  Mail, 
  Phone, 
  MapPin, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  Zap, 
  ArrowLeft,
  Calendar
} from 'lucide-react';

export default function Maintenance({ isGlobal = false }) {
  return (
    <div className="maintenance-wrapper">
      <div className="maintenance-container">
        
        {/* En-tête / Logo */}
        <div className="maintenance-header">
          <div className="maintenance-logo-box">
            <img 
              src="/assets/logo/logo-officiel.png" 
              alt="SEnergyS Africa" 
              className="maintenance-logo"
            />
          </div>

          <div className="maintenance-status-badge">
            <span className="maintenance-pulse-dot"></span>
            <Sparkles size={14} className="maintenance-badge-icon" />
            <span>Mise à jour & maintenance en cours</span>
          </div>
        </div>

        {/* Titre & Message principal */}
        <div className="maintenance-hero">
          <h1 className="maintenance-title">
            Nous perfectionnons nos services digitaux
          </h1>
          <p className="maintenance-description">
            SEnergyS Africa procède actuellement à une mise à niveau programmée de sa plateforme 
            d'ingénierie durable et de ses outils digitaux (e-audit, systèmes de management de l'énergie et portail partenaires).
          </p>
        </div>

        {/* Indicateur de reprise */}
        <div className="maintenance-alert-card">
          <div className="maintenance-alert-icon">
            <Clock size={24} />
          </div>
          <div className="maintenance-alert-text">
            <h4>Disponibilité de la plateforme</h4>
            <p>
              Nos équipes techniques finalisent les optimisations. Le site complet sera de nouveau pleinement 
              accessible sous peu.
            </p>
          </div>
        </div>

        {/* Piliers d'intervention */}
        <div className="maintenance-pillars-grid">
          <div className="maintenance-pillar-card">
            <div className="maintenance-pillar-icon" style={{ color: 'var(--color-orange)' }}>
              <Zap size={20} />
            </div>
            <h5>Ingénierie & EnR</h5>
            <p>Audits, décarbonation industrielle et efficacité énergétique.</p>
          </div>

          <div className="maintenance-pillar-card">
            <div className="maintenance-pillar-icon" style={{ color: 'var(--color-green-mid)' }}>
              <ShieldCheck size={20} />
            </div>
            <h5>Finance Climat</h5>
            <p>Structuration de lignes vertes, MRV et taxonomies durables.</p>
          </div>

          <div className="maintenance-pillar-card">
            <div className="maintenance-pillar-icon" style={{ color: 'var(--color-gold)' }}>
              <Wrench size={20} />
            </div>
            <h5>Outils & e-Audit</h5>
            <p>Digitalisation ISO 50001 et monitoring télémesuré.</p>
          </div>
        </div>

        {/* Bloc Contact & Urgence */}
        <div className="maintenance-contact-section">
          <h3 className="maintenance-contact-heading">
            Besoin d'échanger ou urgence projet ?
          </h3>
          <p className="maintenance-contact-subtext">
            Pendant cette intervention technique, notre équipe d'experts reste disponible par téléphone et par courriel :
          </p>

          <div className="maintenance-contact-cards">
            <a href="mailto:contact@senergysafrica.com?subject=Demande%20urgente%20-%20SEnergyS%20Africa" className="maintenance-contact-card">
              <div className="maintenance-icon-bubble">
                <Mail size={18} />
              </div>
              <div className="maintenance-card-info">
                <span className="maintenance-card-label">Courriel direct</span>
                <span className="maintenance-card-value">contact@senergysafrica.com</span>
              </div>
            </a>

            <a href="tel:+221772173364" className="maintenance-contact-card">
              <div className="maintenance-icon-bubble">
                <Phone size={18} />
              </div>
              <div className="maintenance-card-info">
                <span className="maintenance-card-label">Ligne directe</span>
                <span className="maintenance-card-value">+221 77 217 33 64</span>
              </div>
            </a>

            <div className="maintenance-contact-card">
              <div className="maintenance-icon-bubble">
                <MapPin size={18} />
              </div>
              <div className="maintenance-card-info">
                <span className="maintenance-card-label">Siège social</span>
                <span className="maintenance-card-value">P2ID · Bâtiment APROSI, Diamniadio</span>
              </div>
            </div>
          </div>

          <div className="maintenance-action-row">
            <a 
              href="mailto:contact@senergysafrica.com?subject=Demande%20d%27accompagnement%20ou%20d%27%C3%A9tude%20-%20SEnergyS%20Africa" 
              className="btn btn-primary btn-lg"
            >
              <Mail size={16} /> Écrire à l'équipe SEnergyS Africa
            </a>

            {!isGlobal && (
              <Link to="/" className="btn btn-secondary btn-lg">
                <ArrowLeft size={16} /> Revenir à l'accueil du site
              </Link>
            )}
          </div>
        </div>

        {/* Pied de page simplifié */}
        <div className="maintenance-footer">
          <p>© {new Date().getFullYear()} SEnergyS Africa (SESA) — Tous droits réservés.</p>
          <p className="maintenance-footer-tagline">Accélérateur de performances durables & ingénierie énergétique en Afrique.</p>
        </div>

      </div>
    </div>
  );
}
