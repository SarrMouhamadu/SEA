import React from 'react';

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-map">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/assets/claude/hero-africa-bg.png"
          aria-label="Carte animée énergétique de l'Afrique"
        >
          <source src="/assets/claude/map-africa.mp4" type="video/mp4" />
          <img
            src="/assets/claude/hero-africa-bg.png"
            alt="Carte énergétique de l'Afrique"
          />
        </video>
      </div>

      <div className="hero-overlay"></div>

      <div className="hero-content">
        <div className="hero-inner">
          <p className="hero-tag">INGÉNIERIE ET CONSEIL EN DÉVELOPPEMENT DURABLE</p>
          <h1 className="hero-title">
            <span className="wm"><span className="w" style={{ '--i': 0 }}>Accélérer</span></span>{' '}
            <span className="wm"><span className="w" style={{ '--i': 1 }}>la</span></span>{' '}
            <span className="wm"><span className="w" style={{ '--i': 2 }}>transition.</span></span>
            <br />
            <span className="wm">
              <span className="w gar" style={{ '--i': 4, color: 'var(--color-orange)', fontStyle: 'italic' }}>
                Garantir
              </span>
            </span>{' '}
            <span className="wm"><span className="w" style={{ '--i': 5 }}>les</span></span>{' '}
            <span className="wm"><span className="w" style={{ '--i': 6 }}>résultats.</span></span>
          </h1>

          <p className="hero-subtitle">
            Depuis 2015, au service de l'Afrique de l'Ouest.
          </p>

          <div className="hero-actions">
            <a href="#contact" className="btn-pill btn-pill-orange">
              Demander un diagnostic gratuit
            </a>
            <a href="#competences" className="btn-pill btn-pill-outline-gold">
              Nos domaines d'expertise
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
