import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: 'Accueil', path: '/' },
    { name: "Domaines d'expertise", path: '/#competences' },
    { name: 'Nos produits', path: '/#produits' },
    { name: 'Notre équipe', path: '/#equipe' },
    { name: 'Blog', path: '/#actualites' },
    { name: 'Partenaires', path: '/#partenaires' },
    { name: 'Contact', path: '/#contact' },
  ];

  return (
    <header className="site-header">
      <div className="site-nav">
        <Link to="/" className="nav-brand">
          SEnergyS <span>Africa</span>
        </Link>

        <nav className="nav-links">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.path}
              className="nav-link"
            >
              {link.name}
            </a>
          ))}
          <a href="/#contact" className="nav-cta">
            Diagnostic gratuit
          </a>
        </nav>

        <button
          className="nav-mobile-btn"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {isOpen && (
        <div style={{ background: '#020C17', padding: '20px 32px', borderTop: '1px solid rgba(246,241,231,0.1)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {links.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className="nav-link"
                style={{ fontSize: '17px' }}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a
              href="/#contact"
              className="nav-cta"
              style={{ textAlign: 'center', marginTop: '10px' }}
              onClick={() => setIsOpen(false)}
            >
              Diagnostic gratuit
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
