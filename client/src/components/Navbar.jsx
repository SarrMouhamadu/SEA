import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Sparkles, ArrowRight, ChevronDown } from 'lucide-react';
import AutoDiagnosticModal from './AutoDiagnosticModal';
import ContactForm from './ContactForm';

// Helper : lien dropdown qui scrolle vers l'ancre après navigation
function DropdownLink({ to, anchor, children, onClick }) {
  const handleClick = () => {
    if (onClick) onClick();
    setTimeout(() => {
      const el = document.getElementById(anchor);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);
  };
  return (
    <Link to={to} className="nav-dropdown-item" onClick={handleClick}>
      {children}
    </Link>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [diagOpen,   setDiagOpen]   = useState(false);
  const [contactOpen,setContactOpen] = useState(false);

  // Mobile : état d'ouverture de chaque sous-menu
  const [mAbout,     setMAbout]      = useState(false);
  const [mExpertises,setMExpertises] = useState(false);
  const [mSecteurs,  setMSecteurs]   = useState(false);
  const [mRessources,setMRessources] = useState(false);

  /* ── Données sous-menus ─────────────────────────────────── */

  const aboutSections = [
    { label: 'Qui sommes-nous ?',            anchor: 'qui-sommes-nous' },
    { label: 'Notre Approche',               anchor: 'approche' },
    { label: 'Vision & Valeurs',             anchor: 'vision' },
    { label: 'Notre Équipe',                 anchor: 'equipe' },
    { label: 'Partenaires',                  anchor: 'partenaires' },
  ];

  const expertisesSections = [
    { label: 'Énergie Durable',              anchor: 'energie-durable' },
    { label: 'Production Propre',            anchor: 'production-propre' },
    { label: 'Finance Climatique',           anchor: 'finance-climat' },
    { label: 'Stratégies & Politiques',      anchor: 'strategies-politiques-publiques' },
    { label: 'Innovation & Outils Digitaux', anchor: 'innovation-outils-digitaux' },
    { label: 'Formation & Renforcement',     anchor: 'formation-innovation' },
  ];

  const secteursSections = [
    { label: 'Institutions Publiques',           anchor: 'secteur-public' },
    { label: 'Industries & Grandes Entreprises', anchor: 'industrie' },
    { label: 'Institutions Financières',         anchor: 'institutions-financieres' },
    { label: 'Pétrole, Gaz & Mines',             anchor: 'petrole-gaz-mines' },
    { label: 'Bâtiments & Tertiaire',            anchor: 'batiments' },
  ];

  const ressourcesSections = [
    { label: 'Actualités & Articles', anchor: 'actualites' },
    { label: 'Publications & Guides', anchor: 'publications' },
  ];

  const handleMobileNavClick = () => setMobileOpen(false);

  /* ── Composant dropdown desktop réutilisable ──────────── */
  function NavDropdown({ to, label, sections }) {
    return (
      <div className="nav-dropdown-wrapper">
        <NavLink
          to={to}
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          {label} <ChevronDown size={13} className="dropdown-arrow" />
        </NavLink>
        <div className="nav-dropdown-menu">
          {sections.map((s) => (
            <DropdownLink key={s.anchor} to={`${to}#${s.anchor}`} anchor={s.anchor}>
              {s.label}
            </DropdownLink>
          ))}
        </div>
      </div>
    );
  }

  /* ── Composant sous-menu mobile réutilisable ─────────── */
  function MobileSection({ to, label, sections, open, setOpen }) {
    return (
      <div className="mobile-menu-section">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 4px', borderBottom: open ? 'none' : '1px solid rgba(246,241,231,0.08)' }}>
          <NavLink
            to={to}
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            onClick={handleMobileNavClick}
            style={{ border: 'none', padding: 0, flexGrow: 1 }}
          >
            <span>{label}</span>
          </NavLink>
          <button
            onClick={() => setOpen(!open)}
            style={{ background: 'none', border: 'none', color: 'var(--color-sand)', cursor: 'pointer', padding: '0 6px', flexShrink: 0 }}
            aria-label={`Ouvrir sous-menu ${label}`}
          >
            <ChevronDown size={15} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', display: 'block' }} />
          </button>
        </div>
        {open && (
          <div className="mobile-submenu" style={{ marginBottom: '8px', borderBottom: '1px solid rgba(246,241,231,0.08)', paddingBottom: '8px' }}>
            {sections.map((s) => (
              <Link
                key={s.anchor}
                to={`${to}#${s.anchor}`}
                className="mobile-submenu-item"
                onClick={() => {
                  handleMobileNavClick();
                  setTimeout(() => {
                    const el = document.getElementById(s.anchor);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 150);
                }}
              >
                › {s.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  /* ── Rendu ───────────────────────────────────────────── */
  return (
    <>
      <header className="site-header">
        <div className="site-nav">
          {/* Logo */}
          <Link to="/" className="nav-brand" aria-label="SEnergyS Africa Accueil">
            <img src="/assets/logo/logo-officiel.png" alt="SEnergyS Africa" className="nav-logo-img" />
          </Link>

          {/* Menu Desktop */}
          <nav className="nav-desktop">
            <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Accueil
            </NavLink>

            <NavDropdown to="/a-propos"  label="À propos"   sections={aboutSections} />
            <NavDropdown to="/services"  label="Expertises" sections={expertisesSections} />
            <NavDropdown to="/secteurs"  label="Secteurs"   sections={secteursSections} />

            <NavLink to="/references" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Références
            </NavLink>

            <NavDropdown to="/ressources" label="Ressources" sections={ressourcesSections} />
          </nav>

          {/* CTAs */}
          <div className="nav-ctas-group">
            <Link to="/autodiagnostic" className="btn-pill btn-pill-outline-gold nav-btn-diag" title="Outil d'évaluation en 15 minutes">
              <Sparkles size={15} /> Autodiagnostic
            </Link>
            <button onClick={() => setContactOpen(true)} className="btn-pill btn-pill-orange nav-btn-contact">
              Nous contacter
            </button>
          </div>

          {/* Hamburger */}
          <button className="nav-mobile-btn" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu Mobile">
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Menu Mobile */}
        {mobileOpen && (
          <div className="nav-mobile-panel">
            <nav className="mobile-nav-list" style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>

              <NavLink to="/" end className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`} onClick={handleMobileNavClick}>
                <span>Accueil</span>
                <ArrowRight size={15} className="mobile-nav-arrow" />
              </NavLink>

              <MobileSection to="/a-propos"   label="À propos"   sections={aboutSections}      open={mAbout}      setOpen={setMAbout} />
              <MobileSection to="/services"   label="Expertises" sections={expertisesSections}  open={mExpertises} setOpen={setMExpertises} />
              <MobileSection to="/secteurs"   label="Secteurs"   sections={secteursSections}    open={mSecteurs}   setOpen={setMSecteurs} />

              <NavLink to="/references" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`} onClick={handleMobileNavClick}>
                <span>Références</span>
                <ArrowRight size={15} className="mobile-nav-arrow" />
              </NavLink>

              <MobileSection to="/ressources" label="Ressources" sections={ressourcesSections}  open={mRessources} setOpen={setMRessources} />
            </nav>

            <div className="mobile-cta-box">
              <Link to="/autodiagnostic" onClick={() => setMobileOpen(false)} className="btn-pill btn-pill-outline-gold" style={{ width: '100%', justifyContent: 'center' }}>
                <Sparkles size={15} /> Autodiagnostic (15 min)
              </Link>
              <button onClick={() => { setMobileOpen(false); setContactOpen(true); }} className="btn-pill btn-pill-orange" style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>
                Nous contacter
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Modal Autodiagnostic */}
      <AutoDiagnosticModal isOpen={diagOpen} onClose={() => setDiagOpen(false)} />

      {/* Modal Contact */}
      {contactOpen && (
        <div className="diag-modal-backdrop" onClick={() => setContactOpen(false)}>
          <div className="diag-modal-box" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
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
