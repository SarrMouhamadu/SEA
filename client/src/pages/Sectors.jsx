import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Globe2, Factory, Landmark, Fuel, Building,
  ArrowRight, Zap, BarChart3, Shield, Leaf,
  TrendingUp, FileSearch, Sun, Cpu, Handshake,
  CheckCircle2, ChevronRight
} from 'lucide-react';

/* ─── Données statiques des 3 secteurs principaux ──────────── */
const PRIMARY_SECTORS = [
  {
    id: 1,
    anchor: 'secteur-public',
    icon: Globe2,
    tag: 'MINISTÈRES · AGENCES · COLLECTIVITÉS',
    title: 'Institutions Publiques',
    desc: 'Accompagner les politiques publiques vers une transition énergétique durable et mesurable.',
    expertises: [
      { icon: Shield,     label: 'Stratégie énergie-climat' },
      { icon: Zap,        label: 'Programmes d\'efficacité' },
      { icon: CheckCircle2, label: 'Appui à la mise en œuvre' },
    ],
    // Dégradé propre à chaque carte
    gradient: 'linear-gradient(160deg, #0d2a40 0%, #071321 60%)',
    accentColor: '#F47721',
    // Image de fond : photo libre de droit (Unsplash — licence libre)
    bgUrl: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=70&auto=format&fit=crop',
  },
  {
    id: 2,
    anchor: 'industrie',
    icon: Factory,
    tag: 'AGROALIMENTAIRE · CIMENTERIES · MINES',
    title: 'Industries & Grandes Entreprises',
    desc: 'Optimiser les performances industrielles et accélérer la décarbonation.',
    expertises: [
      { icon: FileSearch, label: 'Audits énergétiques' },
      { icon: Sun,        label: 'Solutions ENR' },
      { icon: Leaf,       label: 'Décarbonation & Net-Zero' },
    ],
    gradient: 'linear-gradient(160deg, #0f1f10 0%, #071321 60%)',
    accentColor: '#F47721',
    bgUrl: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800&q=70&auto=format&fit=crop',
  },
  {
    id: 3,
    anchor: 'institutions-financieres',
    icon: Landmark,
    tag: 'BANQUES · FONDS · INVESTISSEURS',
    title: 'Institutions Financières',
    desc: 'Financer des projets verts, fiables et à fort impact climatique.',
    expertises: [
      { icon: TrendingUp, label: 'Éligibilité & taxonomie' },
      { icon: BarChart3,  label: 'Analyse de projets' },
      { icon: Handshake,  label: 'Produits financiers verts' },
    ],
    gradient: 'linear-gradient(160deg, #0d1a30 0%, #071321 60%)',
    accentColor: '#F47721',
    bgUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=70&auto=format&fit=crop',
  },
];

/* ─── Secteurs secondaires (2 cartes compactes) ─────────────── */
const SECONDARY_SECTORS = [
  {
    id: 4,
    anchor: 'petrole-gaz-mines',
    icon: Fuel,
    title: 'Pétrole, Gaz & Mines',
    subtitle: 'Sites d\'extraction, raffineries & sites isolés',
    items: [
      'Réduction du torchage & valorisation des gaz associés',
      'Hybridation solaire des exploitations minières',
      'Efficacité des groupes thermiques autonomes',
      'Audits de sécurité thermique & conformité ATEX',
    ],
  },
  {
    id: 5,
    anchor: 'batiments',
    icon: Building,
    title: 'Bâtiments & Tertiaire',
    subtitle: 'Sièges sociaux, hôtellerie, cliniques & centres commerciaux',
    items: [
      'Audits thermiques des enveloppes & systèmes CVC',
      'GTB / GTC & smart metering télérelevé',
      'Énergie solaire en toiture & ombrières',
      'Éco-labellisation & certification durable',
    ],
  },
];

/* ─── Hook Intersection Observer pour les animations ───────── */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ─── Composant carte secteur principale ────────────────────── */
function PrimaryCard({ sector, index }) {
  const [ref, visible] = useReveal();
  const Icon = sector.icon;
  return (
    <div
      ref={ref}
      id={sector.anchor}
      className={`sector-primary-card ${visible ? 'sector-revealed' : ''}`}
      style={{ transitionDelay: `${index * 120}ms`, scrollMarginTop: '90px' }}
    >
      {/* Image de fond */}
      <div
        className="sector-card-bg"
        style={{ backgroundImage: `url(${sector.bgUrl})` }}
        aria-hidden="true"
      />
      {/* Overlay dégradé */}
      <div className="sector-card-overlay" style={{ background: sector.gradient }} aria-hidden="true" />

      {/* Contenu */}
      <div className="sector-card-body">
        {/* Icône */}
        <div className="sector-card-icon-wrap">
          <Icon size={26} />
        </div>

        {/* Tag clientèle */}
        <p className="sector-card-tag">{sector.tag}</p>

        {/* Titre */}
        <h2 className="sector-card-title">{sector.title}</h2>

        {/* Description */}
        <p className="sector-card-desc">{sector.desc}</p>

        {/* Expertises clés */}
        <div className="sector-card-expertises">
          {sector.expertises.map((exp, i) => {
            const ExpIcon = exp.icon;
            return (
              <div key={i} className="sector-expertise-chip">
                <ExpIcon size={14} className="sector-expertise-icon" />
                <span>{exp.label}</span>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <Link to="/contact" className="sector-card-cta">
          Explorer ce secteur <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  );
}

/* ─── Composant carte secteur secondaire ────────────────────── */
function SecondaryCard({ sector, index }) {
  const [ref, visible] = useReveal();
  const Icon = sector.icon;
  return (
    <div
      ref={ref}
      id={sector.anchor}
      className={`sector-secondary-card ${visible ? 'sector-revealed' : ''}`}
      style={{ transitionDelay: `${index * 100}ms`, scrollMarginTop: '90px' }}
    >
      <div className="sector-secondary-header">
        <div className="sector-secondary-icon-wrap">
          <Icon size={22} />
        </div>
        <div>
          <h3 className="sector-secondary-title">{sector.title}</h3>
          <p className="sector-secondary-subtitle">{sector.subtitle}</p>
        </div>
      </div>
      <ul className="sector-secondary-list">
        {sector.items.map((item, i) => (
          <li key={i}>
            <ChevronRight size={13} className="sector-li-arrow" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── Page principale ───────────────────────────────────────── */
export default function Sectors() {
  return (
    <div className="sectors-v2">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="sectors-hero">
        <div className="sectors-hero-overlay" />
        <div className="sectors-hero-content container">
          <span className="sectors-hero-label">NOS SECTEURS</span>
          <h1 className="sectors-hero-title">
            Nos secteurs <span className="sectors-hero-accent">d'intervention</span>
          </h1>
          <p className="sectors-hero-sub">
            Des solutions énergétiques et climatiques adaptées à chaque acteur.
          </p>
        </div>
        {/* Vague décorative bas du hero */}
        <svg className="sectors-hero-wave" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#071321" />
        </svg>
      </section>

      {/* ── SECTEURS PRINCIPAUX ──────────────────────────────── */}
      <section className="sectors-primary-section">
        <div className="container">
          <div className="sectors-primary-grid">
            {PRIMARY_SECTORS.map((s, i) => (
              <PrimaryCard key={s.id} sector={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTEURS SECONDAIRES ─────────────────────────────── */}
      <section className="sectors-secondary-section">
        <div className="container">
          <div className="sectors-secondary-grid">
            {SECONDARY_SECTORS.map((s, i) => (
              <SecondaryCard key={s.id} sector={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── BANNIÈRE CONTACT ─────────────────────────────────── */}
      <section className="sectors-cta-section">
        <div className="container">
          <div className="sectors-cta-box">
            <div className="sectors-cta-glow" aria-hidden="true" />
            <p className="sectors-cta-label">APPROCHE SUR MESURE</p>
            <h2 className="sectors-cta-title">
              Chaque secteur mérite une expertise dédiée.
            </h2>
            <p className="sectors-cta-desc">
              Industriels, banques, ministères ou gestionnaires de grands ensembles : nos ingénieurs adaptent leurs audits et outils aux particularités de vos infrastructures.
            </p>
            <Link to="/contact" className="sectors-cta-btn">
              Consulter un expert SESA <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
