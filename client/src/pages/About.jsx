import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Target,
  Eye,
  Award,
  CheckCircle,
  Search,
  FileCheck2,
  Cpu,
  Users,
  Handshake,
  ArrowRight,
  Zap,
  TrendingUp,
  Flame,
  GraduationCap,
  Briefcase,
  Smartphone,
  Volume2,
  VolumeX
} from 'lucide-react';
import { playMicroClick, playSoftConfirm } from '../utils/soundEffects';

const internalExpertises = [
  {
    title: "Ingénierie Énergie & Environnement",
    desc: "Audit, diagnostic instrumenté, conception et dimensionnement de systèmes EnR.",
    icon: Zap
  },
  {
    title: "Conseil Stratégique Développement Durable",
    desc: "RSE, production propre, plans de décarbonation et mise à niveau environnementale.",
    icon: Flame
  },
  {
    title: "Finance Climatique & Marchés Carbone",
    desc: "Accès aux fonds climat, MRV, taxonomie verte et structuration de projets verts.",
    icon: TrendingUp
  },
  {
    title: "Management de Projet et AMO",
    desc: "Pilotage technique, coordination, assistance à maîtrise d'ouvrage et suivi de performance.",
    icon: Briefcase
  },
  {
    title: "Innovation et Outils Digitaux",
    desc: "e-audit, e-learning, digitalisation des Systèmes de Management de l'Énergie (ISO 50001).",
    icon: Smartphone
  },
  {
    title: "Formation & Renforcement des Capacités",
    desc: "Programmes sur-mesure, transfert de compétences techniques et certifiantes.",
    icon: GraduationCap
  }
];

export default function About() {
  const [company, setCompany] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/company')
      .then(res => res.json())
      .then(json => setCompany(json.data || {}))
      .catch(() => {});
  }, []);

  // Motion Reveal Observer natif
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    const targets = document.querySelectorAll('.motion-reveal');
    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    if (nextState) {
      playSoftConfirm(true);
    }
  };

  const approachSteps = [
    {
      num: '01',
      title: 'En Amont : Étude & Diagnostic',
      desc: 'Études d\'opportunité, audits énergétiques détaillés et diagnostic stratégique pour identifier les potentiels concrets de réduction de coûts et de carbone.',
      icon: Search,
    },
    {
      num: '02',
      title: 'Au Cœur : Ingénierie & Financement',
      desc: 'Dimensionnement technique précis (EnR, efficacité thermique, utilités), études technico-économiques et structuration des dossiers de financement vert.',
      icon: FileCheck2,
    },
    {
      num: '03',
      title: 'En Aval : Mise en Œuvre & Suivi',
      desc: 'Déploiement d\'équipements, digitalisation des SME, engagement contractuel sur les résultats et télémesure des gains dans la durée.',
      icon: Cpu,
    },
  ];

  return (
    <div className="about-page section">
      <div className="container">
        {/* En-tête avec Contrôle Audio discret */}
        <div className="section-title-wrapper motion-reveal">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '12px' }}>
            <span className="badge">À Propos de SEnergys Africa</span>
            <button
              onClick={toggleSound}
              className={`sound-toggle-btn ${soundEnabled ? 'sound-on' : ''}`}
              title={soundEnabled ? 'Désactiver les micro-sons' : 'Activer les micro-sons interactifs (silencieux par défaut)'}
              aria-label="Contrôle audio"
            >
              {soundEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
              <span>{soundEnabled ? 'Son activé' : 'Expérience sonore'}</span>
            </button>
          </div>
          <h1 className="section-title">L'Ingénierie durable au cœur du développement africain</h1>
          <p className="section-subtitle">
            Fondée en 2015, SEnergyS Africa (SESA) est une société d'ingénierie et de conseil en développement durable, engagée contractuellement sur les résultats.
          </p>
        </div>

        {/* 1. Histoire & Présentation officielle */}
        <div id="qui-sommes-nous" className="grid-2 motion-reveal" style={{ marginBottom: '80px', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: 'var(--radius-full)', background: 'rgba(232, 113, 43, 0.1)', color: 'var(--color-orange)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '14px' }}>
              Depuis 2015 au service de l'Afrique
            </div>
            <h2 style={{ fontSize: '1.9rem', marginBottom: '20px', color: 'var(--theme-text)' }}>
              Qui sommes-nous ?
            </h2>
            <p style={{ marginBottom: '16px', color: 'var(--theme-text-muted)', lineHeight: '1.7' }}>
              Fondée en 2015, <strong>SEnergyS Africa (SESA)</strong> est une société d'ingénierie et de conseil en développement durable, spécialisée dans la transition énergétique, l'efficacité énergétique, la finance climatique et la production propre.
            </p>
            <p style={{ marginBottom: '16px', color: 'var(--theme-text-muted)', lineHeight: '1.7' }}>
              SEnergyS Africa intervient <strong>exclusivement sur des projets de développement durable</strong>, depuis l'amont (étude d'opportunité, diagnostic) jusqu'à l'aval (mise en œuvre, suivi-évaluation). Notre cabinet accompagne aussi bien les institutions publiques, les organisations internationales, les industries que les PME-PMI dans la concrétisation de leurs objectifs énergétiques et climatiques.
            </p>
            <p style={{ color: 'var(--theme-text-muted)', lineHeight: '1.7', marginBottom: '24px' }}>
              Nous avons fait le choix d'un <strong>modèle d'intervention basé sur l'engagement contractuel sur les résultats</strong>, le partenariat de long terme avec nos clients et l'innovation à travers des outils digitaux propriétaires (e-audit, e-learning, digitalisation des Systèmes de Management de l'Énergie).
            </p>
            <Link
              to="/contact"
              className="btn btn-primary btn-sm"
              onMouseEnter={() => playMicroClick(soundEnabled)}
              onClick={() => playSoftConfirm(soundEnabled)}
            >
              Prendre contact avec notre équipe <ArrowRight size={14} />
            </Link>
          </div>

          <div className="card card-interactive" style={{ background: 'var(--theme-surface-alt)', borderColor: 'var(--theme-border)' }}>
            <h3 style={{ marginBottom: '20px', color: 'var(--color-orange)' }}>Notre Modèle d'Intervention</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px', padding: 0 }}>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <CheckCircle size={20} color="var(--color-orange)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ color: 'var(--theme-text)' }}>
                  <strong>Engagement Contractuel sur les Résultats :</strong> Nous nous engageons fermement sur les performances énergétiques et financières mesurées.
                </span>
              </li>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <CheckCircle size={20} color="var(--color-orange)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ color: 'var(--theme-text)' }}>
                  <strong>Partenariat de Long Terme :</strong> Une relation pérenne avec nos clients pour garantir la durabilité des économies d'énergie réalisées.
                </span>
              </li>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <CheckCircle size={20} color="var(--color-orange)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ color: 'var(--theme-text)' }}>
                  <strong>Outils Digitaux Propriétaires :</strong> E-audit sur tablette, plateforme e-learning certifiante et digitalisation du SME (ISO 50001).
                </span>
              </li>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <CheckCircle size={20} color="var(--color-orange)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ color: 'var(--theme-text)' }}>
                  <strong>Couverture Complète :</strong> De l'amont (opportunité, audit) à l'aval (mise en œuvre, maintenance et suivi-évaluation).
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* 2. Les 6 Pôles d'Expertise Interne */}
        <div style={{ marginBottom: '80px' }}>
          <div className="motion-reveal" style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="badge">Savoir-faire Multidisciplinaire</span>
            <h2 style={{ fontSize: '2rem', marginTop: '12px', color: 'var(--theme-text)' }}>
              Expertise Interne
            </h2>
            <p style={{ color: 'var(--theme-text-muted)', maxWidth: '640px', margin: '8px auto 0' }}>
              Une équipe d'ingénieurs et de consultants chevronnés couvrant l'ensemble de la chaîne de valeur du développement durable.
            </p>
          </div>

          <div className="grid-3">
            {internalExpertises.map((exp, idx) => {
              const IconComp = exp.icon;
              return (
                <div
                  key={idx}
                  className={`card card-interactive motion-reveal stagger-${idx + 1}`}
                  onMouseEnter={() => playMicroClick(soundEnabled)}
                  style={{ display: 'flex', flexDirection: 'column' }}
                >
                  <div className="card-icon-wrapper" style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '12px',
                    background: 'rgba(232, 113, 43, 0.12)',
                    color: 'var(--color-orange)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px'
                  }}>
                    <IconComp size={26} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--theme-text)', marginBottom: '10px' }}>
                    {exp.title}
                  </h3>
                  <p style={{ color: 'var(--theme-text-muted)', fontSize: '14.5px', lineHeight: '1.6', margin: 0 }}>
                    {exp.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Notre Approche en 3 étapes (Avec signature visuelle de flux énergétique) */}
        <div id="approche" style={{ marginBottom: '80px' }}>
          <div className="motion-reveal" style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span className="badge">De l'Amont à l'Aval</span>
            <h2 style={{ fontSize: '2rem', marginTop: '12px', color: 'var(--theme-text)' }}>
              Notre Approche (Amont → Aval)
            </h2>
            <p style={{ color: 'var(--theme-text-muted)', maxWidth: '640px', margin: '8px auto 0' }}>
              Une chaîne d'intervention complète et intégrée assurant un continuum d'excellence technique.
            </p>
          </div>

          {/* Ligne de flux énergétique animée */}
          <div className="approach-flow-bar motion-reveal">
            <div className="approach-flow-node">
              <span className="node-dot"></span>
              <span>01. Étude & Diagnostic</span>
            </div>
            <div className="approach-flow-connector"></div>
            <div className="approach-flow-node">
              <span className="node-dot"></span>
              <span>02. Ingénierie & Financement</span>
            </div>
            <div className="approach-flow-connector"></div>
            <div className="approach-flow-node">
              <span className="node-dot"></span>
              <span>03. Mise en Œuvre & Suivi</span>
            </div>
          </div>

          <div className="grid-3">
            {approachSteps.map((step, idx) => {
              const IconComp = step.icon;
              return (
                <div
                  key={step.num}
                  className={`card card-interactive motion-reveal stagger-${idx + 1}`}
                  onMouseEnter={() => playMicroClick(soundEnabled)}
                  style={{ position: 'relative' }}
                >
                  <span className="step-number-watermark" style={{
                    position: 'absolute',
                    top: '20px',
                    right: '24px',
                    fontFamily: 'var(--font-display)',
                    fontSize: '38px',
                    color: 'var(--color-orange)',
                    opacity: 0.25,
                    fontWeight: 700
                  }}>
                    {step.num}
                  </span>
                  <div className="card-icon-wrapper" style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'rgba(232, 113, 43, 0.12)',
                    color: 'var(--color-orange)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '18px'
                  }}>
                    <IconComp size={24} />
                  </div>
                  <h3 style={{ fontSize: '1.3rem', color: 'var(--theme-text)', marginBottom: '12px' }}>
                    {step.title}
                  </h3>
                  <p style={{ color: 'var(--theme-text-muted)', lineHeight: '1.6', fontSize: '14.5px' }}>
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Vision, Mission & Valeurs */}
        <div id="vision" className="grid-3 motion-reveal" style={{ marginBottom: '80px' }}>
          <div
            className="card card-interactive"
            onMouseEnter={() => playMicroClick(soundEnabled)}
          >
            <div className="card-icon-wrapper" style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(232, 113, 43, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <Target size={28} color="var(--color-orange)" />
            </div>
            <h3 style={{ color: 'var(--theme-text)' }}>Notre Mission</h3>
            <p style={{ color: 'var(--theme-text-muted)', marginTop: '12px', lineHeight: '1.6' }}>
              Accompagner les institutions publiques, organisations internationales, industries et PME-PMI vers la concrétisation mesurable de leurs objectifs énergétiques et climatiques.
            </p>
          </div>

          <div
            className="card card-interactive"
            onMouseEnter={() => playMicroClick(soundEnabled)}
          >
            <div className="card-icon-wrapper" style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(63, 122, 90, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <Eye size={28} color="var(--color-green-mid)" />
            </div>
            <h3 style={{ color: 'var(--theme-text)' }}>Notre Vision</h3>
            <p style={{ color: 'var(--theme-text-muted)', marginTop: '12px', lineHeight: '1.6' }}>
              Être le partenaire de référence en Afrique pour l'ingénierie durable, la transition énergétique et les solutions industrielles propres de haute performance.
            </p>
          </div>

          <div
            className="card card-interactive"
            onMouseEnter={() => playMicroClick(soundEnabled)}
          >
            <div className="card-icon-wrapper" style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(242, 200, 139, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <Award size={28} color="var(--color-gold)" />
            </div>
            <h3 style={{ color: 'var(--theme-text)' }}>Nos Valeurs</h3>
            <p style={{ color: 'var(--theme-text-muted)', marginTop: '12px', lineHeight: '1.6' }}>
              Engagement contractuel sur les résultats, Partenariat durable de long terme, Innovation digitale (e-audit, e-learning) et Intégrité.
            </p>
          </div>
        </div>

        {/* 5. Équipe & Partenaires */}
        <div id="partenaires" className="card card-interactive motion-reveal" style={{ background: 'var(--theme-surface-alt)', borderColor: 'var(--theme-border)', padding: '40px' }}>
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <Users size={24} color="var(--color-orange)" />
                <span style={{ fontWeight: 700, color: 'var(--color-orange)', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '13px' }}>
                  Notre Équipe
                </span>
              </div>
              <h2 style={{ fontSize: '1.8rem', color: 'var(--theme-text)', marginBottom: '16px' }}>
                Des ingénieurs et experts certifiés
              </h2>
              <p style={{ color: 'var(--theme-text-muted)', lineHeight: '1.6', marginBottom: '16px' }}>
                L'équipe SEnergyS Africa rassemble des thermiciens, des auditeurs certifiés ISO 50001, des spécialistes en finance climat et des formateurs industriels engagés dans le développement durable de l'Afrique.
              </p>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <Handshake size={24} color="var(--color-orange)" />
                <span style={{ fontWeight: 700, color: 'var(--color-orange)', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '13px' }}>
                  Écosystème Partenaires
                </span>
              </div>
              <p style={{ color: 'var(--theme-text-muted)', lineHeight: '1.6', marginBottom: '20px' }}>
                Nous collaborons avec les bailleurs internationaux (GIZ, AFD, UE, GCF), les équipementiers industriels de référence et les universités d'excellence (UGB, EPT Thiès, DAUST).
              </p>
              <Link
                to="/contact"
                className="btn btn-secondary btn-sm"
                onMouseEnter={() => playMicroClick(soundEnabled)}
                onClick={() => playSoftConfirm(soundEnabled)}
              >
                Devenir partenaire ou nous rejoindre <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
