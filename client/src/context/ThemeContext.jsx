import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

function getAutomaticTheme() {
  // 1. Détection de la préférence système (téléphone ou ordinateur)
  if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  // 2. Détection selon l'heure locale : sombre entre 19h et 7h
  const hour = new Date().getHours();
  return (hour >= 19 || hour < 7) ? 'dark' : 'light';
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getAutomaticTheme);

  useEffect(() => {
    const applyTheme = () => {
      const current = getAutomaticTheme();
      setTheme(current);
      document.documentElement.setAttribute('data-theme', current);
    };

    applyTheme();

    // Écoute des changements de préférence du système (ex: passage jour/nuit automatique du téléphone)
    const mediaQuery = window.matchMedia?.('(prefers-color-scheme: dark)');
    if (mediaQuery?.addEventListener) {
      mediaQuery.addEventListener('change', applyTheme);
    } else if (mediaQuery?.addListener) {
      mediaQuery.addListener(applyTheme);
    }

    // Actualisation selon l'heure toutes les 10 minutes
    const interval = setInterval(applyTheme, 10 * 60 * 1000);

    return () => {
      if (mediaQuery?.removeEventListener) {
        mediaQuery.removeEventListener('change', applyTheme);
      } else if (mediaQuery?.removeListener) {
        mediaQuery.removeListener(applyTheme);
      }
      clearInterval(interval);
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
