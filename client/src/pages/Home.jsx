import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ContactForm from '../components/ContactForm';
import AutoDiagnosticModal from '../components/AutoDiagnosticModal';
import PartnerCarousel from '../components/PartnerCarousel';
import { ArrowRight, TrendingDown, Gauge, ShieldCheck, Award, Phone, Mail } from 'lucide-react';

export default function Home() {
  const [diagModalOpen, setDiagModalOpen] = useState(false);

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
            <Link to="/services" className="ph">
              <img src="/assets/claude/expertise-energie-durable.jpg" alt="Énergie durable" style={{ objectPosition: '50% 70%' }} />
              <div className="sc"></div>
              <div className="ph-text">
                <span className="ph-number">01</span>
                <b className="ph-title">Énergie durable</b>
              </div>
            </Link>

            {/* 02 Production propre */}
            <Link to="/services" className="ph">
              <img src="/assets/claude/expertise-production-propre.jpg" alt="Production propre" style={{ objectPosition: '60% 50%' }} />
              <div className="sc"></div>
              <div className="ph-text">
                <span className="ph-number">02</span>
                <b className="ph-title">Production propre</b>
              </div>
            </Link>

            {/* 03 Finance climat & durable */}
            <Link to="/services" className="ph">
              <img src="/assets/claude/expertise-finance-esg.jpg" alt="Finance climat & durable" style={{ objectPosition: '50% 50%' }} />
              <div className="sc"></div>
              <div className="ph-text">
                <span className="ph-number">03</span>
                <b className="ph-title">Finance climat & ESG</b>
              </div>
            </Link>

            {/* 04 Stratégies & politiques publiques */}
            <Link to="/services" className="ph">
              <img src="/assets/claude/blog-ecoparcs.jpg" alt="Stratégies & politiques publiques" style={{ objectPosition: '50% 50%' }} />
              <div className="sc"></div>
              <div className="ph-text">
                <span className="ph-number">04</span>
                <b className="ph-title">Stratégies & Politiques</b>
              </div>
            </Link>

            {/* 05 Formation & innovation */}
            <Link to="/services" className="ph">
              <img src="/assets/claude/expertise-formation-innovation.jpg" alt="Formation & innovation" style={{ objectPosition: '30% 50%' }} />
              <div className="sc"></div>
              <div className="ph-text">
                <span className="ph-number">05</span>
                <b className="ph-title">Formation & Innovation</b>
              </div>
            </Link>
          </div>

          <div style={{ textAlign: 'center', marginTop: '36px' }}>
            <Link to="/services" className="btn btn-primary" style={{ padding: '14px 28px' }}>
              Découvrir en détail nos 6 pôles d'expertise <ArrowRight size={18} />
            </Link>
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
              <div className="kpi-val">&gt; 95%</div>
              <p className="kpi-desc">D'objectifs énergétiques et climatiques contractuellement atteints</p>
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

      {/* 4. ACCÈS À L'AUTODIAGNOSTIC (Bannière interactive 3 étapes) */}
      <section className="autodiag-cta-section">
        <div className="container">
          <div className="autodiag-card">
            <div className="autodiag-card-content">
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
              <Link
                to="/autodiagnostic"
                className="btn-pill btn-pill-orange"
                style={{ padding: '20px 36px', fontSize: '17px', width: '100%', textAlign: 'center', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
              >
                Lancer mon autodiagnostic <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PARTENAIRES (Techniques & Références Clients) */}
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

          <h3 className="partners-subheading">Clients, Bailleurs & Partenaires Institutionnels</h3>
          <PartnerCarousel />
        </div>
      </section>

      {/* 7. CONTACT (Bannière Passons à l'action + Formulaire unique) */}
      <section id="contact" className="cta-banner">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'center' }}>
            <div>
              <p className="section-label" style={{ color: '#FFFFFF', opacity: 0.9 }}>CONTACTEZ-NOUS</p>
              <h2 className="cta-title">Passons à l'action.</h2>
              <p className="cta-contact-info" style={{ marginBottom: '14px', lineHeight: 1.5 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                  <Phone size={15} style={{ flexShrink: 0 }} /> Tel : +221 77 217 33 64 · Fixe : +221 33 945 56 47
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '15px', opacity: 0.95, marginTop: '4px' }}>
                  <Mail size={15} style={{ flexShrink: 0 }} /> contact@senergysafrica.com · support_tech@senergysafrica.com
                </span>
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
