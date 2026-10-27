import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <div className="footer-grid">
          {/* Colonne 1 : Présentation */}
          <div className="footer-col">
            <img
              src="/assets/logo/logo-sesa.png"
              alt="SEnergys Africa"
              className="footer-logo"
              style={{ filter: 'brightness(0) invert(1)', height: '48px', marginBottom: '16px' }}
            />
            <p className="footer-text">
              Accélérateur de performances durables en Afrique. Expertise en ingénierie énergétique,
              combustion industrielle propre, finance climatique et certification ESG.
            </p>
            <div className="footer-badge">
              <ShieldCheck size={16} /> Solution conforme aux normes ISO 50001
            </div>
          </div>

          {/* Colonne 2 : Liens Rapides */}
          <div className="footer-col">
            <h4 className="footer-title">Navigation</h4>
            <ul className="footer-links">
              <li><Link to="/"><ArrowRight size={14} /> Accueil</Link></li>
              <li><Link to="/a-propos"><ArrowRight size={14} /> À Propos de nous</Link></li>
              <li><Link to="/services"><ArrowRight size={14} /> Nos Pôles d'Expertise</Link></li>
              <li><Link to="/secteurs"><ArrowRight size={14} /> Secteurs d'activités</Link></li>
              <li><Link to="/produits"><ArrowRight size={14} /> Brûleurs Industriels</Link></li>
              <li><Link to="/contact"><ArrowRight size={14} /> Contact & Devis</Link></li>
            </ul>
          </div>

          {/* Colonne 3 : Pôles d'intervention */}
          <div className="footer-col">
            <h4 className="footer-title">Expertises</h4>
            <ul className="footer-links">
              <li><Link to="/services#energie">Énergie Durable & Efficacité</Link></li>
              <li><Link to="/services#finance">Finance Climat & ESG</Link></li>
              <li><Link to="/services#combustion">Brûleurs Gaz / Fioul / Mixtes</Link></li>
              <li><Link to="/services#formation">Formations Industrie 4.0</Link></li>
              <li><Link to="/services#facility">Facility Management</Link></li>
            </ul>
          </div>

          {/* Colonne 4 : Coordonnées */}
          <div className="footer-col">
            <h4 className="footer-title">Contact</h4>
            <div className="footer-contact-item">
              <MapPin size={18} className="footer-icon" />
              <span>Dakar, Sénégal</span>
            </div>
            <div className="footer-contact-item">
              <Phone size={18} className="footer-icon" />
              <span>+221 77 217 33 64</span>
            </div>
            <div className="footer-contact-item">
              <Mail size={18} className="footer-icon" />
              <span>contact@senergysafrica.com</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} SEnergys Africa. Tous droits réservés.</p>
          <p className="footer-subtext">Ingénierie & Transition Énergétique en Afrique</p>
        </div>
      </div>
    </footer>
  );
}
