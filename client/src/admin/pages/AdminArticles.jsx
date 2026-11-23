import React, { useState, useEffect } from 'react';
import {
  Newspaper,
  PlusCircle,
  Search,
  Edit3,
  Trash2,
  Eye,
  Calendar,
  MapPin,
  User,
  CheckCircle2,
  Clock,
  Filter,
  X,
  FileText,
  Tag,
  ToggleLeft,
  ToggleRight,
  ExternalLink,
  Sparkles,
  BookOpen
} from 'lucide-react';
import '../admin.css';

const CATEGORIES = [
  "Événement",
  "Innovation",
  "Formation",
  "Article technique",
  "Transition Énergétique",
  "Finance Climat",
  "Autre"
];

export default function AdminArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'published' | 'draft'
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Modals
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [previewArticle, setPreviewArticle] = useState(null);
  const [editingArticle, setEditingArticle] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'Actualité',
    date: '',
    summary: '',
    content: '',
    location: 'Dakar, Sénégal',
    author: 'Direction Technique SESA',
    imageUrl: '',
    published: true
  });

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/articles');
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setArticles(data.data);
      }
    } catch (err) {
      console.error('Erreur chargement articles:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleOpenNew = () => {
    setEditingArticle(null);
    const todayStr = new Date().toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    setFormData({
      title: '',
      category: 'Innovation',
      date: todayStr,
      summary: '',
      content: '',
      location: 'Diamniadio, Sénégal',
      author: 'Direction Technique SESA',
      imageUrl: '',
      published: true
    });
    setFormError('');
    setEditModalOpen(true);
  };

  const handleOpenEdit = (article) => {
    setEditingArticle(article);
    setFormData({
      title: article.title || '',
      category: article.category || 'Actualité',
      date: article.date || '',
      summary: article.summary || '',
      content: article.content || '',
      location: article.location || 'Dakar, Sénégal',
      author: article.author || 'Direction Technique SESA',
      imageUrl: article.imageUrl || '',
      published: article.published !== false
    });
    setFormError('');
    setEditModalOpen(true);
  };

  const handleSaveArticle = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.title.trim()) {
      setFormError('Le titre de l’article est obligatoire.');
      return;
    }

    if (!formData.summary.trim() && !formData.content.trim()) {
      setFormError('Veuillez renseigner un résumé ou le contenu de l’article.');
      return;
    }

    setSaving(true);
    try {
      const url = editingArticle ? `/api/admin/articles/${editingArticle.id}` : '/api/admin/articles';
      const method = editingArticle ? 'PATCH' : 'POST';

      const payload = {
        ...formData,
        title: formData.title.trim(),
        summary: formData.summary.trim(),
        content: formData.content.trim(),
        location: formData.location.trim(),
        author: formData.author.trim()
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Erreur lors de l’enregistrement.');
      }

      fetchArticles();
      setEditModalOpen(false);
    } catch (err) {
      setFormError(err.message || 'Une erreur est survenue.');
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePublished = async (article) => {
    const newStatus = !article.published;
    try {
      const res = await fetch(`/api/admin/articles/${article.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: newStatus })
      });
      if (res.ok) {
        setArticles(prev =>
          prev.map(a => (a.id === article.id ? { ...a, published: newStatus } : a))
        );
      }
    } catch (err) {
      console.error('Erreur bascule statut:', err);
    }
  };

  const handleDeleteArticle = async (id, title) => {
    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer définitivement l'article :\n"${title}" ?`)) {
      return;
    }
    try {
      const res = await fetch(`/api/admin/articles/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setArticles(prev => prev.filter(a => a.id !== id));
      }
    } catch (err) {
      console.error('Erreur suppression:', err);
    }
  };

  // Filtrage
  const filteredArticles = articles.filter(a => {
    const matchesSearch =
      (a.title || '').toLowerCase().includes(search.toLowerCase()) ||
      (a.summary || '').toLowerCase().includes(search.toLowerCase()) ||
      (a.category || '').toLowerCase().includes(search.toLowerCase()) ||
      (a.author || '').toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'published' && a.published !== false) ||
      (statusFilter === 'draft' && a.published === false);

    const matchesCategory =
      categoryFilter === 'all' || a.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const totalPublished = articles.filter(a => a.published !== false).length;
  const totalDrafts = articles.filter(a => a.published === false).length;

  return (
    <div className="admin-page">
      {/* Top Banner & Action */}
      <div className="admin-page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 className="admin-page-title" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Newspaper size={26} color="var(--color-orange)" />
            Articles & Publications
          </h1>
          <p className="admin-page-subtitle">
            Rédigez, modifiez et gérez la parution de vos articles techniques, actualités et retours d'expérience.
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="admin-btn-primary"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 18px', fontSize: '14px', fontWeight: 600 }}
        >
          <PlusCircle size={18} />
          <span>Nouvel Article</span>
        </button>
      </div>

      {/* KPI Counters */}
      <div className="admin-stats-grid" style={{ marginBottom: 24 }}>
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-title">Total Articles</span>
            <div className="admin-stat-icon-wrapper orange">
              <FileText size={18} />
            </div>
          </div>
          <div className="admin-stat-value">{articles.length}</div>
          <div className="admin-stat-desc">Contenus enregistrés</div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-title">En ligne (Publiés)</span>
            <div className="admin-stat-icon-wrapper green">
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div className="admin-stat-value" style={{ color: '#10b981' }}>{totalPublished}</div>
          <div className="admin-stat-desc">Visibles sur le site public</div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-title">Brouillons</span>
            <div className="admin-stat-icon-wrapper gray">
              <Clock size={18} />
            </div>
          </div>
          <div className="admin-stat-value" style={{ color: '#64748b' }}>{totalDrafts}</div>
          <div className="admin-stat-desc">En attente de parution</div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-title">Page Publique</span>
            <div className="admin-stat-icon-wrapper blue">
              <ExternalLink size={18} />
            </div>
          </div>
          <div className="admin-stat-value" style={{ fontSize: '1.1rem', marginTop: 6 }}>
            <a
              href="/ressources#actualites"
              target="_blank"
              rel="noreferrer"
              style={{ color: 'var(--color-navy)', display: 'inline-flex', alignItems: 'center', gap: 6, textDecoration: 'none' }}
            >
              /ressources <ExternalLink size={14} />
            </a>
          </div>
          <div className="admin-stat-desc">Accès direct aux actualités</div>
        </div>
      </div>

      {/* Toolbar / Filters */}
      <div className="admin-card" style={{ marginBottom: 24, padding: '16px 20px' }}>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Search */}
          <div style={{ position: 'relative', minWidth: 260, flex: 1 }}>
            <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--theme-text-muted)' }} />
            <input
              type="text"
              placeholder="Rechercher par titre, résumé, auteur..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="admin-input"
              style={{ paddingLeft: 36, width: '100%' }}
            />
          </div>

          {/* Status Filter Buttons */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button
              onClick={() => setStatusFilter('all')}
              className={`admin-filter-pill ${statusFilter === 'all' ? 'active' : ''}`}
            >
              Tous ({articles.length})
            </button>
            <button
              onClick={() => setStatusFilter('published')}
              className={`admin-filter-pill ${statusFilter === 'published' ? 'active' : ''}`}
            >
              Publiés ({totalPublished})
            </button>
            <button
              onClick={() => setStatusFilter('draft')}
              className={`admin-filter-pill ${statusFilter === 'draft' ? 'active' : ''}`}
            >
              Brouillons ({totalDrafts})
            </button>
          </div>

          {/* Category Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Filter size={15} color="var(--theme-text-muted)" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="admin-input"
              style={{ padding: '6px 12px', fontSize: '13px' }}
            >
              <option value="all">Toutes les catégories</option>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Articles List */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--theme-text-muted)' }}>
          <div className="admin-spinner" style={{ margin: '0 auto 16px auto' }} />
          <p>Chargement des articles...</p>
        </div>
      ) : filteredArticles.length === 0 ? (
        <div className="admin-card" style={{ textAlign: 'center', padding: '60px 20px' }}>
          <Newspaper size={44} style={{ color: '#cbd5e1', marginBottom: 12 }} />
          <h3 style={{ fontSize: '1.2rem', color: 'var(--theme-text)', marginBottom: 6 }}>
            Aucun article trouvé
          </h3>
          <p style={{ color: 'var(--theme-text-muted)', fontSize: '14px', marginBottom: 20 }}>
            {search || statusFilter !== 'all' || categoryFilter !== 'all'
              ? 'Aucun article ne correspond à vos filtres actuels.'
              : 'Commencez par rédiger votre premier article.'}
          </p>
          <button onClick={handleOpenNew} className="admin-btn-primary">
            <PlusCircle size={16} /> Rédiger un article
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className="admin-card"
              style={{
                padding: '20px',
                borderLeft: article.published !== false ? '4px solid #10b981' : '4px solid #94a3b8',
                display: 'flex',
                flexDirection: 'column',
                gap: 14
              }}
            >
              {/* Header row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span
                    className="badge"
                    style={{
                      fontSize: '11px',
                      padding: '3px 9px',
                      background: 'rgba(235, 130, 60, 0.12)',
                      color: 'var(--color-orange)',
                      fontWeight: 600
                    }}
                  >
                    {article.category || 'Actualité'}
                  </span>

                  <span
                    style={{
                      fontSize: '12px',
                      padding: '3px 8px',
                      borderRadius: '12px',
                      fontWeight: 600,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      background: article.published !== false ? 'rgba(16, 185, 129, 0.12)' : 'rgba(148, 163, 184, 0.18)',
                      color: article.published !== false ? '#059669' : '#64748b'
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: article.published !== false ? '#10b981' : '#94a3b8'
                      }}
                    />
                    {article.published !== false ? 'En ligne' : 'Brouillon'}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: '13px', color: 'var(--theme-text-muted)' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    <Calendar size={13} /> {article.date || 'Récemment'}
                  </span>
                  {article.location && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      <MapPin size={13} /> {article.location}
                    </span>
                  )}
                </div>
              </div>

              {/* Title & Summary */}
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--theme-text)', marginBottom: 8, lineHeight: 1.35 }}>
                  {article.title}
                </h3>
                <p style={{ color: 'var(--theme-text-muted)', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
                  {article.summary || (article.content ? article.content.slice(0, 160) + '...' : 'Aucun résumé.')}
                </p>
              </div>

              {/* Footer Meta & Actions */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 12,
                  paddingTop: 12,
                  borderTop: '1px solid var(--theme-border)'
                }}
              >
                <div style={{ fontSize: '12px', color: 'var(--theme-text-muted)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <User size={13} color="var(--color-orange)" />
                  <span>Rédigé par : <strong>{article.author || 'SEnergyS Africa'}</strong></span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {/* Toggle Published Button */}
                  <button
                    onClick={() => handleTogglePublished(article)}
                    className="admin-btn-secondary"
                    style={{
                      padding: '6px 12px',
                      fontSize: '12px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      color: article.published !== false ? '#059669' : '#64748b'
                    }}
                    title={article.published !== false ? 'Passer en brouillon' : 'Publier sur le site'}
                  >
                    {article.published !== false ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                    <span>{article.published !== false ? 'Dépublier' : 'Mettre en ligne'}</span>
                  </button>

                  {/* Preview Button */}
                  <button
                    onClick={() => setPreviewArticle(article)}
                    className="admin-btn-secondary"
                    style={{ padding: '6px 10px', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: 4 }}
                    title="Prévisualiser l'article"
                  >
                    <Eye size={14} />
                    <span>Aperçu</span>
                  </button>

                  {/* Edit Button */}
                  <button
                    onClick={() => handleOpenEdit(article)}
                    className="admin-btn-secondary"
                    style={{ padding: '6px 10px', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: 4 }}
                    title="Modifier l'article"
                  >
                    <Edit3 size={14} />
                    <span>Modifier</span>
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteArticle(article.id, article.title)}
                    className="admin-btn-danger"
                    style={{ padding: '6px 10px', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: 4 }}
                    title="Supprimer définitivement"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL : CRÉER / MODIFIER UN ARTICLE */}
      {editModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-content" style={{ maxWidth: 720, width: '95%' }}>
            <div className="admin-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div className="admin-stat-icon-wrapper orange" style={{ width: 34, height: 34 }}>
                  <Edit3 size={18} />
                </div>
                <h3 style={{ margin: 0, fontSize: '1.25rem' }}>
                  {editingArticle ? "Modifier l'article" : "Rédiger un nouvel article"}
                </h3>
              </div>
              <button onClick={() => setEditModalOpen(false)} className="admin-btn-icon">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveArticle} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 18 }}>
              {formError && (
                <div style={{ padding: '10px 14px', borderRadius: 8, background: '#fee2e2', color: '#dc2626', fontSize: '13px', fontWeight: 600 }}>
                  ⚠️ {formError}
                </div>
              )}

              {/* Titre */}
              <div>
                <label className="admin-label">
                  Titre de l'article <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="ex: SEnergyS Africa accélère la transition énergétique en Afrique de l'Ouest"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="admin-input"
                  style={{ width: '100%', fontSize: '15px', fontWeight: 600 }}
                  required
                />
              </div>

              {/* Catégorie & Date */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
                <div>
                  <label className="admin-label">Catégorie</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="admin-input"
                    style={{ width: '100%' }}
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="admin-label">Date d'affichage</label>
                  <input
                    type="text"
                    placeholder="ex: 15 Novembre 2026"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="admin-input"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              {/* Lieu & Auteur */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
                <div>
                  <label className="admin-label">Lieu</label>
                  <input
                    type="text"
                    placeholder="ex: Diamniadio, Sénégal"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="admin-input"
                    style={{ width: '100%' }}
                  />
                </div>

                <div>
                  <label className="admin-label">Auteur / Pôle émetteur</label>
                  <input
                    type="text"
                    placeholder="ex: Direction Technique SESA"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="admin-input"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              {/* Résumé / Chapeau */}
              <div>
                <label className="admin-label">
                  Résumé / Chapeau <span style={{ fontSize: '11px', color: 'var(--theme-text-muted)' }}>(court texte visible sur la carte d'actualités)</span>
                </label>
                <textarea
                  rows={2}
                  placeholder="Bref résumé accrocheur de 1 à 2 phrases..."
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="admin-input"
                  style={{ width: '100%', resize: 'vertical' }}
                />
              </div>

              {/* Contenu complet */}
              <div>
                <label className="admin-label">
                  Contenu complet de l'article <span style={{ fontSize: '11px', color: 'var(--theme-text-muted)' }}>(texte détaillé affiché lors de la lecture)</span>
                </label>
                <textarea
                  rows={6}
                  placeholder="Rédigez le texte complet de votre article. Les sauts de ligne formeront automatiquement des paragraphes distincts..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="admin-input"
                  style={{ width: '100%', resize: 'vertical', lineHeight: 1.6 }}
                />
              </div>

              {/* Statut de publication */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: 'var(--theme-bg-alt, #f8fafc)', borderRadius: 8 }}>
                <input
                  type="checkbox"
                  id="published-checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  style={{ width: 18, height: 18, cursor: 'pointer', accentColor: 'var(--color-orange)' }}
                />
                <label htmlFor="published-checkbox" style={{ cursor: 'pointer', fontSize: '14px', fontWeight: 600, color: 'var(--theme-text)' }}>
                  Publier immédiatement sur le site web public
                </label>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, paddingTop: 10, borderTop: '1px solid var(--theme-border)' }}>
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="admin-btn-secondary"
                  disabled={saving}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="admin-btn-primary"
                  disabled={saving}
                  style={{ minWidth: 140, justifyContent: 'center' }}
                >
                  {saving ? 'Enregistrement...' : editingArticle ? 'Mettre à jour' : 'Publier l’article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL : PRÉVISUALISATION D'UN ARTICLE */}
      {previewArticle && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-content" style={{ maxWidth: 680, width: '95%' }}>
            <div className="admin-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <BookOpen size={20} color="var(--color-orange)" />
                <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Aperçu de la publication</h3>
              </div>
              <button onClick={() => setPreviewArticle(null)} className="admin-btn-icon">
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <span className="badge" style={{ fontSize: '12px', padding: '4px 10px' }}>
                  {previewArticle.category || 'Actualité'}
                </span>
                <span style={{ fontSize: '13px', color: 'var(--theme-text-muted)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  <Calendar size={13} /> {previewArticle.date}
                </span>
                {previewArticle.location && (
                  <span style={{ fontSize: '13px', color: 'var(--color-orange)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    <MapPin size={13} /> {previewArticle.location}
                  </span>
                )}
              </div>

              <h2 style={{ fontSize: '1.6rem', color: 'var(--theme-text)', lineHeight: 1.35, marginBottom: 16 }}>
                {previewArticle.title}
              </h2>

              {previewArticle.summary && (
                <div style={{ padding: '14px 18px', background: 'rgba(235, 130, 60, 0.08)', borderLeft: '3px solid var(--color-orange)', borderRadius: 6, marginBottom: 20, fontStyle: 'italic', color: 'var(--theme-text)', lineHeight: 1.6 }}>
                  {previewArticle.summary}
                </div>
              )}

              <div style={{ color: 'var(--theme-text)', lineHeight: 1.8, fontSize: '15px', whiteSpace: 'pre-line' }}>
                {previewArticle.content || previewArticle.summary || 'Aucun contenu rédigé.'}
              </div>

              <div style={{ marginTop: 28, paddingTop: 16, borderTop: '1px solid var(--theme-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: 'var(--theme-text-muted)' }}>
                  Auteur : <strong>{previewArticle.author || 'Direction Technique SESA'}</strong>
                </span>
                <button onClick={() => setPreviewArticle(null)} className="admin-btn-secondary">
                  Fermer l'aperçu
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
