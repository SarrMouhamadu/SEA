import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { partnersList } from '../data/partnersData';

export default function PartnerCarousel() {
  const scrollContainerRef = useRef(null);
  const currentScrollRef = useRef(0);
  const initializedRef = useRef(false);
  const [isPaused, setIsPaused] = useState(false);

  // 3 copies pour garantir une boucle infinie ultra-fluide dans les deux sens
  const displayPartners = [...partnersList, ...partnersList, ...partnersList];

  // Initialiser la position au milieu (sur le deuxième jeu) pour un défilement immédiat vers la droite
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const setInitialPosition = () => {
      if (container && container.scrollWidth > 0 && !initializedRef.current) {
        const oneThird = container.scrollWidth / 3;
        container.scrollLeft = oneThird;
        currentScrollRef.current = oneThird;
        initializedRef.current = true;
      }
    };

    setInitialPosition();
    const t1 = setTimeout(setInitialPosition, 100);
    const t2 = setTimeout(setInitialPosition, 350);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Défilement automatique continu en boucle de la gauche vers la droite
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationFrameId;
    // Vitesse fluide en pixels par frame (~45px/s à 60fps)
    const speed = 0.75;

    const step = () => {
      if (!isPaused && container) {
        // Décrémenter scrollLeft fait défiler le contenu de la gauche vers la droite
        currentScrollRef.current -= speed;
        const oneSetWidth = container.scrollWidth / 3;

        if (oneSetWidth > 0) {
          // Boucle infinie fluide
          if (currentScrollRef.current <= 0) {
            currentScrollRef.current += oneSetWidth;
          } else if (currentScrollRef.current >= 2 * oneSetWidth) {
            currentScrollRef.current -= oneSetWidth;
          }
        }

        container.scrollLeft = currentScrollRef.current;
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  // Synchronisation lors du défilement manuel (touch / trackpad / drag)
  const handleScroll = () => {
    if (scrollContainerRef.current && isPaused) {
      currentScrollRef.current = scrollContainerRef.current.scrollLeft;
    }
  };

  // Navigation carte par carte
  const scrollByCard = (direction) => {
    if (!scrollContainerRef.current) return;
    const cardWidth = 236; // 220px carte + 16px gap
    // 'next' défile vers la droite (dans le sens naturel du flux gauche -> droite)
    // 'prev' défile vers la gauche
    const scrollAmount = direction === 'next' ? -cardWidth : cardWidth;
    scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });

    setTimeout(() => {
      if (scrollContainerRef.current) {
        currentScrollRef.current = scrollContainerRef.current.scrollLeft;
      }
    }, 400);
  };

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
            aria-label="Défiler vers la gauche"
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
            aria-label="Défiler vers la droite"
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
        onScroll={handleScroll}
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
