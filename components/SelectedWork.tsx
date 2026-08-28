'use client';

import React, { useState, useEffect } from 'react';
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

export default function SelectedWork() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-play timer every 4.5 seconds
  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev === baseWorkItems.length - 1 ? 0 : prev + 1));
    }, 4500);

    return () => clearInterval(timer);
  }, [isHovered]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? baseWorkItems.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === baseWorkItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="work" className="selected-work-section">
      {/* Section Header */}
      <div className="section-header" data-aos="fade-up">
        <div>
          <span className="section-tag">Selected Work</span>
          <h2 className="section-title">Different needs. One clear, connected approach</h2>
        </div>
        <div className="slider-controls">
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

      {/* Category Navigation Menu */}
      <nav className="work-category-menu" data-aos="fade-up" data-aos-delay="50">
        {baseWorkItems.map((item, index) => (
          <button
            key={item.id}
            className={`category-menu-btn ${index === activeIndex ? 'is-active' : ''}`}
            onClick={() => setActiveIndex(index)}
          >
            {item.category}
          </button>
        ))}
      </nav>

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
              transform: `translateX(calc(-${activeIndex} * (min(1104px, calc(100vw - 48px)) + var(--grid-gap))))`,
            }}
          >
            {baseWorkItems.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <div
                  key={item.id}
                  className={`work-card ${isActive ? 'is-active' : ''}`}
                  onClick={() => !isActive && setActiveIndex(index)}
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
    </section>
  );
}





