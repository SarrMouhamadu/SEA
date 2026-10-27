import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import ProductCard from '../components/ProductCard';
import ContactForm from '../components/ContactForm';
import { ArrowRight, CheckCircle2, Factory, Landmark, Fuel, Building, ShieldCheck } from 'lucide-react';

export default function Home() {
  const [services, setServices] = useState([]);
  const [products, setProducts] = useState([]);
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/services')
      .then(res => res.json())
      .then(json => setServices(json.data || []))
      .catch(() => {});

    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(json => setProducts((json.data || []).slice(0, 3)))
      .catch(() => {});

    fetch('http://localhost:5000/api/partners')
      .then(res => res.json())
      .then(json => setPartners(json.data || []))
      .catch(() => {});
  }, []);

  return (
    <div className="home-page">
      <Hero />

      {/* Section Partenaires & Références */}
      <section className="partners-strip">
        <div className="container">
          <p className="partners-intro">Ils nous font confiance pour leur performance énergétique & industrielle :</p>
          <div className="partners-grid">
            <div className="partner-logo-box">
              <img src="/assets/partners/senelec.jpg" alt="Senelec" />
            </div>
            <div className="partner-logo-box">
              <img src="/assets/partners/axa.jpeg" alt="AXA" />
            </div>
            <div className="partner-logo-box">
              <img src="/assets/partners/toyota.png" alt="Toyota" />
            </div>
            <div className="partner-logo-box">
              <img src="/assets/partners/ucad.jpg" alt="UCAD" />
            </div>
          </div>
        </div>
      </section>

      {/* Section Services / Pôles d'expertise */}
      <section className="section services-preview-section">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="badge">Nos Compétences Clés</span>
            <h2 className="section-title">Des solutions concrètes pour votre performance</h2>
            <p className="section-subtitle">
              Une offre intégrée associant ingénierie thermique, conformité environnementale et structuration financière.
            </p>
          </div>

          <div className="grid-3">
            {services.map(s => (
              <ServiceCard key={s.id || s.slug} service={s} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link to="/services" className="btn btn-secondary">
              Voir tous nos services en détail <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Section Brûleurs Industriels Phares */}
      <section className="section bg-light-contrast">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="badge">Gamme Équipements Thermiques</span>
            <h2 className="section-title">Brûleurs Industriels Haute Efficacité</h2>
            <p className="section-subtitle">
              Brûleurs gaz, fioul lourd/léger et bicarburation pour chaudières et fours industriels.
            </p>
          </div>

          <div className="grid-3">
            {products.map(p => (
              <ProductCard key={p.id || p.slug} product={p} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link to="/produits" className="btn btn-primary">
              Explorer tout le catalogue brûleurs <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Section Chiffres clés & Impact */}
      <section className="section impact-section">
        <div className="container">
          <div className="impact-grid">
            <div className="impact-card">
              <span className="impact-number">25%</span>
              <p className="impact-label">Économie moyenne de combustible mesurée sur les générateurs thermiques rénovés</p>
            </div>
            <div className="impact-card">
              <span className="impact-number">+100</span>
              <p className="impact-label">Diagnostics et audits énergétiques industriels menés en Afrique de l'Ouest</p>
            </div>
            <div className="impact-card">
              <span className="impact-number">100%</span>
              <p className="impact-label">Conformité aux exigences environnementales internationales et normes ISO</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Contact rapide */}
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div>
              <span className="badge">Parlons de votre projet</span>
              <h2 className="section-title">Besoin d'un audit ou d'une rénovation thermique ?</h2>
              <p className="section-subtitle" style={{ marginBottom: '24px' }}>
                Nos experts sont à votre disposition pour analyser vos installations, évaluer les gisements d'économies d'énergie et vous proposer des équipements adaptés à votre site.
              </p>
              <ul className="contact-usp-list">
                <li><CheckCircle2 size={18} className="usp-icon" /> Étude de faisabilité et dimensionnement technique sur mesure</li>
                <li><CheckCircle2 size={18} className="usp-icon" /> Disponibilité des pièces de rechange et support local à Dakar</li>
                <li><CheckCircle2 size={18} className="usp-icon" /> Assistance au montage de dossiers de subventions et crédits verts</li>
              </ul>
            </div>
            <div>
              <div className="card form-container-card">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
