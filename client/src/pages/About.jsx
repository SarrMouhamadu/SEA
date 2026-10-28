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
  ArrowRight
} from 'lucide-react';

export default function About() {
  const [company, setCompany] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/company')
      .then(res => res.json())
      .then(json => setCompany(json.data || {}))
      .catch(() => {});
  }, []);

  const approachSteps = [
    {
      num: '01',
      title: 'Analyse & Diagnostic',
      desc: 'Audit énergétique sur site, mesures instrumentées (combustion, flux thermiques, qualité de réseau) et diagnostic des opportunités de décarbonation.',
      icon: Search,
    },
    {
      num: '02',
      title: 'Études & Financement',
      desc: 'Ingénierie de détail, modélisation technico-économique, calcul de TRI et structuration des dossiers d\'éligibilité aux financements verts.',
      icon: FileCheck2,
    },
    {
      num: '03',
      title: 'Mise en Œuvre & Suivi',
      desc: 'Fourniture et installation d\'équipements de pointe (brûleurs, régulations), mise en service certifiée, formation des équipes et télémesure des gains.',
      icon: Cpu,
    },
  ];

  return (
    <div className="about-page section">
      <div className="container">
        {/* En-tête */}
        <div className="section-title-wrapper">
          <span className="badge">À Propos de SEnergys Africa</span>
          <h1 className="section-title">L'Ingénierie durable au cœur du développement africain</h1>
          <p className="section-subtitle">
            Une expertise sénégalaise et panafricaine reconnue pour décarboner, fiabiliser et moderniser les industries.
          </p>
        </div>

        {/* 1. Histoire & Piliers */}
        <div id="qui-sommes-nous" className="grid-2" style={{ marginBottom: '80px', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '1.9rem', marginBottom: '20px', color: 'var(--theme-text)' }}>
              Qui sommes-nous ?
            </h2>
            <p style={{ marginBottom: '16px', color: 'var(--theme-text-muted)', lineHeight: '1.7' }}>
              {company?.presentation || "SEnergys Africa est une société d'ingénierie et de conseil stratégique spécialisée dans la transition énergétique, l'efficacité industrielle, la finance climatique/ESG et la formation professionnelle en Afrique subsaharienne."}
            </p>
            <p style={{ color: 'var(--theme-text-muted)', lineHeight: '1.7', marginBottom: '24px' }}>
              Implantés à Dakar au pôle technologique Diamniadio (P2ID), nous combinons rigueur d'ingénierie internationale et fine connaissance des réalités opérationnelles industrielles africaines.
            </p>
            <Link to="/contact" className="btn btn-primary btn-sm">
              Prendre contact avec nos experts <ArrowRight size={14} />
            </Link>
          </div>

          <div className="card" style={{ background: 'var(--theme-surface-alt)', borderColor: 'var(--theme-border)' }}>
            <h3 style={{ marginBottom: '20px', color: 'var(--color-orange)' }}>Nos Piliers Fondamentaux</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', padding: 0 }}>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <CheckCircle size={20} color="var(--color-orange)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ color: 'var(--theme-text)' }}><strong>Excellence Technique :</strong> Ingénieurs qualifiés en thermique industrielle et mécanique des fluides.</span>
              </li>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <CheckCircle size={20} color="var(--color-orange)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ color: 'var(--theme-text)' }}><strong>Ancrage Local :</strong> Présence permanente à Dakar avec capacité d'intervention rapide en sous-région.</span>
              </li>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <CheckCircle size={20} color="var(--color-orange)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ color: 'var(--theme-text)' }}><strong>Partenariats de Classe Mondiale :</strong> Représentation agréée de constructeurs européens de brûleurs.</span>
              </li>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <CheckCircle size={20} color="var(--color-orange)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ color: 'var(--theme-text)' }}><strong>Impact Mesurable :</strong> Mesures physiques et bilans de combustion systématiques avant/après travaux.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 2. Vision, Mission & Valeurs */}
        <div id="vision" className="grid-3" style={{ marginBottom: '80px' }}>
          <div className="card">
            <Target size={32} color="var(--color-orange)" style={{ marginBottom: '16px' }} />
            <h3 style={{ color: 'var(--theme-text)' }}>Notre Mission</h3>
            <p style={{ color: 'var(--theme-text-muted)', marginTop: '12px', lineHeight: '1.6' }}>
              {company?.mission || "Accompagner les entreprises industrielles, le secteur financier et les institutions publiques vers une décarbonation concrète et une efficacité énergétique maximale."}
            </p>
          </div>

          <div className="card">
            <Eye size={32} color="var(--color-green-mid)" style={{ marginBottom: '16px' }} />
            <h3 style={{ color: 'var(--theme-text)' }}>Notre Vision</h3>
            <p style={{ color: 'var(--theme-text-muted)', marginTop: '12px', lineHeight: '1.6' }}>
              {company?.vision || "Devenir le partenaire de référence en Afrique de l'Ouest pour la transition énergétique et les solutions industrielles propres de haute performance."}
            </p>
          </div>

          <div className="card">
            <Award size={32} color="var(--color-gold)" style={{ marginBottom: '16px' }} />
            <h3 style={{ color: 'var(--theme-text)' }}>Nos Valeurs</h3>
            <p style={{ color: 'var(--theme-text-muted)', marginTop: '12px', lineHeight: '1.6' }}>
              {company?.values || "Excellence technique, Intégrité, Innovation durable, Impact mesurable."}
            </p>
          </div>
        </div>

        {/* 3. Notre Approche en 3 étapes */}
        <div id="approche" style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="badge">Méthodologie Éprouvée</span>
            <h2 style={{ fontSize: '2rem', marginTop: '12px', color: 'var(--theme-text)' }}>
              Notre Approche Opérationnelle
            </h2>
            <p style={{ color: 'var(--theme-text-muted)', maxWidth: '640px', margin: '8px auto 0' }}>
              Un processus d'accompagnement rigoureux en trois étapes garantissant des résultats techniques et financiers concrets.
            </p>
          </div>

          <div className="grid-3">
            {approachSteps.map((step) => {
              const IconComp = step.icon;
              return (
                <div key={step.num} className="card" style={{ position: 'relative' }}>
                  <span style={{
                    position: 'absolute',
                    top: '20px',
                    right: '24px',
                    fontFamily: 'var(--font-display)',
                    fontSize: '36px',
                    color: 'var(--color-orange)',
                    opacity: 0.25,
                    fontWeight: 700
                  }}>
                    {step.num}
                  </span>
                  <div style={{
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

        {/* 4. Notre Équipe & Partenaires */}
        <div id="partenaires" className="card" style={{ background: 'var(--theme-surface-alt)', borderColor: 'var(--theme-border)', padding: '40px' }}>
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
                L'équipe SEnergyS Africa rassemble des thermiciens, des auditeurs certifiés ISO 50001, des spécialistes ESG et des formateurs industriels engagés dans le développement durable de l'Afrique.
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
                Nous collaborons étroitement avec les leaders mondiaux de la combustion, les institutions financières de développement (BAD, SFI, BOAD) et les universités d'excellence (UGB, EPT Thiès, DAUST).
              </p>
              <Link to="/contact" className="btn btn-secondary btn-sm">
                Devenir partenaire ou nous rejoindre <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
