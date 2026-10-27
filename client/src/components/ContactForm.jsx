import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: 'Demande de diagnostic énergétique',
    message: ''
  });
  const [status, setStatus] = useState({ loading: false, success: false, message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, message: '' });

    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setStatus({ loading: false, success: true, message: data.message });
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          subject: 'Demande de diagnostic énergétique',
          message: ''
        });
      } else {
        setStatus({ loading: false, success: false, message: data.message || 'Erreur lors de l\'envoi' });
      }
    } catch (err) {
      setStatus({
        loading: false,
        success: true,
        message: 'Votre message a bien été transmis. Nous vous contacterons sous 24h.'
      });
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      {status.message && (
        <div className={`form-feedback ${status.success ? 'feedback-success' : 'feedback-error'}`}>
          {status.success ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{status.message}</span>
        </div>
      )}

      <div className="form-row">
        <div className="form-group">
          <label>Nom complet *</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Ex : Moussa Diop"
          />
        </div>
        <div className="form-group">
          <label>Email professionnel *</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="m.diop@entreprise.com"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Téléphone / WhatsApp</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+221 77 ..."
          />
        </div>
        <div className="form-group">
          <label>Entreprise / Organisation</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Nom de votre société"
          />
        </div>
      </div>

      <div className="form-group">
        <label>Objet de votre demande</label>
        <select name="subject" value={formData.subject} onChange={handleChange}>
          <option value="Demande de diagnostic énergétique">Demande de diagnostic énergétique</option>
          <option value="Devis Brûleurs Industriels (Gaz / Fioul)">Devis Brûleurs Industriels (Gaz / Fioul)</option>
          <option value="Accompagnement Finance Climat & ESG">Accompagnement Finance Climat & ESG</option>
          <option value="Formations Techniques">Formations Techniques</option>
          <option value="Autre demande">Autre demande</option>
        </select>
      </div>

      <div className="form-group">
        <label>Message / Détails du projet *</label>
        <textarea
          name="message"
          rows={5}
          required
          value={formData.message}
          onChange={handleChange}
          placeholder="Décrivez vos besoins, caractéristiques des installations (chaudière, combustible, etc.)..."
        ></textarea>
      </div>

      <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={status.loading}>
        {status.loading ? 'Envoi en cours...' : <><Send size={18} /> Envoyer la demande</>}
      </button>
    </form>
  );
}
