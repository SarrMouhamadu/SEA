import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, Sparkles } from 'lucide-react';
import AutoDiagnosticModal from './AutoDiagnosticModal';
import ContactForm from './ContactForm';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [diagOpen, setDiagOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const menuStructure = [
    {
      title: 'Accueil',
      path: '/',
    },
    {
      title: 'À propos',
      path: '/a-propos',
      items: [
        { name: 'Qui sommes-nous', path: '/a-propos#qui-sommes-nous' },
        { name: 'Notre vision & nos valeurs', path: '/a-propos#vision' },
        { name: 'Notre approche en 3 étapes', path: '/a-propos#approche' },
        { name: 'Notre équipe & nos partenaires', path: '/a-propos#partenaires' },
      ],
    },
    {
      title: 'Expertises',
      path: '/services',
      items: [
        { name: 'Énergie durable', path: '/services' },
        { name: 'Production propre', path: '/services' },
        { name: 'Finance climat & durable (ESG)', path: '/services' },
        { name: 'Stratégies & politiques publiques', path: '/services' },
        { name: 'Formation & innovation', path: '/services' },
      ],
    },
    {
      title: 'Secteurs',
      path: '/secteurs',
      items: [
        { name: 'Industrie & Agroalimentaire', path: '/secteurs' },
        { name: 'Bâtiments & services', path: '/secteurs' },
        { name: 'Pétrole, gaz et mines', path: '/secteurs' },
        { name: 'Institutions financières', path: '/secteurs' },
        { name: 'Secteur public & international', path: '/secteurs' },
      ],
    },
    {
      title: 'Références',
      path: '/references',
    },
    {
      title: 'Ressources',
      path: '/#actualites',
      items: [
        { name: 'Actualités & événements', path: '/#actualites' },
        { name: 'Publications & études', path: '/#actualites' },
      ],
    },
  ];

  return (
    <>
      <header className="site-header">
        <div className="site-nav">
          {/* Logo officiel */}
          <Link to="/" className="nav-brand" aria-label="SEnergyS Africa Accueil">
            <img
              src="/assets/logo/logo-officiel.png"
              alt="SEnergyS Africa"
              className="nav-logo-img"
            />
          </Link>

          {/* Menu principal Desktop avec dropdowns */}
          <nav className="nav-desktop">
            {menuStructure.map((menu) => (
              <div
                key={menu.title}
                className="nav-dropdown-wrapper"
                onMouseEnter={() => menu.items && setActiveDropdown(menu.title)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {menu.items ? (
                  <button
                    type="button"
                    className={`nav-link nav-dropdown-btn ${activeDropdown === menu.title ? 'active' : ''}`}
                    onClick={() => setActiveDropdown(activeDropdown === menu.title ? null : menu.title)}
                  >
                    {menu.title} <ChevronDown size={14} className="dropdown-arrow" />
                  </button>
                ) : (
                  <Link to={menu.path} className="nav-link">
                    {menu.title}
                  </Link>
                )}

                {menu.items && activeDropdown === menu.title && (
                  <div className="nav-dropdown-menu">
                    {menu.items.map((sub) => (
                      <Link
                        key={sub.name}
                        to={sub.path}
                        className="nav-dropdown-item"
                        onClick={() => setActiveDropdown(null)}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* 2 Boutons d'Appel à l'Action Permanents */}
          <div className="nav-ctas-group">
            <button
              onClick={() => setDiagOpen(true)}
              className="btn-pill btn-pill-outline-gold nav-btn-diag"
              title="Autodiagnostic en 3 étapes"
            >
              <Sparkles size={15} /> Autodiagnostic
            </button>
            <button
              onClick={() => setContactOpen(true)}
              className="btn-pill btn-pill-orange nav-btn-contact"
            >
              Nous contacter
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="nav-mobile-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu Mobile"
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Menu Mobile */}
        {mobileOpen && (
          <div className="nav-mobile-panel">
            {menuStructure.map((menu) => (
              <div key={menu.title} className="mobile-menu-section">
                {menu.items ? (
                  <>
                    <div className="mobile-menu-head">{menu.title}</div>
                    <div className="mobile-submenu">
                      {menu.items.map((sub) => (
                        <Link
                          key={sub.name}
                          to={sub.path}
                          className="mobile-submenu-item"
                          onClick={() => setMobileOpen(false)}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    to={menu.path}
                    className="mobile-menu-head"
                    style={{ textDecoration: 'none' }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {menu.title}
                  </Link>
                )}
              </div>
            ))}

            <div className="mobile-cta-box">
              <button
                onClick={() => {
                  setMobileOpen(false);
                  setDiagOpen(true);
                }}
                className="btn-pill btn-pill-outline-gold"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <Sparkles size={15} /> Autodiagnostic (3 étapes)
              </button>
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
