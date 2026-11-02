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
              <h3 style={{ marginBottom: '20px', color: 'var(--theme-text)' }}>Coordonnées Directes</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <MapPin size={22} color="var(--color-orange)" style={{ flexShrink: 0 }} />
                  <div>
                    <strong style={{ color: 'var(--theme-text)' }}>Adresse :</strong>
                    <p style={{ color: 'var(--theme-text-muted)' }}>P2ID · Bâtiment APROSI, 3ème étage · Diamniadio, Sénégal</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <Phone size={22} color="var(--color-orange)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'var(--theme-text)' }}>Téléphones :</strong>
                    <p style={{ margin: '2px 0' }}>
                      <span style={{ fontSize: '13px', color: 'var(--theme-text-muted)' }}>Mobile / WhatsApp : </span>
                      <a href="tel:+221772173364" style={{ color: 'var(--color-orange)', fontWeight: '600' }}>+221 77 217 33 64</a>
                    </p>
                    <p style={{ margin: '2px 0' }}>
                      <span style={{ fontSize: '13px', color: 'var(--theme-text-muted)' }}>Ligne fixe : </span>
                      <a href="tel:+221339455647" style={{ color: 'var(--color-orange)', fontWeight: '600' }}>+221 33 945 56 47</a>
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <Mail size={22} color="var(--color-orange)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'var(--theme-text)' }}>Emails professionnels :</strong>
                    <p style={{ margin: '2px 0' }}>
                      <span style={{ fontSize: '13px', color: 'var(--theme-text-muted)' }}>Support technique : </span>
                      <a href="mailto:support_tech@senergysafrica.com" style={{ color: 'var(--color-orange)', fontWeight: '600' }}>support_tech@senergysafrica.com</a>
                    </p>
                    <p style={{ margin: '2px 0' }}>
                      <span style={{ fontSize: '13px', color: 'var(--theme-text-muted)' }}>Contact général : </span>
                      <a href="mailto:contact@senergysafrica.com" style={{ color: 'var(--color-orange)', fontWeight: '600' }}>contact@senergysafrica.com</a>
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <Clock size={22} color="var(--color-orange)" />
                  <div>
                    <strong style={{ color: 'var(--theme-text)' }}>Disponibilité :</strong>
                    <p style={{ color: 'var(--theme-text-muted)' }}>Du Lundi au Vendredi : 8h00 - 18h00</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card" style={{ background: 'var(--theme-surface-alt)', borderColor: 'var(--theme-border)' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
                <ShieldCheck size={24} color="var(--color-orange)" />
                <h4 style={{ color: 'var(--theme-text)' }}>Engagement Qualité & Confidentialité</h4>
              </div>
              <p style={{ fontSize: '0.92rem', color: 'var(--theme-text-muted)' }}>
                Toutes les données opérationnelles et énergétiques transmises dans le cadre de nos audits font l'objet d'un accord de confidentialité strict (NDA).
              </p>
            </div>
          </div>

          <div className="card" style={{ padding: '36px' }}>
            <h3 style={{ marginBottom: '8px', color: 'var(--theme-text)' }}>Formulaire de contact</h3>
            <p style={{ color: 'var(--theme-text-muted)', marginBottom: '24px', fontSize: '0.95rem' }}>
              Remplissez le formulaire ci-dessous pour recevoir un retour personnalisé :
            </p>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
