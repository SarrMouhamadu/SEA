import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, ChevronRight, Zap } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: 'Accueil', path: '/' },
    { name: 'À Propos', path: '/a-propos' },
    { name: 'Services', path: '/services' },
    { name: 'Secteurs', path: '/secteurs' },
    { name: 'Brûleurs & Produits', path: '/produits' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="site-navbar">
      {/* Topbar d'information */}
      <div className="topbar">
        <div className="container topbar-inner">
          <div className="topbar-contacts">
            <a href="tel:+221772173364" className="topbar-link">
              <Phone size={14} /> +221 77 217 33 64
            </a>
            <a href="mailto:contact@senergysafrica.com" className="topbar-link">
              <Mail size={14} /> contact@senergysafrica.com
            </a>
          </div>
          <div className="topbar-location">
            <span>Dakar, Sénégal & Afrique de l'Ouest</span>
          </div>
        </div>
      </div>

      {/* Barre de navigation principale */}
      <div className="navbar-main">
        <div className="container navbar-container">
          <Link to="/" className="brand-logo">
            <img src="/assets/logo/logo-sesa.png" alt="SEnergys Africa Logo" className="logo-img" />
          </Link>

          <nav className="desktop-menu">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/contact" className="btn btn-primary nav-cta">
              Demander un Audit <ChevronRight size={16} />
            </Link>
          </nav>

          <button
            className="mobile-toggle"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {isOpen && (
        <div className="mobile-menu">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`mobile-link ${location.pathname === link.path ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/contact"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '16px' }}
            onClick={() => setIsOpen(false)}
          >
            Demander un Audit
          </Link>
        </div>
      )}
    </header>
  );
}
