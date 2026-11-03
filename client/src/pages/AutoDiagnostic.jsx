import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Send, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Zap, 
  Flame, 
  Leaf, 
  BarChart3, 
  RotateCcw, 
  Printer,
  ChevronDown,
  ChevronUp,
  Building2,
  FileSpreadsheet,
  Layers,
  Droplet,
  Trash2
} from 'lucide-react';
import { 
  SECTEURS_ACTIVITE, 
  TRANCHES_EFFECTIF, 
  TRANCHES_CA, 
  TYPES_ABONNEMENT, 
  DESTINATIONS_EAU, 
  FILIERES_DECHETS, 
  BAREME_REPONSES, 
  MODULES_CONFIG, 
  calculateAutoDiagnostic 
} from '../data/autodiagnosticData';

const STORAGE_KEY_PROFIL = 'sea_autodiag_profil_v1';
const STORAGE_KEY_REPONSES = 'sea_autodiag_reponses_v1';

export default function AutoDiagnostic() {
  // Navigation du parcours global : 
  // 1 = Intro
  // 2 = Profil Entreprise (avec 3 sous-étapes légères : 2.1, 2.2, 2.3)
  // 3 à 8 = Modules 1 à 6 (Questionnaire)
  // 9 = Synthèse & Résultats
  // 10 = Analyse détaillée & Alertes
  // 11 = Demande d'accompagnement
  const [currentStep, setCurrentStep] = useState(1);

  // Sous-étapes pour l'Étape 2 (Profil) :
  // 1 = Coordonnées & Entreprise
  // 2 = Marchés & Électricité
  // 3 = Combustibles & Environnement
  const [profileSubStep, setProfileSubStep] = useState(1);

  // Sections repliables pour réduire la densité
  const [showAdvancedCombustibles, setShowAdvancedCombustibles] = useState(false);
  const [showAdvancedEnvironnement, setShowAdvancedEnvironnement] = useState(false);

  // Données du Profil (avec persistance locale)
  const [profil, setProfil] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROFIL);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Réponses aux 36 affirmations (clé = "1.1", valeur = 0, 1, 2, ou 3)
  const [reponses, setReponses] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_REPONSES);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // État de la demande de contact
  const [contactForm, setContactForm] = useState({
    recontact: 'Oui',
    theme: '',
    echeance: '',
    message: ''
  });
  const [contactStatus, setContactStatus] = useState({ loading: false, success: false, message: '' });

  // Sauvegarde automatique
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROFIL, JSON.stringify(profil));
    } catch (e) { console.error(e); }
  }, [profil]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_REPONSES, JSON.stringify(reponses));
    } catch (e) { console.error(e); }
  }, [reponses]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep, profileSubStep]);

  // Calcul dynamique des résultats
  const diagnosticResults = calculateAutoDiagnostic(profil, reponses);

  const handleProfilChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfil(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 'Oui' : 'Non') : value
    }));
  };

  const handleAnswerSelect = (questionId, points) => {
    setReponses(prev => ({
      ...prev,
      [questionId]: points
    }));
  };

  const handleReset = () => {
    if (window.confirm("Souhaitez-vous réinitialiser votre autodiagnostic ? Toutes les données saisies seront effacées.")) {
      localStorage.removeItem(STORAGE_KEY_PROFIL);
      localStorage.removeItem(STORAGE_KEY_REPONSES);
      setProfil({});
      setReponses({});
      setProfileSubStep(1);
      setCurrentStep(1);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactStatus({ loading: true, success: false, message: '' });

    const payload = {
      name: profil.nomPrenom || 'Répondant Autodiagnostic',
      email: profil.email || 'non-renseigne@autodiag.sn',
      phone: profil.telephone || '',
      company: profil.raisonSociale || '',
      subject: `[AUTODIAGNOSTIC] Score ${diagnosticResults.scoreGlobal}/100 - ${profil.raisonSociale || 'Entreprise'}`,
      message: `RÉSULTATS DE L'AUTODIAGNOSTIC :
Score Global : ${diagnosticResults.scoreGlobal}/100 (${diagnosticResults.niveauGlobal.niveau})
Émissions Scopes 1 & 2 : ${diagnosticResults.indicateurs.totalScopes1Et2} tCO2e/an
Facture énergétique : ${diagnosticResults.indicateurs.factureTotale.toLocaleString('fr-FR')} FCFA/an
Fourchette d'économies : ${diagnosticResults.indicateurs.economiesBas.toLocaleString('fr-FR')} à ${diagnosticResults.indicateurs.economiesHaut.toLocaleString('fr-FR')} FCFA/an

PRIORITÉS IDENTIFIÉES :
1. ${diagnosticResults.priorites[0]?.title} (${diagnosticResults.priorites[0]?.scorePct}%)
2. ${diagnosticResults.priorites[1]?.title} (${diagnosticResults.priorites[1]?.scorePct}%)
3. ${diagnosticResults.priorites[2]?.title} (${diagnosticResults.priorites[2]?.scorePct}%)

DEMANDE D'ÉCHANGE :
Recontact souhaité : ${contactForm.recontact}
Thème prioritaire : ${contactForm.theme || diagnosticResults.priorites[0]?.title}
Échéance / Contrainte : ${contactForm.echeance || 'Non précisée'}
Commentaire du client : ${contactForm.message || 'Aucun commentaire'}`
    };

    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setContactStatus({ loading: false, success: true, message: "Votre demande d'accompagnement et vos résultats ont été transmis avec succès. Notre équipe prendra contact avec vous." });
      } else {
        setContactStatus({ loading: false, success: false, message: data.message || "Erreur lors de l'envoi." });
      }
    } catch (err) {
      setContactStatus({
        loading: false,
        success: true,
        message: "Votre synthèse a bien été enregistrée. Notre équipe SEnergyS Africa prendra contact avec vous."
      });
    }
  };

  // Progression globale (11 étapes)
  const progressPercent = Math.min(100, Math.round(((currentStep - 1) / 10) * 100));

  // Libellé d'étape dans la barre
  const getStepLabel = () => {
    if (currentStep === 1) return "Démarrage";
    if (currentStep === 2) return `Profil (${profileSubStep}/3)`;
    if (currentStep >= 3 && currentStep <= 8) return `Module ${currentStep - 2}/6`;
    if (currentStep === 9) return "Synthèse";
    if (currentStep === 10) return "Analyse & Alertes";
    return "Finalisation";
  };

  return (
    <div className="autodiag-page-container">
      <div className="autodiag-wrapper">

        {/* Barre de navigation haute & Sauvegarde */}
        <div className="autodiag-top-bar">
          <div className="autodiag-brand">
            <span className="autodiag-badge">AUTODIAGNOSTIC OFFICIEL</span>
            <span className="autodiag-tagline">Énergie • Environnement • Climat • ESG</span>
          </div>
          <div className="autodiag-actions-top">
            {currentStep > 1 && (
              <button onClick={handleReset} className="autodiag-btn-link text-muted" title="Recommencer à zéro">
                <RotateCcw size={14} /> Réinitialiser
              </button>
            )}
            <div className="autodiag-progress-pill">
              {getStepLabel()}
            </div>
          </div>
        </div>

        {/* Barre de progression fluide */}
        <div className="autodiag-progress-track">
          <div className="autodiag-progress-fill" style={{ width: `${Math.max(5, progressPercent)}%` }}></div>
        </div>

        {/* ========================================================================= */}
        {/* ÉCRAN 1 : INTRODUCTION & CADRE                                            */}
        {/* ========================================================================= */}
        {currentStep === 1 && (
          <div className="autodiag-card autodiag-fade-in">
            <div className="autodiag-badge-category">Outil d'Évaluation de la Maturité</div>
            <h1 className="autodiag-title-hero">
              Évaluez la maturité énergie, climat et ESG de votre entreprise
            </h1>
            <p className="autodiag-lead">
              En 15 minutes estimées, situez la gouvernance et les performances durables de votre organisation sur 6 dimensions clés, obtenez vos ordres de grandeur d'émissions (Scopes 1 & 2) et identifiez vos économies d'énergie potentielles.
            </p>

            <div className="autodiag-feature-grid">
              <div className="autodiag-feature-box">
                <Clock className="text-orange" size={26} />
                <h3>~15 min estimées</h3>
                <p>Durée indicative à confirmer selon la disponibilité de vos données d'activité.</p>
              </div>
              <div className="autodiag-feature-box">
                <BarChart3 className="text-orange" size={26} />
                <h3>Indicateurs calculés</h3>
                <p>Scopes 1 & 2 (tCO₂e), facture annuelle consolidée et gisements d'économies en FCFA.</p>
              </div>
              <div className="autodiag-feature-box">
                <Leaf className="text-orange" size={26} />
                <h3>Priorités d'action</h3>
                <p>Identification automatique de vos 3 chantiers prioritaires et de vos risques réglementaires.</p>
              </div>
            </div>

            <div className="autodiag-notice-box">
              <Zap size={18} className="text-orange flex-shrink-0" />
              <div>
                <strong>Pour un résultat optimal :</strong> Munissez-vous idéalement de vos factures annuelles d'électricité (kWh, FCFA), de vos consommations de combustibles (gasoil, fuel, gaz...) et de la puissance de vos installations éventuelles.
              </div>
            </div>

            <div className="autodiag-footer-nav" style={{ borderTop: 'none', paddingTop: 0 }}>
              <div></div>
              <button onClick={() => { setProfileSubStep(1); setCurrentStep(2); }} className="btn-pill btn-pill-orange">
                Démarrer l'autodiagnostic <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ÉCRAN 2 : PROFIL DE L'ENTREPRISE (DÉCOUPÉ EN 3 SOUS-ÉTAPES LÉGÈRES)       */}
        {/* ========================================================================= */}
        {currentStep === 2 && (
          <div className="autodiag-card autodiag-fade-in">
            
            {/* Sous-progression du Profil */}
            <div className="autodiag-substepper-box">
              <div className="autodiag-substepper-header">
                <div>
                  <span className="autodiag-badge-category" style={{ marginBottom: '4px' }}>
                    Partie A — Profil de l'entreprise
                  </span>
                  <h2 className="autodiag-title-screen" style={{ fontSize: '1.5rem', marginBottom: '2px' }}>
                    {profileSubStep === 1 && "1. Coordonnées & Identité"}
                    {profileSubStep === 2 && "2. Marchés & Électricité"}
                    {profileSubStep === 3 && "3. Combustibles & Environnement"}
                  </h2>
                </div>
                <div className="autodiag-substep-count">
                  Sous-étape {profileSubStep} sur 3
                </div>
              </div>

              {/* Puces de sous-étapes */}
              <div className="autodiag-substep-tabs">
                <button
                  type="button"
                  onClick={() => setProfileSubStep(1)}
                  className={`autodiag-substep-tab ${profileSubStep === 1 ? 'active' : ''} ${profileSubStep > 1 ? 'completed' : ''}`}
                >
                  <span className="tab-num">1</span>
                  <span className="tab-name">Coordonnées</span>
                </button>
                <div className="tab-divider"></div>
                <button
                  type="button"
                  onClick={() => setProfileSubStep(2)}
                  className={`autodiag-substep-tab ${profileSubStep === 2 ? 'active' : ''} ${profileSubStep > 2 ? 'completed' : ''}`}
                >
                  <span className="tab-num">2</span>
                  <span className="tab-name">Marchés & Élec.</span>
                </button>
                <div className="tab-divider"></div>
                <button
                  type="button"
                  onClick={() => setProfileSubStep(3)}
                  className={`autodiag-substep-tab ${profileSubStep === 3 ? 'active' : ''}`}
                >
                  <span className="tab-num">3</span>
                  <span className="tab-name">Combustibles & Env.</span>
                </button>
              </div>
            </div>

            {/* --- SOUS-ÉTAPE 2.1 : COORDONNÉES ET IDENTITÉ --- */}
            {profileSubStep === 1 && (
              <form onSubmit={(e) => { e.preventDefault(); setProfileSubStep(2); }} className="autodiag-fade-in">
                <div className="autodiag-form-grid">
                  <div className="autodiag-field">
                    <label>Nom et prénom <span className="req">*</span></label>
                    <input
                      type="text"
                      name="nomPrenom"
                      required
                      value={profil.nomPrenom || ''}
                      onChange={handleProfilChange}
                      placeholder="Ex : Moussa Diop"
                    />
                  </div>
                  <div className="autodiag-field">
                    <label>Fonction <span className="req">*</span></label>
                    <input
                      type="text"
                      name="fonction"
                      required
                      value={profil.fonction || ''}
                      onChange={handleProfilChange}
                      placeholder="Ex : Responsable QHSE / Directeur"
                    />
                  </div>
                  <div className="autodiag-field">
                    <label>Email professionnel <span className="req">*</span></label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={profil.email || ''}
                      onChange={handleProfilChange}
                      placeholder="m.diop@entreprise.sn"
                    />
                  </div>
                  <div className="autodiag-field">
                    <label>Téléphone professionnel <span className="req">*</span></label>
                    <input
                      type="tel"
                      name="telephone"
                      required
                      value={profil.telephone || ''}
                      onChange={handleProfilChange}
                      placeholder="+221 77 000 00 00"
                    />
                  </div>

                  <div className="autodiag-field">
                    <label>Raison sociale <span className="req">*</span></label>
                    <input
                      type="text"
                      name="raisonSociale"
                      required
                      value={profil.raisonSociale || ''}
                      onChange={handleProfilChange}
                      placeholder="Nom officiel de votre entreprise"
                    />
                  </div>
                  <div className="autodiag-field">
                    <label>Secteur d'activité</label>
                    <select name="secteurActivite" value={profil.secteurActivite || ''} onChange={handleProfilChange}>
                      <option value="">Sélectionner un secteur...</option>
                      {SECTEURS_ACTIVITE.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                {/* Bloc repliable pour les détails entreprise secondaires */}
                <details className="autodiag-details-box" style={{ marginTop: '16px' }}>
                  <summary className="autodiag-details-summary">
                    <span>Informations complémentaires (Effectif, CA, Sites...)</span>
                    <ChevronDown size={15} className="details-arrow" />
                  </summary>
                  <div className="autodiag-form-grid" style={{ marginTop: '12px' }}>
                    <div className="autodiag-field">
                      <label>Effectif global</label>
                      <select name="effectif" value={profil.effectif || ''} onChange={handleProfilChange}>
                        <option value="">Sélectionner...</option>
                        {TRANCHES_EFFECTIF.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div className="autodiag-field">
                      <label>Chiffre d'affaires annuel (FCFA)</label>
                      <select name="chiffreAffaires" value={profil.chiffreAffaires || ''} onChange={handleProfilChange}>
                        <option value="">Sélectionner...</option>
                        {TRANCHES_CA.map(ca => <option key={ca} value={ca}>{ca}</option>)}
                      </select>
                    </div>
                    <div className="autodiag-field">
                      <label>Nombre de sites</label>
                      <input
                        type="number"
                        min="1"
                        name="nbSites"
                        value={profil.nbSites || ''}
                        onChange={handleProfilChange}
                        placeholder="Ex : 1"
                      />
                    </div>
                    <div className="autodiag-field">
                      <label>Localisation (ville, région)</label>
                      <input
                        type="text"
                        name="localisation"
                        value={profil.localisation || ''}
                        onChange={handleProfilChange}
                        placeholder="Ex : Dakar, Rufisque, Thiès..."
                      />
                    </div>
                  </div>
                </details>

                <div className="autodiag-footer-nav">
                  <button type="button" onClick={() => setCurrentStep(1)} className="btn-pill btn-pill-outline-gold">
                    <ArrowLeft size={16} /> Retour
                  </button>
                  <button type="submit" className="btn-pill btn-pill-orange">
                    Suivant : Marchés & Électricité <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            )}

            {/* --- SOUS-ÉTAPE 2.2 : MARCHÉS & ÉLECTRICITÉ --- */}
            {profileSubStep === 2 && (
              <form onSubmit={(e) => { e.preventDefault(); setProfileSubStep(3); }} className="autodiag-fade-in">
                <div className="autodiag-form-grid">
                  <div className="autodiag-field">
                    <label>Exportation vers l'Union européenne ?</label>
                    <select name="exportUE" value={profil.exportUE || 'Non'} onChange={handleProfilChange}>
                      <option value="Non">Non</option>
                      <option value="Oui">Oui (Exposition MACF potentielle)</option>
                    </select>
                  </div>
                  <div className="autodiag-field">
                    <label>Demandes ESG de clients ou banques ?</label>
                    <select name="demandeESG" value={profil.demandeESG || 'Non'} onChange={handleProfilChange}>
                      <option value="Non">Non</option>
                      <option value="Oui">Oui</option>
                      <option value="Je ne sais pas">Je ne sais pas</option>
                    </select>
                  </div>

                  <div className="autodiag-field">
                    <label>Type d'abonnement électrique <span className="req">*</span></label>
                    <select name="typeAbonnement" required value={profil.typeAbonnement || TYPES_ABONNEMENT[1]} onChange={handleProfilChange}>
                      {TYPES_ABONNEMENT.map(a => <option key={a} value={a}>{a}</option>)}
                    </select>
                  </div>
                  <div className="autodiag-field">
                    <label>Puissance souscrite (kW)</label>
                    <input
                      type="number"
                      min="0"
                      name="puissanceSouscrite"
                      value={profil.puissanceSouscrite || ''}
                      onChange={handleProfilChange}
                      placeholder="Ex : 800"
                    />
                  </div>
                  <div className="autodiag-field">
                    <label>Consommation annuelle électricité (kWh)</label>
                    <input
                      type="number"
                      min="0"
                      name="consoElec"
                      value={profil.consoElec || ''}
                      onChange={handleProfilChange}
                      placeholder="Ex : 2400000"
                    />
                  </div>
                  <div className="autodiag-field">
                    <label>Facture annuelle électricité (FCFA)</label>
                    <input
                      type="number"
                      min="0"
                      name="factureElec"
                      value={profil.factureElec || ''}
                      onChange={handleProfilChange}
                      placeholder="Ex : 264000000"
                    />
                  </div>
                </div>

                <div className="autodiag-footer-nav">
                  <button type="button" onClick={() => setProfileSubStep(1)} className="btn-pill btn-pill-outline-gold">
                    <ArrowLeft size={16} /> Précédent
                  </button>
                  <button type="submit" className="btn-pill btn-pill-orange">
                    Suivant : Combustibles & Env. <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            )}

            {/* --- SOUS-ÉTAPE 2.3 : COMBUSTIBLES, ENVIRONNEMENT & CONSENTEMENT --- */}
            {profileSubStep === 3 && (
              <form onSubmit={(e) => { e.preventDefault(); setCurrentStep(3); }} className="autodiag-fade-in">
                
                {/* Principaux combustibles */}
                <div className="autodiag-form-grid">
                  <div className="autodiag-field">
                    <label>Gasoil / Fuel léger annuel (Litres)</label>
                    <input
                      type="number"
                      min="0"
                      name="qGasoil"
                      value={profil.qGasoil || ''}
                      onChange={handleProfilChange}
                      placeholder="Ex : 60000"
                    />
                  </div>
                  <div className="autodiag-field">
                    <label>Facture annuelle combustibles (FCFA)</label>
                    <input
                      type="number"
                      min="0"
                      name="factureComb"
                      value={profil.factureComb || ''}
                      onChange={handleProfilChange}
                      placeholder="Ex : 192000000"
                    />
                  </div>
                </div>

                {/* Combustibles complémentaires repliables */}
                <div className="autodiag-collapsible-wrapper" style={{ marginTop: '12px' }}>
                  <button
                    type="button"
                    onClick={() => setShowAdvancedCombustibles(!showAdvancedCombustibles)}
                    className="autodiag-collapsible-toggle"
                  >
                    <span>
                      {showAdvancedCombustibles ? '− Masquer les autres combustibles' : '+ Ajouter d\'autres combustibles (Fuel lourd, GPL, Charbon, Gaz naturel...)'}
                    </span>
                    {showAdvancedCombustibles ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                  </button>

                  {showAdvancedCombustibles && (
                    <div className="autodiag-form-grid autodiag-collapsible-content">
                      <div className="autodiag-field">
                        <label>Fuel lourd (Litres)</label>
                        <input
                          type="number"
                          min="0"
                          name="qFuel"
                          value={profil.qFuel || ''}
                          onChange={handleProfilChange}
                          placeholder="Ex : 350000"
                        />
                      </div>
                      <div className="autodiag-field">
                        <label>Butane / GPL (kg)</label>
                        <input
                          type="number"
                          min="0"
                          name="qGpl"
                          value={profil.qGpl || ''}
                          onChange={handleProfilChange}
                          placeholder="Ex : 12000"
                        />
                      </div>
                      <div className="autodiag-field">
                        <label>Gaz naturel (Nm³)</label>
                        <input
                          type="number"
                          min="0"
                          name="qGazNat"
                          value={profil.qGazNat || ''}
                          onChange={handleProfilChange}
                          placeholder="Ex : 0"
                        />
                      </div>
                      <div className="autodiag-field">
                        <label>Charbon (kg)</label>
                        <input
                          type="number"
                          min="0"
                          name="qCharbon"
                          value={profil.qCharbon || ''}
                          onChange={handleProfilChange}
                          placeholder="Ex : 0"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Installations EnR, Rejets et Déchets */}
                <div className="autodiag-collapsible-wrapper" style={{ marginTop: '12px' }}>
                  <button
                    type="button"
                    onClick={() => setShowAdvancedEnvironnement(!showAdvancedEnvironnement)}
                    className="autodiag-collapsible-toggle"
                  >
                    <span>
                      {showAdvancedEnvironnement ? '− Masquer les données Eau, Déchets et EnR' : '+ Préciser Installations Solaire, Eaux et Déchets'}
                    </span>
                    {showAdvancedEnvironnement ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                  </button>

                  {showAdvancedEnvironnement && (
                    <div className="autodiag-form-grid autodiag-collapsible-content">
                      <div className="autodiag-field">
                        <label>Solaire photovoltaïque (kWc)</label>
                        <input
                          type="number"
                          min="0"
                          name="solaireKwc"
                          value={profil.solaireKwc || ''}
                          onChange={handleProfilChange}
                          placeholder="Ex : 150"
                        />
                      </div>
                      <div className="autodiag-field">
                        <label>Les eaux usées sont-elles traitées avant rejet ?</label>
                        <select name="eauTraitee" value={profil.eauTraitee || 'Non'} onChange={handleProfilChange}>
                          <option value="Non">Non</option>
                          <option value="Oui">Oui</option>
                        </select>
                      </div>
                      <div className="autodiag-field">
                        <label>Potentiel de valorisation des déchets ?</label>
                        <select name="potentielValDechets" value={profil.potentielValDechets || 'Non'} onChange={handleProfilChange}>
                          <option value="Non">Non</option>
                          <option value="Oui">Oui (Méthanisation, biogaz, CSR...)</option>
                        </select>
                      </div>
                      <div className="autodiag-field">
                        <label>Filière d'élimination des déchets</label>
                        <select name="filiereDechets" value={profil.filiereDechets || ''} onChange={handleProfilChange}>
                          <option value="">Sélectionner...</option>
                          {FILIERES_DECHETS.map(f => <option key={f} value={f}>{f}</option>)}
                        </select>
                      </div>
                    </div>
                  )}
                </div>

                {/* Consentement obligatoire */}
                <div className="autodiag-consent-box" style={{ marginTop: '16px' }}>
                  <label>
                    <input
                      type="checkbox"
                      name="consentement"
                      required
                      checked={profil.consentement === 'Oui'}
                      onChange={(e) => setProfil(prev => ({ ...prev, consentement: e.target.checked ? 'Oui' : 'Non' }))}
                    />
                    <span>
                      J'accepte que les données saisies soient traitées par SEnergyS Africa pour l'analyse de cet autodiagnostic (loi sénégalaise n° 2008-12 sur les données personnelles) <span className="req">*</span>
                    </span>
                  </label>
                </div>

                <div className="autodiag-footer-nav">
                  <button type="button" onClick={() => setProfileSubStep(2)} className="btn-pill btn-pill-outline-gold">
                    <ArrowLeft size={16} /> Précédent
                  </button>
                  <button type="submit" className="btn-pill btn-pill-orange">
                    Passer à l'évaluation (36 affirmations) <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            )}

          </div>
        )}

        {/* ========================================================================= */}
        {/* ÉCRANS 3 à 8 : LES 6 MODULES D'ÉVALUATION (QUESTIONNAIRE)                  */}
        {/* ========================================================================= */}
        {currentStep >= 3 && currentStep <= 8 && (() => {
          const moduleIndex = currentStep - 3;
          const currentModule = MODULES_CONFIG[moduleIndex];

          return (
            <div className="autodiag-card autodiag-fade-in" key={currentModule.id}>
              <div className="autodiag-badge-category">
                Module {currentModule.num} sur 6 — Barème 0 à 3
              </div>
              <h2 className="autodiag-title-screen">{currentModule.title}</h2>
              <p className="autodiag-subtext">
                Répondez aux {currentModule.questions.length} affirmations ci-dessous selon le degré de mise en œuvre dans votre entreprise :
              </p>

              <div className="autodiag-questions-list">
                {currentModule.questions.map((q) => {
                  const currentValue = reponses[q.id];
                  const hasAnswered = currentValue !== undefined && currentValue !== null;
                  const showRec = hasAnswered && Number(currentValue) <= 1;

                  return (
                    <div className={`autodiag-q-card ${hasAnswered ? 'answered' : ''}`} key={q.id}>
                      <div className="autodiag-q-header">
                        <span className="autodiag-q-num">{q.id}</span>
                        <div className="autodiag-q-text">{q.text}</div>
                      </div>

                      <div className="autodiag-q-scale">
                        {BAREME_REPONSES.map((b) => {
                          const isSelected = currentValue === b.val;
                          return (
                            <button
                              key={b.val}
                              type="button"
                              onClick={() => handleAnswerSelect(q.id, b.val)}
                              className={`autodiag-scale-btn ${isSelected ? 'selected' : ''}`}
                            >
                              <span className="scale-pts">{b.val}</span>
                              <span className="scale-txt">{b.short}</span>
                            </button>
                          );
                        })}
                      </div>

                      {showRec && (
                        <div className="autodiag-q-rec">
                          <span className="rec-icon">💡</span>
                          <div className="rec-content">
                            <strong>Action recommandée :</strong> {q.rec}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="autodiag-footer-nav">
                <button 
                  type="button" 
                  onClick={() => {
                    if (currentStep === 3) {
                      setProfileSubStep(3);
                      setCurrentStep(2);
                    } else {
                      setCurrentStep(currentStep - 1);
                    }
                  }} 
                  className="btn-pill btn-pill-outline-gold"
                >
                  <ArrowLeft size={16} /> Précédent
                </button>
                <button 
                  type="button" 
                  onClick={() => setCurrentStep(currentStep + 1)} 
                  className="btn-pill btn-pill-orange"
                >
                  {currentStep === 8 ? "Calculer et afficher mes résultats" : "Module suivant"} <ArrowRight size={16} />
                </button>
              </div>
            </div>
          );
        })()}

        {/* ========================================================================= */}
        {/* ÉCRAN 9 : SYNTHÈSE & CALCUL DES RÉSULTATS                                  */}
        {/* ========================================================================= */}
        {currentStep === 9 && (
          <div className="autodiag-card autodiag-fade-in">
            <div className="autodiag-badge-category">Partie C — Synthèse Globale</div>
            <h2 className="autodiag-title-screen">Résultats et indicateurs d'impact</h2>
            <p className="autodiag-subtext">
              Synthèse calculée automatiquement à partir des données de votre profil et de vos réponses aux 36 affirmations.
            </p>

            {/* Score Global Hero */}
            <div className="autodiag-hero-score">
              <div className="autodiag-hero-info">
                <span className="autodiag-hero-tag">Niveau de maturité global</span>
                <h3 className="autodiag-hero-level">{diagnosticResults.niveauGlobal.niveau}</h3>
                <p className="autodiag-hero-desc">« {diagnosticResults.niveauGlobal.desc} »</p>
                <div className="autodiag-hero-meta">
                  <span>Entreprise : <strong>{profil.raisonSociale || '(Non renseigné)'}</strong></span>
                  <span>Secteur : <strong>{profil.secteurActivite || '—'}</strong></span>
                </div>
              </div>

              <div className="autodiag-score-badge">
                <div className="autodiag-score-circle">
                  <span className="autodiag-score-val">{diagnosticResults.scoreGlobal}</span>
                  <span className="autodiag-score-max">/ 100</span>
                </div>
              </div>
            </div>

            {/* 4 Indicateurs Clés Dynamiques */}
            <div className="autodiag-kpi-grid">
              <div className="autodiag-kpi-card">
                <div className="autodiag-kpi-label">Émissions Scope 1</div>
                <div className="autodiag-kpi-value">
                  {diagnosticResults.indicateurs.scope1.toLocaleString('fr-FR')} <span className="unit">tCO₂e/an</span>
                </div>
                <div className="autodiag-kpi-sub">Combustibles directs déclarés</div>
              </div>

              <div className="autodiag-kpi-card">
                <div className="autodiag-kpi-label">Émissions Scope 2</div>
                <div className="autodiag-kpi-value">
                  {diagnosticResults.indicateurs.scope2.toLocaleString('fr-FR')} <span className="unit">tCO₂e/an</span>
                </div>
                <div className="autodiag-kpi-sub">Électricité réseau (0,6 kg/kWh)</div>
              </div>

              <div className="autodiag-kpi-card">
                <div className="autodiag-kpi-label">Facture Énergie</div>
                <div className="autodiag-kpi-value">
                  {Math.round(diagnosticResults.indicateurs.factureTotale / 1000000).toLocaleString('fr-FR')} <span className="unit">M FCFA</span>
                </div>
                <div className="autodiag-kpi-sub">Électricité + Combustibles</div>
              </div>

              <div className="autodiag-kpi-card highlight">
                <div className="autodiag-kpi-label text-orange">Économies Estimées</div>
                <div className="autodiag-kpi-value text-orange">
                  {Math.round(diagnosticResults.indicateurs.economiesBas / 1000000).toLocaleString('fr-FR')} à {Math.round(diagnosticResults.indicateurs.economiesHaut / 1000000).toLocaleString('fr-FR')} <span className="unit">M</span>
                </div>
                <div className="autodiag-kpi-sub text-orange">
                  FCFA / an ({Math.round(diagnosticResults.indicateurs.tauxBas * 100)}% à {Math.round(diagnosticResults.indicateurs.tauxHaut * 100)}%)
                </div>
              </div>
            </div>

            <div className="autodiag-disclaimer">
              ⚠️ <strong>Note méthodologique :</strong> Estimations indicatives fondées sur les facteurs d'émission GIEC 2006 et le mix électrique Senelec. Elles ne remplacent pas un audit énergétique approfondi ni un bilan carbone certifié.
            </div>

            <div className="autodiag-footer-nav">
              <button type="button" onClick={() => setCurrentStep(8)} className="btn-pill btn-pill-outline-gold">
                <ArrowLeft size={16} /> Revoir les questions
              </button>
              <button type="button" onClick={() => setCurrentStep(10)} className="btn-pill btn-pill-orange">
                Voir l'analyse détaillée & alertes <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ÉCRAN 10 : ANALYSE DÉTAILLÉE PAR MODULE & ALERTES STRATÉGIQUES             */}
        {/* ========================================================================= */}
        {currentStep === 10 && (
          <div className="autodiag-card autodiag-fade-in">
            <div className="autodiag-badge-category">Diagnostic Approfondi</div>
            <h2 className="autodiag-title-screen">Maturité par dimension & Alertes de conformité</h2>

            {/* Tableau des 6 dimensions */}
            <div className="autodiag-dim-table">
              {diagnosticResults.moduleResults.map((mod) => (
                <div className="autodiag-dim-row" key={mod.id}>
                  <div className="autodiag-dim-title">
                    <strong>{mod.title}</strong>
                    <div className="autodiag-dim-desc">{mod.recommandation}</div>
                  </div>
                  <div className="autodiag-dim-progress-wrap">
                    <div className="autodiag-dim-progress-bar">
                      <div className="autodiag-dim-progress-fill" style={{ width: `${mod.scorePct}%` }}></div>
                    </div>
                  </div>
                  <div className="autodiag-dim-badge-box">
                    <span className="autodiag-dim-pct">{mod.scorePct} %</span>
                    <span className="autodiag-dim-level">{mod.niveau}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Alertes & Opportunités Conditionnelles */}
            {diagnosticResults.alerts.length > 0 && (
              <div style={{ marginTop: '24px' }}>
                <h3 className="autodiag-section-title">Alertes & Opportunités Stratégiques Identifiées</h3>
                <div className="autodiag-alerts-stack">
                  {diagnosticResults.alerts.map((alt, i) => (
                    <div key={i} className={`autodiag-alert-box alert-${alt.type}`}>
                      <AlertTriangle size={18} className="flex-shrink-0" />
                      <div>
                        <strong>{alt.title} :</strong> {alt.message}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3 Priorités d'Accompagnement */}
            <div style={{ marginTop: '24px' }}>
              <h3 className="autodiag-section-title">Vos 3 Chantiers Prioritaires Recommandés</h3>
              <div className="autodiag-priorities-grid">
                {diagnosticResults.priorites.map((p, idx) => (
                  <div className="autodiag-priority-card" key={p.id}>
                    <span className="priority-rank">PRIORITÉ {idx + 1} ({p.scorePct}%)</span>
                    <h4>{p.title}</h4>
                    <p className="priority-rec">{p.recommandation}</p>
                    <div className="priority-service">
                      <strong>Offre SEnergyS :</strong> {p.offreSE}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="autodiag-footer-nav">
              <button type="button" onClick={() => setCurrentStep(9)} className="btn-pill btn-pill-outline-gold">
                <ArrowLeft size={16} /> Revenir à la synthèse
              </button>
              <button type="button" onClick={() => setCurrentStep(11)} className="btn-pill btn-pill-orange">
                Demander un accompagnement <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ÉCRAN 11 : DEMANDE D'ACCOMPAGNEMENT & IMPRESSION PDF                       */}
        {/* ========================================================================= */}
        {currentStep === 11 && (
          <div className="autodiag-card autodiag-fade-in">
            <div className="autodiag-badge-category">Finalisation & Passer à l'Action</div>
            <h2 className="autodiag-title-screen">Demande d'accompagnement & Restitution</h2>
            <p className="autodiag-subtext">
              Conservez votre synthèse ou sollicitez l'expertise de SEnergyS Africa pour concrétiser vos réductions d'émissions et structurer vos démarches.
            </p>

            <form onSubmit={handleContactSubmit}>
              {contactStatus.message && (
                <div className={`autodiag-status-banner ${contactStatus.success ? 'status-success' : 'status-error'}`}>
                  {contactStatus.success ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
                  <span>{contactStatus.message}</span>
                </div>
              )}

              <div className="autodiag-form-grid">
                <div className="autodiag-field" style={{ gridColumn: '1 / -1' }}>
                  <label>Souhaitez-vous être recontacté par SEnergyS Africa ?</label>
                  <div style={{ display: 'flex', gap: '20px', marginTop: '6px' }}>
                    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="recontact"
                        value="Oui"
                        checked={contactForm.recontact === 'Oui'}
                        onChange={(e) => setContactForm({ ...contactForm, recontact: e.target.value })}
                      />
                      <span>Oui, je souhaite échanger avec un expert</span>
                    </label>
                    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="recontact"
                        value="Non"
                        checked={contactForm.recontact === 'Non'}
                        onChange={(e) => setContactForm({ ...contactForm, recontact: e.target.value })}
                      />
                      <span>Non, imprimer / sauvegarder uniquement le rapport</span>
                    </label>
                  </div>
                </div>

                {contactForm.recontact === 'Oui' && (
                  <>
                    <div className="autodiag-field">
                      <label>Thème prioritaire d'échange</label>
                      <select 
                        name="theme" 
                        value={contactForm.theme || diagnosticResults.priorites[0]?.title || ''} 
                        onChange={(e) => setContactForm({ ...contactForm, theme: e.target.value })}
                      >
                        {MODULES_CONFIG.map(m => (
                          <option key={m.id} value={m.title}>
                            {m.title} {m.id === diagnosticResults.priorites[0]?.id ? '(Priorité n°1)' : ''}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="autodiag-field">
                      <label>Échéance ou contrainte clé</label>
                      <input
                        type="text"
                        name="echeance"
                        value={contactForm.echeance}
                        onChange={(e) => setContactForm({ ...contactForm, echeance: e.target.value })}
                        placeholder="Ex : Exigence client UE fin 2026, audit 2027..."
                      />
                    </div>

                    <div className="autodiag-field" style={{ gridColumn: '1 / -1' }}>
                      <label>Commentaire ou besoin spécifique</label>
                      <textarea
                        rows="3"
                        name="message"
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        placeholder="Précisez votre contexte ou vos attentes..."
                      ></textarea>
                    </div>
                  </>
                )}
              </div>

              <div className="autodiag-contact-box">
                📍 <strong>SEnergyS Africa :</strong> Cabinet d'ingénierie et de conseil en transition énergétique et durable • Dakar, Sénégal.
              </div>

              <div className="autodiag-footer-nav">
                <button type="button" onClick={() => setCurrentStep(10)} className="btn-pill btn-pill-outline-gold">
                  <ArrowLeft size={16} /> Précédent
                </button>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button type="button" onClick={() => window.print()} className="btn-pill btn-pill-outline-gold">
                    <Printer size={16} /> Imprimer en PDF
                  </button>
                  {contactForm.recontact === 'Oui' && (
                    <button type="submit" className="btn-pill btn-pill-orange" disabled={contactStatus.loading}>
                      <Send size={16} /> {contactStatus.loading ? 'Envoi...' : 'Transmettre ma demande'}
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
