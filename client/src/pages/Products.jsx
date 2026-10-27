import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const url = filter === 'all'
      ? 'http://localhost:5000/api/products'
      : `http://localhost:5000/api/products?category=${filter}`;

    fetch(url)
      .then(res => res.json())
      .then(json => setProducts(json.data || []))
      .catch(() => {});
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
