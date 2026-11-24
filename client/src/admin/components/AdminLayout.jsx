import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  ClipboardCheck,
  Mail,
  BarChart3,
  LogOut,
  ExternalLink,
  Shield,
  Menu,
  X,
  Briefcase,
  Newspaper
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import '../admin.css';

const MOBILE_QUERY = '(max-width: 1024px)';

export default function AdminLayout() {
  const { user, logout } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(MOBILE_QUERY).matches : false
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [badgeCounts, setBadgeCounts] = useState({ unreadContacts: 0, newDiagnostics: 0, newCareers: 0 });

  const drawerRef = useRef(null);
  const scrollerRef = useRef(null);
  const sheetRef = useRef(null);
  const openBtnRef = useRef(null);
  const closeBtnRef = useRef(null);
  const mainRef = useRef(null);
  const drawerStateRef = useRef('closed'); // 'closed' | 'opening' | 'open' | 'closing'

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    const handleChange = (e) => {
      setIsMobile(e.matches);
      if (!e.matches) {
        setMobileMenuOpen(false);
        if (mainRef.current) mainRef.current.inert = false;
      }
    };
    setIsMobile(mql.matches);
    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    // Récupérer les compteurs non lus pour les badges du menu
    fetch('/api/admin/dashboard')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data?.analytics) {
          setBadgeCounts({
            unreadContacts: data.data.analytics.unreadContacts || 0,
            newDiagnostics: data.data.analytics.newDiagnostics || 0,
            newCareers: data.data.analytics.newCareers || 0
          });
        }
      })
      .catch(() => {});
  }, [location.pathname]);

  const onDrawerClosed = useCallback(() => {
    const drawer = drawerRef.current;
    if (!drawer || drawerStateRef.current === 'closed') return;
    drawerStateRef.current = 'closed';
    if (typeof drawer.hidePopover === 'function') {
      try {
        drawer.hidePopover();
      } catch (e) {}
    } else {
      drawer.classList.remove('is-open');
    }
    if (mainRef.current) mainRef.current.inert = false;
    drawer.removeAttribute('aria-modal');
    setMobileMenuOpen(false);
    openBtnRef.current?.focus();
  }, []);

  const openDrawer = useCallback(async () => {
    const drawer = drawerRef.current;
    const scroller = scrollerRef.current;
    if (!drawer || !scroller) return;

    drawerStateRef.current = 'opening';

    if (typeof drawer.showPopover === 'function') {
      try {
        drawer.showPopover();
      } catch (e) {}
    } else {
      drawer.classList.add('is-open');
    }

    if (mainRef.current) mainRef.current.inert = true;
    drawer.setAttribute('aria-modal', 'true');
    setMobileMenuOpen(true);

    if (!CSS.supports('scroll-initial-target', 'nearest')) {
      scroller.scrollTo({ left: scroller.offsetWidth, behavior: 'instant' });
      await new Promise((r) =>
        requestAnimationFrame(() => requestAnimationFrame(r))
      );
    }

    if (drawerStateRef.current !== 'opening') return;
    scroller.scrollTo({ left: 0, behavior: 'auto' });
    closeBtnRef.current?.focus({ preventScroll: true });
  }, []);

  const closeDrawer = useCallback(() => {
    const drawer = drawerRef.current;
    const scroller = scrollerRef.current;
    if (!drawer || drawerStateRef.current === 'closed') return;
    drawerStateRef.current = 'closing';
    if (!scroller || scroller.offsetWidth === 0) {
      onDrawerClosed();
      return;
    }
    scroller.scrollTo({ left: scroller.offsetWidth, behavior: 'auto' });
  }, [onDrawerClosed]);

  // IntersectionObserver, scroll-fade fallback et touche Escape pour le drawer mobile
  useEffect(() => {
    if (!isMobile) return;
    const drawer = drawerRef.current;
    const scroller = scrollerRef.current;
    const sheet = sheetRef.current;
    if (!drawer || !scroller || !sheet) return;

    const visibleThreshold = 1 / Math.max(window.innerWidth, 320);

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries.at(-1);
        if (!entry) return;
        if (entry.intersectionRatio >= 0.99) {
          drawerStateRef.current = 'open';
          setMobileMenuOpen(true);
        } else if (
          entry.intersectionRatio < visibleThreshold &&
          (drawerStateRef.current === 'open' || drawerStateRef.current === 'closing')
        ) {
          onDrawerClosed();
        }
      },
      { root: drawer, threshold: [visibleThreshold, 0.99, 1] }
    );
    observer.observe(sheet);

    const handleScrollFallback = () => {
      if (!sheet.offsetWidth) return;
      const ratio = Math.max(0, Math.min(1, 1 - scroller.scrollLeft / sheet.offsetWidth));
      drawer.style.setProperty('--drawer-backdrop', String(ratio));
    };

    const needsScrollFallback = !CSS.supports('animation-timeline: scroll()');
    if (needsScrollFallback) {
      scroller.addEventListener('scroll', handleScrollFallback, { passive: true });
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && drawer.hasAttribute('aria-modal')) {
        closeDrawer();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      observer.disconnect();
      if (needsScrollFallback) {
        scroller.removeEventListener('scroll', handleScrollFallback);
      }
      document.removeEventListener('keydown', handleKeyDown);
      if (mainRef.current) mainRef.current.inert = false;
    };
  }, [isMobile, closeDrawer, onDrawerClosed]);

  const handleNavClick = () => {
    if (isMobile) closeDrawer();
  };

  const handleLogout = () => {
    if (isMobile) closeDrawer();
    logout();
    navigate('/admin/login');
  };

  const getPageTitle = () => {
    if (location.pathname === '/admin' || location.pathname === '/admin/') return 'Tableau de bord';
    if (location.pathname.startsWith('/admin/articles')) return 'Articles & Actualités';
    if (location.pathname.startsWith('/admin/diagnostics')) return 'Autodiagnostics Industriels';
    if (location.pathname.startsWith('/admin/visites')) return 'Audience & Statistiques';
    if (location.pathname.startsWith('/admin/contacts')) return 'Contacts & Demandes';
    if (location.pathname.startsWith('/admin/carrieres')) return 'Recrutement & Candidatures';
    return 'Administration';
  };

  const sidebarContent = (
    <>
      <div className="admin-sidebar-brand">
        <div className="admin-brand-icon">
          <Shield size={22} />
        </div>
        <div className="admin-brand-text">
          <h2>SEnergyS Africa</h2>
          <span>Espace Admin</span>
        </div>
        {isMobile && (
          <button
            ref={closeBtnRef}
            type="button"
            className="admin-btn-icon admin-drawer-close-btn"
            onClick={closeDrawer}
            aria-label="Fermer le menu"
            autoFocus
          >
            <X size={20} />
          </button>
        )}
      </div>

      <nav className="admin-sidebar-nav" aria-label="Navigation administration">
        <div className="admin-nav-section-title">Navigation principale</div>

        <NavLink
          to="/admin"
          end
          className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}
          onClick={handleNavClick}
        >
          <LayoutDashboard size={18} />
          <span>Tableau de bord</span>
        </NavLink>

        <NavLink
          to="/admin/articles"
          className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}
          onClick={handleNavClick}
        >
          <Newspaper size={18} />
          <span>Articles & Actualités</span>
        </NavLink>

        <NavLink
          to="/admin/diagnostics"
          className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}
          onClick={handleNavClick}
        >
          <ClipboardCheck size={18} />
          <span>Autodiagnostics</span>
          {badgeCounts.newDiagnostics > 0 && (
            <span className="admin-nav-badge highlight">{badgeCounts.newDiagnostics}</span>
          )}
        </NavLink>

        <NavLink
          to="/admin/visites"
          className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}
          onClick={handleNavClick}
        >
          <BarChart3 size={18} />
          <span>Visites & Analytics</span>
        </NavLink>

        <NavLink
          to="/admin/contacts"
          className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}
          onClick={handleNavClick}
        >
          <Mail size={18} />
          <span>Contacts</span>
          {badgeCounts.unreadContacts > 0 && (
            <span className="admin-nav-badge highlight">{badgeCounts.unreadContacts}</span>
          )}
        </NavLink>

        <NavLink
          to="/admin/carrieres"
          className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}
          onClick={handleNavClick}
        >
          <Briefcase size={18} />
          <span>Candidatures RH</span>
          {badgeCounts.newCareers > 0 && (
            <span className="admin-nav-badge highlight">{badgeCounts.newCareers}</span>
          )}
        </NavLink>
      </nav>

      <div className="admin-sidebar-footer">
        <div className="admin-user-info">
          <span className="admin-user-name">{user?.name || 'Admin'}</span>
          <span className="admin-user-role">{user?.role || 'Super Admin'}</span>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="admin-btn-logout"
          title="Se déconnecter"
          aria-label="Se déconnecter"
        >
          <LogOut size={18} />
        </button>
      </div>
    </>
  );

  return (
    <div className="admin-root">
      {/* Navigation : Sidebar fixe sur Desktop, Drawer swipeable sur Mobile / Tablette */}
      {isMobile ? (
        <div
          ref={drawerRef}
          id="admin-nav-drawer"
          className="admin-drawer"
          popover="manual"
          role="dialog"
          aria-label="Menu d'administration"
          onClick={(e) => {
            if (sheetRef.current && !sheetRef.current.contains(e.target)) {
              closeDrawer();
            }
          }}
        >
          <div ref={scrollerRef} className="admin-drawer-scroller">
            <aside ref={sheetRef} className="admin-drawer-sheet">
              {sidebarContent}
            </aside>
          </div>
        </div>
      ) : (
        <aside className="admin-sidebar">
          {sidebarContent}
        </aside>
      )}

      {/* Main Area */}
      <div ref={mainRef} className="admin-main">
        {/* Header */}
        <header className="admin-header">
          <div className="admin-header-left">
            {isMobile && (
              <button
                ref={openBtnRef}
                type="button"
                className="admin-btn-icon admin-mobile-menu-btn"
                onClick={openDrawer}
                aria-label="Ouvrir le menu de navigation"
                aria-expanded={mobileMenuOpen}
                aria-controls="admin-nav-drawer"
              >
                <Menu size={20} />
              </button>
            )}
            <div className="admin-header-title">
              <h1>{getPageTitle()}</h1>
              <p className="admin-header-subtitle">
                Vue confidentielle réservée aux équipes de direction et ingénierie SESA
              </p>
            </div>
          </div>

          <div className="admin-header-actions">
            <div className="admin-live-badge">
              <span className="admin-live-dot" />
              <span className="admin-live-text">Plateforme en direct</span>
            </div>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="admin-btn-secondary admin-public-link"
              title="Ouvrir le site public dans un nouvel onglet"
              aria-label="Voir le site public"
            >
              <ExternalLink size={15} />
              <span className="admin-public-link-text">Voir le site public</span>
            </a>

            <div className="admin-user-pill">
              <div className="admin-avatar">
                {(user?.name || 'A')[0]}
              </div>
              <div className="admin-user-info">
                <span className="admin-user-name">{user?.name?.split(' ')[0] || 'Admin'}</span>
                <span className="admin-user-role">{user?.email}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Outlet */}
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
