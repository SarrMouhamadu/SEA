import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { partnersList } from '../data/partnersData';

export default function PartnerCarousel() {
  const scrollContainerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Défilement automatique continu
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationFrameId;
    const speed = 0.75; // Pixels par frame

    const step = () => {
      if (!isPaused && container) {
        container.scrollLeft += speed;
        // Boucle infinie fluide
        if (container.scrollLeft >= container.scrollWidth - container.clientWidth - 5) {
          container.scrollLeft = 0;
        }
        checkScrollButtons();
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  const checkScrollButtons = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scrollByCard = (direction) => {
    if (!scrollContainerRef.current) return;
    const cardWidth = 240; // Largeur moyenne d'une carte + gap
    const scrollAmount = direction === 'next' ? cardWidth : -cardWidth;
    scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    setTimeout(checkScrollButtons, 350);
  };

  // Duplication de la liste pour garantir un flux infini continu
  const displayPartners = [...partnersList, ...partnersList];

  return (
    <div className="partner-carousel-wrapper">
      
      {/* Contrôles du Carousel */}
      <div className="partner-carousel-controls">
        <span className="partner-count-badge">
          {partnersList.length} Entreprises & Institutions Partenaires
        </span>

        <div className="carousel-nav-btns">
          <button
            type="button"
            className="carousel-arrow-btn"
            onClick={() => scrollByCard('prev')}
            aria-label="Partenaire précédent"
            title="Précédent"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            type="button"
            className="carousel-play-btn"
            onClick={() => setIsPaused(!isPaused)}
            title={isPaused ? "Reprendre le défilement" : "Mettre en pause"}
          >
            {isPaused ? <Play size={15} /> : <Pause size={15} />}
          </button>

          <button
            type="button"
            className="carousel-arrow-btn"
            onClick={() => scrollByCard('next')}
            aria-label="Partenaire suivant"
            title="Suivant"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Conteneur défilant des cartes de partenaires */}
      <div
        className="partner-carousel-track"
        ref={scrollContainerRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        onScroll={checkScrollButtons}
      >
        {displayPartners.map((partner, index) => (
          <div
            key={`${partner.id}-${index}`}
            className="partner-card"
          >
            <div className="partner-card-logo-box">
              <img
                src={partner.logo}
                alt={`Logo ${partner.name}`}
                className="partner-card-img"
                loading="lazy"
              />
            </div>
            
            <div className="partner-card-info">
              <span className="partner-card-category">{partner.category}</span>
              <h4 className="partner-card-name" title={partner.name}>
                {partner.name}
              </h4>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
