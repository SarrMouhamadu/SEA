import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('sesa_admin_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('sesa_admin_token') || null;
  });

  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: (email || '').trim(),
          password: (password || '').trim()
        })
      });

      const contentType = res.headers.get('content-type') || '';
      let data = {};
      if (contentType.includes('application/json')) {
        data = await res.json();
      } else {
        const text = await res.text();
        if (res.status >= 500 || text.includes('<!DOCTYPE') || text.includes('Proxy error')) {
          throw new Error('Le serveur API est indisponible. Veuillez vous assurer que le backend est démarré.');
        }
        throw new Error('Réponse serveur inattendue.');
      }

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Identifiants invalides');
      }

      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('sesa_admin_user', JSON.stringify(data.user));
      localStorage.setItem('sesa_admin_token', data.token);
      setLoading(false);
      return { success: true };
    } catch (err) {
      setLoading(false);
      let msg = err.message || '';
      if (
        msg.includes('did not match the expected pattern') ||
        msg.includes('Unexpected token') ||
        msg.includes('Failed to fetch') ||
        msg.includes('NetworkError')
      ) {
        msg = 'Impossible de contacter le serveur. Assurez-vous que le serveur backend est en cours d’exécution.';
      }
      return { success: false, message: msg };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('sesa_admin_user');
    localStorage.removeItem('sesa_admin_token');
  };

  const value = {
    user,
    token,
    isAuthenticated: !!token && !!user,
    loading,
    login,
    logout
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
