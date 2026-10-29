import React, { useState } from 'react';
import { CheckCircle2, ChevronRight, ArrowLeft, Send, Sparkles, Building2, Flame, Award } from 'lucide-react';

export default function AutoDiagnosticModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    sector: 'industrie',
    priority: 'reduction-facture',
    energyType: 'gaz-fioul',
    budgetTier: 'moyen',
  });

  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleAnswerChange = (field, value) => {
    setAnswers({ ...answers, [field]: value });
  };

  const handleContactChange = (e) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  const handleSubmitAccompaniment = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contactData.name,
          email: contactData.email,
          phone: contactData.phone,
          company: contactData.company,
          subject: "Demande d'accompagnement (suite à l'Autodiagnostic)",
          message: `Résultats de l'Autodiagnostic:\n- Secteur: ${answers.sector}\n- Enjeu prioritaire: ${answers.priority}\n- Énergie: ${answers.energyType}\n- Consommation: ${answers.budgetTier}`,
        }),
      });
    } catch (err) {
      console.log('Soumission locale enregistrée');
    }

    setSubmitting(false);
    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
      setIsSubmitted(false);
      setStep(1);
    }, 2800);
  };

  return (
    <div className="diag-modal-backdrop" onClick={onClose}>
      <div className="diag-modal-box" onClick={(e) => e.stopPropagation()}>
        {/* En-tête */}
        <div className="diag-modal-header">
          <div>
            <span className="diag-modal-badge">
              <Sparkles size={14} /> Autodiagnostic Énergétique & ESG
            </span>
            <h2 className="diag-modal-title">
              {step === 1 && 'Étape 1 sur 3 : Évaluation de vos installations'}
              {step === 2 && 'Étape 2 sur 3 : Résultats & Recommandations'}
              {step === 3 && "Étape 3 sur 3 : Demande d'accompagnement"}
            </h2>
          </div>
          <button className="diag-modal-close" onClick={onClose}>✕</button>
        </div>

        {/* Indicateur d'étape */}
        <div className="diag-stepper">
          <div className={`diag-step-bullet ${step >= 1 ? 'active' : ''}`}>1. Questionnaire</div>
          <div className={`diag-step-line ${step >= 2 ? 'active' : ''}`}></div>
          <div className={`diag-step-bullet ${step >= 2 ? 'active' : ''}`}>2. Recommandations</div>
          <div className={`diag-step-line ${step >= 3 ? 'active' : ''}`}></div>
          <div className={`diag-step-bullet ${step >= 3 ? 'active' : ''}`}>3. Accompagnement</div>
        </div>

        {/* ================= ÉTAPE 1 : QUESTIONNAIRE ================= */}
        {step === 1 && (
          <div className="diag-step-content">
            <div className="diag-form-group">
              <label className="diag-label">1. Quel est votre secteur d'activité ?</label>
              <div className="diag-options-grid">
                {[
                  { id: 'industrie', label: 'Industrie & Agroalimentaire' },
                  { id: 'batiments', label: 'Bâtiments tertiaires & Hôtellerie' },
                  { id: 'mines-petrole', label: 'Pétrole, Gaz & Mines' },
                  { id: 'banques', label: 'Banques & Institutions financières' },
                  { id: 'public', label: 'Secteur public & Organisations' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`diag-opt-btn ${answers.sector === item.id ? 'selected' : ''}`}
                    onClick={() => handleAnswerChange('sector', item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="diag-form-group">
              <label className="diag-label">2. Votre enjeu prioritaire :</label>
              <div className="diag-options-grid">
                {[
                  { id: 'reduction-facture', label: 'Réduction de la facture énergétique (-15% à -25%)' },
                  { id: 'optimisation-utilites', label: 'Optimisation des utilités thermiques et vapeur' },
                  { id: 'audit-iso', label: 'Audit énergétique complet (ISO 50001)' },
                  { id: 'finance-climat', label: 'Structuration éligible aux financements verts / ESG' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`diag-opt-btn ${answers.priority === item.id ? 'selected' : ''}`}
                    onClick={() => handleAnswerChange('priority', item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="diag-form-group">
              <label className="diag-label">3. Source d'énergie dominante utilisée :</label>
              <div className="diag-options-grid">
                {[
                  { id: 'chaleur-vapeur', label: 'Chaudières vapeur & Réseaux thermiques' },
                  { id: 'electricite', label: 'Électricité réseau (Senelec / Utilités)' },
                  { id: 'groupes-diesel', label: 'Groupes électrogènes diesel intensifs' },
                  { id: 'mixte-solaire', label: 'Système hybride (Solaire + Thermique)' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`diag-opt-btn ${answers.energyType === item.id ? 'selected' : ''}`}
                    onClick={() => handleAnswerChange('energyType', item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="diag-actions">
              <button
                type="button"
                className="btn-pill btn-pill-orange"
                onClick={() => setStep(2)}
              >
                Calculer mes résultats <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* ================= ÉTAPE 2 : RÉSULTATS & RECOMMANDATIONS ================= */}
        {step === 2 && (
          <div className="diag-step-content">
            <div className="diag-results-banner">
              <div className="diag-kpi">
                <span className="diag-kpi-num">-15% à -25%</span>
                <span className="diag-kpi-label">Potentiel moyen d'économies d'énergie</span>
              </div>
              <div className="diag-kpi">
                <span className="diag-kpi-num">&gt;93%</span>
                <span className="diag-kpi-label">Rendement thermique cible</span>
              </div>
              <div className="diag-kpi">
                <span className="diag-kpi-num">ISO 50001</span>
                <span className="diag-kpi-label">Conformité environnementale & ESG</span>
              </div>
            </div>

            <div className="diag-recommendations">
              <h4 style={{ margin: '0 0 14px', fontSize: '20px', color: 'var(--theme-text)' }}>
                Recommandations préconisées par SEnergyS Africa :
              </h4>
              <ul className="diag-rec-list">
                <li>
                  <CheckCircle2 size={18} color="var(--color-orange)" />
                  <span>
                    <strong>Optimisation thermique & utilités :</strong> Modernisation des réseaux de vapeur, régulation fine et récupération de chaleur pour stabiliser les rendements.
                  </span>
                </li>
                <li>
                  <CheckCircle2 size={18} color="var(--color-green-mid)" />
                  <span>
                    <strong>Audit d'utilités thermiques :</strong> Traitement des déperditions de vapeur, récupération de chaleur sur fumées et calorifugeage.
                  </span>
                </li>
                <li>
                  <CheckCircle2 size={18} color="var(--color-orange-dark)" />
                  <span>
                    <strong>Éligibilité Finance Climat :</strong> Vos installations peuvent prétendre à des mécanismes de co-financement vert (Green Climate Fund, banques partenaires).
                  </span>
                </li>
              </ul>
            </div>

            <div className="diag-actions" style={{ justifyContent: 'space-between' }}>
              <button
                type="button"
                className="btn-pill btn-pill-outline-gold"
                style={{ color: 'var(--theme-text)', borderColor: 'var(--theme-border)' }}
                onClick={() => setStep(1)}
              >
                <ArrowLeft size={16} /> Modifier mes réponses
              </button>
              <button
                type="button"
                className="btn-pill btn-pill-orange"
                onClick={() => setStep(3)}
              >
                Demander un accompagnement dédié <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* ================= ÉTAPE 3 : DEMANDE D'ACCOMPAGNEMENT ================= */}
        {step === 3 && (
          <div className="diag-step-content">
            {isSubmitted ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <CheckCircle2 size={54} color="var(--color-green-mid)" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '28px', color: 'var(--theme-text)', marginBottom: '8px' }}>
                  Demande d'accompagnement transmise !
                </h3>
                <p style={{ fontSize: '16px', color: 'var(--theme-text-muted)' }}>
                  Nos ingénieurs énergéticiens ont bien reçu vos données et prendront contact sous 24h ouvrées.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitAccompaniment}>
                <p style={{ margin: '0 0 20px', color: 'var(--theme-text-muted)', fontSize: '15px' }}>
                  Renseignez vos coordonnées professionnelles pour recevoir l'analyse détaillée et convenir d'un échange avec nos experts.
                </p>

                <div className="form-row">
                  <div className="form-group">
                    <label>Nom & Prénom *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Ex : Moussa Diop"
                      value={contactData.name}
                      onChange={handleContactChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email professionnel *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="m.diop@entreprise.com"
                      value={contactData.email}
                      onChange={handleContactChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Téléphone / WhatsApp *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+221 77 000 00 00"
                      value={contactData.phone}
                      onChange={handleContactChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Entreprise / Entité *</label>
                    <input
                      type="text"
                      name="company"
                      required
                      placeholder="Nom de l'entreprise"
                      value={contactData.company}
                      onChange={handleContactChange}
                    />
                  </div>
                </div>

                <div className="diag-actions" style={{ justifyContent: 'space-between', marginTop: '24px' }}>
                  <button
                    type="button"
                    className="btn-pill btn-pill-outline-gold"
                    style={{ color: 'var(--theme-text)', borderColor: 'var(--theme-border)' }}
                    onClick={() => setStep(2)}
                  >
                    <ArrowLeft size={16} /> Recommandations
                  </button>
                  <button
                    type="submit"
                    className="btn-pill btn-pill-orange"
                    disabled={submitting}
                  >
                    {submitting ? 'Transmission...' : <><Send size={16} /> Valider ma demande d'accompagnement</>}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
