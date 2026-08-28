'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface WorkItem {
  id: string;
  category: string;
  description: string;
  bgColor: string;
}

const baseWorkItems: WorkItem[] = [
  {
    id: 'websites',
    category: 'WEBSITES',
    description: 'Clear, responsive experiences where narrative, brand and function come together through visual design.',
    bgColor: '#FCE7EA', // Pastel Pink
  },
  {
    id: 'brand-identity',
    category: 'BRAND IDENTITY',
    description: 'Visual identities designed to communicate clearly and work consistently across digital and physical touchpoints.',
    bgColor: '#E6EEFA', // Pastel Lavender/Blue
  },
  {
    id: 'applications',
    category: 'APPLICATIONS',
    description: 'User interfaces where product, brand, usability and design come together to create clear digital experiences.',
    bgColor: '#E4F4F3', // Pastel Mint/Teal
  },
  {
    id: 'ecommerce',
    category: 'ONLINE STORES',
    description: 'Branded shopping experiences designed to connect products, brand and customer experience.',
    bgColor: '#FFF0E5', // Pastel Peach
  },
  {
    id: 'presentations',
    category: 'PRESENTATIONS',
    description: 'Clear narratives and strong visual systems for executive, sales and business presentations.',
    bgColor: '#EBEFF5', // Soft Cool Gray
  },
  {
    id: 'design-systems',
    category: 'MARKETING MATERIALS',
    description: 'Branded assets that extend the identity across digital and physical communication, from social content to print pieces.',
    bgColor: '#E4F4F3', // Pastel Mint/Teal
  },
];

// Tripled list for seamless infinite circular loop (Set 0, Set 1, Set 2)
const virtualWorkItems = [...baseWorkItems, ...baseWorkItems, ...baseWorkItems];
const TOTAL_BASE = baseWorkItems.length;

export default function SelectedWork() {
  // Start at index TOTAL_BASE (6 = Set 1 "WEBSITES")
  const [virtualIndex, setVirtualIndex] = useState(TOTAL_BASE);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isNavOverflowing, setIsNavOverflowing] = useState(false);

  const categoryMenuRef = useRef<HTMLDivElement>(null);
  const activeCategoryIndex = ((virtualIndex % TOTAL_BASE) + TOTAL_BASE) % TOTAL_BASE;

  // Detect if category navigation text overflows container width
  useEffect(() => {
    const checkOverflow = () => {
      if (categoryMenuRef.current) {
        const { scrollWidth, clientWidth } = categoryMenuRef.current;
        setIsNavOverflowing(scrollWidth > clientWidth + 4);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, []);

  // Smoothly slide category menu so active category item is ALWAYS centered
  useEffect(() => {
    if (!categoryMenuRef.current) return;
    const nav = categoryMenuRef.current;
    const activeBtn = nav.querySelector('.category-menu-btn.is-active') as HTMLElement;

    if (activeBtn) {
      const navWidth = nav.clientWidth;
      const btnLeft = activeBtn.offsetLeft;
      const btnWidth = activeBtn.offsetWidth;
      const targetScrollLeft = btnLeft - navWidth / 2 + btnWidth / 2;

      nav.scrollTo({
        left: Math.max(0, targetScrollLeft),
        behavior: isTransitioning ? 'smooth' : 'auto',
      });
    }
  }, [virtualIndex, isTransitioning]);

  // Auto-play timer every 4.5 seconds
  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      setVirtualIndex((prev) => prev + 1);
    }, 4500);

    return () => clearInterval(timer);
  }, [isHovered]);

  // Seamless position normalization after 350ms transition completes
  useEffect(() => {
    const transitionTimer = setTimeout(() => {
      if (virtualIndex >= 2 * TOTAL_BASE) {
        setIsTransitioning(false);
        setVirtualIndex((prev) => prev - TOTAL_BASE);
      } else if (virtualIndex < TOTAL_BASE) {
        setIsTransitioning(false);
        setVirtualIndex((prev) => prev + TOTAL_BASE);
      }
    }, 350);

    return () => clearTimeout(transitionTimer);
  }, [virtualIndex]);

  // Re-enable transition on the second animation frame after browser has painted transition: none
  useEffect(() => {
    if (!isTransitioning) {
      let raf2: number;
      const raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });

      return () => {
        cancelAnimationFrame(raf1);
        if (raf2) cancelAnimationFrame(raf2);
      };
    }
  }, [isTransitioning]);

  const handlePrev = () => {
    setVirtualIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    setVirtualIndex((prev) => prev + 1);
  };

  // Shortest circular path calculation for menu item clicks
  const handleCategoryClick = (targetCatIndex: number) => {
    let diff = targetCatIndex - activeCategoryIndex;
    if (diff > 3) diff -= TOTAL_BASE;
    if (diff < -3) diff += TOTAL_BASE;
    setVirtualIndex((prev) => prev + diff);
  };

  return (
    <section id="work" className="selected-work-section">
      <div className="lule-inner-container">
        {/* Section Header */}
        <div className="section-header" data-aos="fade-up">
          <div>
            <span className="section-tag">Selected Work</span>
            <h2 className="section-title">Different needs. One clear, connected approach</h2>
          </div>
          {/* Desktop Controls (Top Right) */}
          <div className="slider-controls desktop-controls">
            <button
              className="slider-btn"
              onClick={handlePrev}
              aria-label="Previous work slide"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              className="slider-btn"
              onClick={handleNext}
              aria-label="Next work slide"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Category Navigation Menu Container */}
        <div className={`work-category-menu-wrapper ${isNavOverflowing ? 'has-overflow' : ''}`} data-aos="fade-up" data-aos-delay="50">
          {isNavOverflowing && (
            <button
              className="category-menu-arrow-btn prev-arrow"
              onClick={handlePrev}
              aria-label="Previous category slide"
            >
              <ChevronLeft size={18} />
            </button>
          )}

          <nav className="work-category-menu" ref={categoryMenuRef}>
            {virtualWorkItems.map((item, index) => (
              <button
                key={`${item.id}-nav-${index}`}
                className={`category-menu-btn ${index === virtualIndex ? 'is-active' : ''}`}
                onClick={() => setVirtualIndex(index)}
              >
                {item.category}
              </button>
            ))}
          </nav>

          {isNavOverflowing && (
            <button
              className="category-menu-arrow-btn next-arrow"
              onClick={handleNext}
              aria-label="Next category slide"
            >
              <ChevronRight size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Full Bleed Carousel Slider */}
      <div
        className="slider-fullbleed-wrapper"
        data-aos="fade-up"
        data-aos-delay="100"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="slider-track-container">
          <div
            className="slider-track"
            style={{
              transform: `translateX(calc(-${virtualIndex} * (var(--slider-card-width) + var(--slider-card-gap))))`,
              transition: isTransitioning ? 'transform 0.35s cubic-bezier(0.25, 1, 0.5, 1)' : 'none',
            }}
          >
            {virtualWorkItems.map((item, index) => {
              const isActive = index === virtualIndex;
              return (
                <div
                  key={`${item.id}-${index}`}
                  className={`work-card ${isActive ? 'is-active' : ''}`}
                  onClick={() => !isActive && setVirtualIndex(index)}
                >
                  <div
                    className="work-card-media"
                    style={{ backgroundColor: item.bgColor }}
                  />
                  <div className="work-card-info">
                    {isActive && (
                      <p className="work-card-desc">{item.description}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Controls placed ONCE globally outside the slider track */}
      <div className="lule-inner-container mobile-controls-wrapper">
        <div className="slider-controls mobile-controls">
          <button
            className="slider-btn"
            onClick={handlePrev}
            aria-label="Previous work slide"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            className="slider-btn"
            onClick={handleNext}
            aria-label="Next work slide"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
