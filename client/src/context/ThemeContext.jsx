import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

function getInitialTheme() {
  if (typeof window !== 'undefined') {
    // 1. Priorité au choix mémorisé par l'utilisateur
    const saved = localStorage.getItem('sea_theme');
    if (saved === 'dark' || saved === 'light') {
      return saved;
    }
    // 2. Détection de la préférence du système d'exploitation
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  }
  // 3. Détection par défaut selon l'heure (sombre entre 19h et 7h)
  const hour = new Date().getHours();
  return (hour >= 19 || hour < 7) ? 'dark' : 'light';
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    // Applique l'attribut data-theme à l'élément racine <html>
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Fonction de bascule directe entre mode clair et mode sombre
  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      if (typeof window !== 'undefined') {
        localStorage.setItem('sea_theme', next);
      }
      return next;
    });
  };

  const setExplicitTheme = (mode) => {
    if (mode === 'dark' || mode === 'light') {
      setTheme(mode);
      if (typeof window !== 'undefined') {
        localStorage.setItem('sea_theme', mode);
      }
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme: setExplicitTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
