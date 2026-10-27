import React from 'react';
import { Phone, Mail, MapPin, Linkedin, Twitter, Globe, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main-grid">
          {/* Colonne 1 : Brand & Mission */}
          <div className="footer-brand-col">
            <div className="nav-brand" style={{ fontSize: '26px', marginBottom: '14px' }}>
              SEnergyS <span>Africa</span>
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

          {/* Colonne 2 : Liens Institutionnels & Carrières */}
          <div className="footer-links-col">
            <h4 className="footer-heading">Navigation</h4>
            <ul className="footer-list">
              <li><a href="/#apropos">À propos & Approche</a></li>
              <li><a href="/#competences">Nos 5 Pôles d'Expertise</a></li>
              <li><a href="/#secteurs">Secteurs d'intervention</a></li>
              <li><a href="/#references">Références & Brûleurs</a></li>
              <li><a href="/#actualites">Actualités & Publications</a></li>
            </ul>
          </div>

          {/* Colonne 3 : Carrières & Légal */}
          <div className="footer-links-col">
            <h4 className="footer-heading">Entreprise</h4>
            <ul className="footer-list">
              <li>
                <a href="#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  Carrières & Recrutement <ArrowUpRight size={13} />
                </a>
              </li>
              <li><a href="#contact">Partenariats institutionnels</a></li>
              <li><a href="#contact">Mentions légales & Confidentialité</a></li>
              <li><a href="#contact">Rapport d'impact ESG</a></li>
            </ul>
          </div>

          {/* Colonne 4 : Coordonnées directes */}
          <div className="footer-contact-col">
            <h4 className="footer-heading">Coordonnées</h4>
            <div className="footer-contact-row">
              <MapPin size={18} className="footer-icon-accent" />
              <span>P2ID · Bâtiment APROSI, 3ème étage · Diamniadio, Sénégal</span>
            </div>
            <div className="footer-contact-row">
              <Phone size={18} className="footer-icon-accent" />
              <a href="tel:+221772173364">+221 77 217 33 64</a>
            </div>
            <div className="footer-contact-row">
              <Mail size={18} className="footer-icon-accent" />
              <a href="mailto:contact@senergysafrica.com">contact@senergysafrica.com</a>
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
