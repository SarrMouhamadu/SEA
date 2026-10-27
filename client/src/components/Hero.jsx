import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Flame, Shield, TrendingUp } from 'lucide-react';

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="container hero-container">
        <div className="hero-content">
          <div className="badge">
            <span className="badge-dot"></span> Accélérateur de performances durables
          </div>
          <h1 className="hero-title">
            L'Ingénierie au service de votre <span className="highlight-text">Transition Énergétique</span>
          </h1>
          <p className="hero-description">
            SEnergys Africa accompagne les industriels, institutions financières et acteurs publics
            vers la décarbonation, l'efficacité énergétique des procédés et les standards climatiques ESG.
          </p>

          <div className="hero-actions">
            <Link to="/contact" className="btn btn-primary btn-lg">
              Demander un Diagnostic <ArrowRight size={18} />
            </Link>
            <Link to="/produits" className="btn btn-secondary btn-lg">
              Découvrir nos Brûleurs
            </Link>
          </div>

          <div className="hero-highlights">
            <div className="highlight-item">
              <CheckCircle2 size={18} className="highlight-icon" />
              <span>Jusqu'à <strong>-25%</strong> de consommation combustible</span>
            </div>
            <div className="highlight-item">
              <CheckCircle2 size={18} className="highlight-icon" />
              <span>Conformité <strong>ISO 50001 & ESG</strong></span>
            </div>
            <div className="highlight-item">
              <CheckCircle2 size={18} className="highlight-icon" />
              <span>Interventions en <strong>Afrique de l'Ouest</strong></span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-card-hero">
            <div className="hero-badge-floating">
              <Flame size={20} className="floating-icon" />
              <div>
                <strong>Combustion Propre</strong>
                <p>Brûleurs Gaz, Fioul & Bicarburation</p>
              </div>
            </div>
            <img
              src="/assets/products/bruleur-tbg-450.jpg"
              alt="Brûleur industriel haute performance"
              className="hero-main-img"
            />
            <div className="hero-stats-row">
              <div className="stat-pill">
                <span className="stat-num">+15 ans</span>
                <span className="stat-label">d'expertise</span>
              </div>
              <div className="stat-pill">
                <span className="stat-num">&gt;93%</span>
                <span className="stat-label">rendement thermique</span>
              </div>
              <div className="stat-pill">
                <span className="stat-num">Low-NOx</span>
                <span className="stat-label">émissions réduites</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
