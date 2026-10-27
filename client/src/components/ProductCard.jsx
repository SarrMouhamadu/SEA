import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, Check, ArrowRight } from 'lucide-react';

export default function ProductCard({ product }) {
  const categoryLabels = {
    gaz: 'Brûleur Gaz',
    fioul: 'Brûleur Fioul',
    mixte: 'Mixte Gaz-Fioul'
  };

  return (
    <div className="card product-card">
      <div className="product-image-container">
        <span className={`product-badge badge-${product.category}`}>
          {categoryLabels[product.category] || product.category}
        </span>
        <img
          src={product.image_url}
          alt={product.name}
          className="product-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/assets/products/bruleur-tbg-450.jpg';
          }}
        />
      </div>

      <div className="product-details">
        <div className="product-family">{product.model_family}</div>
        <h3 className="product-name">{product.name}</h3>
        <div className="product-power">Puissance : <strong>{product.power_range}</strong></div>
        <p className="product-desc">{product.description}</p>

        {product.features && product.features.length > 0 && (
          <ul className="product-features-list">
            {product.features.slice(0, 3).map((feat, idx) => (
              <li key={idx}><Check size={14} className="check-icon" /> {feat}</li>
            ))}
          </ul>
        )}

        <div className="product-footer">
          <Link to="/contact" className="btn btn-primary btn-sm" style={{ width: '100%' }}>
            Demander une fiche technique & devis <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
