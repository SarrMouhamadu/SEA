import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Sparkles, ArrowRight } from 'lucide-react';
import AutoDiagnosticModal from './AutoDiagnosticModal';
import ContactForm from './ContactForm';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [diagOpen, setDiagOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  // Chaque élément de la barre de navigation est une page indépendante avec sa propre URL
  const navItems = [
    { name: 'Accueil', path: '/', end: true },
    { name: 'À propos', path: '/a-propos' },
    { name: 'Expertises', path: '/services' },
    { name: 'Secteurs', path: '/secteurs' },
    { name: 'Références', path: '/references' },
    { name: 'Ressources', path: '/ressources' },
  ];

  const handleMobileNavClick = () => {
    setMobileOpen(false);
  };

  return (
    <>
      <header className="site-header">
        <div className="site-nav">
          {/* Logo officiel SEnergyS Africa */}
          <Link to="/" className="nav-brand" aria-label="SEnergyS Africa Accueil">
            <img
              src="/assets/logo/logo-officiel.png"
              alt="SEnergyS Africa"
              className="nav-logo-img"
            />
          </Link>

          {/* Menu principal Desktop : Liens directs vers chaque page indépendante */}
          <nav className="nav-desktop">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* 2 Boutons d'Appel à l'Action Permanents */}
          <div className="nav-ctas-group">
            <Link
              to="/autodiagnostic"
              className="btn-pill btn-pill-outline-gold nav-btn-diag"
              title="Outil d'évaluation en 15 minutes"
            >
              <Sparkles size={15} /> Autodiagnostic
            </Link>
            <button
              onClick={() => setContactOpen(true)}
              className="btn-pill btn-pill-orange nav-btn-contact"
            >
              Nous contacter
            </button>
          </div>

          {/* Bouton Menu Mobile (Hamburger) */}
          <button
            className="nav-mobile-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu Mobile"
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Tiroir Menu Mobile : Navigation vers chaque page distincte */}
        {mobileOpen && (
          <div className="nav-mobile-panel">
            <nav className="mobile-nav-list" style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                  onClick={handleMobileNavClick}
                >
                  <span>{item.name}</span>
                  <ArrowRight size={15} className="mobile-nav-arrow" />
                </NavLink>
              ))}
            </nav>

            <div className="mobile-cta-box">
              <Link
                to="/autodiagnostic"
                onClick={() => setMobileOpen(false)}
                className="btn-pill btn-pill-outline-gold"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <Sparkles size={15} /> Autodiagnostic (15 min)
              </Link>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  setContactOpen(true);
                }}
                className="btn-pill btn-pill-orange"
                style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}
              >
                Nous contacter
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Modal Autodiagnostic */}
      <AutoDiagnosticModal isOpen={diagOpen} onClose={() => setDiagOpen(false)} />

      {/* Modal Nous Contacter */}
      {contactOpen && (
        <div
          className="diag-modal-backdrop"
          onClick={() => setContactOpen(false)}
        >
          <div
            className="diag-modal-box"
            style={{ maxWidth: '640px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="diag-modal-header" style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '26px', color: 'var(--theme-text)' }}>Nous contacter</h3>
              <button className="diag-modal-close" onClick={() => setContactOpen(false)}>✕</button>
            </div>
            <ContactForm onSuccess={() => setTimeout(() => setContactOpen(false), 2000)} />
          </div>
        </div>
      )}
    </>
  );
}
