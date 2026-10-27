import React, { useEffect, useState } from 'react';
import { ShieldCheck, Target, Eye, Award, CheckCircle } from 'lucide-react';

export default function About() {
  const [company, setCompany] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/company')
      .then(res => res.json())
      .then(json => setCompany(json.data || {}))
      .catch(() => {});
  }, []);

  return (
    <div className="about-page section">
      <div className="container">
        <div className="section-title-wrapper">
          <span className="badge">À Propos de SEnergys Africa</span>
          <h1 className="section-title">L'Ingénierie durable au cœur du développement africain</h1>
          <p className="section-subtitle">
            Une expertise sénégalaise et panafricaine reconnue pour décarboner et moderniser les industries.
          </p>
        </div>

        <div className="grid-2" style={{ marginBottom: '80px', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>Notre Histoire & Notre Vocation</h2>
            <p style={{ marginBottom: '16px', color: 'var(--color-muted)' }}>
              {company?.presentation || "SEnergys Africa est une société d'ingénierie et de conseil stratégique spécialisée dans la transition énergétique, l'efficacité industrielle, la finance climatique/ESG et la formation professionnelle en Afrique subsaharienne."}
            </p>
            <p style={{ color: 'var(--color-muted)' }}>
              Face aux défis croissants du coût de l'énergie et des exigences climatiques globales, nous apportons aux industriels africains des réponses technologiques concrètes, rentables et durables.
            </p>
          </div>
          <div className="card" style={{ background: 'var(--color-accent-subtle)', borderColor: 'var(--color-accent)' }}>
            <h3 style={{ marginBottom: '16px', color: 'var(--color-primary-dark)' }}>Nos Piliers Fondamentaux</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <CheckCircle size={20} color="var(--color-primary)" /> <strong>Excellence Technique :</strong> Ingénieurs qualifiés en thermique industrielle.
              </li>
              <li style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <CheckCircle size={20} color="var(--color-primary)" /> <strong>Ancrage Local :</strong> Présence permanente à Dakar avec interventions régionales.
              </li>
              <li style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <CheckCircle size={20} color="var(--color-primary)" /> <strong>Partenariats de Classe Mondiale :</strong> Représentation de fabricants leaders de brûleurs.
              </li>
              <li style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <CheckCircle size={20} color="var(--color-primary)" /> <strong>Impact Mesurable :</strong> Mesures physiques avant/après chaque intervention.
              </li>
            </ul>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid-3" style={{ marginBottom: '80px' }}>
          <div className="card">
            <Target size={32} color="var(--color-primary)" style={{ marginBottom: '16px' }} />
            <h3>Notre Mission</h3>
            <p style={{ color: 'var(--color-muted)', marginTop: '12px' }}>
              {company?.mission || "Accompagner les entreprises industrielles, le secteur financier et les institutions publiques vers une décarbonation concrète et une efficacité énergétique maximale."}
            </p>
          </div>

          <div className="card">
            <Eye size={32} color="var(--color-primary)" style={{ marginBottom: '16px' }} />
            <h3>Notre Vision</h3>
            <p style={{ color: 'var(--color-muted)', marginTop: '12px' }}>
              {company?.vision || "Devenir le partenaire de référence en Afrique de l'Ouest pour la transition énergétique et les solutions industrielles propres de haute performance."}
            </p>
          </div>

          <div className="card">
            <Award size={32} color="var(--color-primary)" style={{ marginBottom: '16px' }} />
            <h3>Nos Valeurs</h3>
            <p style={{ color: 'var(--color-muted)', marginTop: '12px' }}>
              {company?.values || "Excellence technique, Intégrité, Innovation durable, Impact mesurable."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
