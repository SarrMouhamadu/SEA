import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ContactForm from '../components/ContactForm';
import AutoDiagnosticModal from '../components/AutoDiagnosticModal';
import PartnerCarousel from '../components/PartnerCarousel';
import { ArrowRight, TrendingDown, Gauge, ShieldCheck, Award, Phone, Mail, ChevronLeft, ChevronRight } from 'lucide-react';

/* ── Données expertises ─────────────────────────────────────── */
const EXPERTISES = [
  { num: '01', title: 'Énergie durable',         img: '/assets/claude/expertise-energie-durable.jpg',       pos: '50% 70%' },
  { num: '02', title: 'Production propre',        img: '/assets/claude/expertise-production-propre.jpg',    pos: '60% 50%' },
  { num: '03', title: 'Finance climat & ESG',     img: '/assets/claude/expertise-finance-esg.jpg',          pos: '50% 50%' },
  { num: '04', title: 'Stratégies & Politiques',  img: '/assets/claude/blog-ecoparcs.jpg',                  pos: '50% 50%' },
  { num: '05', title: 'Formation & Innovation',   img: '/assets/claude/expertise-formation-innovation.jpg', pos: '30% 50%' },
];

function ExpertiseCarousel() {
  const scrollContainerRef = useRef(null);
  const currentScrollRef = useRef(0);
  const initializedRef = useRef(false);
  const [isPaused, setIsPaused] = useState(false);

  // 3 copies des 5 expertises = 15 cartes pour un défilement continu en boucle infinie
  const displayExpertises = [...EXPERTISES, ...EXPERTISES, ...EXPERTISES];

  // Initialisation au jeu du milieu
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const setInitialPosition = () => {
      if (container && container.scrollWidth > 0 && !initializedRef.current) {
        const oneThird = container.scrollWidth / 3;
        container.scrollLeft = oneThird;
        currentScrollRef.current = oneThird;
        initializedRef.current = true;
      }
    };

    setInitialPosition();
    const t1 = setTimeout(setInitialPosition, 100);
    const t2 = setTimeout(setInitialPosition, 300);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Défilement automatique continu en boucle fluide (60fps)
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationFrameId;
    const speed = 0.6; // Vitesse de lecture continue douce et apaisée (~36px/sec)

    const step = () => {
      if (!isPaused && container) {
        currentScrollRef.current += speed;
        const oneSetWidth = container.scrollWidth / 3;

        if (oneSetWidth > 0) {
          // Rebouclage infini invisible
          if (currentScrollRef.current >= 2 * oneSetWidth) {
            currentScrollRef.current -= oneSetWidth;
          } else if (currentScrollRef.current <= 0) {
            currentScrollRef.current += oneSetWidth;
          }
        }

        container.scrollLeft = currentScrollRef.current;
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  // Synchronisation lors du défilement manuel (touch / trackpad)
  const handleScroll = () => {
    if (scrollContainerRef.current && isPaused) {
      currentScrollRef.current = scrollContainerRef.current.scrollLeft;
    }
  };

  // Navigation manuelle carte par carte
  const scrollByCard = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const firstCard = container.querySelector('.exp-slide');
    const cardWidth = firstCard ? (firstCard.offsetWidth + 20) : 340;
    const amount = direction === 'next' ? cardWidth : -cardWidth;

    currentScrollRef.current += amount;
    container.scrollBy({ left: amount, behavior: 'smooth' });

    setTimeout(() => {
      if (container) {
        currentScrollRef.current = container.scrollLeft;
      }
    }, 450);
  };

  return (
    <div
      className="exp-carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Bouton précédent */}
      <button
        type="button"
        className="exp-nav exp-nav-prev"
        onClick={() => scrollByCard('prev')}
        aria-label="Expertise précédente"
      >
        <ChevronLeft size={22} />
      </button>

      {/* Piste en défilement continu en boucle */}
      <div
        ref={scrollContainerRef}
        className="exp-track"
        onScroll={handleScroll}
      >
        {displayExpertises.map((exp, i) => (
          <Link
            key={i}
            to="/services"
            className="ph exp-slide"
            draggable={false}
          >
            <img src={exp.img} alt={exp.title} style={{ objectPosition: exp.pos }} draggable={false} />
            <div className="sc" />
            <div className="ph-text">
              <span className="ph-number">{exp.num}</span>
              <b className="ph-title">{exp.title}</b>
            </div>
          </Link>
        ))}
      </div>

      {/* Bouton suivant */}
      <button
        type="button"
        className="exp-nav exp-nav-next"
        onClick={() => scrollByCard('next')}
        aria-label="Expertise suivante"
      >
        <ChevronRight size={22} />
      </button>
    </div>
  );
}

/* ── Compteur avec animation d'incrémentation progressive ──────── */
function AnimatedCounter({ end, duration = 3200, start = 0, prefix = '', suffix = '', trigger = false }) {
  const [value, setValue] = useState(start);

  useEffect(() => {
    if (!trigger) return;

    let startTimestamp = null;
    let animId;

    // Easing progressif fluide : départ doux, incrémentation bien visible, atterrissage délicat
    const easeInOutCubic = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easedProgress = easeInOutCubic(progress);
      const current = start + (end - start) * easedProgress;

      setValue(Math.round(current));

      if (progress < 1) {
        animId = requestAnimationFrame(step);
      } else {
        setValue(end);
      }
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [trigger, end, start, duration]);

  return (
    <span>
      {prefix}{trigger ? value : start}{suffix}
    </span>
  );
}

export default function Home() {
  const [diagModalOpen, setDiagModalOpen] = useState(false);
  const kpiSectionRef = useRef(null);
  const [kpiVisible, setKpiVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setKpiVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setKpiVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3, rootMargin: '0px 0px -40px 0px' }
    );

    if (kpiSectionRef.current) {
      observer.observe(kpiSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

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

          <ExpertiseCarousel />

          <div style={{ textAlign: 'center', marginTop: '36px' }}>
            <Link to="/services" className="btn btn-primary" style={{ padding: '14px 28px' }}>
              Découvrir en détail nos 6 pôles d'expertise <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. CHIFFRES CLÉS */}
      <section ref={kpiSectionRef} className="kpi-strip-section">
        <div className="container">
          <div className="kpi-strip-grid">
            <div className="kpi-card">
              <div className="kpi-icon-box">
                <Award size={26} color="var(--color-orange)" />
              </div>
              <div className="kpi-val">
                <AnimatedCounter
                  start={0}
                  end={2015}
                  prefix="Depuis "
                  duration={3200}
                  trigger={kpiVisible}
                />
              </div>
              <p className="kpi-desc">Société d'ingénierie et de conseil en développement durable</p>
            </div>

            <div className="kpi-card">
              <div className="kpi-icon-box">
                <TrendingDown size={26} color="#3F7A5A" />
              </div>
              <div className="kpi-val">
                <AnimatedCounter
                  start={0}
                  end={25}
                  prefix="Jusqu'à -"
                  suffix="%"
                  duration={3200}
                  trigger={kpiVisible}
                />
              </div>
              <p className="kpi-desc">De réduction immédiate sur la facture combustible</p>
            </div>

            <div className="kpi-card">
              <div className="kpi-icon-box">
                <Gauge size={26} color="var(--color-gold)" />
              </div>
              <div className="kpi-val">
                <AnimatedCounter
                  start={0}
                  end={95}
                  prefix="> "
                  suffix="%"
                  duration={3200}
                  trigger={kpiVisible}
                />
              </div>
              <p className="kpi-desc">D'objectifs énergétiques et climatiques contractuellement atteints</p>
            </div>

            <div className="kpi-card">
              <div className="kpi-icon-box">
                <ShieldCheck size={26} color="#123B2E" />
              </div>
              <div className="kpi-val">
                <AnimatedCounter
                  start={0}
                  end={50}
                  prefix="+"
                  suffix=" projets"
                  duration={3200}
                  trigger={kpiVisible}
                />
              </div>
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
