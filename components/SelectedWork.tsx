'use client';

import React, { useRef, useState, useEffect } from 'react';
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

// Tripled list for seamless infinite loop (Set 1, Set 2, Set 3)
const infiniteWorkItems = [...baseWorkItems, ...baseWorkItems, ...baseWorkItems];

export default function SelectedWork() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const scrollPosRef = useRef<number>(0);
  const animationFrameIdRef = useRef<number | null>(null);
  const tweenFrameIdRef = useRef<number | null>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isManualScrolling, setIsManualScrolling] = useState(false);
  const [isTouching, setIsTouching] = useState(false);

  // Initialize position in the middle set (Set 2)
  useEffect(() => {
    if (!sliderRef.current) return;
    const container = sliderRef.current;
    const firstCard = container.querySelector('.work-card') as HTMLElement;
    const stride = firstCard ? firstCard.offsetWidth + 24 : 1128;
    const setLength = baseWorkItems.length * stride;

    container.scrollLeft = setLength;
    scrollPosRef.current = setLength;
  }, []);

  // Continuous auto-scroll loop effect
  useEffect(() => {
    const autoScroll = () => {
      if (!sliderRef.current || isHovered || isManualScrolling || isTouching) return;

      const container = sliderRef.current;
      const firstCard = container.querySelector('.work-card') as HTMLElement;
      const stride = firstCard ? firstCard.offsetWidth + 24 : 1128;
      const setLength = baseWorkItems.length * stride;

      // Sync accumulator if DOM scroll position diverged (e.g. after manual touch drag)
      if (Math.abs(scrollPosRef.current - container.scrollLeft) > 15) {
        scrollPosRef.current = container.scrollLeft;
      }

      // Smooth step increment (0.75px per frame)
      scrollPosRef.current += 0.75;

      // Seamless infinite wrapping: when entering Set 3, wrap back to Set 2
      if (scrollPosRef.current >= 2 * setLength) {
        scrollPosRef.current -= setLength;
      }

      container.scrollLeft = scrollPosRef.current;
      animationFrameIdRef.current = requestAnimationFrame(autoScroll);
    };

    if (!isHovered && !isManualScrolling && !isTouching) {
      animationFrameIdRef.current = requestAnimationFrame(autoScroll);
    }

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [isHovered, isManualScrolling, isTouching]);

  // Ultra-smooth cubic-bezier JS easing transition for Next/Prev clicks
  const animateScrollTo = (targetX: number, duration: number = 800) => {
    if (!sliderRef.current) return;
    setIsManualScrolling(true);

    if (tweenFrameIdRef.current) {
      cancelAnimationFrame(tweenFrameIdRef.current);
    }

    const container = sliderRef.current;
    const startX = container.scrollLeft;
    const distance = targetX - startX;
    const startTime = performance.now();

    // Smooth easeOutCubic curve
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);

      const currentX = startX + distance * easedProgress;
      container.scrollLeft = currentX;
      scrollPosRef.current = currentX;

      if (progress < 1) {
        tweenFrameIdRef.current = requestAnimationFrame(step);
      } else {
        // Animation finished: normalize position to middle set (Set 2) if outside
        const firstCard = container.querySelector('.work-card') as HTMLElement;
        const stride = firstCard ? firstCard.offsetWidth + 24 : 1128;
        const setLength = baseWorkItems.length * stride;

        if (container.scrollLeft >= 2 * setLength) {
          const normalized = container.scrollLeft - setLength;
          container.scrollLeft = normalized;
          scrollPosRef.current = normalized;
        } else if (container.scrollLeft < setLength) {
          const normalized = container.scrollLeft + setLength;
          container.scrollLeft = normalized;
          scrollPosRef.current = normalized;
        }

        setIsManualScrolling(false);
      }
    };

    tweenFrameIdRef.current = requestAnimationFrame(step);
  };

  // Scroll manual handlers (Next / Prev)
  const handleScroll = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;

    const container = sliderRef.current;
    const firstCard = container.querySelector('.work-card') as HTMLElement;
    const stride = firstCard ? firstCard.offsetWidth + 24 : 1128;
    const setLength = baseWorkItems.length * stride;

    // Normalize to middle set before calculating target if needed
    let currentScroll = container.scrollLeft;
    if (currentScroll < setLength / 2) {
      currentScroll += setLength;
      container.scrollLeft = currentScroll;
      scrollPosRef.current = currentScroll;
    } else if (currentScroll >= 2.5 * setLength) {
      currentScroll -= setLength;
      container.scrollLeft = currentScroll;
      scrollPosRef.current = currentScroll;
    }

    const currentIndex = Math.round(currentScroll / stride);
    const targetIndex = direction === 'left' ? currentIndex - 1 : currentIndex + 1;
    const targetX = targetIndex * stride;

    // 800ms ultra-smooth transition
    animateScrollTo(targetX, 800);
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
            {infiniteWorkItems.map((item, index) => (
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




