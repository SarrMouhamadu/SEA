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

  const handleNavClick = (path) => {
    setActiveDropdown(null);
    setMobileOpen(false);

    if (path.includes('#')) {
      const [targetPath, hash] = path.split('#');
      if (window.location.pathname === targetPath) {
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 50);
      }
    }
  };

  const menuStructure = [
    {
      title: 'Accueil',
      path: '/',
    },
    {
      title: 'À propos',
      path: '/a-propos',
      items: [
        { name: 'Qui sommes-nous', path: '/a-propos/qui-sommes-nous' },
        { name: 'Notre vision & engagement', path: '/a-propos/vision-engagement' },
        { name: 'Notre approche (3 étapes)', path: '/a-propos/notre-approche' },
        { name: 'Notre équipe', path: '/a-propos/equipe' },
        { name: 'Nos partenaires', path: '/a-propos/partenaires' },
      ],
    },
    {
      title: 'Expertises',
      path: '/services',
      items: [
        { name: 'Énergie durable', path: '/expertises/energie-durable' },
        { name: 'Production propre', path: '/expertises/production-propre' },
        { name: 'Finance climat & durable (ESG)', path: '/expertises/finance-climat' },
        { name: 'Stratégies & politiques publiques', path: '/expertises/strategies-politiques-publiques' },
        { name: 'Formation & innovation', path: '/expertises/formation-innovation' },
      ],
    },
    {
      title: 'Secteurs',
      path: '/secteurs',
      items: [
        { name: 'Industrie & Agroalimentaire', path: '/secteurs/industrie' },
        { name: 'Bâtiments & services', path: '/secteurs/batiments-services' },
        { name: 'Pétrole, gaz et mines', path: '/secteurs/petrole-gaz-mines' },
        { name: 'Institutions financières', path: '/secteurs/institutions-financieres' },
        { name: 'Secteur public & international', path: '/secteurs/secteur-public' },
      ],
    },
    {
      title: 'Références',
      path: '/references',
    },
    {
      title: 'Ressources',
      path: '/ressources',
      items: [
        { name: 'Actualités & événements', path: '/ressources/actualites' },
        { name: 'Publications & études', path: '/ressources/publications' },
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
                  <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                    <Link
                      to={menu.path}
                      className={`nav-link ${activeDropdown === menu.title ? 'active' : ''}`}
                      onClick={() => handleNavClick(menu.path)}
                    >
                      {menu.title}
                    </Link>
                    <button
                      type="button"
                      className="nav-link nav-dropdown-btn"
                      style={{ paddingLeft: '1px', paddingRight: '4px' }}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveDropdown(activeDropdown === menu.title ? null : menu.title);
                      }}
                      aria-label={`Ouvrir sous-menu ${menu.title}`}
                    >
                      <ChevronDown size={14} className="dropdown-arrow" />
                    </button>
                  </div>
                ) : (
                  <Link 
                    to={menu.path} 
                    className="nav-link"
                    onClick={() => handleNavClick(menu.path)}
                  >
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
                        onClick={() => handleNavClick(sub.path)}
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
                    <Link
                      to={menu.path}
                      className="mobile-menu-head"
                      style={{ textDecoration: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                      onClick={() => handleNavClick(menu.path)}
                    >
                      <span>{menu.title}</span>
                      <ChevronDown size={15} />
                    </Link>
                    <div className="mobile-submenu">
                      {menu.items.map((sub) => (
                        <Link
                          key={sub.name}
                          to={sub.path}
                          className="mobile-submenu-item"
                          onClick={() => handleNavClick(sub.path)}
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
                    onClick={() => handleNavClick(menu.path)}
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
