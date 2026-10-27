import React, { useState } from 'react';
import Hero from '../components/Hero';
import ContactForm from '../components/ContactForm';

export default function Home() {
  const [showModalForm, setShowModalForm] = useState(false);

  return (
    <div className="home-page">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Bandeau Défilant Marquee */}
      <section className="marquee-bar">
        <div className="mq">
          <span>Industrie</span><i></i>
          <span>Énergie</span><i></i>
          <span>Tertiaire et services</span><i></i>
          <span>Oil and gas, mines</span><i></i>
          <span>Institutions financières</span><i></i>
          <span>PME-PMI</span><i></i>
          <span>Industrie</span><i></i>
          <span>Énergie</span><i></i>
          <span>Tertiaire et services</span><i></i>
          <span>Oil and gas, mines</span><i></i>
          <span>Institutions financières</span><i></i>
          <span>PME-PMI</span><i></i>
        </div>
      </section>

      {/* 3. Section À Propos */}
      <section id="apropos" className="about-section">
        <div className="container">
          <div className="about-grid">
            <div className="about-photo-wrapper">
              <img
                src="/assets/claude/expertise-production-propre.jpg"
                alt="Complexe industriel"
                className="about-photo"
              />
              <div className="about-circle-accent"></div>
            </div>

            <div>
              <p className="section-label">À PROPOS</p>
              <h2 className="about-title">Des résultats qui engagent.</h2>
              <ul className="about-list">
                <li>
                  <i style={{ background: '#E8712B' }}></i>
                  Les besoins des communautés d'abord
                </li>
                <li>
                  <i style={{ background: '#3F7A5A' }}></i>
                  Engagement sur les résultats, jusqu'au co-investissement
                </li>
                <li>
                  <i style={{ background: '#F2C88B' }}></i>
                  Une offre adaptée aux PME-PMI
                </li>
                <li>
                  <i style={{ background: '#4A2F1C' }}></i>
                  Des outils collaboratifs innovants
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Domaines d'Expertise */}
      <section id="competences" className="expertise-section">
        <div className="container">
          <h2 className="section-heading" style={{ color: 'var(--color-text-dark)' }}>
            Domaines d'expertise
          </h2>

          <div className="expertise-grid">
            <a href="#contact" className="ph">
              <img src="/assets/claude/expertise-energie-durable.jpg" alt="Énergie durable" style={{ objectPosition: '50% 70%' }} />
              <div className="sc"></div>
              <div className="ph-text">
                <span className="ph-number">01</span>
                <b className="ph-title">Énergie durable</b>
              </div>
            </a>

            <a href="#contact" className="ph">
              <img src="/assets/claude/expertise-production-propre.jpg" alt="Production propre" style={{ objectPosition: '60% 50%' }} />
              <div className="sc"></div>
              <div className="ph-text">
                <span className="ph-number">02</span>
                <b className="ph-title">Production propre</b>
              </div>
            </a>

            <a href="#contact" className="ph">
              <img src="/assets/claude/expertise-finance-esg.jpg" alt="Finance durable ESG" style={{ objectPosition: '50% 50%' }} />
              <div className="sc"></div>
              <div className="ph-text">
                <span className="ph-number">03</span>
                <b className="ph-title">Finance durable ESG</b>
              </div>
            </a>

            <a href="#contact" className="ph">
              <img src="/assets/claude/expertise-formation-innovation.jpg" alt="Formation et innovation" style={{ objectPosition: '30% 50%' }} />
              <div className="sc"></div>
              <div className="ph-text">
                <span className="ph-number">04</span>
                <b className="ph-title">Formation et innovation</b>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* 5. Nos Produits (Brûleurs avec SVG interactifs) */}
      <section id="produits" className="products-section">
        <div className="container">
          <h2 className="section-heading" style={{ color: 'var(--color-text-dark)' }}>
            Nos produits
          </h2>

          <div className="products-grid">
            {/* Brûleurs à gaz */}
            <a href="#contact" className="prod" style={{ background: '#123B2E' }}>
              <div className="pv">
                <svg viewBox="0 0 360 240" width="100%" height="100%" role="img" aria-label="Illustration d'un brûleur à gaz">
                  <circle className="gl" cx="300" cy="132" r="96" fill="#E8712B" opacity=".22"></circle>
                  <path d="M0 206h360" stroke="rgba(246,241,231,.25)" strokeWidth="2"></path>
                  <rect x="56" y="176" width="16" height="30" fill="#F2C88B"></rect>
                  <rect x="186" y="156" width="16" height="50" fill="#F2C88B"></rect>
                  <rect x="164" y="64" width="16" height="40" fill="#F6F1E7"></rect>
                  <circle cx="172" cy="58" r="11" fill="none" stroke="#F2C88B" strokeWidth="4"></circle>
                  <path d="M164 58h16M172 50v16" stroke="#F2C88B" strokeWidth="3"></path>
                  <rect x="30" y="80" width="106" height="104" rx="22" fill="#F6F1E7"></rect>
                  <circle cx="83" cy="132" r="32" fill="#123B2E"></circle>
                  <g stroke="#F2C88B" strokeWidth="5" strokeLinecap="round">
                    <path d="M83 108v48M59 132h48M66 115l34 34M100 115l-34 34"></path>
                  </g>
                  <circle cx="83" cy="132" r="7" fill="#F6F1E7"></circle>
                  <rect x="136" y="104" width="112" height="56" fill="#F2C88B"></rect>
                  <path d="M168 104v56M200 104v56M232 104v56" stroke="#123B2E" strokeOpacity=".35" strokeWidth="3"></path>
                  <rect x="248" y="90" width="14" height="84" rx="3" fill="#F6F1E7"></rect>
                  <rect x="262" y="112" width="26" height="40" fill="#F2C88B"></rect>
                  <path d="M262 120h26M262 144h26" stroke="#123B2E" strokeOpacity=".4" strokeWidth="3"></path>
                  <g className="fl">
                    <path d="M288 132C308 98 336 106 356 132 336 158 308 166 288 132z" fill="#E8712B"></path>
                    <path d="M288 132C305 112 326 116 342 132 326 148 305 152 288 132z" fill="#F2C88B"></path>
                    <path d="M288 132C300 122 314 124 324 132 314 140 300 142 288 132z" fill="#5AA0D8"></path>
                  </g>
                </svg>
              </div>
              <div className="prod-footer">
                <b className="prod-name">Brûleurs à gaz</b>
                <span className="prod-cta">Voir →</span>
              </div>
            </a>

            {/* Brûleurs à fioul */}
            <a href="#contact" className="prod" style={{ background: '#3F7A5A' }}>
              <div className="pv">
                <svg viewBox="0 0 360 240" width="100%" height="100%" role="img" aria-label="Illustration d'un brûleur à fioul">
                  <circle className="gl" cx="300" cy="132" r="96" fill="#E8712B" opacity=".22"></circle>
                  <path d="M0 206h360" stroke="rgba(246,241,231,.25)" strokeWidth="2"></path>
                  <rect x="56" y="176" width="16" height="30" fill="#F2C88B"></rect>
                  <rect x="186" y="156" width="16" height="50" fill="#F2C88B"></rect>
                  <rect x="212" y="78" width="12" height="26" fill="#F6F1E7"></rect>
                  <path d="M218 34c9 14 16 22 16 32a16 16 0 0 1-32 0c0-10 7-18 16-32z" fill="#E8712B"></path>
                  <path d="M212 62a7 7 0 0 0 6 7" stroke="#F2C88B" strokeWidth="3" fill="none" strokeLinecap="round"></path>
                  <rect x="30" y="80" width="106" height="104" rx="22" fill="#F6F1E7"></rect>
                  <circle cx="83" cy="132" r="32" fill="#3F7A5A"></circle>
                  <g stroke="#F2C88B" strokeWidth="5" strokeLinecap="round">
                    <path d="M83 108v48M59 132h48M66 115l34 34M100 115l-34 34"></path>
                  </g>
                  <circle cx="83" cy="132" r="7" fill="#F6F1E7"></circle>
                  <rect x="136" y="104" width="112" height="56" fill="#F2C88B"></rect>
                  <path d="M168 104v56M200 104v56M232 104v56" stroke="#3F7A5A" strokeOpacity=".35" strokeWidth="3"></path>
                  <rect x="248" y="90" width="14" height="84" rx="3" fill="#F6F1E7"></rect>
                  <rect x="262" y="112" width="26" height="40" fill="#F2C88B"></rect>
                  <path d="M262 120h26M262 144h26" stroke="#3F7A5A" strokeOpacity=".4" strokeWidth="3"></path>
                  <g className="fl">
                    <path d="M288 132C308 98 336 106 356 132 336 158 308 166 288 132z" fill="#E8712B"></path>
                    <path d="M288 132C305 112 326 116 342 132 326 148 305 152 288 132z" fill="#F2C88B"></path>
                    <path d="M288 132C300 122 314 124 324 132 314 140 300 142 288 132z" fill="#F2C88B"></path>
                  </g>
                </svg>
              </div>
              <div className="prod-footer">
                <b className="prod-name">Brûleurs à fioul</b>
                <span className="prod-cta">Voir →</span>
              </div>
            </a>

            {/* Brûleurs mixtes */}
            <a href="#contact" className="prod" style={{ background: '#4A2F1C' }}>
              <div className="pv">
                <svg viewBox="0 0 360 240" width="100%" height="100%" role="img" aria-label="Illustration d'un brûleur mixte gaz-fioul">
                  <circle className="gl" cx="300" cy="132" r="96" fill="#E8712B" opacity=".22"></circle>
                  <path d="M0 206h360" stroke="rgba(246,241,231,.25)" strokeWidth="2"></path>
                  <rect x="56" y="176" width="16" height="30" fill="#F2C88B"></rect>
                  <rect x="186" y="156" width="16" height="50" fill="#F2C88B"></rect>
                  <rect x="150" y="64" width="16" height="40" fill="#F6F1E7"></rect>
                  <circle cx="158" cy="58" r="11" fill="none" stroke="#F2C88B" strokeWidth="4"></circle>
                  <path d="M150 58h16M158 50v16" stroke="#F2C88B" strokeWidth="3"></path>
                  <rect x="226" y="78" width="12" height="26" fill="#F6F1E7"></rect>
                  <path d="M232 34c9 14 16 22 16 32a16 16 0 0 1-32 0c0-10 7-18 16-32z" fill="#E8712B"></path>
                  <path d="M226 62a7 7 0 0 0 6 7" stroke="#F2C88B" strokeWidth="3" fill="none" strokeLinecap="round"></path>
                  <rect x="30" y="80" width="106" height="104" rx="22" fill="#F6F1E7"></rect>
                  <circle cx="83" cy="132" r="32" fill="#4A2F1C"></circle>
                  <g stroke="#F2C88B" strokeWidth="5" strokeLinecap="round">
                    <path d="M83 108v48M59 132h48M66 115l34 34M100 115l-34 34"></path>
                  </g>
                  <circle cx="83" cy="132" r="7" fill="#F6F1E7"></circle>
                  <rect x="136" y="104" width="112" height="56" fill="#F2C88B"></rect>
                  <path d="M168 104v56M200 104v56M232 104v56" stroke="#4A2F1C" strokeOpacity=".35" strokeWidth="3"></path>
                  <rect x="248" y="90" width="14" height="84" rx="3" fill="#F6F1E7"></rect>
                  <rect x="262" y="112" width="26" height="40" fill="#F2C88B"></rect>
                  <path d="M262 120h26M262 144h26" stroke="#4A2F1C" strokeOpacity=".4" strokeWidth="3"></path>
                  <g className="fl">
                    <path d="M288 132C308 98 336 106 356 132 336 158 308 166 288 132z" fill="#E8712B"></path>
                    <path d="M288 132C305 112 326 116 342 132 326 148 305 152 288 132z" fill="#F2C88B"></path>
                    <path d="M288 132C300 122 314 124 324 132 314 140 300 142 288 132z" fill="#F2C88B"></path>
                  </g>
                </svg>
              </div>
              <div className="prod-footer">
                <b className="prod-name">Brûleurs mixtes gaz-fioul</b>
                <span className="prod-cta">Voir →</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* 6. Notre Équipe */}
      <section id="equipe" className="team-section">
        <div className="container">
          <h2 className="section-heading" style={{ color: 'var(--color-sand)' }}>
            Notre équipe
          </h2>

          <div className="team-grid">
            <div>
              <div className="face" style={{ backgroundPosition: '0.0000% 0' }} role="img" aria-label="Portrait de Abdoulaye SECK"></div>
              <b className="team-name">Abdoulaye SECK</b>
              <span className="team-role">Fondateur · Énergie et finance durable</span>
            </div>

            <div>
              <div className="face" style={{ backgroundPosition: '16.6667% 0' }} role="img" aria-label="Portrait de Assane SECK"></div>
              <b className="team-name">Assane SECK</b>
              <span className="team-role">Industrie et gestion du changement</span>
            </div>

            <div>
              <div className="face" style={{ backgroundPosition: '33.3333% 0' }} role="img" aria-label="Portrait de Mouhamadou Chamsdine DIA"></div>
              <b className="team-name">Mouhamadou Chamsdine DIA</b>
              <span className="team-role">Environnement</span>
            </div>

            <div>
              <div className="face" style={{ backgroundPosition: '50.0000% 0' }} role="img" aria-label="Portrait de Khadidiatou Sy NDOUR"></div>
              <b className="team-name">Khadidiatou Sy NDOUR</b>
              <span className="team-role">Marketing et communication</span>
            </div>

            <div>
              <div className="face" style={{ backgroundPosition: '66.6667% 0' }} role="img" aria-label="Portrait de Adama CAMARA"></div>
              <b className="team-name">Adama CAMARA</b>
              <span className="team-role">Développement durable</span>
            </div>

            <div>
              <div className="face" style={{ backgroundPosition: '83.3333% 0' }} role="img" aria-label="Portrait de Fatou Mbaye BOIRO"></div>
              <b className="team-name">Fatou Mbaye BOIRO</b>
              <span className="team-role">Déchets et économie circulaire</span>
            </div>

            <div>
              <div className="face" style={{ backgroundPosition: '100.0000% 0' }} role="img" aria-label="Portrait de Fatimata Dione FALL"></div>
              <b className="team-name">Fatimata Dione FALL</b>
              <span className="team-role">Énergie durable</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Section Blog / Actualités */}
      <section id="actualites" className="blog-section">
        <div className="container">
          <h2 className="section-heading" style={{ color: 'var(--color-text-dark)' }}>
            Blog
          </h2>

          <div className="blog-grid">
            <article className="blog-card">
              <img
                src="/assets/claude/blog-ecoparcs.jpg"
                alt="Site industriel"
                className="blog-card-img"
              />
              <div className="blog-card-body">
                <p className="blog-tag">FORMATION · AVRIL – MAI 2021</p>
                <h3 style={{ margin: '0 0 10px', fontSize: '28px', lineHeight: 1.15 }}>
                  Les éco-parcs industriels au Sénégal
                </h3>
                <p style={{ margin: 0, fontSize: '15px', color: '#666' }}>
                  Avec le FEM, l'ONUDI, la DEEC et l'APROSI SN.
                </p>
              </div>
            </article>

            <article className="blog-card-dark">
              <svg width="72" height="72" viewBox="0 0 72 72" fill="none" stroke="var(--color-orange)" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
                <circle cx="36" cy="36" r="24"></circle>
                <path d="M36 36l14-14M36 12v6M60 36h-6M12 36h6"></path>
              </svg>
              <div>
                <p style={{ margin: '0 0 8px', fontSize: '13px', letterSpacing: '1.5px', color: 'var(--color-gold)', fontWeight: 700 }}>
                  EFFICACITÉ ÉNERGÉTIQUE
                </p>
                <h3 style={{ margin: '0 0 10px', fontSize: '28px', lineHeight: 1.15 }}>
                  La variation de vitesse, vers l'industrie 4.0
                </h3>
                <p style={{ margin: 0, fontSize: '15px', color: 'var(--color-text-muted)' }}>
                  Moteurs et pompage solaire : moins d'énergie, un système plus léger.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 8. Section Partenaires */}
      <section id="partenaires" className="partners-section">
        <div className="container">
          <h2 className="section-heading" style={{ color: 'var(--color-text-dark)', marginBottom: 0 }}>
            Nos partenaires
          </h2>

          <h3 className="partners-subheading">Partenaires techniques</h3>
          <div className="partners-cat-grid">
            <div className="partner-box">
              <div className="partner-box-header">
                <i style={{ width: 12, height: 12, borderRadius: '50%', background: '#E8712B' }}></i>
                <b style={{ fontFamily: 'var(--font-display)', fontSize: 22 }}>Industrie</b>
              </div>
              <div className="lg" role="img" aria-label="Logo SERT-SADIA" style={{ backgroundPosition: '11.111% 0' }}></div>
            </div>

            <div className="partner-box">
              <div className="partner-box-header">
                <i style={{ width: 12, height: 12, borderRadius: '50%', background: '#3F7A5A' }}></i>
                <b style={{ fontFamily: 'var(--font-display)', fontSize: 22 }}>Énergie</b>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '8px' }}>
                <div className="lg" role="img" aria-label="Logo EMASOL" style={{ backgroundPosition: '22.222% 0' }}></div>
                <div className="lg" role="img" aria-label="Logo CER2E" style={{ backgroundPosition: '0.000% 0' }}></div>
                <div className="lg" role="img" aria-label="Logo HOUDATECH" style={{ backgroundPosition: '44.444% 0' }}></div>
              </div>
            </div>

            <div className="partner-box">
              <div className="partner-box-header">
                <i style={{ width: 12, height: 12, borderRadius: '50%', background: '#F2C88B' }}></i>
                <b style={{ fontFamily: 'var(--font-display)', fontSize: 22 }}>Finance d'entreprise</b>
              </div>
              <div className="lg" role="img" aria-label="Logo FINEKIP" style={{ backgroundPosition: '55.556% 0' }}></div>
            </div>

            <div className="partner-box">
              <div className="partner-box-header">
                <i style={{ width: 12, height: 12, borderRadius: '50%', background: '#4A2F1C' }}></i>
                <b style={{ fontFamily: 'var(--font-display)', fontSize: 22 }}>Formation</b>
              </div>
              <div className="lt">XELIT</div>
            </div>

            <div className="partner-box">
              <div className="partner-box-header">
                <i style={{ width: 12, height: 12, borderRadius: '50%', background: '#E8712B' }}></i>
                <b style={{ fontFamily: 'var(--font-display)', fontSize: 22 }}>Développement de projets</b>
              </div>
              <div className="lg" role="img" aria-label="Logo RDE" style={{ backgroundPosition: '66.667% 0' }}></div>
            </div>

            <div className="partner-box">
              <div className="partner-box-header">
                <i style={{ width: 12, height: 12, borderRadius: '50%', background: '#123B2E' }}></i>
                <b style={{ fontFamily: 'var(--font-display)', fontSize: 22 }}>Équipements & Institutions</b>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: '8px' }}>
                <div className="lg" role="img" aria-label="Logo YASKAWA" style={{ backgroundPosition: '33.333% 0' }}></div>
                <div className="lt">APROSI</div>
                <div className="lt">BMN</div>
              </div>
            </div>
          </div>

          <h3 className="partners-subheading">Enseignement et recherche</h3>
          <div className="partner-box">
            <div className="partner-box-header">
              <i style={{ width: 12, height: 12, borderRadius: '50%', background: '#3F7A5A' }}></i>
              <b style={{ fontFamily: 'var(--font-display)', fontSize: 22 }}>Universités et écoles</b>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
              <div className="lg" role="img" aria-label="Logo Université Gaston Berger" style={{ backgroundPosition: '100.000% 0' }}></div>
              <div className="lg" role="img" aria-label="Logo École Polytechnique de Thiès" style={{ backgroundPosition: '77.778% 0' }}></div>
              <div className="lg" role="img" aria-label="Logo DAUST" style={{ backgroundPosition: '88.889% 0' }}></div>
            </div>
          </div>

          <h3 className="partners-subheading">Clients et références</h3>
          <img
            src="/assets/claude/partenaires-clients-all.jpg"
            alt="Logos des clients et références de SEnergyS Africa"
            style={{ width: '100%', display: 'block', borderRadius: 12, border: '1px solid var(--color-sand-dark)' }}
          />
        </div>
      </section>

      {/* 9. Section Contact CTA */}
      <section id="contact" className="cta-banner">
        <div className="container cta-flex">
          <div>
            <h2 className="cta-title">Passons à l'action.</h2>
            <p className="cta-contact-info">
              contact@senergysafrica.com · +221 77 217 33 64
            </p>
          </div>
          <button
            onClick={() => setShowModalForm(true)}
            className="btn-pill btn-pill-forest"
            style={{ padding: '20px 38px', fontSize: '17px' }}
          >
            Nous écrire
          </button>
        </div>
      </section>

      {/* Modal Contact Form interactif */}
      {showModalForm && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(2, 12, 23, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px',
            backdropFilter: 'blur(4px)',
          }}
          onClick={() => setShowModalForm(false)}
        >
          <div
            style={{
              backgroundColor: '#fff',
              borderRadius: '20px',
              maxWidth: '650px',
              width: '100%',
              padding: '36px',
              boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
              position: 'relative',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '28px', color: 'var(--color-forest)' }}>Demande de contact</h3>
              <button
                onClick={() => setShowModalForm(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#666',
                }}
              >
                ✕
              </button>
            </div>
            <ContactForm onSuccess={() => setTimeout(() => setShowModalForm(false), 2000)} />
          </div>
        </div>
      )}
    </div>
  );
}
