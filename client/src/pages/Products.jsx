import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

const catalogProducts = [
  {
    id: 1,
    slug: 'tbg-450-750-lx',
    name: 'Brûleur Industriel Gaz TBG 450-750 LX/MC',
    category: 'gaz',
    model_family: 'Série TBG',
    power_range: '500 à 7 500 kW',
    description: 'Brûleur gaz basse émission (Low-NOx) conçu pour applications industrielles sévères. Gestion électronique du rapport air/gaz et régulation modulante continue.',
    image_url: '/assets/products/bruleur-tbg-450.jpg',
    features: ['Faibles émissions Low-NOx classe 3', 'Régulation électronique modulante', 'Haut rendement thermique > 93%', 'Maintenance facilitée avec accès direct aux têtes de combustion']
  },
  {
    id: 2,
    slug: 'bt-75-300-dspg',
    name: 'Brûleur Gaz Modulant BT 75-300 DSPG',
    category: 'gaz',
    model_family: 'Série BT',
    power_range: '850 à 3 000 kW',
    description: 'Brûleur à gaz robuste à deux allures progressives ou modulant, adapté aux chaudières à vapeur et générateurs d\'eau surchauffée.',
    image_url: '/assets/products/bruleur-bt-75.jpg',
    features: ['Système de came électronique', 'Raccordement gaz universel', 'Fiabilité éprouvée en climat tropical', 'Faible niveau sonore']
  },
  {
    id: 3,
    slug: 'tbl-1000-me',
    name: 'Brûleur Fioul Lourd & Léger TBL 1000 ME',
    category: 'fioul',
    model_family: 'Série TBL',
    power_range: '1 000 à 10 500 kW',
    description: 'Brûleur fioul haute puissance à commande numérique intégrée, adapté au fioul domestique, fioul lourd ou biodiésel avec réchauffeur piloté.',
    image_url: '/assets/products/bruleur-tbl-1000.jpg',
    features: ['Compatible fioul lourd et léger', 'Système de réchauffeur de fioul piloté', 'Régulation par servomoteur haute précision', 'Conçu pour service 24/7 en continu']
  },
  {
    id: 4,
    slug: 'btl-3-26',
    name: 'Brûleur Compact Fioul BTL 3-26',
    category: 'fioul',
    model_family: 'Série BTL',
    power_range: '30 à 310 kW',
    description: 'Brûleur compact pour petites et moyennes installations de chauffage et fours artisanaux. Facilité de pose et consommation maîtrisée.',
    image_url: '/assets/products/bruleur-btl-3.jpg',
    features: ['Encombrement ultra-réduit', 'Démarrage instantané', 'Faible consommation électrique', 'Facilité d\'entretien']
  },
  {
    id: 5,
    slug: 'tbml-50-me',
    name: 'Brûleur Mixte Gaz-Fioul TBML 50 ME',
    category: 'mixte',
    model_family: 'Série TBML',
    power_range: '250 à 6 000 kW',
    description: 'Solution bivalente assurant une continuité de production sans interruption grâce à la commutation rapide entre gaz naturel / GPL et fioul.',
    image_url: '/assets/products/bruleur-tbml-50.jpg',
    features: ['Bicarburation instantanée gaz/fioul', 'Sécurité totale d\'approvisionnement énergétique', 'Commande électronique indépendante par combustible', 'Certifié CE & ISO']
  }
];

export default function Products() {
  const [products, setProducts] = useState(catalogProducts);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const url = filter === 'all'
      ? 'http://localhost:5000/api/products'
      : `http://localhost:5000/api/products?category=${filter}`;

    fetch(url)
      .then(res => res.json())
      .then(json => {
        if (json.data && json.data.length > 0) {
          setProducts(json.data);
        } else {
          setProducts(
            filter === 'all'
              ? catalogProducts
              : catalogProducts.filter(p => p.category === filter)
          );
        }
      })
      .catch(() => {
        setProducts(
          filter === 'all'
            ? catalogProducts
            : catalogProducts.filter(p => p.category === filter)
        );
      });
  }, [filter]);

  return (
    <div className="products-page section">
      <div className="container">
        <div className="section-title-wrapper">
          <span className="badge">Équipements & Brûleurs Industriels</span>
          <h1 className="section-title">Gamme Complète de Combustion Haute Performance</h1>
          <p className="section-subtitle">
            Brûleurs gaz, fioul domestique/lourd et bicarburation pour chaudières vapeur, fours et séchoirs.
          </p>

          <div className="products-filter-tabs">
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              Tous les modèles
            </button>
            <button
              className={`filter-btn ${filter === 'gaz' ? 'active' : ''}`}
              onClick={() => setFilter('gaz')}
            >
              Brûleurs Gaz
            </button>
            <button
              className={`filter-btn ${filter === 'fioul' ? 'active' : ''}`}
              onClick={() => setFilter('fioul')}
            >
              Brûleurs Fioul
            </button>
            <button
              className={`filter-btn ${filter === 'mixte' ? 'active' : ''}`}
              onClick={() => setFilter('mixte')}
            >
              Mixtes Gaz/Fioul
            </button>
          </div>
        </div>

        <div className="grid-3">
          {products.map(p => (
            <ProductCard key={p.id || p.slug} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
