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
  ExternalLink,
  ToggleLeft,
  ToggleRight,
  BookOpen,
  LayoutGrid,
  List
} from 'lucide-react';
import '../admin.css';

const CATEGORIES = [
  "Événement",
  "Innovation",
  "Formation",
  "Article technique",
  "Transition Énergétique",
  "Finance Climat",
  "RSE & Carbone",
  "Autre"
];

export default function AdminArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'published' | 'draft'
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'cards'

  // Modals
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [previewArticle, setPreviewArticle] = useState(null);
  const [editingArticle, setEditingArticle] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'Innovation',
    date: '',
    summary: '',
    content: '',
    location: 'Diamniadio, Sénégal',
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
      location: article.location || 'Diamniadio, Sénégal',
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
      setFormError('Veuillez renseigner un résumé ou le contenu complet de l’article.');
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
        throw new Error(data.message || 'Erreur lors de l’enregistrement de l’article.');
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
      console.error('Erreur suppression article:', err);
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
    <div>
      {/* ── EN-TÊTE DE LA PAGE ────────────────────────────────────── */}
      <div className="admin-page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: '#FFFFFF', margin: 0, display: 'flex', alignItems: 'center', gap: 12 }}>
            <Newspaper size={26} color="var(--admin-primary)" />
            Articles & Publications
          </h1>
          <p style={{ fontSize: 13.5, color: 'var(--admin-text-muted)', margin: '4px 0 0' }}>
            Rédigez, modifiez et gérez la parution de vos articles techniques et retours d'expérience.
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="admin-btn admin-btn-primary"
          style={{ padding: '10px 18px', fontWeight: 600, boxShadow: '0 4px 14px rgba(244, 119, 33, 0.3)' }}
        >
          <PlusCircle size={18} />
          <span>Nouvel Article</span>
        </button>
      </div>

      {/* ── KPI COUNTERS (STANDARD ADMIN DESIGN) ────────────────────── */}
      <div className="admin-kpi-grid">
        <div className="admin-kpi-card">
          <div className="admin-kpi-card-header">
            <span className="admin-kpi-label" style={{ margin: 0 }}>Total Articles</span>
            <div className="admin-kpi-icon-wrap" style={{ background: 'var(--admin-primary-light)', color: 'var(--admin-primary)' }}>
              <FileText size={20} />
            </div>
          </div>
          <div className="admin-kpi-value">{articles.length}</div>
          <div className="admin-kpi-footer">
            <span>Contenus éditoriaux enregistrés</span>
          </div>
        </div>

        <div className="admin-kpi-card">
          <div className="admin-kpi-card-header">
            <span className="admin-kpi-label" style={{ margin: 0 }}>En ligne (Publiés)</span>
            <div className="admin-kpi-icon-wrap" style={{ background: 'var(--admin-accent-green-light)', color: 'var(--admin-accent-green)' }}>
              <CheckCircle2 size={20} />
            </div>
          </div>
          <div className="admin-kpi-value" style={{ color: 'var(--admin-accent-green)' }}>{totalPublished}</div>
          <div className="admin-kpi-footer">
            <span>Visibles sur le site public</span>
          </div>
        </div>

        <div className="admin-kpi-card">
          <div className="admin-kpi-card-header">
            <span className="admin-kpi-label" style={{ margin: 0 }}>Brouillons</span>
            <div className="admin-kpi-icon-wrap" style={{ background: 'var(--admin-accent-amber-light)', color: 'var(--admin-accent-amber)' }}>
              <Clock size={20} />
            </div>
          </div>
          <div className="admin-kpi-value" style={{ color: 'var(--admin-accent-amber)' }}>{totalDrafts}</div>
          <div className="admin-kpi-footer">
            <span>En attente de diffusion</span>
          </div>
        </div>

        <div className="admin-kpi-card">
          <div className="admin-kpi-card-header">
            <span className="admin-kpi-label" style={{ margin: 0 }}>Page Publique</span>
            <div className="admin-kpi-icon-wrap" style={{ background: 'var(--admin-accent-blue-light)', color: 'var(--admin-accent-blue)' }}>
              <ExternalLink size={20} />
            </div>
          </div>
          <div style={{ marginTop: 6 }}>
            <a
              href="/ressources#actualites"
              target="_blank"
              rel="noreferrer"
              style={{
                color: 'var(--admin-accent-blue)',
                fontSize: 15,
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                textDecoration: 'none'
              }}
            >
              /ressources <ExternalLink size={14} />
            </a>
          </div>
          <div className="admin-kpi-footer">
            <span>Consulter les actualités en direct</span>
          </div>
        </div>
      </div>

      {/* ── TOOLBAR / FILTRES ──────────────────────────────────────── */}
      <div className="admin-toolbar">
        <div style={{ display: 'flex', gap: 12, flex: 1, flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Recherche */}
          <div className="admin-search-box">
            <Search className="admin-search-icon" size={17} />
            <input
              type="text"
              placeholder="Rechercher titre, résumé, auteur..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="admin-search-input"
            />
          </div>

          {/* Filtres de statut */}
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

          {/* Catégories */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="admin-select"
          >
            <option value="all">Toutes les catégories</option>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Bouton de bascule de vue (Tableau / Cartes) */}
        <div className="admin-view-toggle">
          <button
            onClick={() => setViewMode('table')}
            className={`admin-view-toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
            title="Vue Tableau"
          >
            <List size={16} />
            <span>Tableau</span>
          </button>
          <button
            onClick={() => setViewMode('cards')}
            className={`admin-view-toggle-btn ${viewMode === 'cards' ? 'active' : ''}`}
            title="Vue Cartes"
          >
            <LayoutGrid size={16} />
            <span>Cartes</span>
          </button>
        </div>
      </div>

      {/* ── LISTE DES ARTICLES ────────────────────────────────────── */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <div className="admin-spinner" style={{ margin: '0 auto 16px auto' }} />
          <p style={{ color: 'var(--admin-text-muted)' }}>Chargement des articles...</p>
        </div>
      ) : filteredArticles.length === 0 ? (
        <div className="admin-panel" style={{ textAlign: 'center', padding: '60px 24px' }}>
          <Newspaper size={44} style={{ color: 'var(--admin-text-subtle)', marginBottom: 12 }} />
          <h3 style={{ fontSize: 18, color: '#FFFFFF', marginBottom: 6 }}>
            Aucun article trouvé
          </h3>
          <p style={{ color: 'var(--admin-text-muted)', fontSize: 13.5, marginBottom: 20 }}>
            {search || statusFilter !== 'all' || categoryFilter !== 'all'
              ? 'Aucun contenu ne correspond à vos critères de recherche.'
              : 'Commencez par rédiger et publier votre premier article technique.'}
          </p>
          <button onClick={handleOpenNew} className="admin-btn admin-btn-primary">
            <PlusCircle size={16} /> Rédiger un article
          </button>
        </div>
      ) : viewMode === 'table' ? (
        /* VUE TABLEAU RESPONSIVE */
        <div className="admin-panel">
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th style={{ width: '40%' }}>Article & Titre</th>
                  <th style={{ width: '15%' }}>Catégorie</th>
                  <th style={{ width: '15%' }}>Date & Lieu</th>
                  <th style={{ width: '15%' }}>Statut</th>
                  <th style={{ width: '15%', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredArticles.map(article => (
                  <tr key={article.id}>
                    <td>
                      <div style={{ fontWeight: 700, color: '#FFFFFF', fontSize: 14.5, marginBottom: 4, lineHeight: 1.35 }}>
                        {article.title}
                      </div>
                      <div style={{ fontSize: 12.5, color: 'var(--admin-text-muted)', lineHeight: 1.5, maxHeight: 38, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {article.summary || (article.content ? article.content.slice(0, 110) + '...' : 'Aucun résumé.')}
                      </div>
                      <div style={{ fontSize: 11.5, color: 'var(--admin-primary)', marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
                        <User size={12} /> {article.author || 'Direction Technique SESA'}
                      </div>
                    </td>

                    <td>
                      <span className="admin-badge admin-badge-new">
                        {article.category || 'Actualité'}
                      </span>
                    </td>

                    <td>
                      <div style={{ fontSize: 12.5, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: 5 }}>
                        <Calendar size={13} color="var(--admin-text-muted)" />
                        {article.date || 'Récemment'}
                      </div>
                      {article.location && (
                        <div style={{ fontSize: 11.5, color: 'var(--admin-text-muted)', marginTop: 3, display: 'flex', alignItems: 'center', gap: 4 }}>
                          <MapPin size={12} /> {article.location}
                        </div>
                      )}
                    </td>

                    <td>
                      <button
                        onClick={() => handleTogglePublished(article)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          padding: 0
                        }}
                        title={article.published !== false ? 'Cliquez pour passer en brouillon' : 'Cliquez pour publier'}
                      >
                        {article.published !== false ? (
                          <span className="admin-badge admin-badge-success" style={{ cursor: 'pointer' }}>
                            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--admin-accent-green)' }} />
                            En ligne
                          </span>
                        ) : (
                          <span className="admin-badge admin-badge-neutral" style={{ cursor: 'pointer' }}>
                            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--admin-text-subtle)' }} />
                            Brouillon
                          </span>
                        )}
                      </button>
                    </td>

                    <td>
                      <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => setPreviewArticle(article)}
                          className="admin-btn-icon"
                          title="Aperçu de lecture"
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(article)}
                          className="admin-btn-icon"
                          title="Modifier l'article"
                        >
                          <Edit3 size={15} />
                        </button>
                        <button
                          onClick={() => handleDeleteArticle(article.id, article.title)}
                          className="admin-btn-icon danger"
                          title="Supprimer définitivement"
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
        </div>
      ) : (
        /* VUE CARTES */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 20 }}>
          {filteredArticles.map(article => (
            <div
              key={article.id}
              className={`admin-article-card ${article.published !== false ? 'published' : 'draft'}`}
            >
              {/* Header de la carte */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="admin-badge admin-badge-new">
                  {article.category || 'Actualité'}
                </span>
                <button
                  onClick={() => handleTogglePublished(article)}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  {article.published !== false ? (
                    <span className="admin-badge admin-badge-success">
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--admin-accent-green)' }} />
                      En ligne
                    </span>
                  ) : (
                    <span className="admin-badge admin-badge-neutral">
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--admin-text-subtle)' }} />
                      Brouillon
                    </span>
                  )}
                </button>
              </div>

              {/* Titre & Résumé */}
              <div>
                <h3 className="admin-article-title">{article.title}</h3>
                <p className="admin-article-summary" style={{ marginTop: 8 }}>
                  {article.summary || (article.content ? article.content.slice(0, 140) + '...' : 'Aucun résumé.')}
                </p>
              </div>

              {/* Métadonnées */}
              <div className="admin-article-meta">
                <span><Calendar size={13} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} /> {article.date}</span>
                {article.location && (
                  <span><MapPin size={13} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} /> {article.location}</span>
                )}
                <span><User size={13} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} /> {article.author || 'SESA'}</span>
              </div>

              {/* Actions de la carte */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, paddingTop: 12, borderTop: '1px solid var(--admin-border)' }}>
                <button
                  onClick={() => setPreviewArticle(article)}
                  className="admin-btn admin-btn-secondary admin-btn-sm"
                  title="Aperçu de lecture"
                >
                  <Eye size={14} /> Aperçu
                </button>
                <button
                  onClick={() => handleOpenEdit(article)}
                  className="admin-btn admin-btn-secondary admin-btn-sm"
                  title="Modifier l'article"
                >
                  <Edit3 size={14} /> Modifier
                </button>
                <button
                  onClick={() => handleDeleteArticle(article.id, article.title)}
                  className="admin-btn-icon danger"
                  title="Supprimer"
                  style={{ padding: '6px 8px' }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── MODAL : CRÉER / MODIFIER UN ARTICLE ──────────────────────── */}
      {editModalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setEditModalOpen(false)}>
          <div className="admin-modal" style={{ maxWidth: 760 }} onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div className="admin-brand-icon" style={{ width: 36, height: 36 }}>
                  <Edit3 size={18} />
                </div>
                <h3 className="admin-modal-title">
                  {editingArticle ? "Modifier la publication" : "Rédiger un nouvel article"}
                </h3>
              </div>
              <button onClick={() => setEditModalOpen(false)} className="admin-btn-icon">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveArticle}>
              <div className="admin-modal-body">
                {formError && (
                  <div style={{
                    padding: '12px 16px',
                    borderRadius: 'var(--admin-radius-sm)',
                    background: 'var(--admin-accent-red-light)',
                    border: '1px solid var(--admin-accent-red)',
                    color: '#f87171',
                    fontSize: 13,
                    fontWeight: 600
                  }}>
                    ⚠️ {formError}
                  </div>
                )}

                {/* Titre */}
                <div>
                  <label className="admin-form-label">
                    Titre de l'article <span style={{ color: 'var(--admin-accent-red)' }}>*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: SEnergyS Africa accélère la transition énergétique industrielle en Afrique de l'Ouest"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="admin-input-field"
                    style={{ fontSize: 15, fontWeight: 600 }}
                    required
                  />
                </div>

                {/* Catégorie & Date */}
                <div className="admin-form-row-2">
                  <div>
                    <label className="admin-form-label">Catégorie thématique</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="admin-select"
                      style={{ width: '100%' }}
                    >
                      {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="admin-form-label">Date d'affichage</label>
                    <input
                      type="text"
                      placeholder="Ex: 24 Novembre 2026"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="admin-input-field"
                    />
                  </div>
                </div>

                {/* Lieu & Auteur */}
                <div className="admin-form-row-2">
                  <div>
                    <label className="admin-form-label">Lieu de l'événement / publication</label>
                    <input
                      type="text"
                      placeholder="Ex: Diamniadio, Sénégal"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="admin-input-field"
                    />
                  </div>

                  <div>
                    <label className="admin-form-label">Auteur / Pôle émetteur</label>
                    <input
                      type="text"
                      placeholder="Ex: Direction Technique SESA"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      className="admin-input-field"
                    />
                  </div>
                </div>

                {/* Résumé / Chapeau */}
                <div>
                  <label className="admin-form-label">
                    Résumé / Chapeau introductif <span style={{ fontSize: 12, color: 'var(--admin-text-subtle)' }}>(accroche visible sur la carte d'actualités)</span>
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Synthèse accrocheuse de 1 à 2 phrases pour capter l'intérêt du lecteur..."
                    value={formData.summary}
                    onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                    className="admin-textarea-field"
                  />
                </div>

                {/* Contenu complet */}
                <div>
                  <label className="admin-form-label">
                    Contenu complet de l'article <span style={{ fontSize: 12, color: 'var(--admin-text-subtle)' }}>(texte détaillé affiché lors de la lecture)</span>
                  </label>
                  <textarea
                    rows={7}
                    placeholder="Rédigez le texte détaillé de votre article. Les sauts de ligne forment automatiquement des paragraphes distincts lors de la lecture publique..."
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="admin-textarea-field"
                  />
                </div>

                {/* Case à cocher Publication */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '14px 18px',
                  background: 'var(--admin-card)',
                  border: '1px solid var(--admin-border)',
                  borderRadius: 'var(--admin-radius-sm)'
                }}>
                  <input
                    type="checkbox"
                    id="published-checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    style={{ width: 18, height: 18, cursor: 'pointer', accentColor: 'var(--admin-primary)' }}
                  />
                  <label htmlFor="published-checkbox" style={{ cursor: 'pointer', fontSize: 13.5, fontWeight: 600, color: '#FFFFFF' }}>
                    Publier immédiatement et rendre visible sur le site web public (/ressources)
                  </label>
                </div>
              </div>

              <div className="admin-modal-footer">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="admin-btn admin-btn-secondary"
                  disabled={saving}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="admin-btn admin-btn-primary"
                  disabled={saving}
                  style={{ minWidth: 150 }}
                >
                  {saving ? 'Enregistrement...' : editingArticle ? 'Mettre à jour' : 'Publier l’article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL : PRÉVISUALISATION D'UN ARTICLE ─────────────────── */}
      {previewArticle && (
        <div className="admin-modal-backdrop" onClick={() => setPreviewArticle(null)}>
          <div className="admin-modal" style={{ maxWidth: 720 }} onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <BookOpen size={20} color="var(--admin-primary)" />
                <h3 className="admin-modal-title">Aperçu de la publication</h3>
              </div>
              <button onClick={() => setPreviewArticle(null)} className="admin-btn-icon">
                <X size={18} />
              </button>
            </div>

            <div className="admin-modal-body">
              {/* Badges et Méta */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <span className="admin-badge admin-badge-new">
                  {previewArticle.category || 'Actualité'}
                </span>
                <span style={{ fontSize: 13, color: 'var(--admin-text-muted)', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                  <Calendar size={13} /> {previewArticle.date}
                </span>
                {previewArticle.location && (
                  <span style={{ fontSize: 13, color: 'var(--admin-primary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                    <MapPin size={13} /> {previewArticle.location}
                  </span>
                )}
              </div>

              {/* Titre */}
              <h2 style={{ fontSize: 22, fontWeight: 800, color: '#FFFFFF', lineHeight: 1.35, margin: 0 }}>
                {previewArticle.title}
              </h2>

              {/* Résumé mis en avant */}
              {previewArticle.summary && (
                <div style={{
                  padding: '14px 18px',
                  background: 'var(--admin-primary-light)',
                  borderLeft: '4px solid var(--admin-primary)',
                  borderRadius: 'var(--admin-radius-sm)',
                  fontStyle: 'italic',
                  color: '#FFFFFF',
                  lineHeight: 1.6,
                  fontSize: 14
                }}>
                  {previewArticle.summary}
                </div>
              )}

              {/* Contenu complet */}
              <div style={{
                color: 'var(--admin-text)',
                lineHeight: 1.8,
                fontSize: 14.5,
                whiteSpace: 'pre-line',
                background: 'var(--admin-card)',
                padding: '18px 22px',
                borderRadius: 'var(--admin-radius-sm)',
                border: '1px solid var(--admin-border)'
              }}>
                {previewArticle.content || previewArticle.summary || 'Aucun contenu rédigé.'}
              </div>

              {/* Signature Auteur */}
              <div style={{
                paddingTop: 14,
                borderTop: '1px solid var(--admin-border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: 12.5,
                color: 'var(--admin-text-muted)'
              }}>
                <span>
                  Édité par : <strong style={{ color: '#FFFFFF' }}>{previewArticle.author || 'Direction Technique SESA'}</strong>
                </span>
                <span className="admin-badge admin-badge-success">
                  {previewArticle.published !== false ? 'Visible en ligne' : 'Brouillon'}
                </span>
              </div>
            </div>

            <div className="admin-modal-footer">
              <button
                onClick={() => {
                  const toEdit = previewArticle;
                  setPreviewArticle(null);
                  handleOpenEdit(toEdit);
                }}
                className="admin-btn admin-btn-primary"
              >
                <Edit3 size={15} /> Modifier cet article
              </button>
              <button onClick={() => setPreviewArticle(null)} className="admin-btn admin-btn-secondary">
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
