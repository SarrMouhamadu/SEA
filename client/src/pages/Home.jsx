import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ContactForm from '../components/ContactForm';
import AutoDiagnosticModal from '../components/AutoDiagnosticModal';
import ReferenceCard from '../components/ReferenceCard';
import { Sparkles, ArrowRight, CheckCircle2, TrendingDown, Gauge, ShieldCheck, Award, Building2 } from 'lucide-react';

const homeReferences = [
  {
    id: 1,
    title: "Audit Énergétique & Décarbonation Industrielle",
    sector: "industrie",
    sectorLabel: "Industrie & Agroalimentaire",
    clientType: "Grandes Entreprises & PME",
    expertiseLabel: "Énergie durable & Efficacité",
    description: "Diagnostic instrumenté complet des utilités thermiques et d'air comprimé avec mise en place d'un plan de comptage conforme ISO 50001.",
    keyImpact: "-23% de consommation d'énergie fossile"
  },
  {
    id: 2,
    title: "Structuration de Lignes Vertes & Due Diligence ESG",
    sector: "finance",
    sectorLabel: "Institutions Financières",
    clientType: "Banques & Bailleurs de Fonds",
    expertiseLabel: "Finance climat & durable",
    description: "Élaboration de taxonomies climat, critères d'éligibilité pour fonds verts et screening technique des projets d'investissement durable.",
    keyImpact: "Portefeuille vert de 25M€ structuré et certifié"
  },
  {
    id: 3,
    title: "Transition Énergie & Éco-Parcs Industriels",
    sector: "public",
    sectorLabel: "Secteur Public & Bailleurs",
    clientType: "Gouvernements & Partenaires (GIZ, UE, BAD)",
    expertiseLabel: "Stratégies & politiques publiques",
    description: "Assistance technique aux ministères et institutions pour l'aménagement durable et les feuilles de route de décarbonation des parcs industriels.",
    keyImpact: "Cadre national & feuille de route Net-Zero déployés"
  }
];

export default function Home() {
  const [diagModalOpen, setDiagModalOpen] = useState(false);
  const [refFilter, setRefFilter] = useState('all');

  const filteredReferences = refFilter === 'all'
    ? homeReferences
    : homeReferences.filter(r => r.sector === refFilter);

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

      {/* 4. RÉFÉRENCES PHARES */}
      <section id="references" className="products-section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '36px' }}>
            <div>
              <p className="section-label">PROJETS & RÉALISATIONS</p>
              <h2 className="section-heading" style={{ margin: 0, color: 'var(--color-text-dark)' }}>
                Références phares
              </h2>
            </div>

            {/* Filtres par secteur */}
            <div className="ref-filters">
              <button
                className={`ref-filter-btn ${refFilter === 'all' ? 'active' : ''}`}
                onClick={() => setRefFilter('all')}
              >
                Tous
              </button>
              <button
                className={`ref-filter-btn ${refFilter === 'industrie' ? 'active' : ''}`}
                onClick={() => setRefFilter('industrie')}
              >
                Industrie
              </button>
              <button
                className={`ref-filter-btn ${refFilter === 'finance' ? 'active' : ''}`}
                onClick={() => setRefFilter('finance')}
              >
                Finance Climat
              </button>
              <button
                className={`ref-filter-btn ${refFilter === 'public' ? 'active' : ''}`}
                onClick={() => setRefFilter('public')}
              >
                Secteur Public
              </button>
            </div>
          </div>

          <div className="grid grid-3" style={{ marginBottom: '32px' }}>
            {filteredReferences.map((refItem) => (
              <ReferenceCard key={refItem.id} item={refItem} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <Link to="/references" className="btn btn-primary" style={{ padding: '14px 28px' }}>
              Consulter toutes nos références projets <ArrowRight size={18} />
            </Link>
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
