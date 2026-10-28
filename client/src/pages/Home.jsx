import React, { useState } from 'react';
import Hero from '../components/Hero';
import ContactForm from '../components/ContactForm';
import AutoDiagnosticModal from '../components/AutoDiagnosticModal';
import { Sparkles, ArrowRight, CheckCircle2, TrendingDown, Gauge, ShieldCheck, Award } from 'lucide-react';

export default function Home() {
  const [diagModalOpen, setDiagModalOpen] = useState(false);
  const [productFilter, setProductFilter] = useState('all');

  return (
    <div className="home-page">
      {/* 1. MESSAGE CLÉ ET ACCROCHE */}
      <Hero />

      {/* Bandeau défilant (Marquee) */}
      <section className="marquee-bar">
        <div className="mq">
          <span>Industrie</span><i></i>
          <span>Énergie</span><i></i>
          <span>Tertiaire et services</span><i></i>
          <span>Oil and gas, mines</span><i></i>
          <span>Institutions financières</span><i></i>
          <span>Secteur public</span><i></i>
          <span>PME-PMI</span><i></i>
          <span>Industrie</span><i></i>
          <span>Énergie</span><i></i>
          <span>Tertiaire et services</span><i></i>
          <span>Oil and gas, mines</span><i></i>
          <span>Institutions financières</span><i></i>
          <span>Secteur public</span><i></i>
          <span>PME-PMI</span><i></i>
        </div>
      </section>

      {/* 2. NOS EXPERTISES (Les 5 Pôles) */}
      <section id="competences" className="expertise-section">
        <div className="container">
          <p className="section-label">SERVICES & SOLUTIONS</p>
          <h2 className="section-heading" style={{ color: 'var(--color-text-dark)' }}>
            Nos expertises
          </h2>

          <div className="expertise-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))' }}>
            {/* 01 Énergie durable */}
            <a href="#contact" className="ph">
              <img src="/assets/claude/expertise-energie-durable.jpg" alt="Énergie durable" style={{ objectPosition: '50% 70%' }} />
              <div className="sc"></div>
              <div className="ph-text">
                <span className="ph-number">01</span>
                <b className="ph-title">Énergie durable</b>
              </div>
            </a>

            {/* 02 Production propre */}
            <a href="#contact" className="ph">
              <img src="/assets/claude/expertise-production-propre.jpg" alt="Production propre" style={{ objectPosition: '60% 50%' }} />
              <div className="sc"></div>
              <div className="ph-text">
                <span className="ph-number">02</span>
                <b className="ph-title">Production propre</b>
              </div>
            </a>

            {/* 03 Finance climat & durable */}
            <a href="#contact" className="ph">
              <img src="/assets/claude/expertise-finance-esg.jpg" alt="Finance climat & durable" style={{ objectPosition: '50% 50%' }} />
              <div className="sc"></div>
              <div className="ph-text">
                <span className="ph-number">03</span>
                <b className="ph-title">Finance climat & ESG</b>
              </div>
            </a>

            {/* 04 Stratégies & politiques publiques */}
            <a href="#contact" className="ph">
              <img src="/assets/claude/blog-ecoparcs.jpg" alt="Stratégies & politiques publiques" style={{ objectPosition: '50% 50%' }} />
              <div className="sc"></div>
              <div className="ph-text">
                <span className="ph-number">04</span>
                <b className="ph-title">Stratégies & Politiques</b>
              </div>
            </a>

            {/* 05 Formation & innovation */}
            <a href="#contact" className="ph">
              <img src="/assets/claude/expertise-formation-innovation.jpg" alt="Formation & innovation" style={{ objectPosition: '30% 50%' }} />
              <div className="sc"></div>
              <div className="ph-text">
                <span className="ph-number">05</span>
                <b className="ph-title">Formation & Innovation</b>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* 3. CHIFFRES CLÉS */}
      <section className="kpi-strip-section">
        <div className="container">
          <div className="kpi-strip-grid">
            <div className="kpi-card">
              <div className="kpi-icon-box">
                <Award size={26} color="var(--color-orange)" />
              </div>
              <div className="kpi-val">Depuis 2015</div>
              <p className="kpi-desc">Société d'ingénierie et de conseil en développement durable</p>
            </div>

            <div className="kpi-card">
              <div className="kpi-icon-box">
                <TrendingDown size={26} color="#3F7A5A" />
              </div>
              <div className="kpi-val">Jusqu'à -25%</div>
              <p className="kpi-desc">De réduction immédiate sur la facture combustible</p>
            </div>

            <div className="kpi-card">
              <div className="kpi-icon-box">
                <Gauge size={26} color="var(--color-gold)" />
              </div>
              <div className="kpi-val">&gt; 93%</div>
              <p className="kpi-desc">De rendement thermique sur nos brûleurs industriels</p>
            </div>

            <div className="kpi-card">
              <div className="kpi-icon-box">
                <ShieldCheck size={26} color="#123B2E" />
              </div>
              <div className="kpi-val">+50 projets</div>
              <p className="kpi-desc">Audits certifiés ISO 50001 & financements verts structurés</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. RÉFÉRENCES PHARES (Brûleurs & Solutions) */}
      <section id="references" className="products-section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '36px' }}>
            <div>
              <p className="section-label">CATALOGUE TECHNIQUE & PROJETS</p>
              <h2 className="section-heading" style={{ margin: 0, color: 'var(--color-text-dark)' }}>
                Références phares
              </h2>
            </div>

            {/* Filtres par type de brûleur */}
            <div className="ref-filters">
              <button
                className={`ref-filter-btn ${productFilter === 'all' ? 'active' : ''}`}
                onClick={() => setProductFilter('all')}
              >
                Tous
              </button>
              <button
                className={`ref-filter-btn ${productFilter === 'gaz' ? 'active' : ''}`}
                onClick={() => setProductFilter('gaz')}
              >
                Gaz
              </button>
              <button
                className={`ref-filter-btn ${productFilter === 'fioul' ? 'active' : ''}`}
                onClick={() => setProductFilter('fioul')}
              >
                Fioul
              </button>
              <button
                className={`ref-filter-btn ${productFilter === 'mixte' ? 'active' : ''}`}
                onClick={() => setProductFilter('mixte')}
              >
                Mixtes Gaz/Fioul
              </button>
            </div>
          </div>

          <div className="products-grid">
            {/* Brûleurs à gaz */}
            {(productFilter === 'all' || productFilter === 'gaz') && (
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
                  <div>
                    <b className="prod-name">Brûleurs à gaz Low-NOx</b>
                    <span style={{ display: 'block', fontSize: '13px', opacity: 0.8, marginTop: '4px' }}>
                      Série TBG · 500 à 7 500 kW
                    </span>
                  </div>
                  <span className="prod-cta">Fiche technique →</span>
                </div>
              </a>
            )}

            {/* Brûleurs à fioul */}
            {(productFilter === 'all' || productFilter === 'fioul') && (
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
                  <div>
                    <b className="prod-name">Brûleurs à fioul lourd & léger</b>
                    <span style={{ display: 'block', fontSize: '13px', opacity: 0.8, marginTop: '4px' }}>
                      Série TBL · 1 000 à 10 500 kW
                    </span>
                  </div>
                  <span className="prod-cta">Fiche technique →</span>
                </div>
              </a>
            )}

            {/* Brûleurs mixtes */}
            {(productFilter === 'all' || productFilter === 'mixte') && (
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
                  <div>
                    <b className="prod-name">Brûleurs mixtes bivalents</b>
                    <span style={{ display: 'block', fontSize: '13px', opacity: 0.8, marginTop: '4px' }}>
                      Série TBML · Bicarburation instantanée
                    </span>
                  </div>
                  <span className="prod-cta">Fiche technique →</span>
                </div>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* 5. ACCÈS À L'AUTODIAGNOSTIC (Bannière interactive 3 étapes) */}
      <section className="autodiag-cta-section">
        <div className="container">
          <div className="autodiag-card">
            <div className="autodiag-card-content">
              <span className="diag-modal-badge" style={{ background: 'rgba(232, 113, 43, 0.2)', color: 'var(--color-orange)' }}>
                <Sparkles size={15} /> Parcours interactif gratuit
              </span>
              <h2 className="autodiag-heading">
                Évaluez vos gains énergétiques en 3 étapes
              </h2>
              <p className="autodiag-text">
                Obtenez une première estimation personnalisée de vos économies potentielles (jusqu'à 25% de consommation en moins) et identifiez les leviers de décarbonation adaptés à votre site industriel.
              </p>
              <div className="autodiag-steps-summary">
                <div className="mini-step">
                  <span className="step-num">1</span>
                  <span>Questionnaire rapide</span>
                </div>
                <div className="mini-step">
                  <span className="step-num">2</span>
                  <span>Résultats & Recommandations</span>
                </div>
                <div className="mini-step">
                  <span className="step-num">3</span>
                  <span>Accompagnement expert</span>
                </div>
              </div>
            </div>

            <div className="autodiag-btn-wrapper">
              <button
                onClick={() => setDiagModalOpen(true)}
                className="btn-pill btn-pill-orange"
                style={{ padding: '20px 36px', fontSize: '17px', width: '100%' }}
              >
                Lancer mon autodiagnostic <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PARTENAIRES (Techniques, Universités & Références Clients) */}
      <section id="partenaires" className="partners-section">
        <div className="container">
          <p className="section-label">ÉCOSYSTÈME DE CONFIANCE</p>
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
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))', gap: '8px' }}>
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
                <b style={{ fontFamily: 'var(--font-display)', fontSize: 22 }}>Projets & Équipements</b>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))', gap: '8px' }}>
                <div className="lg" role="img" aria-label="Logo RDE" style={{ backgroundPosition: '66.667% 0' }}></div>
                <div className="lg" role="img" aria-label="Logo YASKAWA" style={{ backgroundPosition: '33.333% 0' }}></div>
                <div className="lt">APROSI</div>
              </div>
            </div>
          </div>

          <h3 className="partners-subheading">Enseignement & Recherche</h3>
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

          <h3 className="partners-subheading">Clients & Références</h3>
          <img
            src="/assets/claude/partenaires-clients-all.jpg"
            alt="Logos des clients et références de SEnergyS Africa"
            style={{ width: '100%', display: 'block', borderRadius: 12, border: '1px solid var(--color-sand-dark)' }}
          />
        </div>
      </section>

      {/* 7. CONTACT (Bannière Passons à l'action + Formulaire unique) */}
      <section id="contact" className="cta-banner">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'center' }}>
            <div>
              <p className="section-label" style={{ color: '#FFFFFF', opacity: 0.9 }}>CONTACTEZ-NOUS</p>
              <h2 className="cta-title">Passons à l'action.</h2>
              <p className="cta-contact-info" style={{ marginBottom: '24px' }}>
                contact@senergysafrica.com · +221 77 217 33 64
              </p>
              <p style={{ fontSize: '16px', lineHeight: 1.6, opacity: 0.9 }}>
                P2ID · Bâtiment APROSI, 3ème étage · Diamniadio, Sénégal.
                Nos ingénieurs sont disponibles pour étudier votre projet et vos équipements thermiques.
              </p>
            </div>

            <div className="contact-card-box">
              <h3 className="contact-card-title">
                Envoyer un message
              </h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Modal Autodiagnostic */}
      <AutoDiagnosticModal isOpen={diagModalOpen} onClose={() => setDiagModalOpen(false)} />
    </div>
  );
}
