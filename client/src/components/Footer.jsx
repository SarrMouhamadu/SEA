import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Linkedin, Twitter, Globe, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main-grid">
          {/* Colonne 1 : Brand & Mission */}
          <div className="footer-brand-col">
            <div style={{ marginBottom: '16px' }}>
              <img
                src="/assets/logo/logo-officiel.png"
                alt="SEnergyS Africa"
                className="footer-logo-img"
              />
            </div>
            <p className="footer-desc">
              Accélérateur de performances durables en Afrique de l'Ouest. Expertise en ingénierie thermique,
              efficacité énergétique des procédés, finance climat/ESG et formation.
            </p>
            <div className="footer-social-links">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="social-btn"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="social-btn"
                aria-label="Twitter / X"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://senergysafrica.com"
                target="_blank"
                rel="noreferrer"
                className="social-btn"
                aria-label="Site Web"
              >
                <Globe size={18} />
              </a>
            </div>
          </div>

          {/* Colonne 2 : Liens Institutionnels & Pages Indépendantes */}
          <div className="footer-links-col">
            <h4 className="footer-heading">Navigation</h4>
            <ul className="footer-list">
              <li><Link to="/a-propos">À propos</Link></li>
              <li><Link to="/services">Expertises</Link></li>
              <li><Link to="/secteurs">Secteurs</Link></li>
              <li><Link to="/references">Références</Link></li>
              <li><Link to="/ressources">Ressources</Link></li>
            </ul>
          </div>

          {/* Colonne 3 : Carrières & Légal */}
          <div className="footer-links-col">
            <h4 className="footer-heading">Entreprise</h4>
            <ul className="footer-list">
              <li>
                <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  Carrières & Recrutement <ArrowUpRight size={13} />
                </Link>
              </li>
              <li><Link to="/contact">Partenariats institutionnels</Link></li>
              <li><Link to="/contact">Mentions légales & Confidentialité</Link></li>
              <li><Link to="/contact">Rapport d'impact ESG</Link></li>
            </ul>
          </div>

          {/* Colonne 4 : Coordonnées directes */}
          <div className="footer-contact-col">
            <h4 className="footer-heading">Coordonnées</h4>
            <div className="footer-contact-row">
              <MapPin size={18} className="footer-icon-accent" style={{ flexShrink: 0 }} />
              <span>P2ID · Bâtiment APROSI, 3ème étage · Diamniadio, Sénégal</span>
            </div>
            <div className="footer-contact-row">
              <Phone size={18} className="footer-icon-accent" style={{ flexShrink: 0 }} />
              <div>
                <a href="tel:+221772173364" style={{ display: 'block' }}>+221 77 217 33 64</a>
                <a href="tel:+221339455647" style={{ display: 'block', fontSize: '13px', opacity: 0.85, marginTop: '2px' }}>Fixe : +221 33 945 56 47</a>
              </div>
            </div>
            <div className="footer-contact-row">
              <Mail size={18} className="footer-icon-accent" style={{ flexShrink: 0 }} />
              <div>
                <a href="mailto:contact@senergysafrica.com" style={{ display: 'block' }}>contact@senergysafrica.com</a>
                <a href="mailto:support_tech@senergysafrica.com" style={{ display: 'block', fontSize: '13px', opacity: 0.85, marginTop: '2px' }}>support_tech@senergysafrica.com</a>
              </div>
            </div>
          </div>
        </div>

        {/* Barre inférieure */}
        <div className="footer-bottom-bar">
          <p>© {new Date().getFullYear()} SEnergyS Africa. Tous droits réservés.</p>
          <p>Ingénierie, Transition Énergétique & Finance Climat</p>
        </div>
      </div>
    </footer>
  );
}
