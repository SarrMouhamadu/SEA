import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  ClipboardCheck,
  Mail,
  BarChart3,
  LogOut,
  ExternalLink,
  Shield,
  Activity,
  Menu,
  X
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import '../admin.css';

export default function AdminLayout() {
  const { user, logout } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [badgeCounts, setBadgeCounts] = useState({ unreadContacts: 0, newDiagnostics: 0 });

  useEffect(() => {
    // Récupérer les compteurs non lus pour les badges du menu
    fetch('/api/admin/dashboard')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data?.analytics) {
          setBadgeCounts({
            unreadContacts: data.data.analytics.unreadContacts || 0,
            newDiagnostics: data.data.analytics.newDiagnostics || 0
          });
        }
      })
      .catch(() => {});
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const getPageTitle = () => {
    if (location.pathname === '/admin' || location.pathname === '/admin/') return 'Tableau de bord';
    if (location.pathname.startsWith('/admin/diagnostics')) return 'Autodiagnostics Industriels';
    if (location.pathname.startsWith('/admin/contacts')) return 'Messages & Demandes de contact';
    if (location.pathname.startsWith('/admin/visites')) return 'Audience & Statistiques de visites';
    return 'Administration';
  };

  return (
    <div className="admin-root">
      {/* Sidebar Desktop & Mobile */}
      <aside className={`admin-sidebar ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-brand">
          <div className="admin-brand-icon">
            <Shield size={22} />
          </div>
          <div className="admin-brand-text">
            <h2>SEnergyS Africa</h2>
            <span>Espace Admin</span>
          </div>
        </div>

        <nav className="admin-sidebar-nav">
          <div className="admin-nav-section-title">Navigation principale</div>

          <NavLink
            to="/admin"
            end
            className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <LayoutDashboard size={18} />
            <span>Tableau de bord</span>
          </NavLink>

          <NavLink
            to="/admin/diagnostics"
            className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <ClipboardCheck size={18} />
            <span>Autodiagnostics</span>
            {badgeCounts.newDiagnostics > 0 && (
              <span className="admin-nav-badge highlight">{badgeCounts.newDiagnostics}</span>
            )}
          </NavLink>

          <NavLink
            to="/admin/contacts"
            className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Mail size={18} />
            <span>Messages reçus</span>
            {badgeCounts.unreadContacts > 0 && (
              <span className="admin-nav-badge highlight">{badgeCounts.unreadContacts}</span>
            )}
          </NavLink>

          <NavLink
            to="/admin/visites"
            className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <BarChart3 size={18} />
            <span>Visites & Analytics</span>
          </NavLink>
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-user-info">
            <span className="admin-user-name">{user?.name || 'Admin'}</span>
            <span className="admin-user-role">{user?.role || 'Super Admin'}</span>
          </div>
          <button
            onClick={handleLogout}
            className="admin-btn-logout"
            title="Se déconnecter"
          >
            <LogOut size={18} />
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="admin-main">
        {/* Header */}
        <header className="admin-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button
              className="admin-btn-icon"
              style={{ display: 'none' }} // Visible on mobile via CSS if needed
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="admin-header-title">
              <h1>{getPageTitle()}</h1>
              <p>Vue confidentielle réservée aux équipes de direction et ingénierie SESA</p>
            </div>
          </div>

          <div className="admin-header-actions">
            <div className="admin-live-badge">
              <span className="admin-live-dot" />
              <span>Plateforme en direct</span>
            </div>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="admin-btn-secondary"
              title="Ouvrir le site public dans un nouvel onglet"
            >
              <ExternalLink size={14} />
              <span>Voir le site public</span>
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
