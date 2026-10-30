import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, ArrowLeft, Wrench } from 'lucide-react';

export default function Maintenance({ isGlobal = false }) {
  return (
    <div className="maintenance-wrapper">
      <div className="maintenance-simple-card">
        {/* Ligne d'énergie animée */}
        <div className="maintenance-energy-bar"></div>

        {/* Logo */}
        <div className="maintenance-logo-center">
          <img 
            src="/assets/logo/logo-officiel.png" 
            alt="SEnergyS Africa" 
            className="maintenance-logo"
          />
        </div>

        {/* Icône animée */}
        <div className="maintenance-simple-icon">
          <Wrench size={28} className="maintenance-wrench-anim" />
        </div>

        <h1 className="maintenance-simple-title">
          Site en maintenance
        </h1>

        <p className="maintenance-simple-text">
          Notre site web est actuellement en maintenance.
        </p>

        {/* Bloc urgence téléphone */}
        <div className="maintenance-urgency-box">
          <span className="maintenance-urgency-label">
            Pour toute urgence, contactez-nous au :
          </span>
          <a href="tel:+221772173364" className="maintenance-phone-btn">
            <span className="maintenance-phone-icon-wrap">
              <Phone size={19} className="maintenance-phone-anim" />
            </span>
            <span>+221 77 217 33 64</span>
          </a>
        </div>

        {/* Retour au site en mode aperçu */}
        {!isGlobal && (
          <div style={{ marginTop: '22px' }}>
            <Link to="/" className="maintenance-back-link">
              <ArrowLeft size={16} /> Retour à l'accueil
            </Link>
          </div>
        )}

        <div className="maintenance-simple-footer">
          <p>© {new Date().getFullYear()} SEnergyS Africa</p>
        </div>
      </div>
    </div>
  );
}
