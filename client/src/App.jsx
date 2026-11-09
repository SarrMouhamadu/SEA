import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AdminAuthProvider } from './admin/context/AdminAuthContext';
import AdminProtectedRoute from './admin/components/AdminProtectedRoute';
import AdminLayout from './admin/components/AdminLayout';
import AdminLogin from './admin/pages/AdminLogin';
import AdminDashboard from './admin/pages/AdminDashboard';
import AdminDiagnostics from './admin/pages/AdminDiagnostics';
import AdminContacts from './admin/pages/AdminContacts';
import AdminAnalytics from './admin/pages/AdminAnalytics';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Sectors from './pages/Sectors';
import References from './pages/References';
import Contact from './pages/Contact';
import Ressources from './pages/Ressources';
import AutoDiagnostic from './pages/AutoDiagnostic';
import Maintenance from './pages/Maintenance';
import ScrollToAnchor from './components/ScrollToAnchor';
import { trackPageView } from './utils/tracker';
import './App.css';

// Tracker de visites discret pour les pages publiques
function PageTracker() {
  const location = useLocation();
  useEffect(() => {
    if (!location.pathname.startsWith('/admin')) {
      trackPageView(location.pathname);
    }
  }, [location.pathname]);
  return null;
}

export default function App() {
  const isGlobalMaintenance = import.meta.env.VITE_MAINTENANCE === 'true';

  if (isGlobalMaintenance) {
    return (
      <ThemeProvider>
        <Router>
          <Maintenance isGlobal={true} />
        </Router>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <AdminAuthProvider>
        <Router>
          <ScrollToAnchor />
          <PageTracker />
          <Routes>
            {/* Route Maintenance */}
            <Route path="/maintenance" element={<Maintenance isGlobal={false} />} />

            {/* ESPACE ADMIN INDÉPENDANT (Non accessible au public, sans Navbar ni Footer public) */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <AdminProtectedRoute>
                  <AdminLayout />
                </AdminProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="diagnostics" element={<AdminDiagnostics />} />
              <Route path="contacts" element={<AdminContacts />} />
              <Route path="visites" element={<AdminAnalytics />} />
              <Route path="*" element={<Navigate to="/admin" replace />} />
            </Route>

            {/* SITE PUBLIC (Avec Navbar et Footer) */}
            <Route
              path="*"
              element={
                <div className="app-layout">
                  <Navbar />
                  <main className="app-main">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/a-propos" element={<About />} />
                      <Route path="/services" element={<Services />} />
                      <Route path="/secteurs" element={<Sectors />} />
                      <Route path="/references" element={<References />} />
                      <Route path="/produits" element={<References />} />
                      <Route path="/ressources" element={<Ressources />} />
                      <Route path="/autodiagnostic" element={<AutoDiagnostic />} />
                      <Route path="/contact" element={<Contact />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              }
            />
          </Routes>
        </Router>
      </AdminAuthProvider>
    </ThemeProvider>
  );
}
