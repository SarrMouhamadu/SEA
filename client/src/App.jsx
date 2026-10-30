import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Sectors from './pages/Sectors';
import References from './pages/References';
import Contact from './pages/Contact';
import Maintenance from './pages/Maintenance';
import './App.css';

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
      <Router>
        <Routes>
          <Route path="/maintenance" element={<Maintenance isGlobal={false} />} />
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
                    <Route path="/contact" element={<Contact />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
