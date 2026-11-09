import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  ClipboardCheck,
  Mail,
  TrendingUp,
  ArrowUpRight,
  Clock,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Building,
  Calendar,
  ChevronRight
} from 'lucide-react';
import '../admin.css';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    analytics: {
      totalVisits: 0,
      visitsToday: 0,
      visitsLast7Days: 0,
      totalContacts: 0,
      unreadContacts: 0,
      totalDiagnostics: 0,
      newDiagnostics: 0,
      conversionRate: 0,
      dailyTraffic: []
    },
    recentContacts: [],
    recentDiagnostics: []
  });

  const [selectedDiag, setSelectedDiag] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    fetch('/api/admin/dashboard')
      .then(res => res.json())
      .then(resData => {
        if (resData.success && resData.data) {
          setData(resData.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Erreur chargement dashboard:', err);
        setLoading(false);
      });
  }, []);

  const { analytics, recentContacts, recentDiagnostics } = data;
  const maxDailyCount = Math.max(...(analytics.dailyTraffic?.map(d => d.count) || [1]), 10);

  const formatDate = (isoStr) => {
    if (!isoStr) return '';
    const d = new Date(isoStr);
    return d.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
        <div className="admin-spinner" />
      </div>
    );
  }

  return (
    <div>
      {/* 4 Cartes KPI Principales */}
      <div className="admin-kpi-grid">
        {/* KPI 1 : Visites totales */}
        <div className="admin-kpi-card">
          <div className="admin-kpi-card-header">
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--admin-text-muted)' }}>
              Trafic & Visites
            </span>
            <div className="admin-kpi-icon-wrap" style={{ background: 'var(--admin-accent-blue-light)', color: 'var(--admin-accent-blue)' }}>
              <Users size={20} />
            </div>
          </div>
          <div className="admin-kpi-value">{analytics.totalVisits?.toLocaleString() || 0}</div>
          <div className="admin-kpi-label">Visites totales enregistrées</div>
          <div className="admin-kpi-footer">
            <span style={{ color: 'var(--admin-accent-green)', fontWeight: 600 }}>+{analytics.visitsToday || 0}</span>
            <span>visites aujourd'hui · {analytics.visitsLast7Days || 0} sur 7 jours</span>
          </div>
        </div>

        {/* KPI 2 : Autodiagnostics */}
        <div className="admin-kpi-card">
          <div className="admin-kpi-card-header">
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--admin-text-muted)' }}>
              Autodiagnostics
            </span>
            <div className="admin-kpi-icon-wrap" style={{ background: 'var(--admin-primary-light)', color: 'var(--admin-primary)' }}>
              <ClipboardCheck size={20} />
            </div>
          </div>
          <div className="admin-kpi-value">{analytics.totalDiagnostics || 0}</div>
          <div className="admin-kpi-label">Leads industriels qualifiés</div>
          <div className="admin-kpi-footer">
            <span style={{ color: 'var(--admin-primary)', fontWeight: 600 }}>{analytics.newDiagnostics || 0}</span>
            <span>nouveaux diagnostics à analyser</span>
          </div>
        </div>

        {/* KPI 3 : Messages de contact */}
        <div className="admin-kpi-card">
          <div className="admin-kpi-card-header">
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--admin-text-muted)' }}>
              Messages Contact
            </span>
            <div className="admin-kpi-icon-wrap" style={{ background: 'var(--admin-accent-purple-light)', color: 'var(--admin-accent-purple)' }}>
              <Mail size={20} />
            </div>
          </div>
          <div className="admin-kpi-value">{analytics.totalContacts || 0}</div>
          <div className="admin-kpi-label">Demandes reçues via formulaire</div>
          <div className="admin-kpi-footer">
            <span style={{ color: 'var(--admin-accent-purple)', fontWeight: 600 }}>{analytics.unreadContacts || 0}</span>
            <span>non traités nécessitant réponse</span>
          </div>
        </div>

        {/* KPI 4 : Taux de conversion */}
        <div className="admin-kpi-card">
          <div className="admin-kpi-card-header">
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--admin-text-muted)' }}>
              Taux de conversion
            </span>
            <div className="admin-kpi-icon-wrap" style={{ background: 'var(--admin-accent-green-light)', color: 'var(--admin-accent-green)' }}>
              <TrendingUp size={20} />
            </div>
          </div>
          <div className="admin-kpi-value">{analytics.conversionRate}%</div>
          <div className="admin-kpi-label">Visiteurs devenus prospects</div>
          <div className="admin-kpi-footer">
            <span>Ratio leads générés / visites globales</span>
          </div>
        </div>
      </div>

      {/* Grille : Graphique d'audience & Résumé d'activité */}
      <div className="admin-dash-grid">
        {/* Graphique de fréquentation sur 14 jours */}
        <div className="admin-panel">
          <div className="admin-panel-header">
            <h3 className="admin-panel-title">
              <TrendingUp size={18} color="var(--admin-primary)" />
              Évolution du trafic sur les 14 derniers jours
            </h3>
            <Link to="/admin/visites" className="admin-btn-secondary" style={{ padding: '6px 12px', fontSize: 12 }}>
              Voir détails complets <ChevronRight size={14} />
            </Link>
          </div>
          <div className="admin-panel-body">
            <div className="admin-chart-container">
              {analytics.dailyTraffic?.map((day, idx) => {
                const heightPct = Math.max(12, Math.round((day.count / maxDailyCount) * 100));
                return (
                  <div key={idx} className="admin-chart-col" title={`${day.label}: ${day.count} visites`}>
                    <span className="admin-chart-count">{day.count}</span>
                    <div className="admin-chart-bar-wrap">
                      <div className="admin-chart-bar" style={{ height: `${heightPct}%` }} />
                    </div>
                    <span className="admin-chart-label">{day.label.split(' ')[0]}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Synthèse des canaux & pages clés */}
        <div className="admin-panel">
          <div className="admin-panel-header">
            <h3 className="admin-panel-title">
              <Users size={18} color="var(--admin-accent-blue)" />
              Pages les plus consultées
            </h3>
          </div>
          <div className="admin-panel-body" style={{ padding: '16px 20px' }}>
            {analytics.topPages?.map((p, idx) => {
              const maxCount = analytics.topPages[0]?.count || 1;
              const pct = Math.round((p.count / maxCount) * 100);
              const labelMap = {
                '/': 'Accueil SESA',
                '/services': 'Nos Expertises',
                '/secteurs': 'Nos Secteurs',
                '/references': 'Références & Projets',
                '/autodiagnostic': 'Outil Autodiagnostic',
                '/contact': 'Page Contact',
                '/a-propos': 'À Propos'
              };
              return (
                <div key={idx} style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                    <span style={{ fontWeight: 600, color: '#fff' }}>{labelMap[p.path] || p.path}</span>
                    <span style={{ color: 'var(--admin-text-muted)' }}>{p.count} vues</span>
                  </div>
                  <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: 'var(--admin-accent-blue)', borderRadius: 3 }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2 Colonnes : Derniers Autodiagnostics & Derniers Messages */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: 24 }}>
        
        {/* Table : Derniers Autodiagnostics */}
        <div className="admin-panel">
          <div className="admin-panel-header">
            <h3 className="admin-panel-title">
              <ClipboardCheck size={18} color="var(--admin-primary)" />
              Derniers autodiagnostics industriels
            </h3>
            <Link to="/admin/diagnostics" className="admin-btn-secondary" style={{ padding: '6px 12px', fontSize: 12 }}>
              Tout voir ({analytics.totalDiagnostics})
            </Link>
          </div>
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Contact & Entreprise</th>
                  <th>Score</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {recentDiagnostics.length === 0 ? (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center', color: 'var(--admin-text-subtle)' }}>
                      Aucun diagnostic pour le moment
                    </td>
                  </tr>
                ) : (
                  recentDiagnostics.map((d) => (
                    <tr key={d.id}>
                      <td>
                        <div style={{ fontWeight: 600, color: '#fff' }}>{d.contact?.nom}</div>
                        <div style={{ fontSize: 12, color: 'var(--admin-text-muted)' }}>
                          {d.generalInfo?.nomEntreprise || 'Entreprise non précisée'}
                        </div>
                      </td>
                      <td>
                        <span className={`admin-badge ${d.scores?.globalScore >= 60 ? 'admin-badge-success' : d.scores?.globalScore >= 45 ? 'admin-badge-warning' : 'admin-badge-new'}`}>
                          {d.scores?.globalScore || 0}/100
                        </span>
                      </td>
                      <td style={{ fontSize: 12, color: 'var(--admin-text-subtle)' }}>
                        {formatDate(d.created_at)}
                      </td>
                      <td>
                        <button
                          onClick={() => setSelectedDiag(d)}
                          className="admin-btn-icon"
                          title="Voir le diagnostic complet"
                        >
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Table : Derniers Messages de Contact */}
        <div className="admin-panel">
          <div className="admin-panel-header">
            <h3 className="admin-panel-title">
              <Mail size={18} color="var(--admin-accent-purple)" />
              Derniers messages reçus
            </h3>
            <Link to="/admin/contacts" className="admin-btn-secondary" style={{ padding: '6px 12px', fontSize: 12 }}>
              Tout voir ({analytics.totalContacts})
            </Link>
          </div>
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Expéditeur & Entreprise</th>
                  <th>Sujet</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {recentContacts.length === 0 ? (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center', color: 'var(--admin-text-subtle)' }}>
                      Aucun message pour le moment
                    </td>
                  </tr>
                ) : (
                  recentContacts.map((c) => (
                    <tr key={c.id}>
                      <td>
                        <div style={{ fontWeight: 600, color: '#fff' }}>{c.name}</div>
                        <div style={{ fontSize: 12, color: 'var(--admin-text-muted)' }}>
                          {c.company || c.email}
                        </div>
                      </td>
                      <td style={{ maxWidth: 180, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {c.subject}
                      </td>
                      <td style={{ fontSize: 12, color: 'var(--admin-text-subtle)' }}>
                        {formatDate(c.created_at)}
                      </td>
                      <td>
                        <button
                          onClick={() => setSelectedContact(c)}
                          className="admin-btn-icon"
                          title="Lire le message complet"
                        >
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Modal Détail Autodiagnostic */}
      {selectedDiag && (
        <div className="admin-modal-backdrop" onClick={() => setSelectedDiag(null)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div>
                <h3 className="admin-modal-title">Fiche Lead Autodiagnostic</h3>
                <span style={{ fontSize: 12, color: 'var(--admin-text-muted)' }}>
                  Enregistré le {formatDate(selectedDiag.created_at)}
                </span>
              </div>
              <button onClick={() => setSelectedDiag(null)} className="admin-btn-icon">✕</button>
            </div>
            <div className="admin-modal-body">
              {/* Coordonnées */}
              <div className="admin-detail-group">
                <h4>Coordonnées du contact</h4>
                <div className="admin-detail-row">
                  <span className="admin-detail-label">Nom complet</span>
                  <span className="admin-detail-val">{selectedDiag.contact?.nom}</span>
                </div>
                <div className="admin-detail-row">
                  <span className="admin-detail-label">Adresse email</span>
                  <span className="admin-detail-val">
                    <a href={`mailto:${selectedDiag.contact?.email}`} style={{ color: 'var(--admin-primary)' }}>
                      {selectedDiag.contact?.email}
                    </a>
                  </span>
                </div>
                <div className="admin-detail-row">
                  <span className="admin-detail-label">Téléphone</span>
                  <span className="admin-detail-val">
                    <a href={`tel:${selectedDiag.contact?.telephone}`} style={{ color: '#fff' }}>
                      {selectedDiag.contact?.telephone || 'Non renseigné'}
                    </a>
                  </span>
                </div>
                <div className="admin-detail-row">
                  <span className="admin-detail-label">Fonction</span>
                  <span className="admin-detail-val">{selectedDiag.contact?.fonction || 'Non renseignée'}</span>
                </div>
                <div className="admin-detail-row">
                  <span className="admin-detail-label">Modalité de recontact</span>
                  <span className="admin-detail-val">{selectedDiag.contact?.recontact || 'Standard'}</span>
                </div>
              </div>

              {/* Entreprise & Profil */}
              <div className="admin-detail-group">
                <h4>Profil de l'entreprise</h4>
                <div className="admin-detail-row">
                  <span className="admin-detail-label">Entreprise</span>
                  <span className="admin-detail-val">{selectedDiag.generalInfo?.nomEntreprise}</span>
                </div>
                <div className="admin-detail-row">
                  <span className="admin-detail-label">Secteur d'activité</span>
                  <span className="admin-detail-val">{selectedDiag.generalInfo?.secteurActivite}</span>
                </div>
                <div className="admin-detail-row">
                  <span className="admin-detail-label">Localisation</span>
                  <span className="admin-detail-val">{selectedDiag.generalInfo?.pays} - {selectedDiag.generalInfo?.region}</span>
                </div>
                <div className="admin-detail-row">
                  <span className="admin-detail-label">Dépense énergétique</span>
                  <span className="admin-detail-val">{selectedDiag.generalInfo?.factureAnnuelle}</span>
                </div>
              </div>

              {/* Résultats chiffrés */}
              <div className="admin-detail-group">
                <h4>Résultats & Performance énergétique</h4>
                <div className="admin-detail-row">
                  <span className="admin-detail-label">Score global obtenu</span>
                  <span className="admin-detail-val" style={{ fontSize: 16, color: 'var(--admin-primary)' }}>
                    {selectedDiag.scores?.globalScore}/100 ({selectedDiag.scores?.niveau})
                  </span>
                </div>
                {selectedDiag.scores?.priorites?.map((p, idx) => (
                  <div key={idx} style={{ marginTop: 8, padding: '8px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: 6 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 600 }}>
                      <span>{p.title}</span>
                      <span style={{ color: 'var(--admin-primary)' }}>{p.scorePct}%</span>
                    </div>
                    {p.recommendation && (
                      <div style={{ fontSize: 12, color: 'var(--admin-text-muted)', marginTop: 4 }}>
                        ↳ {p.recommendation}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {selectedDiag.contact?.commentaire && (
                <div className="admin-detail-group">
                  <h4>Commentaire / Demande spécifique</h4>
                  <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.5, color: '#FFFFFF' }}>
                    "{selectedDiag.contact.commentaire}"
                  </p>
                </div>
              )}
            </div>
            <div className="admin-modal-footer">
              <a
                href={`mailto:${selectedDiag.contact?.email}?subject=Suite à votre autodiagnostic SEnergyS Africa`}
                className="admin-btn admin-btn-primary"
              >
                <Mail size={16} />
                Répondre par email
              </a>
              <button onClick={() => setSelectedDiag(null)} className="admin-btn admin-btn-secondary">
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Détail Message Contact */}
      {selectedContact && (
        <div className="admin-modal-backdrop" onClick={() => setSelectedContact(null)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div>
                <h3 className="admin-modal-title">{selectedContact.subject}</h3>
                <span style={{ fontSize: 12, color: 'var(--admin-text-muted)' }}>
                  Reçu le {formatDate(selectedContact.created_at)}
                </span>
              </div>
              <button onClick={() => setSelectedContact(null)} className="admin-btn-icon">✕</button>
            </div>
            <div className="admin-modal-body">
              <div className="admin-detail-group">
                <h4>Expéditeur</h4>
                <div className="admin-detail-row">
                  <span className="admin-detail-label">Nom</span>
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
                  <span className="admin-detail-val">{selectedContact.phone || 'Non précisé'}</span>
                </div>
                <div className="admin-detail-row">
                  <span className="admin-detail-label">Entreprise / Organisation</span>
                  <span className="admin-detail-val">{selectedContact.company || 'Non précisée'}</span>
                </div>
              </div>

              <div className="admin-detail-group">
                <h4>Message</h4>
                <div style={{
                  background: 'rgba(0,0,0,0.2)',
                  padding: 16,
                  borderRadius: 8,
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: '#FFFFFF',
                  whiteSpace: 'pre-wrap'
                }}>
                  {selectedContact.message}
                </div>
              </div>
            </div>
            <div className="admin-modal-footer">
              <a
                href={`mailto:${selectedContact.email}?subject=Re: ${encodeURIComponent(selectedContact.subject)}`}
                className="admin-btn admin-btn-primary"
              >
                <Mail size={16} />
                Répondre directement
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
