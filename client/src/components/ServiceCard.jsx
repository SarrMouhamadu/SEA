import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, TrendingUp, Flame, GraduationCap, Building2, ArrowRight } from 'lucide-react';

const iconsMap = {
  Zap: Zap,
  TrendingUp: TrendingUp,
  Flame: Flame,
  GraduationCap: GraduationCap,
  Building2: Building2
};

export default function ServiceCard({ service }) {
  const IconComponent = iconsMap[service.icon] || Zap;

  return (
    <div className="card service-card">
      <div className="service-icon-box">
        <IconComponent size={28} />
      </div>
      <h3 className="service-title">{service.title}</h3>
      <p className="service-summary">{service.summary}</p>
      <Link to="/services" className="service-link">
        En savoir plus <ArrowRight size={16} />
      </Link>
    </div>
  );
}
