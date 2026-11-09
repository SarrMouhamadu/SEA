import React, { useState, useEffect } from 'react';
import {
  ClipboardCheck,
  Search,
  Download,
  Filter,
  Eye,
  Trash2,
  Mail,
  Phone,
  Building,
  Calendar,
  CheckCircle2,
  Clock,
  ChevronDown
} from 'lucide-react';
import '../admin.css';

export default function AdminDiagnostics() {
  const [diagnostics, setDiagnostics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedDiag, setSelectedDiag] = useState(null);

  useEffect(() => {
    fetchDiagnostics();
  }, []);

  const fetchDiagnostics = () => {
    fetch('/api/admin/diagnostics')
      .then(res => res.json())
      .then(resData => {
        if (resData.success && resData.data) {
          setDiagnostics(resData.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Erreur chargement diagnostics:', err);
        setLoading(false);
      });
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/admin/diagnostics/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setDiagnostics(prev => prev.map(d => d.id === id ? { ...d, status: newStatus } : d));
        if (selectedDiag && selectedDiag.id === id) {
          setSelectedDiag(prev => ({ ...prev, status: newStatus }));
        }
      }
    } catch (err) {
      console.error('Erreur mise à jour statut:', err);
    }
  };

  const deleteDiagnostic = async (id) => {
    if (!window.confirm('Voulez-vous vraiment supprimer cet enregistrement de diagnostic ?')) return;
    try {
      const res = await fetch(`/api/admin/diagnostics/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setDiagnostics(prev => prev.filter(d => d.id !== id));
        if (selectedDiag && selectedDiag.id === id) setSelectedDiag(null);
      }
    } catch (err) {
      console.error('Erreur suppression diagnostic:', err);
    }
  };

  const exportCSV = () => {
    if (diagnostics.length === 0) return;
    const headers = ['ID', 'Date', 'Nom', 'Email', 'Téléphone', 'Fonction', 'Entreprise', 'Secteur', 'Dépense Annuelle', 'Score Global', 'Statut'];
    const rows = diagnostics.map(d => [
      d.id,
      new Date(d.created_at).toLocaleDateString('fr-FR'),
      `"${d.contact?.nom || ''}"`,
      `"${d.contact?.email || ''}"`,
      `"${d.contact?.telephone || ''}"`,
      `"${d.contact?.fonction || ''}"`,
      `"${d.generalInfo?.nomEntreprise || ''}"`,
      `"${d.generalInfo?.secteurActivite || ''}"`,
      `"${d.generalInfo?.factureAnnuelle || ''}"`,
      d.scores?.globalScore || 0,
      d.status || 'new'
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `autodiagnostics_sesa_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredDiagnostics = diagnostics.filter(d => {
    const s = search.toLowerCase();
    const matchSearch =
      (d.contact?.nom || '').toLowerCase().includes(s) ||
      (d.contact?.email || '').toLowerCase().includes(s) ||
      (d.contact?.telephone || '').toLowerCase().includes(s) ||
      (d.generalInfo?.nomEntreprise || '').toLowerCase().includes(s) ||
      (d.generalInfo?.secteurActivite || '').toLowerCase().includes(s);

    const matchStatus = statusFilter === 'all' || d.status === statusFilter;
    return matchSearch && matchStatus;
  });

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

  const getStatusBadge = (status) => {
    switch (status) {
      case 'new':
        return <span className="admin-badge admin-badge-new">Nouveau</span>;
      case 'contacted':
        return <span className="admin-badge admin-badge-info">Contacté</span>;
      case 'appointment':
        return <span className="admin-badge admin-badge-success">Rendez-vous fixé</span>;
      case 'archived':
        return <span className="admin-badge admin-badge-neutral">Archivé</span>;
      default:
        return <span className="admin-badge admin-badge-neutral">{status}</span>;
    }
  };

  return (
    <div>
      {/* Toolbar */}
      <div className="admin-toolbar">
        <div style={{ display: 'flex', gap: 12, flex: 1, flexWrap: 'wrap' }}>
          <div className="admin-search-box">
            <Search className="admin-search-icon" size={17} />
            <input
              type="text"
              className="admin-search-input"
              placeholder="Rechercher nom, entreprise, email..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <select
            className="admin-select"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value="all">Tous les statuts</option>
            <option value="new">Nouveaux leads</option>
            <option value="contacted">Contactés</option>
            <option value="appointment">Rendez-vous fixé</option>
            <option value="archived">Archivés</option>
          </select>
        </div>

        <button onClick={exportCSV} className="admin-btn admin-btn-secondary">
          <Download size={15} />
          <span>Exporter CSV</span>
        </button>
      </div>

      {/* Table */}
      <div className="admin-panel">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Contact Lead</th>
                <th>Entreprise & Secteur</th>
                <th>Facture Énergie</th>
                <th>Score Global</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: 40 }}>
                    <div className="admin-spinner" style={{ margin: '0 auto' }} />
                  </td>
                </tr>
              ) : filteredDiagnostics.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: 40, color: 'var(--admin-text-subtle)' }}>
                    Aucun autodiagnostic ne correspond aux critères
                  </td>
                </tr>
              ) : (
                filteredDiagnostics.map(d => (
                  <tr key={d.id}>
                    <td style={{ fontSize: 12, color: 'var(--admin-text-subtle)', whiteSpace: 'nowrap' }}>
                      {formatDate(d.created_at)}
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: '#fff' }}>{d.contact?.nom}</div>
                      <div style={{ fontSize: 12, color: 'var(--admin-text-muted)' }}>
                        {d.contact?.fonction && <span>{d.contact?.fonction} · </span>}
                        <a href={`mailto:${d.contact?.email}`} style={{ color: 'var(--admin-text-muted)' }}>
                          {d.contact?.email}
                        </a>
                      </div>
                      {d.contact?.telephone && (
                        <div style={{ fontSize: 11, color: 'var(--admin-primary)', marginTop: 2 }}>
                          📞 {d.contact?.telephone}
                        </div>
                      )}
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: '#fff' }}>
                        {d.generalInfo?.nomEntreprise || 'Non précisé'}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--admin-text-muted)' }}>
                        {d.generalInfo?.secteurActivite}
                      </div>
                    </td>
                    <td style={{ fontSize: 12, color: 'var(--admin-text-muted)', whiteSpace: 'nowrap' }}>
                      {d.generalInfo?.factureAnnuelle || 'Non renseigné'}
                    </td>
                    <td>
                      <span className={`admin-badge ${d.scores?.globalScore >= 60 ? 'admin-badge-success' : d.scores?.globalScore >= 45 ? 'admin-badge-warning' : 'admin-badge-new'}`}>
                        {d.scores?.globalScore || 0}/100
                      </span>
                    </td>
                    <td>
                      <select
                        value={d.status || 'new'}
                        onChange={e => updateStatus(d.id, e.target.value)}
                        style={{
                          background: 'rgba(0,0,0,0.3)',
                          border: '1px solid var(--admin-border)',
                          borderRadius: 6,
                          color: '#fff',
                          fontSize: 12,
                          padding: '4px 8px',
                          cursor: 'pointer'
                        }}
                      >
                        <option value="new">Nouveau</option>
                        <option value="contacted">Contacté</option>
                        <option value="appointment">RDV Fixé</option>
                        <option value="archived">Archivé</option>
                      </select>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button
                          onClick={() => setSelectedDiag(d)}
                          className="admin-btn-icon"
                          title="Voir la synthèse complète"
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          onClick={() => deleteDiagnostic(d.id)}
                          className="admin-btn-icon danger"
                          title="Supprimer"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Détail Autodiagnostic */}
      {selectedDiag && (
        <div className="admin-modal-backdrop" onClick={() => setSelectedDiag(null)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div>
                <h3 className="admin-modal-title">Synthèse Autodiagnostic & Coordonnées Lead</h3>
                <span style={{ fontSize: 12, color: 'var(--admin-text-muted)' }}>
                  Soumis le {formatDate(selectedDiag.created_at)}
                </span>
              </div>
              <button onClick={() => setSelectedDiag(null)} className="admin-btn-icon">✕</button>
            </div>

            <div className="admin-modal-body">
              {/* Coordonnées détaillées */}
              <div className="admin-detail-group">
                <h4>Coordonnées de la personne ayant réalisé l'autodiagnostic</h4>
                <div className="admin-detail-row">
                  <span className="admin-detail-label">Nom et Prénom</span>
                  <span className="admin-detail-val">{selectedDiag.contact?.nom}</span>
                </div>
                <div className="admin-detail-row">
                  <span className="admin-detail-label">Email professionnel</span>
                  <span className="admin-detail-val">
                    <a href={`mailto:${selectedDiag.contact?.email}`} style={{ color: 'var(--admin-primary)' }}>
                      {selectedDiag.contact?.email}
                    </a>
                  </span>
                </div>
                <div className="admin-detail-row">
                  <span className="admin-detail-label">Numéro de téléphone / WhatsApp</span>
                  <span className="admin-detail-val">
                    <a href={`tel:${selectedDiag.contact?.telephone}`} style={{ color: '#fff' }}>
                      {selectedDiag.contact?.telephone || 'Non renseigné'}
                    </a>
                  </span>
                </div>
                <div className="admin-detail-row">
                  <span className="admin-detail-label">Fonction exercée</span>
                  <span className="admin-detail-val">{selectedDiag.contact?.fonction || 'Non renseignée'}</span>
                </div>
                <div className="admin-detail-row">
                  <span className="admin-detail-label">Délai de recontact souhaité</span>
                  <span className="admin-detail-val" style={{ color: 'var(--admin-primary)' }}>
                    {selectedDiag.contact?.recontact || 'Standard'}
                  </span>
                </div>
                <div className="admin-detail-row">
                  <span className="admin-detail-label">Échéance de projet</span>
                  <span className="admin-detail-val">{selectedDiag.contact?.echeance || 'Non précisée'}</span>
                </div>
              </div>

              {/* Entreprise & Profil */}
              <div className="admin-detail-group">
                <h4>Entreprise & Contexte opérationnel</h4>
                <div className="admin-detail-row">
                  <span className="admin-detail-label">Raison sociale</span>
                  <span className="admin-detail-val">{selectedDiag.generalInfo?.nomEntreprise}</span>
                </div>
                <div className="admin-detail-row">
                  <span className="admin-detail-label">Secteur industriel / tertiaire</span>
                  <span className="admin-detail-val">{selectedDiag.generalInfo?.secteurActivite}</span>
                </div>
                <div className="admin-detail-row">
                  <span className="admin-detail-label">Localisation</span>
                  <span className="admin-detail-val">{selectedDiag.generalInfo?.pays} ({selectedDiag.generalInfo?.region})</span>
                </div>
                <div className="admin-detail-row">
                  <span className="admin-detail-label">Facture énergétique annuelle</span>
                  <span className="admin-detail-val">{selectedDiag.generalInfo?.factureAnnuelle}</span>
                </div>
              </div>

              {/* Scores et Priorités */}
              <div className="admin-detail-group">
                <h4>Résultats de l'évaluation</h4>
                <div className="admin-detail-row">
                  <span className="admin-detail-label">Score Global d'Efficacité</span>
                  <span className="admin-detail-val" style={{ fontSize: 16, color: 'var(--admin-primary)' }}>
                    {selectedDiag.scores?.globalScore}/100 — {selectedDiag.scores?.niveau}
                  </span>
                </div>

                <div style={{ marginTop: 12 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--admin-text-muted)' }}>
                    Pôles d'intervention prioritaires identifiés :
                  </span>
                  {selectedDiag.scores?.priorites?.map((p, idx) => (
                    <div key={idx} style={{ marginTop: 8, padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: 6, border: '1px solid rgba(255,255,255,0.05)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 600 }}>
                        <span style={{ color: '#fff' }}>{idx + 1}. {p.title}</span>
                        <span style={{ color: 'var(--admin-primary)' }}>Score: {p.scorePct}%</span>
                      </div>
                      {p.recommendation && (
                        <div style={{ fontSize: 12, color: 'var(--admin-text-muted)', marginTop: 4 }}>
                          ↳ <b>Recommandation SESA :</b> {p.recommendation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Commentaire */}
              {selectedDiag.contact?.commentaire && (
                <div className="admin-detail-group">
                  <h4>Message / Notes du prospect</h4>
                  <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6, color: '#FFFFFF', fontStyle: 'italic' }}>
                    "{selectedDiag.contact.commentaire}"
                  </p>
                </div>
              )}
            </div>

            <div className="admin-modal-footer">
              <div style={{ marginRight: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 12, color: 'var(--admin-text-muted)' }}>Statut :</span>
                <select
                  value={selectedDiag.status || 'new'}
                  onChange={e => updateStatus(selectedDiag.id, e.target.value)}
                  className="admin-select"
                  style={{ padding: '6px 10px', fontSize: 12 }}
                >
                  <option value="new">Nouveau</option>
                  <option value="contacted">Contacté</option>
                  <option value="appointment">Rendez-vous fixé</option>
                  <option value="archived">Archivé</option>
                </select>
              </div>

              <a
                href={`mailto:${selectedDiag.contact?.email}?subject=Suite à votre autodiagnostic SEnergyS Africa (${selectedDiag.generalInfo?.nomEntreprise || ''})`}
                className="admin-btn admin-btn-primary"
              >
                <Mail size={16} />
                Contacter par email
              </a>
              <button onClick={() => setSelectedDiag(null)} className="admin-btn admin-btn-secondary">
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
