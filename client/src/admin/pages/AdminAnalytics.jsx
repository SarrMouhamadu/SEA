import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  Users,
  Eye,
  TrendingUp,
  Monitor,
  Smartphone,
  Tablet,
  Globe,
  Calendar,
  Layers,
  ArrowUpRight,
  Target
} from 'lucide-react';
import '../admin.css';

export default function AdminAnalytics() {
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    fetch('/api/admin/analytics')
      .then(res => res.json())
      .then(resData => {
        if (resData.success && resData.data) {
          setAnalytics(resData.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Erreur chargement analytics:', err);
        setLoading(false);
      });
  }, []);

  if (loading || !analytics) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
        <div className="admin-spinner" />
      </div>
    );
  }

  const {
    totalVisits = 0,
    visitsToday = 0,
    visitsLast7Days = 0,
    totalContacts = 0,
    totalDiagnostics = 0,
    conversionRate = 0,
    topPages = [],
    deviceCounts = { Desktop: 0, Mobile: 0, Tablet: 0 },
    referrerCounts = {},
    dailyTraffic = []
  } = analytics;

  const maxDailyCount = Math.max(...(dailyTraffic.map(d => d.count) || [1]), 10);
  const totalDeviceVisits = (deviceCounts.Desktop || 0) + (deviceCounts.Mobile || 0) + (deviceCounts.Tablet || 0) || 1;
  const desktopPct = Math.round(((deviceCounts.Desktop || 0) / totalDeviceVisits) * 100);
  const mobilePct = Math.round(((deviceCounts.Mobile || 0) / totalDeviceVisits) * 100);
  const tabletPct = Math.round(((deviceCounts.Tablet || 0) / totalDeviceVisits) * 100);

  const pageNames = {
    '/': 'Page d\'accueil (Vitrine & Présentation)',
    '/services': 'Pôle Expertises & Solutions Techniques',
    '/secteurs': 'Secteurs d\'intervention prioritaires',
    '/references': 'Références clients & Partenaires',
    '/autodiagnostic': 'Outil interactif d\'Autodiagnostic',
    '/contact': 'Formulaire de Contact & Devis',
    '/a-propos': 'Notre Équipe & Raison d\'être'
  };

  return (
    <div>
      {/* 4 KPIs Clés de Trafic */}
      <div className="admin-kpi-grid">
        <div className="admin-kpi-card">
          <div className="admin-kpi-card-header">
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--admin-text-muted)' }}>Volume Global</span>
            <div className="admin-kpi-icon-wrap" style={{ background: 'var(--admin-accent-blue-light)', color: 'var(--admin-accent-blue)' }}>
              <Eye size={20} />
            </div>
          </div>
          <div className="admin-kpi-value">{totalVisits.toLocaleString()}</div>
          <div className="admin-kpi-label">Nombre total de pages vues</div>
          <div className="admin-kpi-footer">
            <span>Depuis le lancement de la refonte</span>
          </div>
        </div>

        <div className="admin-kpi-card">
          <div className="admin-kpi-card-header">
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--admin-text-muted)' }}>Activité du jour</span>
            <div className="admin-kpi-icon-wrap" style={{ background: 'var(--admin-accent-green-light)', color: 'var(--admin-accent-green)' }}>
              <Users size={20} />
            </div>
          </div>
          <div className="admin-kpi-value">{visitsToday}</div>
          <div className="admin-kpi-label">Visites aujourd'hui</div>
          <div className="admin-kpi-footer">
            <span style={{ color: 'var(--admin-accent-green)', fontWeight: 600 }}>{visitsLast7Days}</span>
            <span>visites sur les 7 derniers jours</span>
          </div>
        </div>

        <div className="admin-kpi-card">
          <div className="admin-kpi-card-header">
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--admin-text-muted)' }}>Leads & Échanges</span>
            <div className="admin-kpi-icon-wrap" style={{ background: 'var(--admin-primary-light)', color: 'var(--admin-primary)' }}>
              <Target size={20} />
            </div>
          </div>
          <div className="admin-kpi-value">{totalDiagnostics + totalContacts}</div>
          <div className="admin-kpi-label">Actions qualifiées générées</div>
          <div className="admin-kpi-footer">
            <span>{totalDiagnostics} autodiagnostics · {totalContacts} contacts</span>
          </div>
        </div>

        <div className="admin-kpi-card">
          <div className="admin-kpi-card-header">
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--admin-text-muted)' }}>Transformation</span>
            <div className="admin-kpi-icon-wrap" style={{ background: 'var(--admin-accent-purple-light)', color: 'var(--admin-accent-purple)' }}>
              <TrendingUp size={20} />
            </div>
          </div>
          <div className="admin-kpi-value">{conversionRate}%</div>
          <div className="admin-kpi-label">Taux d'engagement prospect</div>
          <div className="admin-kpi-footer">
            <span>Ratio visiteurs qui entrent en contact</span>
          </div>
        </div>
      </div>

      {/* Graphique de fréquentation journalière */}
      <div className="admin-panel" style={{ marginBottom: 32 }}>
        <div className="admin-panel-header">
          <h3 className="admin-panel-title">
            <BarChart3 size={18} color="var(--admin-primary)" />
            Trafic journalier et affluence sur la plateforme (14 derniers jours)
          </h3>
          <span style={{ fontSize: 12, color: 'var(--admin-text-muted)' }}>
            Moyenne : ~{Math.round(totalVisits / 14)} visites / jour
          </span>
        </div>
        <div className="admin-panel-body">
          <div className="admin-chart-container" style={{ height: 220 }}>
            {dailyTraffic.map((day, idx) => {
              const heightPct = Math.max(10, Math.round((day.count / maxDailyCount) * 100));
              return (
                <div key={idx} className="admin-chart-col" title={`${day.label}: ${day.count} visites`}>
                  <span className="admin-chart-count">{day.count}</span>
                  <div className="admin-chart-bar-wrap">
                    <div
                      className="admin-chart-bar"
                      style={{
                        height: `${heightPct}%`,
                        background: idx === dailyTraffic.length - 1
                          ? 'linear-gradient(180deg, #10B981 0%, rgba(16, 185, 129, 0.5) 100%)'
                          : 'linear-gradient(180deg, #F47721 0%, rgba(244, 119, 33, 0.4) 100%)'
                      }}
                    />
                  </div>
                  <span className="admin-chart-label">{day.label.split(' ')[0]}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2 Colonnes : Pages les plus vues & Répartition Appareils / Provenance */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: 24, marginBottom: 32 }}>
        
        {/* Pages les plus consultées */}
        <div className="admin-panel">
          <div className="admin-panel-header">
            <h3 className="admin-panel-title">
              <Layers size={18} color="var(--admin-accent-blue)" />
              Pages les plus visitées & Intérêt des utilisateurs
            </h3>
          </div>
          <div className="admin-panel-body">
            {!topPages || topPages.length === 0 ? (
              <div style={{ textAlign: 'center', color: 'var(--admin-text-subtle)', padding: '24px 0', fontSize: 13 }}>
                Aucune visite enregistrée pour le moment
              </div>
            ) : (
              topPages.map((page, idx) => {
                const maxCount = topPages[0]?.count || 1;
                const pct = Math.round((page.count / maxCount) * 100);
                const sharePct = totalVisits > 0 ? Math.round((page.count / totalVisits) * 100) : 0;
                return (
                  <div key={idx} style={{ marginBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6, fontSize: 13.5 }}>
                      <div>
                        <span style={{ fontWeight: 600, color: '#fff' }}>
                          {pageNames[page.path] || page.path}
                        </span>
                        <code style={{ fontSize: 11, color: 'var(--admin-text-subtle)', marginLeft: 8 }}>{page.path}</code>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <b style={{ color: '#fff' }}>{page.count} vues</b>
                        <span style={{ fontSize: 11, color: 'var(--admin-text-subtle)', marginLeft: 6 }}>({sharePct}%)</span>
                      </div>
                    </div>
                    <div style={{ height: 8, background: 'rgba(255,255,255,0.05)', borderRadius: 4, overflow: 'hidden' }}>
                      <div
                        style={{
                          height: '100%',
                          width: `${pct}%`,
                          background: 'linear-gradient(90deg, #3B82F6 0%, #60A5FA 100%)',
                          borderRadius: 4
                        }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Répartition par Appareil & Provenance */}
        <div className="admin-panel">
          <div className="admin-panel-header">
            <h3 className="admin-panel-title">
              <Globe size={18} color="var(--admin-accent-green)" />
              Appareils & Origine du trafic
            </h3>
          </div>
          <div className="admin-modal-body">
            {/* Appareils */}
            <div className="admin-detail-group">
              <h4>Répartition par Appareil</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, textAlign: 'center', marginTop: 10 }}>
                <div style={{ padding: 12, background: 'rgba(255,255,255,0.03)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.06)' }}>
                  <Monitor size={22} style={{ color: 'var(--admin-accent-blue)', margin: '0 auto 6px' }} />
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>{desktopPct}%</div>
                  <div style={{ fontSize: 12, color: 'var(--admin-text-muted)' }}>Ordinateur</div>
                  <div style={{ fontSize: 11, color: 'var(--admin-text-subtle)', marginTop: 2 }}>{deviceCounts.Desktop || 0} visites</div>
                </div>

                <div style={{ padding: 12, background: 'rgba(255,255,255,0.03)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.06)' }}>
                  <Smartphone size={22} style={{ color: 'var(--admin-primary)', margin: '0 auto 6px' }} />
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>{mobilePct}%</div>
                  <div style={{ fontSize: 12, color: 'var(--admin-text-muted)' }}>Mobile</div>
                  <div style={{ fontSize: 11, color: 'var(--admin-text-subtle)', marginTop: 2 }}>{deviceCounts.Mobile || 0} visites</div>
                </div>

                <div style={{ padding: 12, background: 'rgba(255,255,255,0.03)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.06)' }}>
                  <Tablet size={22} style={{ color: 'var(--admin-accent-purple)', margin: '0 auto 6px' }} />
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>{tabletPct}%</div>
                  <div style={{ fontSize: 12, color: 'var(--admin-text-muted)' }}>Tablette</div>
                  <div style={{ fontSize: 11, color: 'var(--admin-text-subtle)', marginTop: 2 }}>{deviceCounts.Tablet || 0} visites</div>
                </div>
              </div>
            </div>

            {/* Origine du trafic */}
            <div className="admin-detail-group">
              <h4>Canaux d'Acquisition (Referrers)</h4>
              {Object.keys(referrerCounts).length === 0 ? (
                <div style={{ color: 'var(--admin-text-subtle)', fontSize: 13, padding: '8px 0' }}>
                  Aucune donnée de provenance pour le moment
                </div>
              ) : (
                Object.entries(referrerCounts).map(([ref, count], i) => {
                  const pct = totalVisits > 0 ? Math.round((count / totalVisits) * 100) : 0;
                  return (
                    <div key={i} className="admin-detail-row">
                      <span className="admin-detail-label">{ref}</span>
                      <span className="admin-detail-val">{count} visites ({pct}%)</span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

