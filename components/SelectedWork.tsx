'use client';

import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface WorkItem {
  id: string;
  category: string;
  description: string;
  bgColor: string;
}

const workItems: WorkItem[] = [
  {
    id: 'websites',
    category: 'WEBSITES',
    description: 'Clear, responsive experiences that connect message, brand and function.',
    bgColor: '#FCE7EA', // Pastel Pink
  },
  {
    id: 'brand-identity',
    category: 'BRAND IDENTITY',
    description: 'Memorable identities designed to scale and communicate across all touchpoints.',
    bgColor: '#E6EEFA', // Pastel Lavender/Blue
  },
  {
    id: 'applications',
    category: 'APPLICATIONS',
    description: 'Clear, cohesive interfaces designed around real workflows and user needs.',
    bgColor: '#E4F4F3', // Pastel Mint/Teal
  },
  {
    id: 'presentations',
    category: 'ECOMMERCE',
    description: 'Branded shopping experiences designed to make products easy to explore and buy.',
    bgColor: '#FFF0E5', // Pastel Peach
  },
  {
    id: 'design-systems',
    category: 'PRESENTATIONS',
    description: 'Clear narratives and strong visuals that make ideas easier to understand and remember.',
    bgColor: '#EBEFF5', // Soft Cool Gray
  },
  {
    id: 'design-systems',
    category: 'DESIGN SYSTEMS',
    description: 'Scalable systems that keep digital products consistent, efficient and easy to evolve.',
    bgColor: '#E4F4F3', // Pastel Mint/Teal
  },
];

export default function SelectedWork() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const scrollPosRef = useRef<number>(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isManualScrolling, setIsManualScrolling] = useState(false);
  const [isTouching, setIsTouching] = useState(false);

  // Auto-scroll loop effect
  useEffect(() => {
    let animationFrameId: number;

    const autoScroll = () => {
      if (!sliderRef.current || isHovered || isManualScrolling || isTouching) return;

      const container = sliderRef.current;
      const { scrollWidth, clientWidth } = container;

      // Sync accumulator if DOM scroll position diverged (e.g. after manual swipe)
      if (Math.abs(scrollPosRef.current - container.scrollLeft) > 10) {
        scrollPosRef.current = container.scrollLeft;
      }

      // If reached the end, wrap smoothly to beginning for continuous loop
      if (scrollPosRef.current + clientWidth >= scrollWidth - 2) {
        scrollPosRef.current = 0;
      } else {
        // Increment float position (0.8px per frame)
        scrollPosRef.current += 0.8;
      }

      container.scrollLeft = scrollPosRef.current;

      animationFrameId = requestAnimationFrame(autoScroll);
    };

    if (!isHovered && !isManualScrolling && !isTouching) {
      animationFrameId = requestAnimationFrame(autoScroll);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isHovered, isManualScrolling, isTouching]);

  // Scroll manual handlers (scrolls exactly 1 full slide width)
  const handleScroll = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;
    
    // Pause auto-scroll to allow native smooth scrolling without animation conflicts
    setIsManualScrolling(true);

    const container = sliderRef.current;
    const firstCard = container.querySelector('.work-card') as HTMLElement;
    const cardWidth = firstCard ? firstCard.offsetWidth + 24 : 588; // card width + gap

    let targetScroll = container.scrollLeft;

    if (direction === 'left') {
      if (container.scrollLeft <= 5) {
        targetScroll = container.scrollWidth - container.clientWidth;
      } else {
        targetScroll = container.scrollLeft - cardWidth;
      }
    } else {
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
        targetScroll = 0;
      } else {
        targetScroll = container.scrollLeft + cardWidth;
      }
    }

    scrollPosRef.current = targetScroll;
    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth',
    });

    setTimeout(() => {
      setIsManualScrolling(false);
    }, 600);
  };

  return (
    <section id="work" className="selected-work-section">
      <div className="section-header">
        <div>
          <span className="section-tag">Selected Work</span>
          <h2 className="section-title">Different needs. One clear, cohesive approach.</h2>
        </div>
        <div className="slider-controls">
          <button
            className="slider-btn"
            onClick={() => handleScroll('left')}
            aria-label="Previous work slide"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            className="slider-btn"
            onClick={() => handleScroll('right')}
            aria-label="Next work slide"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div
        className="slider-fullbleed-wrapper"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="slider-container"
          ref={sliderRef}
          onTouchStart={() => setIsTouching(true)}
          onTouchEnd={() => {
            setTimeout(() => setIsTouching(false), 1000);
          }}
        >
          <div className="slider-track">
            {workItems.map((item, index) => (
              <div key={`${item.id}-${index}`} className="work-card">
                <div
                  className="work-card-media"
                  style={{ backgroundColor: item.bgColor }}
                />
                <div className="work-card-info">
                  <span className="work-card-tag">{item.category}</span>
                  <p className="work-card-desc">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}



