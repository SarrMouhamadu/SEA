import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, FileCheck2, Building2, Globe2, TrendingUp, Sparkles } from 'lucide-react';
import ReferenceCard from '../components/ReferenceCard';
import { officialReferences } from '../data/referencesData';

export default function References() {
  const [sectorFilter, setSectorFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtrage combiné par catégorie et recherche par mot-clé
  const filteredProjects = useMemo(() => {
    return officialReferences.filter((project) => {
      const matchesSector = sectorFilter === 'all' || project.sector === sectorFilter;
      
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || (
        project.title.toLowerCase().includes(q) ||
        project.client.toLowerCase().includes(q) ||
        (project.clientBadge && project.clientBadge.toLowerCase().includes(q)) ||
        (project.country && project.country.toLowerCase().includes(q)) ||
        (project.keyImpact && project.keyImpact.toLowerCase().includes(q)) ||
        (project.objectives && project.objectives.some(obj => obj.toLowerCase().includes(q)))
      );

      return matchesSector && matchesSearch;
    });
  }, [sectorFilter, searchQuery]);

  const counts = useMemo(() => {
    return {
      all: officialReferences.length,
      bailleurs: officialReferences.filter(p => p.sector === 'bailleurs').length,
      industrie: officialReferences.filter(p => p.sector === 'industrie').length,
      public: officialReferences.filter(p => p.sector === 'public').length,
      territoires: officialReferences.filter(p => p.sector === 'territoires').length,
      formation: officialReferences.filter(p => p.sector === 'formation').length,
    };
  }, []);

  return (
    <div className="references-page section">
      <div className="container">
        
        {/* En-tête de la page */}
        <div className="section-title-wrapper">
          <span className="badge">Contrats & Réalisations Officielles</span>
          <h1 className="section-title">Nos Références & Missions Réalisées</h1>
          <p className="section-subtitle">
            Consultez les 20 projets contractuels majeurs conduits par SEnergyS Africa auprès des bailleurs internationaux, ministères, collectivités et leaders industriels.
          </p>
        </div>

        {/* Bandeau Chiffres Clés Références */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '40px'
        }}>
          <div className="card" style={{ padding: '20px', textAlign: 'center', background: 'var(--theme-surface-alt)' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '32px', color: 'var(--color-orange)', fontWeight: 700 }}>
              20
            </div>
            <div style={{ fontSize: '13px', color: 'var(--theme-text-muted)', fontWeight: 600 }}>
              Missions d'ingénierie & conseil
            </div>
          </div>

          <div className="card" style={{ padding: '20px', textAlign: 'center', background: 'var(--theme-surface-alt)' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '32px', color: 'var(--color-gold)', fontWeight: 700 }}>
              +280M FCFA
            </div>
            <div style={{ fontSize: '13px', color: 'var(--theme-text-muted)', fontWeight: 600 }}>
              De contrats d'expertise exécutés
            </div>
          </div>

          <div className="card" style={{ padding: '20px', textAlign: 'center', background: 'var(--theme-surface-alt)' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '32px', color: 'var(--color-green-mid)', fontWeight: 700 }}>
              100%
            </div>
            <div style={{ fontSize: '13px', color: 'var(--theme-text-muted)', fontWeight: 600 }}>
              Livrables & cadres validés
            </div>
          </div>

          <div className="card" style={{ padding: '20px', textAlign: 'center', background: 'var(--theme-surface-alt)' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '32px', color: 'var(--color-orange)', fontWeight: 700 }}>
              Sénégal & Bénin
            </div>
            <div style={{ fontSize: '13px', color: 'var(--theme-text-muted)', fontWeight: 600 }}>
              Rayonnement Afrique de l'Ouest
            </div>
          </div>
        </div>

        {/* Barre de Recherche et Onglets Filtres */}
        <div style={{ marginBottom: '36px' }}>
          
          {/* Recherche textuelle rapide */}
          <div style={{
            position: 'relative',
            maxWidth: '480px',
            margin: '0 auto 24px'
          }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--theme-text-muted)' }} />
            <input
              type="text"
              placeholder="Rechercher par client, mot-clé, norme (GIZ, Pikine, ISO, Typha...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px 12px 46px',
                borderRadius: '9999px',
                border: '1px solid var(--theme-border)',
                background: 'var(--theme-surface)',
                color: 'var(--theme-text)',
                fontSize: '14px',
                outline: 'none',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--theme-text-muted)',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                ✕
              </button>
            )}
          </div>

          {/* Filtres par secteur */}
          <div className="products-filter-tabs" style={{ justifyContent: 'center' }}>
            <button
              className={`filter-btn ${sectorFilter === 'all' ? 'active' : ''}`}
              onClick={() => setSectorFilter('all')}
            >
              Tous les projets ({counts.all})
            </button>
            <button
              className={`filter-btn ${sectorFilter === 'bailleurs' ? 'active' : ''}`}
              onClick={() => setSectorFilter('bailleurs')}
            >
              Bailleurs & Coopération ({counts.bailleurs})
            </button>
            <button
              className={`filter-btn ${sectorFilter === 'industrie' ? 'active' : ''}`}
              onClick={() => setSectorFilter('industrie')}
            >
              Industrie & PME ({counts.industrie})
            </button>
            <button
              className={`filter-btn ${sectorFilter === 'public' ? 'active' : ''}`}
              onClick={() => setSectorFilter('public')}
            >
              Secteur Public & CDN ({counts.public})
            </button>
            <button
              className={`filter-btn ${sectorFilter === 'territoires' ? 'active' : ''}`}
              onClick={() => setSectorFilter('territoires')}
            >
              Villes & Bâtiments ({counts.territoires})
            </button>
            <button
              className={`filter-btn ${sectorFilter === 'formation' ? 'active' : ''}`}
              onClick={() => setSectorFilter('formation')}
            >
              Formation & Digital ({counts.formation})
            </button>
          </div>
        </div>

        {/* Grille des Cartes Références */}
        {filteredProjects.length > 0 ? (
          <div className="grid-3" style={{ gap: '24px' }}>
            {filteredProjects.map((project) => (
              <ReferenceCard key={project.id} item={project} />
            ))}
          </div>
        ) : (
          <div className="card" style={{ textAlign: 'center', padding: '48px 24px', background: 'var(--theme-surface-alt)' }}>
            <p style={{ color: 'var(--theme-text-muted)', fontSize: '16px', marginBottom: '16px' }}>
              Aucun projet ne correspond à votre recherche <strong>"{searchQuery}"</strong>.
            </p>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => { setSectorFilter('all'); setSearchQuery(''); }}
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}

        {/* Bannière d'appel à l'action */}
        <div className="card" style={{ marginTop: '60px', padding: '40px', background: 'var(--theme-surface-alt)', borderColor: 'var(--theme-border)', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--theme-text)', marginBottom: '12px' }}>
            Vous avez un projet similaire à structurer ?
          </h2>
          <p style={{ color: 'var(--theme-text-muted)', maxWidth: '680px', margin: '0 auto 24px', lineHeight: 1.6 }}>
            Bailleurs, ministères, municipalités et industriels : bénéficiez d'une équipe d'ingénieurs chevronnés avec un engagement contractuel sur les résultats.
          </p>
          <Link to="/contact" className="btn btn-primary" style={{ padding: '14px 28px' }}>
            Échanger avec notre direction technique <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </div>
  );
}
