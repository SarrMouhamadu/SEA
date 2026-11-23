import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  MapPin,
  Clock,
  Award,
  Zap,
  TrendingUp,
  Flame,
  X,
  Send,
  Users
} from 'lucide-react';

const OPEN_POSITIONS = [
  {
    id: 'pos-1',
    title: 'Ingénieur Efficacité Énergétique & Procédés Thermiques',
    pole: 'Énergie Durable & Industrie',
    location: 'Diamniadio / Dakar (Sénégal) & Déplacements régionaux',
    type: 'CDI - Temps Plein',
    experience: '3 à 5 ans d’expérience',
    description: 'Vous piloterez des missions d’audit énergétique instrumenté (ISO 50001), des études de récupération de chaleur fatale et l’optimisation des chaudières et réseaux vapeur industriels.',
    tags: ['ISO 50001', 'Thermique industrielle', 'Audit instrumenté', 'Décarbonation']
  },
  {
    id: 'pos-2',
    title: 'Consultant Senior Finance Durable, Climat & ESG',
    pole: 'Finance Durable & Climat',
    location: 'Dakar (Sénégal) / Télétravail partiel possible',
    type: 'CDI - Temps Plein',
    experience: '4 à 7 ans d’expérience',
    description: 'Accompagnement d’institutions financières, banques régionales et fonds verts dans l’évaluation des risques climatiques, les systèmes ESMS et l’éligibilité aux financements climat.',
    tags: ['Taxonomie Verte', 'ESMS', 'Fonds Verts Climat', 'Marchés Carbone']
  },
  {
    id: 'pos-3',
    title: 'Technicien Supérieur Combustion & Brûleurs Industriels',
    pole: 'Production Propre',
    location: 'Dakar & Sites industriels (Sénégal & Sous-région)',
    type: 'CDI - Temps Plein',
    experience: '2 à 5 ans d’expérience',
    description: 'Installation, réglage de combustion, mise en service et maintenance préventive/curative des brûleurs gaz, fioul lourd et bicarburation haute performance.',
    tags: ['Brûleurs TBG/TBL', 'Régulation O₂', 'Maintenance industrielle', 'Éco-efficacité']
  },
  {
    id: 'pos-4',
    title: 'Chef de Projet Énergies Renouvelables & Hybridation',
    pole: 'Énergie Durable',
    location: 'Dakar & Missions UEMOA',
    type: 'CDI - Temps Plein',
    experience: '3 ans minimum',
    description: 'Dimensionnement technique et suivi de réalisation de centrales solaires photovoltaïques en toiture industrielle, ombrières et systèmes hybrides diesel-solaire.',
    tags: ['PV Syst / AutoCAD', 'Hybridation solaire', 'AMO EnR', 'Rentabilité LCOE']
  }
];

export default function Careers() {
  const [openPositions, setOpenPositions] = useState(OPEN_POSITIONS);
  const [loadingPositions, setLoadingPositions] = useState(true);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    position: 'Candidature Spontanée',
    experience: '1 à 3 ans',
    linkedin: '',
    motivation: ''
  });

  useEffect(() => {
    fetch('/api/careers/jobs')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setOpenPositions(data.data);
        }
      })
      .catch((err) => {
        console.warn('Impossible de charger les offres depuis l’API, utilisation des offres par défaut:', err);
      })
      .finally(() => {
        setLoadingPositions(false);
      });
  }, []);

  const [cvFile, setCvFile] = useState(null);
  const [cvBase64, setCvBase64] = useState('');
  const [cvError, setCvError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState({ success: false, message: '' });

  // Pré-remplir le poste lorsqu'on clique sur "Postuler à cette offre"
  const handleSelectJob = (jobTitle) => {
    setFormData((prev) => ({ ...prev, position: jobTitle }));
    const formEl = document.getElementById('formulaire-candidature');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Gestion du fichier CV avec conversion en Base64
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setCvError('');

    if (!file) return;

    // Vérification de la taille (max 5 Mo)
    if (file.size > 5 * 1024 * 1024) {
      setCvError('Le fichier dépasse la taille maximale autorisée de 5 Mo.');
      return;
    }

    // Vérification du format
    const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowed.includes(file.type) && !file.name.match(/\.(pdf|doc|docx)$/i)) {
      setCvError('Format non supporté. Veuillez soumettre un fichier PDF, DOC ou DOCX.');
      return;
    }

    setCvFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setCvBase64(reader.result);
    };
    reader.onerror = () => {
      setCvError('Erreur lors de la lecture du fichier. Veuillez réessayer.');
    };
    reader.readAsDataURL(file);
  };

  const removeCvFile = () => {
    setCvFile(null);
    setCvBase64('');
    setCvError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitResult({ success: false, message: '' });

    if (!formData.fullName || !formData.email || !formData.motivation) {
      setSubmitResult({
        success: false,
        message: 'Veuillez renseigner votre nom, email et votre motivation.'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        location: formData.location.trim(),
        position: formData.position,
        experience: formData.experience,
        linkedin: formData.linkedin.trim(),
        motivation: formData.motivation.trim(),
        cvName: cvFile ? cvFile.name : '',
        cvType: cvFile ? cvFile.type : '',
        cvSize: cvFile ? cvFile.size : 0,
        cvData: cvBase64 || ''
      };

      const res = await fetch('/api/careers/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Erreur lors de la soumission.');
      }

      setSubmitResult({
        success: true,
        message: 'Votre candidature a été transmise avec succès à l’équipe recrutement de SEnergyS Africa ! Un email de confirmation vous sera adressé.'
      });

      // Réinitialisation du formulaire
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        location: '',
        position: 'Candidature Spontanée',
        experience: '1 à 3 ans',
        linkedin: '',
        motivation: ''
      });
      setCvFile(null);
      setCvBase64('');

    } catch (err) {
      setSubmitResult({
        success: false,
        message: err.message || 'Impossible d’envoyer votre candidature. Veuillez vérifier votre connexion.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="careers-page">
      {/* ── HERO BANNER ────────────────────────────────────────────── */}
      <section className="careers-hero">
        <div className="container">
          <div className="careers-hero-badge">
            <Sparkles size={15} />
            <span>Talents & Recrutement</span>
          </div>
          <h1 className="careers-hero-title">
            Bâtissez la transition énergétique de l'Afrique avec nous
          </h1>
          <p className="careers-hero-sub">
            Rejoignez une équipe d'ingénieurs et de consultants passionnés par l'excellence technique,
            la décarbonation industrielle et l'impact climatique concret en Afrique de l'Ouest.
          </p>
          <div style={{ marginTop: '24px', display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <a href="#offres" className="btn-pill btn-pill-orange">
              Voir nos opportunités <ArrowRight size={16} />
            </a>
            <a href="#formulaire-candidature" className="btn-pill btn-pill-outline-gold">
              Candidature spontanée
            </a>
          </div>
        </div>
      </section>

      {/* ── POURQUOI REJOINDRE SESA ───────────────────────────────── */}
      <section className="careers-values-section">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px auto' }}>
            <span className="section-label" style={{ color: 'var(--color-orange)', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '12px', fontWeight: 700 }}>
              Culture d'Entreprise
            </span>
            <h2 className="section-title" style={{ fontSize: '2rem', marginTop: '6px' }}>
              Pourquoi rejoindre SEnergyS Africa ?
            </h2>
            <p className="section-desc" style={{ color: 'var(--theme-text-muted)' }}>
              Chez SEnergyS Africa, chaque projet a un impact mesurable sur la compétitivité de l'industrie
              africaine et la préservation de notre environnement.
            </p>
          </div>

          <div className="careers-values-grid">
            <div className="careers-val-card">
              <div className="careers-val-icon" style={{ background: 'rgba(232, 113, 43, 0.1)', color: '#e8712b' }}>
                <Zap size={24} />
              </div>
              <h3>Impact Réel & Mesurable</h3>
              <p>
                Vous travaillerez sur des chantiers concrets : réduction directe de consommations de fioul lourd,
                intégration de solaire, audits certifiés ISO 50001 et éco-parcs industriels.
              </p>
            </div>

            <div className="careers-val-card">
              <div className="careers-val-icon" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                <TrendingUp size={24} />
              </div>
              <h3>Finance Climat & Standards Internationaux</h3>
              <p>
                Nos équipes interviennent aux côtés des bailleurs de fonds internationaux (BOAD, AFD, UE, BAD)
                et des banques régionales pour structurer des financements verts d'envergure.
              </p>
            </div>

            <div className="careers-val-card">
              <div className="careers-val-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                <Award size={24} />
              </div>
              <h3>Développement Professionnel & Formations</h3>
              <p>
                Nous investissons massivement dans le renforcement continu des compétences, les certifications
                techniques de pointe et le partage d'expertise entre pairs.
              </p>
            </div>

            <div className="careers-val-card">
              <div className="careers-val-icon" style={{ background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7' }}>
                <Users size={24} />
              </div>
              <h3>Esprit d'Équipe & Agilité Panafricaine</h3>
              <p>
                Un environnement de travail bienveillant, stimulant et résolument axé sur l'innovation
                technologique et l'autonomie des collaborateurs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── OFFRES D'EMPLOI ACTUELLES ──────────────────────────────── */}
      <section id="offres" className="careers-jobs-section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span className="section-label" style={{ color: 'var(--color-orange)', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '12px', fontWeight: 700 }}>
                Opportunités Ouvertes
              </span>
              <h2 className="section-title" style={{ fontSize: '2rem', marginTop: '6px' }}>
                Nos Postes Disponibles
              </h2>
            </div>
            <span style={{ fontSize: '13px', color: 'var(--theme-text-muted)' }}>
              {openPositions.length} {openPositions.length > 1 ? 'offres actuellement à pourvoir' : 'offre actuellement à pourvoir'}
            </span>
          </div>

          <div className="careers-jobs-list">
            {openPositions.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', background: 'var(--theme-surface-alt)', borderRadius: 'var(--radius-md)' }}>
                <p style={{ color: 'var(--theme-text-muted)', fontSize: '15px' }}>
                  Aucune offre spécifique ouverte pour le moment. Vous pouvez néanmoins déposer une candidature spontanée ci-dessous.
                </p>
              </div>
            ) : (
              openPositions.map((job) => (
                <div key={job.id} className="careers-job-card">
                  <div className="careers-job-main">
                    <div className="careers-job-header">
                      <span className="careers-job-pole">{job.pole}</span>
                      <span className="careers-job-type">{job.type}</span>
                    </div>
                    <h3 className="careers-job-title">{job.title}</h3>
                    <div className="careers-job-meta">
                      <span><MapPin size={14} /> {job.location}</span>
                      <span><Clock size={14} /> {job.experience}</span>
                    </div>
                    <p className="careers-job-desc">{job.description}</p>
                    {job.tags && job.tags.length > 0 && (
                      <div className="careers-job-tags">
                        {job.tags.map((t, idx) => (
                          <span key={idx} className="careers-job-tag">{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="careers-job-action">
                    <button
                      type="button"
                      onClick={() => handleSelectJob(job.title)}
                      className="btn-pill btn-pill-orange"
                    >
                      Postuler <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ── FORMULAIRE DE CANDIDATURE AVEC DÉPÔT CV & MOTIVATION ──── */}
      <section id="formulaire-candidature" className="careers-form-section">
        <div className="container" style={{ maxWidth: '860px' }}>
          <div className="careers-form-card">
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <div className="careers-badge-tag">
                <Briefcase size={15} />
                <span>Espace Candidat</span>
              </div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '10px' }}>
                Déposer votre Candidature
              </h2>
              <p style={{ color: 'var(--theme-text-muted)', fontSize: '14px', maxWidth: '600px', margin: '8px auto 0 auto' }}>
                Remplissez les informations ci-dessous et joignez votre CV ainsi que votre lettre de motivation.
                Chaque candidature est examinée avec la plus grande attention par notre direction technique.
              </p>
            </div>

            {submitResult.message && (
              <div
                className={`careers-status-banner ${submitResult.success ? 'status-success' : 'status-error'}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 18px',
                  borderRadius: '8px',
                  marginBottom: '24px',
                  fontSize: '13.5px',
                  background: submitResult.success ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
                  border: `1px solid ${submitResult.success ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                  color: submitResult.success ? '#10b981' : '#ef4444'
                }}
              >
                {submitResult.success ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                <span>{submitResult.message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="careers-form-grid">
                {/* Poste ciblé */}
                <div className="careers-field full-width">
                  <label>Poste ou opportunité visée *</label>
                  <select
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    required
                  >
                    {openPositions.map((p) => (
                      <option key={p.id} value={p.title}>{p.title}</option>
                    ))}
                    <option value="Candidature Spontanée">Candidature Spontanée (Profil général)</option>
                    <option value="Stage PFE / Alternance">Stage de Fin d’Études / Alternance</option>
                  </select>
                </div>

                {/* Nom complet */}
                <div className="careers-field">
                  <label>Nom et Prénom *</label>
                  <input
                    type="text"
                    required
                    placeholder="ex: Fatou Ndiaye"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>

                {/* Email */}
                <div className="careers-field">
                  <label>Adresse email *</label>
                  <input
                    type="email"
                    required
                    placeholder="ex: fatou.ndiaye@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                {/* Téléphone */}
                <div className="careers-field">
                  <label>Numéro de téléphone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="ex: +221 77 000 00 00"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                {/* Ville & Pays */}
                <div className="careers-field">
                  <label>Ville & Pays de résidence</label>
                  <input
                    type="text"
                    placeholder="ex: Dakar, Sénégal"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>

                {/* Années d'expérience */}
                <div className="careers-field">
                  <label>Niveau d'expérience</label>
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  >
                    <option value="Jeune diplômé (0 - 1 an)">Jeune diplômé (0 - 1 an)</option>
                    <option value="1 à 3 ans">1 à 3 ans</option>
                    <option value="3 à 5 ans">3 à 5 ans</option>
                    <option value="5 à 10 ans">5 à 10 ans</option>
                    <option value="+ de 10 ans (Expert senior)">+ de 10 ans (Expert senior)</option>
                  </select>
                </div>

                {/* LinkedIn */}
                <div className="careers-field">
                  <label>Profil LinkedIn ou Portfolio (Optionnel)</label>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/mon-profil"
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  />
                </div>

                {/* Lettre / Message de Motivation */}
                <div className="careers-field full-width">
                  <label>Votre lettre de motivation ou message de présentation *</label>
                  <textarea
                    rows="5"
                    required
                    placeholder="Présentez brièvement vos compétences clés, vos réalisations marquantes et les raisons pour lesquelles vous souhaitez intégrer SEnergyS Africa..."
                    value={formData.motivation}
                    onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                  ></textarea>
                </div>

                {/* Dépôt de CV */}
                <div className="careers-field full-width">
                  <label>Curriculum Vitae (CV) * <span style={{ fontSize: '12px', fontWeight: 400, color: 'var(--theme-text-muted)' }}>(Formats acceptés : PDF, DOC, DOCX • Max 5 Mo)</span></label>
                  
                  {!cvFile ? (
                    <div className="careers-file-dropzone">
                      <input
                        type="file"
                        id="cv-upload-input"
                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                      />
                      <label htmlFor="cv-upload-input" className="careers-dropzone-label">
                        <UploadCloud size={32} className="careers-upload-icon" />
                        <span className="careers-dropzone-title">Cliquez pour importer votre CV</span>
                        <span className="careers-dropzone-sub">ou glissez-déposez votre document ici</span>
                      </label>
                    </div>
                  ) : (
                    <div className="careers-file-preview">
                      <div className="careers-file-info">
                        <FileText size={22} className="careers-file-icon" />
                        <div>
                          <div className="careers-file-name">{cvFile.name}</div>
                          <div className="careers-file-size">{(cvFile.size / 1024).toFixed(1)} Ko</div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={removeCvFile}
                        className="careers-file-remove"
                        title="Retirer ce fichier"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  )}

                  {cvError && (
                    <div style={{ color: '#ef4444', fontSize: '12.5px', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <AlertCircle size={14} />
                      <span>{cvError}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Bouton de soumission */}
              <div style={{ marginTop: '28px', textAlign: 'center' }}>
                <button
                  type="submit"
                  className="btn-pill btn-pill-orange"
                  style={{ minWidth: '220px', padding: '14px 28px', fontSize: '15px' }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span>Envoi de votre dossier...</span>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Transmettre ma candidature</span>
                    </>
                  )}
                </button>
                <p style={{ fontSize: '12px', color: 'var(--theme-text-muted)', marginTop: '10px' }}>
                  En soumettant ce formulaire, vous consentez au traitement de vos données personnelles par le service RH de SEnergyS Africa dans le cadre strict des recrutements.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
