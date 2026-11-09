import React, { useState, useEffect } from 'react';
import {
  Mail,
  Search,
  Download,
  Eye,
  Trash2,
  Building,
  Calendar,
  Phone,
  User,
  CheckCircle2,
  Clock,
  ArrowRight
} from 'lucide-react';
import '../admin.css';

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = () => {
    fetch('/api/admin/contacts')
      .then(res => res.json())
      .then(resData => {
        if (resData.success && resData.data) {
          setContacts(resData.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Erreur chargement contacts:', err);
        setLoading(false);
      });
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/admin/contacts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setContacts(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
        if (selectedContact && selectedContact.id === id) {
          setSelectedContact(prev => ({ ...prev, status: newStatus }));
        }
      }
    } catch (err) {
      console.error('Erreur statut contact:', err);
    }
  };

  const deleteContact = async (id) => {
    if (!window.confirm('Voulez-vous vraiment supprimer ce message ?')) return;
    try {
      const res = await fetch(`/api/admin/contacts/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setContacts(prev => prev.filter(c => c.id !== id));
        if (selectedContact && selectedContact.id === id) setSelectedContact(null);
      }
    } catch (err) {
      console.error('Erreur suppression message:', err);
    }
  };

  const exportCSV = () => {
    if (contacts.length === 0) return;
    const headers = ['ID', 'Date', 'Nom', 'Email', 'Téléphone', 'Entreprise', 'Sujet', 'Message', 'Statut'];
    const rows = contacts.map(c => [
      c.id,
      new Date(c.created_at).toLocaleDateString('fr-FR'),
      `"${c.name || ''}"`,
      `"${c.email || ''}"`,
      `"${c.phone || ''}"`,
      `"${c.company || ''}"`,
      `"${c.subject || ''}"`,
      `"${(c.message || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`,
      c.status || 'new'
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `messages_contact_sesa_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredContacts = contacts.filter(c => {
    const s = search.toLowerCase();
    const matchSearch =
      (c.name || '').toLowerCase().includes(s) ||
      (c.email || '').toLowerCase().includes(s) ||
      (c.phone || '').toLowerCase().includes(s) ||
      (c.company || '').toLowerCase().includes(s) ||
      (c.subject || '').toLowerCase().includes(s) ||
      (c.message || '').toLowerCase().includes(s);

    const matchStatus = statusFilter === 'all' || c.status === statusFilter;
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
              placeholder="Rechercher nom, entreprise, sujet, mot-clé..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <select
            className="admin-select"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value="all">Tous les messages</option>
            <option value="new">Nouveaux messages</option>
            <option value="read">Lus</option>
            <option value="replied">Répondus / Traités</option>
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
                <th>Expéditeur & Contact</th>
                <th>Entreprise</th>
                <th>Sujet</th>
                <th>Message (Aperçu)</th>
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
              ) : filteredContacts.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: 40, color: 'var(--admin-text-subtle)' }}>
                    Aucun message de contact ne correspond aux critères
                  </td>
                </tr>
              ) : (
                filteredContacts.map(c => (
                  <tr key={c.id}>
                    <td style={{ fontSize: 12, color: 'var(--admin-text-subtle)', whiteSpace: 'nowrap' }}>
                      {formatDate(c.created_at)}
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: '#fff' }}>{c.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--admin-text-muted)' }}>
                        <a href={`mailto:${c.email}`} style={{ color: 'var(--admin-text-muted)' }}>
                          {c.email}
                        </a>
                      </div>
                      {c.phone && (
                        <div style={{ fontSize: 11, color: 'var(--admin-primary)', marginTop: 2 }}>
                          📞 {c.phone}
                        </div>
                      )}
                    </td>
                    <td>
                      <span style={{ color: '#fff', fontWeight: 500 }}>
                        {c.company || <span style={{ color: 'var(--admin-text-subtle)' }}>Non précisée</span>}
                      </span>
                    </td>
                    <td style={{ fontWeight: 600, color: '#fff', maxWidth: 180, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {c.subject}
                    </td>
                    <td style={{ maxWidth: 260, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'var(--admin-text-muted)' }}>
                      {c.message}
                    </td>
                    <td>
                      <select
                        value={c.status || 'new'}
                        onChange={e => updateStatus(c.id, e.target.value)}
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
                        <option value="read">Lu</option>
                        <option value="replied">Répondu</option>
                      </select>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button
                          onClick={() => {
                            setSelectedContact(c);
                            if (c.status === 'new') updateStatus(c.id, 'read');
                          }}
                          className="admin-btn-icon"
                          title="Lire le message complet"
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          onClick={() => deleteContact(c.id)}
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

      {/* Modal Lecture Message */}
      {selectedContact && (
        <div className="admin-modal-backdrop" onClick={() => setSelectedContact(null)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div>
                <h3 className="admin-modal-title">{selectedContact.subject}</h3>
                <span style={{ fontSize: 12, color: 'var(--admin-text-muted)' }}>
                  Message reçu le {formatDate(selectedContact.created_at)}
                </span>
              </div>
              <button onClick={() => setSelectedContact(null)} className="admin-btn-icon">✕</button>
            </div>

            <div className="admin-modal-body">
              {/* Coordonnées */}
              <div className="admin-detail-group">
                <h4>Coordonnées de l'expéditeur</h4>
                <div className="admin-detail-row">
                  <span className="admin-detail-label">Nom et Prénom</span>
                  <span className="admin-detail-val">{selectedContact.name}</span>
                </div>
                <div className="admin-detail-row">
                  <span className="admin-detail-label">Email</span>
                  <span className="admin-detail-val">
                    <a href={`mailto:${selectedContact.email}`} style={{ color: 'var(--admin-primary)' }}>
                      {selectedContact.email}
                    </a>
                  </span>
                </div>
                <div className="admin-detail-row">
                  <span className="admin-detail-label">Téléphone</span>
                  <span className="admin-detail-val">
                    <a href={`tel:${selectedContact.phone}`} style={{ color: '#fff' }}>
                      {selectedContact.phone || 'Non précisé'}
                    </a>
                  </span>
                </div>
                <div className="admin-detail-row">
                  <span className="admin-detail-label">Entreprise / Organisation</span>
                  <span className="admin-detail-val">{selectedContact.company || 'Non précisée'}</span>
                </div>
                <div className="admin-detail-row">
                  <span className="admin-detail-label">Sujet de la demande</span>
                  <span className="admin-detail-val">{selectedContact.subject}</span>
                </div>
              </div>

              {/* Contenu du message */}
              <div className="admin-detail-group">
                <h4>Contenu du message</h4>
                <div style={{
                  background: 'rgba(0,0,0,0.25)',
                  padding: 20,
                  borderRadius: 8,
                  fontSize: 14.5,
                  lineHeight: 1.6,
                  color: '#FFFFFF',
                  whiteSpace: 'pre-wrap',
                  border: '1px solid rgba(255,255,255,0.06)'
                }}>
                  {selectedContact.message}
                </div>
              </div>
            </div>

            <div className="admin-modal-footer">
              <div style={{ marginRight: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 12, color: 'var(--admin-text-muted)' }}>Statut :</span>
                <select
                  value={selectedContact.status || 'new'}
                  onChange={e => updateStatus(selectedContact.id, e.target.value)}
                  className="admin-select"
                  style={{ padding: '6px 10px', fontSize: 12 }}
                >
                  <option value="new">Nouveau</option>
                  <option value="read">Lu</option>
                  <option value="replied">Répondu / Traité</option>
                </select>
              </div>

              <a
                href={`mailto:${selectedContact.email}?subject=Re: ${encodeURIComponent(selectedContact.subject)}`}
                onClick={() => updateStatus(selectedContact.id, 'replied')}
                className="admin-btn admin-btn-primary"
              >
                <Mail size={16} />
                Répondre par email
              </a>
              <button onClick={() => setSelectedContact(null)} className="admin-btn admin-btn-secondary">
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
