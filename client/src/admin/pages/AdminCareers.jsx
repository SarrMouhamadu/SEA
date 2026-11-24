import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Search,
  Download,
  Eye,
  Trash2,
  Calendar,
  Phone,
  Mail,
  User,
  MapPin,
  CheckCircle2,
  Clock,
  ArrowRight,
  FileText,
  ExternalLink,
  Linkedin,
  Filter,
  X,
  PlusCircle,
  Edit3,
  ToggleLeft,
  ToggleRight,
  Check,
  Tag,
  Building
} from 'lucide-react';
import '../admin.css';

export default function AdminCareers() {
  // Navigation entre Candidatures et Gestion des Offres
  const [activeTab, setActiveTab] = useState('applications'); // 'applications' | 'jobs'

  // État des candidatures
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  // État des offres d'emploi
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [jobsSearch, setJobsSearch] = useState('');
  const [jobModalOpen, setJobModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [jobSaving, setJobSaving] = useState(false);
  const [jobFormError, setJobFormError] = useState('');

  const [jobFormData, setJobFormData] = useState({
    title: '',
    pole: 'Énergie Durable & Industrie',
    location: 'Diamniadio / Dakar (Sénégal)',
    type: 'CDI - Temps Plein',
    experience: '3 à 5 ans d’expérience',
    description: '',
    tags: '',
    active: true
  });

  useEffect(() => {
    fetchCareers();
    fetchJobs();
  }, []);

  const fetchCareers = () => {
    fetch('/api/admin/careers')
      .then(res => res.json())
      .then(resData => {
        if (resData.success && resData.data) {
          setCareers(resData.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Erreur chargement candidatures:', err);
        setLoading(false);
      });
  };

  const fetchJobs = () => {
    fetch('/api/admin/jobs')
      .then(res => res.json())
      .then(resData => {
        if (resData.success && resData.data) {
          setJobs(resData.data);
        }
        setLoadingJobs(false);
      })
      .catch(err => {
        console.error('Erreur chargement offres:', err);
        setLoadingJobs(false);
      });
  };

  // ── GESTION DES CANDIDATURES ──────────────────────────────
  const handleOpenDetail = async (item) => {
    setSelectedCareer(item);
    setLoadingDetail(true);
    try {
      const res = await fetch(`/api/admin/careers/${item.id}`);
      const data = await res.json();
      if (data.success && data.data) {
        setSelectedCareer(data.data);
      }
    } catch (err) {
      console.error('Erreur chargement détail candidature:', err);
    } finally {
      setLoadingDetail(false);
    }
  };

  const updateStatus = async (id, newStatus, newNotes) => {
    try {
      const payload = {};
      if (newStatus !== undefined) payload.status = newStatus;
      if (newNotes !== undefined) payload.notes = newNotes;

      const res = await fetch(`/api/admin/careers/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setCareers(prev => prev.map(c => c.id === id ? { ...c, ...payload } : c));
        if (selectedCareer && selectedCareer.id === id) {
          setSelectedCareer(prev => ({ ...prev, ...payload }));
        }
      }
    } catch (err) {
      console.error('Erreur mise à jour candidature:', err);
    }
  };

  const deleteCareer = async (id) => {
    if (!window.confirm('Voulez-vous vraiment supprimer cette candidature ?')) return;
    try {
      const res = await fetch(`/api/admin/careers/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setCareers(prev => prev.filter(c => c.id !== id));
        if (selectedCareer && selectedCareer.id === id) setSelectedCareer(null);
      }
    } catch (err) {
      console.error('Erreur suppression candidature:', err);
    }
  };

  const downloadCV = (career) => {
    if (!career.cvData) {
      alert("Aucun fichier CV n'est disponible pour cette candidature.");
      return;
    }
    try {
      const link = document.createElement('a');
      link.href = career.cvData;
      link.download = career.cvName || `CV_${career.fullName.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      window.open(career.cvData, '_blank');
    }
  };

  const exportCSV = () => {
    if (!careers.length) return;
    const headers = ['ID', 'Date', 'Nom Complet', 'Email', 'Téléphone', 'Localisation', 'Poste', 'Expérience', 'Statut'];
    const rows = filteredCareers.map(c => [
      c.id,
      new Date(c.created_at).toLocaleDateString('fr-FR'),
      `"${c.fullName.replace(/"/g, '""')}"`,
      c.email,
      c.phone || '',
      `"${(c.location || '').replace(/"/g, '""')}"`,
      `"${c.position.replace(/"/g, '""')}"`,
      `"${c.experience || ''}"`,
      c.status
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(';'), ...rows.map(e => e.join(';'))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `candidatures_sesa_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ── GESTION DES OFFRES D'EMPLOI ────────────────────────────
  const handleOpenCreateJob = () => {
    setEditingJob(null);
    setJobFormData({
      title: '',
      pole: 'Énergie Durable & Industrie',
      location: 'Diamniadio / Dakar (Sénégal)',
      type: 'CDI - Temps Plein',
      experience: '3 à 5 ans d’expérience',
      description: '',
      tags: '',
      active: true
    });
    setJobFormError('');
    setJobModalOpen(true);
  };

  const handleOpenEditJob = (job) => {
    setEditingJob(job);
    setJobFormData({
      title: job.title || '',
      pole: job.pole || 'Énergie Durable & Industrie',
      location: job.location || 'Dakar, Sénégal',
      type: job.type || 'CDI - Temps Plein',
      experience: job.experience || '',
      description: job.description || '',
      tags: Array.isArray(job.tags) ? job.tags.join(', ') : (job.tags || ''),
      active: job.active !== false
    });
    setJobFormError('');
    setJobModalOpen(true);
  };

  const handleSaveJob = async (e) => {
    e.preventDefault();
    setJobFormError('');

    if (!jobFormData.title.trim()) {
      setJobFormError('L’intitulé du poste est obligatoire.');
      return;
    }

    setJobSaving(true);
    try {
      const url = editingJob ? `/api/admin/jobs/${editingJob.id}` : '/api/admin/jobs';
      const method = editingJob ? 'PATCH' : 'POST';

      const payload = {
        ...jobFormData,
        title: jobFormData.title.trim(),
        tags: jobFormData.tags.split(',').map(t => t.trim()).filter(Boolean)
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Erreur lors de l’enregistrement de l’offre.');
      }

      fetchJobs();
      setJobModalOpen(false);
    } catch (err) {
      setJobFormError(err.message || 'Une erreur est survenue.');
    } finally {
      setJobSaving(false);
    }
  };

  const handleToggleJobActive = async (job) => {
    try {
      const newActive = !job.active;
      const res = await fetch(`/api/admin/jobs/${job.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: newActive })
      });
      const data = await res.json();
      if (data.success) {
        setJobs(prev => prev.map(j => j.id === job.id ? { ...j, active: newActive } : j));
      }
    } catch (err) {
      console.error('Erreur changement statut offre:', err);
    }
  };

  const handleDeleteJob = async (id) => {
    if (!window.confirm('Voulez-vous vraiment supprimer cette offre d’emploi ? Elle ne sera plus affichée sur le site public.')) return;
    try {
      const res = await fetch(`/api/admin/jobs/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setJobs(prev => prev.filter(j => j.id !== id));
      }
    } catch (err) {
      console.error('Erreur suppression offre:', err);
    }
  };

  // Filtres
  const filteredCareers = careers.filter(c => {
    const q = search.toLowerCase();
    const matchSearch =
      (c.fullName && c.fullName.toLowerCase().includes(q)) ||
      (c.email && c.email.toLowerCase().includes(q)) ||
      (c.position && c.position.toLowerCase().includes(q)) ||
      (c.location && c.location.toLowerCase().includes(q));
    const matchStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const filteredJobs = jobs.filter(j => {
    const q = jobsSearch.toLowerCase();
    return (
      (j.title && j.title.toLowerCase().includes(q)) ||
      (j.pole && j.pole.toLowerCase().includes(q)) ||
      (j.location && j.location.toLowerCase().includes(q)) ||
      (j.type && j.type.toLowerCase().includes(q))
    );
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'nouveau':
        return <span className="admin-status-badge status-new">Nouveau</span>;
      case 'en_revue':
        return <span className="admin-status-badge status-pending">En revue</span>;
      case 'entretien':
        return <span className="admin-status-badge status-contacted">Entretien</span>;
      case 'retenu':
        return <span className="admin-status-badge status-resolved">Retenu</span>;
      case 'refuse':
        return <span className="admin-status-badge status-archived">Refusé</span>;
      default:
        return <span className="admin-status-badge status-archived">{status}</span>;
    }
  };

  const formatDate = (isoStr) => {
    if (!isoStr) return '';
    const d = new Date(isoStr);
    return d.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div>
      {/* ── BARRE D'ONGLETS RH & RECRUTEMENT ────────────────────────── */}
      <div
        className="admin-tabs-bar"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'var(--admin-surface)',
          border: '1px solid var(--admin-border)',
          borderRadius: 10,
          padding: '8px 12px',
          marginBottom: 24,
          flexWrap: 'wrap',
          gap: 12
        }}
      >
        <div className="admin-tabs-group" style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button
            type="button"
            className={`admin-btn ${activeTab === 'applications' ? 'admin-btn-primary' : 'admin-btn-secondary'}`}
            onClick={() => setActiveTab('applications')}
            style={{ padding: '8px 18px', fontSize: 13.5 }}
          >
            <User size={16} />
            <span>Candidatures Reçues ({careers.length})</span>
            {careers.filter(c => c.status === 'nouveau').length > 0 && (
              <span className="admin-nav-badge highlight" style={{ marginLeft: 6 }}>
                {careers.filter(c => c.status === 'nouveau').length}
              </span>
            )}
          </button>

          <button
            type="button"
            className={`admin-btn ${activeTab === 'jobs' ? 'admin-btn-primary' : 'admin-btn-secondary'}`}
            onClick={() => setActiveTab('jobs')}
            style={{ padding: '8px 18px', fontSize: 13.5 }}
          >
            <Briefcase size={16} />
            <span>Gestion des Offres d'Emploi ({jobs.length})</span>
          </button>
        </div>

        {activeTab === 'jobs' && (
          <button
            type="button"
            onClick={handleOpenCreateJob}
            className="admin-btn admin-btn-primary"
            style={{ padding: '9px 18px', fontSize: 13 }}
          >
            <PlusCircle size={16} />
            <span>Publier une nouvelle offre</span>
          </button>
        )}
      </div>

      {/* ── VUE 1 : CANDIDATURES REÇUES ───────────────────────────── */}
      {activeTab === 'applications' && (
        <>
          {/* KPI Candidatures */}
          <div className="admin-kpi-grid" style={{ marginBottom: 24 }}>
            <div className="admin-kpi-card">
              <div className="admin-kpi-card-header">
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--admin-text-muted)' }}>Total Candidatures</span>
                <div className="admin-kpi-icon-wrap" style={{ background: 'rgba(232, 113, 43, 0.15)', color: '#e8712b' }}>
                  <Briefcase size={20} />
                </div>
              </div>
              <div className="admin-kpi-value">{careers.length}</div>
              <div className="admin-kpi-label">Dossiers reçus</div>
            </div>

            <div className="admin-kpi-card">
              <div className="admin-kpi-card-header">
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--admin-text-muted)' }}>Nouvelles non traitées</span>
                <div className="admin-kpi-icon-wrap" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' }}>
                  <Clock size={20} />
                </div>
              </div>
              <div className="admin-kpi-value" style={{ color: '#ef4444' }}>
                {careers.filter(c => c.status === 'nouveau').length}
              </div>
              <div className="admin-kpi-label">À examiner en priorité</div>
            </div>

            <div className="admin-kpi-card">
              <div className="admin-kpi-card-header">
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--admin-text-muted)' }}>Entretiens en cours</span>
                <div className="admin-kpi-icon-wrap" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' }}>
                  <Calendar size={20} />
                </div>
              </div>
              <div className="admin-kpi-value" style={{ color: '#3b82f6' }}>
                {careers.filter(c => c.status === 'entretien').length}
              </div>
              <div className="admin-kpi-label">Entretiens programmés</div>
            </div>

            <div className="admin-kpi-card">
              <div className="admin-kpi-card-header">
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--admin-text-muted)' }}>Candidats Retenus</span>
                <div className="admin-kpi-icon-wrap" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
                  <CheckCircle2 size={20} />
                </div>
              </div>
              <div className="admin-kpi-value" style={{ color: '#10b981' }}>
                {careers.filter(c => c.status === 'retenu').length}
              </div>
              <div className="admin-kpi-label">Profils validés</div>
            </div>
          </div>

          {/* Filtres Candidatures */}
          <div className="admin-card" style={{ marginBottom: 20, padding: '16px 20px' }}>
            <div className="admin-filter-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
              <div className="admin-filter-row" style={{ display: 'flex', gap: 12, alignItems: 'center', flex: 1, minWidth: 220, flexWrap: 'wrap' }}>
                <div className="admin-input-wrap" style={{ flex: 1, minWidth: 180, margin: 0 }}>
                  <Search className="admin-input-icon" size={16} />
                  <input
                    type="text"
                    className="admin-form-input"
                    placeholder="Rechercher par nom, email, poste ou ville..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ paddingLeft: 38 }}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Filter size={16} style={{ color: 'var(--admin-text-muted)', flexShrink: 0 }} />
                  <select
                    className="admin-form-input"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    style={{ width: 'auto', padding: '8px 12px' }}
                  >
                    <option value="all">Tous les statuts</option>
                    <option value="nouveau">Nouveaux</option>
                    <option value="en_revue">En revue</option>
                    <option value="entretien">Entretien</option>
                    <option value="retenu">Retenus</option>
                    <option value="refuse">Refusés</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button type="button" onClick={exportCSV} className="admin-btn admin-btn-secondary" style={{ width: '100%' }} title="Exporter au format Excel / CSV">
                  <Download size={15} />
                  <span>Exporter CSV</span>
                </button>
              </div>
            </div>
          </div>

          {/* Table Candidatures */}
          <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
            {loading ? (
              <div style={{ padding: 40, textAlign: 'center' }}>
                <div className="admin-spinner" style={{ margin: '0 auto 12px' }} />
                <p style={{ color: 'var(--admin-text-muted)', fontSize: 14 }}>Chargement des candidatures...</p>
              </div>
            ) : filteredCareers.length === 0 ? (
              <div style={{ padding: 48, textAlign: 'center' }}>
                <Briefcase size={36} style={{ color: 'var(--admin-text-subtle)', margin: '0 auto 12px' }} />
                <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--admin-text)' }}>Aucune candidature trouvée</h3>
                <p style={{ color: 'var(--admin-text-muted)', fontSize: 13, marginTop: 4 }}>
                  {search || statusFilter !== 'all' ? 'Modifiez vos filtres de recherche.' : 'Les nouvelles candidatures déposées sur le site apparaîtront ici.'}
                </p>
              </div>
            ) : (
              <div className="admin-table-wrap" tabIndex={0} role="region" aria-label="Liste des candidatures">
                <table
                  className="admin-table admin-table-responsive"
                  style={{
                    '--label-1': '"Candidat"',
                    '--label-2': '"Poste Sollicité"',
                    '--label-3': '"Expérience & Lieu"',
                    '--label-4': '"Date"',
                    '--label-5': '"CV"',
                    '--label-6': '"Statut"',
                    '--label-7': '"Actions"'
                  }}
                >
                  <thead>
                    <tr>
                      <th>Candidat</th>
                      <th>Poste Sollicité</th>
                      <th>Expérience & Lieu</th>
                      <th>Date</th>
                      <th>CV</th>
                      <th>Statut</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCareers.map((c) => (
                      <tr key={c.id}>
                        <td>
                          <div style={{ fontWeight: 600, color: 'var(--admin-text)' }}>{c.fullName}</div>
                          <div style={{ fontSize: 12, color: 'var(--admin-text-muted)' }}>{c.email}</div>
                        </td>
                        <td>
                          <span style={{ fontWeight: 500, color: 'var(--color-orange)' }}>{c.position}</span>
                        </td>
                        <td>
                          <div style={{ fontSize: 12.5 }}>{c.experience || '—'}</div>
                          <div style={{ fontSize: 11.5, color: 'var(--admin-text-muted)' }}>{c.location || '—'}</div>
                        </td>
                        <td style={{ fontSize: 12, color: 'var(--admin-text-muted)' }}>
                          {formatDate(c.created_at)}
                        </td>
                        <td>
                          {c.cvAvailable || c.cvData ? (
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--admin-accent-green)' }}>
                              <FileText size={14} /> Fichier joint
                            </span>
                          ) : (
                            <span style={{ fontSize: 12, color: 'var(--admin-text-subtle)' }}>Aucun</span>
                          )}
                        </td>
                        <td>{getStatusBadge(c.status)}</td>
                        <td style={{ textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: 6 }}>
                            <button
                              type="button"
                              onClick={() => handleOpenDetail(c)}
                              className="admin-action-btn view"
                              title="Examiner la candidature"
                            >
                              <Eye size={15} />
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteCareer(c.id)}
                              className="admin-action-btn delete"
                              title="Supprimer"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}

      {/* ── VUE 2 : GESTION DES OFFRES D'EMPLOI ─────────────────────── */}
      {activeTab === 'jobs' && (
        <>
          {/* KPI Offres */}
          <div className="admin-kpi-grid" style={{ marginBottom: 24 }}>
            <div className="admin-kpi-card">
              <div className="admin-kpi-card-header">
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--admin-text-muted)' }}>Offres Totales</span>
                <div className="admin-kpi-icon-wrap" style={{ background: 'rgba(232, 113, 43, 0.15)', color: '#e8712b' }}>
                  <Briefcase size={20} />
                </div>
              </div>
              <div className="admin-kpi-value">{jobs.length}</div>
              <div className="admin-kpi-label">Postes créés au total</div>
            </div>

            <div className="admin-kpi-card">
              <div className="admin-kpi-card-header">
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--admin-text-muted)' }}>En Ligne (Actives)</span>
                <div className="admin-kpi-icon-wrap" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
                  <CheckCircle2 size={20} />
                </div>
              </div>
              <div className="admin-kpi-value" style={{ color: '#10b981' }}>
                {jobs.filter(j => j.active !== false).length}
              </div>
              <div className="admin-kpi-label">Visibles sur /carrieres</div>
            </div>

            <div className="admin-kpi-card">
              <div className="admin-kpi-card-header">
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--admin-text-muted)' }}>Masquées / Brouillons</span>
                <div className="admin-kpi-icon-wrap" style={{ background: 'rgba(156, 163, 175, 0.15)', color: '#9ca3af' }}>
                  <Clock size={20} />
                </div>
              </div>
              <div className="admin-kpi-value" style={{ color: '#9ca3af' }}>
                {jobs.filter(j => j.active === false).length}
              </div>
              <div className="admin-kpi-label">Non visibles du public</div>
            </div>

            <div className="admin-kpi-card">
              <div className="admin-kpi-card-header">
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--admin-text-muted)' }}>Candidatures liées</span>
                <div className="admin-kpi-icon-wrap" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' }}>
                  <User size={20} />
                </div>
              </div>
              <div className="admin-kpi-value" style={{ color: '#3b82f6' }}>
                {careers.length}
              </div>
              <div className="admin-kpi-label">Candidats ayant postulé</div>
            </div>
          </div>

          {/* Recherche & Filtre des Offres */}
          <div className="admin-card" style={{ marginBottom: 20, padding: '16px 20px' }}>
            <div className="admin-filter-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
              <div className="admin-input-wrap" style={{ flex: 1, minWidth: 200, margin: 0 }}>
                <Search className="admin-input-icon" size={16} />
                <input
                  type="text"
                  className="admin-form-input"
                  placeholder="Rechercher une offre par titre, pôle, lieu ou contrat..."
                  value={jobsSearch}
                  onChange={(e) => setJobsSearch(e.target.value)}
                  style={{ paddingLeft: 38 }}
                />
              </div>

              <button
                type="button"
                onClick={handleOpenCreateJob}
                className="admin-btn admin-btn-primary"
                style={{ padding: '9px 18px', fontSize: 13 }}
              >
                <PlusCircle size={15} />
                <span>Nouvelle Offre d'Emploi</span>
              </button>
            </div>
          </div>

          {/* Table des Offres d'Emploi */}
          <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
            {loadingJobs ? (
              <div style={{ padding: 40, textAlign: 'center' }}>
                <div className="admin-spinner" style={{ margin: '0 auto 12px' }} />
                <p style={{ color: 'var(--admin-text-muted)', fontSize: 14 }}>Chargement des offres...</p>
              </div>
            ) : filteredJobs.length === 0 ? (
              <div style={{ padding: 48, textAlign: 'center' }}>
                <Briefcase size={36} style={{ color: 'var(--admin-text-subtle)', margin: '0 auto 12px' }} />
                <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--admin-text)' }}>Aucune offre d'emploi trouvée</h3>
                <p style={{ color: 'var(--admin-text-muted)', fontSize: 13, marginTop: 4 }}>
                  {jobsSearch ? 'Aucune offre ne correspond à votre recherche.' : 'Créez votre première offre avec le bouton ci-dessus.'}
                </p>
              </div>
            ) : (
              <div className="admin-table-wrap" tabIndex={0} role="region" aria-label="Liste des offres d'emploi">
                <table
                  className="admin-table admin-table-responsive"
                  style={{
                    '--label-1': '"Intitulé du Poste & Pôle"',
                    '--label-2': '"Type & Expérience"',
                    '--label-3': '"Lieu"',
                    '--label-4': '"Mots-clés"',
                    '--label-5': '"Visibilité Publique"',
                    '--label-6': '"Actions"'
                  }}
                >
                  <thead>
                    <tr>
                      <th>Intitulé du Poste & Pôle</th>
                      <th>Type & Expérience</th>
                      <th>Lieu</th>
                      <th>Mots-clés</th>
                      <th>Visibilité Publique</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredJobs.map((j) => (
                      <tr key={j.id}>
                        <td>
                          <div style={{ fontWeight: 600, color: 'var(--admin-text)' }}>{j.title}</div>
                          <div style={{ fontSize: 12, color: 'var(--color-orange)' }}>{j.pole}</div>
                        </td>
                        <td>
                          <div style={{ fontSize: 12.5, fontWeight: 500 }}>{j.type}</div>
                          <div style={{ fontSize: 11.5, color: 'var(--admin-text-muted)' }}>{j.experience || '—'}</div>
                        </td>
                        <td style={{ fontSize: 12.5, color: 'var(--admin-text-muted)' }}>
                          <MapPin size={13} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                          {j.location}
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', maxWidth: 200 }}>
                            {j.tags && j.tags.map((t, idx) => (
                              <span key={idx} style={{
                                fontSize: 10.5,
                                padding: '2px 6px',
                                borderRadius: 4,
                                background: 'var(--admin-bg-alt)',
                                border: '1px solid var(--admin-border)',
                                color: 'var(--admin-text-muted)'
                              }}>
                                {t}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td>
                          <button
                            type="button"
                            onClick={() => handleToggleJobActive(j)}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 6,
                              padding: '4px 10px',
                              borderRadius: 20,
                              background: j.active !== false ? 'rgba(16, 185, 129, 0.15)' : 'rgba(156, 163, 175, 0.15)',
                              border: `1px solid ${j.active !== false ? 'rgba(16, 185, 129, 0.3)' : 'rgba(156, 163, 175, 0.3)'}`,
                              color: j.active !== false ? '#10b981' : '#9ca3af',
                              cursor: 'pointer',
                              fontSize: 12,
                              fontWeight: 600
                            }}
                            title={j.active !== false ? 'Cliquez pour masquer' : 'Cliquez pour publier'}
                          >
                            {j.active !== false ? <Check size={13} /> : <X size={13} />}
                            <span>{j.active !== false ? 'En ligne' : 'Masqué'}</span>
                          </button>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: 6 }}>
                            <button
                              type="button"
                              onClick={() => handleOpenEditJob(j)}
                              className="admin-action-btn view"
                              title="Modifier l'offre"
                            >
                              <Edit3 size={15} />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteJob(j.id)}
                              className="admin-action-btn delete"
                              title="Supprimer l'offre"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}

      {/* ── MODAL CRÉATION / MODIFICATION D'UNE OFFRE D'EMPLOI ─────── */}
      {jobModalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setJobModalOpen(false)}>
          <div className="admin-modal" style={{ maxWidth: 680 }} onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div className="admin-kpi-icon-wrap" style={{ background: 'rgba(232, 113, 43, 0.15)', color: '#e8712b' }}>
                  <Briefcase size={20} />
                </div>
                <div>
                  <h3 className="admin-modal-title">
                    {editingJob ? 'Modifier l’Offre d’Emploi' : 'Publier une Nouvelle Offre d’Emploi'}
                  </h3>
                  <p className="admin-modal-sub">
                    {editingJob ? 'Mettez à jour les critères et la description du poste.' : 'Renseignez les détails pour publier ce poste sur la page Carrières publique.'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="admin-modal-close"
                onClick={() => setJobModalOpen(false)}
                aria-label="Fermer"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveJob}>
              <div className="admin-modal-body">
                {jobFormError && (
                  <div style={{
                    padding: '10px 14px',
                    borderRadius: 6,
                    background: 'rgba(239, 68, 68, 0.15)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    color: '#ef4444',
                    fontSize: 13,
                    marginBottom: 16
                  }}>
                    {jobFormError}
                  </div>
                )}

                <div className="admin-form-grid">
                  {/* Titre du poste */}
                  <div className="admin-form-group" style={{ gridColumn: '1 / -1', margin: 0 }}>
                    <label className="admin-form-label">Intitulé du poste *</label>
                    <input
                      type="text"
                      required
                      className="admin-form-input"
                      placeholder="ex: Ingénieur Efficacité Énergétique & Procédés Thermiques"
                      value={jobFormData.title}
                      onChange={(e) => setJobFormData({ ...jobFormData, title: e.target.value })}
                    />
                  </div>

                  {/* Pôle / Département */}
                  <div className="admin-form-group" style={{ margin: 0 }}>
                    <label className="admin-form-label">Pôle d'Expertise</label>
                    <select
                      className="admin-form-input"
                      value={jobFormData.pole}
                      onChange={(e) => setJobFormData({ ...jobFormData, pole: e.target.value })}
                    >
                      <option value="Énergie Durable & Industrie">Énergie Durable & Industrie</option>
                      <option value="Finance Durable & Climat">Finance Durable & Climat</option>
                      <option value="Production Propre & Brûleurs">Production Propre & Brûleurs</option>
                      <option value="Formation & Innovation">Formation & Innovation</option>
                      <option value="Facility Management">Facility Management</option>
                      <option value="Direction & Fonctions Support">Direction & Fonctions Support</option>
                    </select>
                  </div>

                  {/* Type de contrat */}
                  <div className="admin-form-group" style={{ margin: 0 }}>
                    <label className="admin-form-label">Type de contrat</label>
                    <select
                      className="admin-form-input"
                      value={jobFormData.type}
                      onChange={(e) => setJobFormData({ ...jobFormData, type: e.target.value })}
                    >
                      <option value="CDI - Temps Plein">CDI - Temps Plein</option>
                      <option value="CDD">CDD</option>
                      <option value="Stage PFE / Alternance">Stage PFE / Alternance</option>
                      <option value="Mission de Conseil / Expert">Mission de Conseil / Expert</option>
                      <option value="Temps Partiel">Temps Partiel</option>
                    </select>
                  </div>

                  {/* Lieu de travail */}
                  <div className="admin-form-group" style={{ margin: 0 }}>
                    <label className="admin-form-label">Lieu & Mobilité</label>
                    <input
                      type="text"
                      className="admin-form-input"
                      placeholder="ex: Diamniadio / Dakar (Sénégal) & Déplacements"
                      value={jobFormData.location}
                      onChange={(e) => setJobFormData({ ...jobFormData, location: e.target.value })}
                    />
                  </div>

                  {/* Expérience requise */}
                  <div className="admin-form-group" style={{ margin: 0 }}>
                    <label className="admin-form-label">Expérience requise</label>
                    <input
                      type="text"
                      className="admin-form-input"
                      placeholder="ex: 3 à 5 ans d’expérience"
                      value={jobFormData.experience}
                      onChange={(e) => setJobFormData({ ...jobFormData, experience: e.target.value })}
                    />
                  </div>

                  {/* Description des missions */}
                  <div className="admin-form-group" style={{ gridColumn: '1 / -1', margin: 0 }}>
                    <label className="admin-form-label">Missions et responsabilités clés *</label>
                    <textarea
                      rows="4"
                      required
                      className="admin-form-input"
                      placeholder="Décrivez les objectifs du poste, les responsabilités quotidiennes et le profil recherché..."
                      value={jobFormData.description}
                      onChange={(e) => setJobFormData({ ...jobFormData, description: e.target.value })}
                      style={{ resize: 'vertical' }}
                    ></textarea>
                  </div>

                  {/* Mots-clés / Tags */}
                  <div className="admin-form-group" style={{ gridColumn: '1 / -1', margin: 0 }}>
                    <label className="admin-form-label">Mots-clés & Compétences (séparés par des virgules)</label>
                    <input
                      type="text"
                      className="admin-form-input"
                      placeholder="ex: ISO 50001, Thermique industrielle, Audit instrumenté, Décarbonation"
                      value={jobFormData.tags}
                      onChange={(e) => setJobFormData({ ...jobFormData, tags: e.target.value })}
                    />
                  </div>

                  {/* Visibilité Publique */}
                  <div className="admin-form-group" style={{ gridColumn: '1 / -1', margin: 0 }}>
                    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={jobFormData.active}
                        onChange={(e) => setJobFormData({ ...jobFormData, active: e.target.checked })}
                        style={{ width: 18, height: 18, accentColor: 'var(--color-orange)' }}
                      />
                      <span style={{ fontSize: 13.5, color: 'var(--admin-text)' }}>
                        Publier immédiatement cette offre sur la page Carrières publique (visible par les candidats)
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="admin-modal-footer">
                <button
                  type="button"
                  onClick={() => setJobModalOpen(false)}
                  className="admin-btn admin-btn-secondary"
                  disabled={jobSaving}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="admin-btn admin-btn-primary"
                  disabled={jobSaving}
                >
                  {jobSaving ? 'Enregistrement...' : editingJob ? 'Mettre à jour l’offre' : 'Publier l’offre'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL D'EXAMEN CANDIDATURE ─────────────────────────────── */}
      {selectedCareer && (
        <div className="admin-modal-backdrop" onClick={() => setSelectedCareer(null)}>
          <div className="admin-modal" style={{ maxWidth: 740 }} onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div className="admin-kpi-icon-wrap" style={{ background: 'rgba(232, 113, 43, 0.15)', color: '#e8712b' }}>
                  <User size={20} />
                </div>
                <div>
                  <h3 className="admin-modal-title">{selectedCareer.fullName}</h3>
                  <p className="admin-modal-sub">
                    Poste visé : <strong>{selectedCareer.position}</strong> • {formatDate(selectedCareer.created_at)}
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="admin-modal-close"
                onClick={() => setSelectedCareer(null)}
                aria-label="Fermer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="admin-modal-body">
              {loadingDetail ? (
                <div style={{ padding: 30, textAlign: 'center' }}>
                  <div className="admin-spinner" style={{ margin: '0 auto 10px' }} />
                  <p style={{ fontSize: 13, color: 'var(--admin-text-muted)' }}>Chargement des données complètes...</p>
                </div>
              ) : (
                <>
                  <div className="admin-info-grid" style={{ marginBottom: 20 }}>
                    <div className="admin-info-item">
                      <span className="admin-info-label"><Mail size={13} style={{ verticalAlign: 'middle', marginRight: 4 }} /> Email</span>
                      <span className="admin-info-value">
                        <a href={`mailto:${selectedCareer.email}`} style={{ color: 'var(--color-orange)', textDecoration: 'none' }}>
                          {selectedCareer.email}
                        </a>
                      </span>
                    </div>

                    <div className="admin-info-item">
                      <span className="admin-info-label"><Phone size={13} style={{ verticalAlign: 'middle', marginRight: 4 }} /> Téléphone</span>
                      <span className="admin-info-value">
                        <a href={`tel:${selectedCareer.phone}`} style={{ color: 'var(--admin-text)', textDecoration: 'none' }}>
                          {selectedCareer.phone || 'Non renseigné'}
                        </a>
                      </span>
                    </div>

                    <div className="admin-info-item">
                      <span className="admin-info-label"><MapPin size={13} style={{ verticalAlign: 'middle', marginRight: 4 }} /> Lieu de résidence</span>
                      <span className="admin-info-value">{selectedCareer.location || 'Non renseigné'}</span>
                    </div>

                    <div className="admin-info-item">
                      <span className="admin-info-label"><Clock size={13} style={{ verticalAlign: 'middle', marginRight: 4 }} /> Niveau d'expérience</span>
                      <span className="admin-info-value">{selectedCareer.experience || 'Non renseigné'}</span>
                    </div>

                    {selectedCareer.linkedin && (
                      <div className="admin-info-item" style={{ gridColumn: '1 / -1' }}>
                        <span className="admin-info-label"><Linkedin size={13} style={{ verticalAlign: 'middle', marginRight: 4 }} /> Profil LinkedIn</span>
                        <span className="admin-info-value">
                          <a href={selectedCareer.linkedin} target="_blank" rel="noreferrer" style={{ color: '#3b82f6', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                            {selectedCareer.linkedin} <ExternalLink size={13} />
                          </a>
                        </span>
                      </div>
                    )}
                  </div>

                  <div style={{
                    background: 'var(--admin-bg-alt)',
                    border: '1px solid var(--admin-border)',
                    borderRadius: 8,
                    padding: '14px 18px',
                    marginBottom: 20,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 12
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <FileText size={24} style={{ color: 'var(--color-orange)' }} />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13.5, color: 'var(--admin-text)' }}>
                          {selectedCareer.cvName || 'Curriculum Vitae'}
                        </div>
                        <div style={{ fontSize: 11.5, color: 'var(--admin-text-muted)' }}>
                          {selectedCareer.cvSize ? `${(selectedCareer.cvSize / 1024).toFixed(1)} Ko • ` : ''}
                          {selectedCareer.cvType || 'Document'}
                        </div>
                      </div>
                    </div>

                    {selectedCareer.cvData ? (
                      <button
                        type="button"
                        onClick={() => downloadCV(selectedCareer)}
                        className="admin-btn admin-btn-primary"
                        style={{ padding: '8px 16px', fontSize: 13 }}
                      >
                        <Download size={14} />
                        <span>Télécharger / Ouvrir le CV</span>
                      </button>
                    ) : (
                      <span style={{ fontSize: 12.5, color: 'var(--admin-text-subtle)' }}>Aucun document joint</span>
                    )}
                  </div>

                  <div style={{ marginBottom: 24 }}>
                    <h4 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, color: 'var(--admin-text-muted)', marginBottom: 8 }}>
                      Lettre de Motivation & Message
                    </h4>
                    <div style={{
                      background: 'var(--admin-bg-alt)',
                      border: '1px solid var(--admin-border)',
                      borderRadius: 8,
                      padding: 16,
                      fontSize: 13.5,
                      lineHeight: 1.6,
                      color: 'var(--admin-text)',
                      whiteSpace: 'pre-wrap'
                    }}>
                      {selectedCareer.motivation || '(Aucune motivation renseignée)'}
                    </div>
                  </div>

                  <div style={{
                    borderTop: '1px solid var(--admin-border)',
                    paddingTop: 18,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 14
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--admin-text-muted)' }}>Statut du dossier :</span>
                      <select
                        className="admin-form-input"
                        value={selectedCareer.status}
                        onChange={(e) => updateStatus(selectedCareer.id, e.target.value)}
                        style={{ width: 'auto', padding: '6px 12px', fontSize: 13 }}
                      >
                        <option value="nouveau">Nouveau</option>
                        <option value="en_revue">En cours d'examen</option>
                        <option value="entretien">Entretien planifié</option>
                        <option value="retenu">Candidat Retenu</option>
                        <option value="refuse">Candidature Non retenue</option>
                      </select>
                    </div>

                    <button
                      type="button"
                      onClick={() => deleteCareer(selectedCareer.id)}
                      className="admin-btn admin-btn-danger"
                      style={{ padding: '8px 14px', fontSize: 12 }}
                    >
                      <Trash2 size={14} />
                      <span>Supprimer la candidature</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
