import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, Sparkles, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import AutoDiagnosticModal from './AutoDiagnosticModal';
import ContactForm from './ContactForm';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
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
      path: '/#apropos',
      items: [
        { name: 'Qui sommes-nous', path: '/#apropos' },
        { name: 'Notre vision & notre engagement', path: '/#apropos' },
        { name: 'Notre approche (Analyse, Financement, Suivi)', path: '/#apropos' },
        { name: 'Notre équipe', path: '/#equipe' },
        { name: 'Nos partenaires', path: '/#partenaires' },
      ],
    },
    {
      title: 'Expertises',
      path: '/#competences',
      items: [
        { name: 'Énergie durable', path: '/#competences' },
        { name: 'Production propre & Brûleurs', path: '/#competences' },
        { name: 'Finance climat & durable', path: '/#competences' },
        { name: 'Stratégies & politiques publiques', path: '/#competences' },
        { name: 'Formation & innovation', path: '/#competences' },
      ],
    },
    {
      title: 'Secteurs',
      path: '/#secteurs',
      items: [
        { name: 'Industrie & Agroalimentaire', path: '/#secteurs' },
        { name: 'Bâtiments & services', path: '/#secteurs' },
        { name: 'Pétrole, gaz et mines', path: '/#secteurs' },
        { name: 'Institutions financières', path: '/#secteurs' },
        { name: 'Secteur public & organisations internationales', path: '/#secteurs' },
      ],
    },
    {
      title: 'Références',
      path: '/#references',
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
          <Link to="/" className="nav-brand">
            SEnergyS <span>Africa</span>
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
                  <a href={menu.path} className="nav-link">
                    {menu.title}
                  </a>
                )}

                {menu.items && activeDropdown === menu.title && (
                  <div className="nav-dropdown-menu">
                    {menu.items.map((sub) => (
                      <a
                        key={sub.name}
                        href={sub.path}
                        className="nav-dropdown-item"
                        onClick={() => setActiveDropdown(null)}
                      >
                        {sub.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* 2 Boutons d'Appel à l'Action Permanents + Toggle Theme */}
          <div className="nav-ctas-group">
            <button
              onClick={toggleTheme}
              className="theme-toggle-btn"
              title={theme === 'dark' ? 'Basculer en mode clair' : 'Basculer en mode sombre'}
              aria-label="Basculer le thème"
            >
              {theme === 'dark' ? <Sun size={18} color="#F2C88B" /> : <Moon size={18} color="#E8712B" />}
            </button>
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
                        <a
                          key={sub.name}
                          href={sub.path}
                          className="mobile-submenu-item"
                          onClick={() => setMobileOpen(false)}
                        >
                          {sub.name}
                        </a>
                      ))}
                    </div>
                  </>
                ) : (
                  <a
                    href={menu.path}
                    className="mobile-menu-head"
                    style={{ textDecoration: 'none' }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {menu.title}
                  </a>
                )}
              </div>
            ))}

            <div className="mobile-cta-box">
              <button
                onClick={toggleTheme}
                className="btn-pill"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: 'var(--color-sand)',
                  border: '1px solid rgba(246, 241, 231, 0.15)',
                  marginBottom: '6px'
                }}
              >
                {theme === 'dark' ? (
                  <><Sun size={16} color="#F2C88B" /> Passer en mode clair</>
                ) : (
                  <><Moon size={16} color="#E8712B" /> Passer en mode sombre</>
                )}
              </button>
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
              <h3 style={{ fontSize: '26px', color: 'var(--color-forest)' }}>Nous contacter</h3>
              <button className="diag-modal-close" onClick={() => setContactOpen(false)}>✕</button>
            </div>
            <ContactForm onSuccess={() => setTimeout(() => setContactOpen(false), 2000)} />
          </div>
        </div>
      )}
    </>
  );
}
