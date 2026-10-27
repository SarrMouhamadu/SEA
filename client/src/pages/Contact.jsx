import React, { useEffect, useState } from 'react';
import ContactForm from '../components/ContactForm';
import { Phone, Mail, MapPin, Clock, ShieldCheck } from 'lucide-react';

export default function Contact() {
  const [company, setCompany] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/company')
      .then(res => res.json())
      .then(json => setCompany(json.data || {}))
      .catch(() => {});
  }, []);

  return (
    <div className="contact-page section">
      <div className="container">
        <div className="section-title-wrapper">
          <span className="badge">Échangeons sur vos besoins</span>
          <h1 className="section-title">Contact & Demande de Diagnostic</h1>
          <p className="section-subtitle">
            Nos équipes techniques basées à Dakar se tiennent à votre disposition pour vous répondre sous 24 heures.
          </p>
        </div>

        <div className="grid-2" style={{ alignItems: 'flex-start' }}>
          <div>
            <div className="card" style={{ marginBottom: '24px' }}>
              <h3 style={{ marginBottom: '20px' }}>Coordonnées Directes</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <MapPin size={22} color="var(--color-primary)" />
                  <div>
                    <strong>Adresse :</strong>
                    <p style={{ color: 'var(--color-muted)' }}>{company?.address || 'Dakar, Sénégal'}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <Phone size={22} color="var(--color-primary)" />
                  <div>
                    <strong>Téléphone / WhatsApp :</strong>
                    <p><a href="tel:+221772173364" style={{ color: 'var(--color-primary)', fontWeight: '600' }}>{company?.phone || '+221 77 217 33 64'}</a></p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <Mail size={22} color="var(--color-primary)" />
                  <div>
                    <strong>Email professionnel :</strong>
                    <p><a href="mailto:contact@senergysafrica.com" style={{ color: 'var(--color-primary)', fontWeight: '600' }}>{company?.email || 'contact@senergysafrica.com'}</a></p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <Clock size={22} color="var(--color-primary)" />
                  <div>
                    <strong>Disponibilité :</strong>
                    <p style={{ color: 'var(--color-muted)' }}>Du Lundi au Vendredi : 8h00 - 18h00</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card" style={{ background: 'var(--color-accent-subtle)', borderColor: 'var(--color-accent)' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
                <ShieldCheck size={24} color="var(--color-primary)" />
                <h4 style={{ color: 'var(--color-primary-dark)' }}>Engagement Qualité & Confidentialité</h4>
              </div>
              <p style={{ fontSize: '0.92rem', color: 'var(--color-muted)' }}>
                Toutes les données opérationnelles et énergétiques transmises dans le cadre de nos audits font l'objet d'un accord de confidentialité strict (NDA).
              </p>
            </div>
          </div>

          <div className="card" style={{ padding: '36px' }}>
            <h3 style={{ marginBottom: '8px' }}>Formulaire de contact</h3>
            <p style={{ color: 'var(--color-muted)', marginBottom: '24px', fontSize: '0.95rem' }}>
              Remplissez le formulaire ci-dessous pour recevoir un retour personnalisé :
            </p>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
