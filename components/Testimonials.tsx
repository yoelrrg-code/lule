'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// ============================================================================
// CONFIGURACIÓN DEL SLIDER DE TESTIMONIOS (en milisegundos)
// Ajusta el tiempo de auto-rotación (por defecto 5000ms = 5s) y la duración
// de la transición circular + fade-in.
// ============================================================================
export const AUTO_SLIDE_INTERVAL_MS = 5000;
export const TRANSITION_DURATION_MS = 1050;

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  colorImg: string;
  bnImg: string;
}

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 'lital',
    name: 'Lital Barkan',
    role: 'Strategy + execution for mission-driven B2Bs',
    company: 'Founder & CEO, MTR Marketing',
    quote:
      'Clear, customer-centric and highly collaborative, with the ability to connect marketing, development and design. The work balances a holistic view with close attention to detail, making remote collaboration feel seamless and the relationship more like a committed partnership than an outside resource.',
    colorImg: '/testimonials/lital-color.png',
    bnImg: '/testimonials/lital-bn.png',
  },
  {
    id: 'jenaro',
    name: 'Jenaro Díaz',
    role: 'Product & technology leadership',
    company: 'Executive Director',
    quote:
      'Working with Lule brought immediate clarity to our brand and digital products. Their ability to translate complex business requirements into an intuitive, cohesive visual system elevated every touchpoint of our customer experience.',
    colorImg: '/testimonials/jenaro-color.png',
    bnImg: '/testimonials/jenaro-bn.png',
  },
  {
    id: 'lili',
    name: 'Lili Chen',
    role: 'Brand & digital experience strategy',
    company: 'Head of Marketing & Growth',
    quote:
      'Every deliverable reflects strategic thinking and refined execution. From brand identity to web architecture, the process was structured, responsive and genuinely collaborative from day one.',
    colorImg: '/testimonials/lili-color.png',
    bnImg: '/testimonials/lili-bn.png',
  },
  {
    id: 'luismario',
    name: 'Luis Mario',
    role: 'Enterprise software & digital platforms',
    company: 'Co-Founder & Managing Partner',
    quote:
      'They understand how design drives business outcomes. Rather than just delivering screens, they helped us structure our narrative, sharpen our positioning and ship a platform our clients love using.',
    colorImg: '/testimonials/luismario-color.png',
    bnImg: '/testimonials/luismario-bn.png',
  },
  {
    id: 'mark',
    name: 'Mark Stevens',
    role: 'Corporate communications & B2B growth',
    company: 'VP of Strategy & Operations',
    quote:
      'A rare combination of senior design craft and clear business sense. Complex presentations, applications and brand assets all feel unified under one unmistakable standard of quality.',
    colorImg: '/testimonials/mark-color.png',
    bnImg: '/testimonials/mark-bn.png',
  },
];

const ORBIT_SLOTS = [0, 1, 2, 3] as const;

export default function Testimonials() {
  const total = TESTIMONIALS_DATA.length;

  const [{ activeIndex, leavingIndex, direction }, setSliderState] = useState<{
    activeIndex: number;
    leavingIndex: number | null;
    direction: 'next' | 'prev';
  }>({
    activeIndex: 0,
    leavingIndex: null,
    direction: 'next',
  });

  const goToSlide = useCallback(
    (targetIndex: number, dir: 'next' | 'prev') => {
      const normalized = ((targetIndex % total) + total) % total;
      setSliderState((prev) => {
        if (prev.activeIndex === normalized) return prev;
        return {
          activeIndex: normalized,
          leavingIndex: prev.activeIndex,
          direction: dir,
        };
      });
    },
    [total]
  );

  const handleNext = useCallback(() => {
    goToSlide(activeIndex + 1, 'next');
  }, [activeIndex, goToSlide]);

  const handlePrev = useCallback(() => {
    goToSlide(activeIndex - 1, 'prev');
  }, [activeIndex, goToSlide]);

  // Clear leavingIndex after the transition completes
  useEffect(() => {
    if (leavingIndex === null) return;
    const timeoutId = setTimeout(() => {
      setSliderState((prev) => ({
        ...prev,
        leavingIndex: null,
      }));
    }, TRANSITION_DURATION_MS);

    return () => clearTimeout(timeoutId);
  }, [leavingIndex]);

  // Infinite auto-slide every 5 seconds (resets automatically whenever activeIndex changes)
  useEffect(() => {
    if (AUTO_SLIDE_INTERVAL_MS <= 0 || total <= 1) return;

    const timer = setInterval(() => {
      goToSlide(activeIndex + 1, 'next');
    }, AUTO_SLIDE_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [activeIndex, total, goToSlide]);

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="lule-container">
        <div className="testimonials-layout" data-aos="fade-up" data-aos-delay="100">
          {/* Left Column (30%): 5-Avatar Floating Cluster */}
          <div className="tm-avatars-column">
            <div className="tm-avatars-cluster" aria-hidden="false">
              {/* 4 Background Floating Grayscale Avatars */}
              {ORBIT_SLOTS.map((slotIdx) => {
                const itemIndexForSlot = (activeIndex + slotIdx + 1) % total;
                const targetItem = TESTIMONIALS_DATA[itemIndexForSlot];

                return (
                  <button
                    key={`orbit-slot-${slotIdx}`}
                    type="button"
                    className={`tm-orbit-avatar tm-orbit-slot-${slotIdx}`}
                    onClick={() => goToSlide(itemIndexForSlot, 'next')}
                    aria-label={`View testimonial from ${targetItem.name}`}
                  >
                    {TESTIMONIALS_DATA.map((item, idx) => {
                      const isSlotActive = idx === itemIndexForSlot;
                      return (
                        <Image
                          key={`orbit-${slotIdx}-${item.id}`}
                          src={item.bnImg}
                          alt={item.name}
                          fill
                          sizes="96px"
                          className={`tm-orbit-img ${isSlotActive ? 'is-visible' : ''}`}
                          style={{
                            transitionDuration: `${TRANSITION_DURATION_MS}ms`,
                          }}
                        />
                      );
                    })}
                  </button>
                );
              })}

              {/* Center Active Color Avatar with Circular + Fade-In Reveal */}
              <div className="tm-center-avatar">
                {TESTIMONIALS_DATA.map((item, idx) => {
                  const isActive = idx === activeIndex;
                  const isLeaving = idx === leavingIndex && !isActive;
                  return (
                    <Image
                      key={`center-${item.id}`}
                      src={item.colorImg}
                      alt={item.name}
                      fill
                      sizes="184px"
                      priority={idx === 0}
                      className={`tm-center-img ${isActive ? 'is-active' : ''} ${
                        isLeaving ? 'is-leaving' : ''
                      }`}
                      style={{
                        transitionDuration: `${TRANSITION_DURATION_MS}ms`,
                        animationDuration: `${TRANSITION_DURATION_MS}ms`,
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Quote Mark + Sliding Quote Content */}
          <div className="tm-content-column">
            <div className="tm-quote-mark" aria-hidden="true">
              <svg
                width="30"
                height="24"
                viewBox="0 0 30 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.05 24C4.95 24 3.25 23.25 1.95 21.75C0.65 20.2 0 18.05 0 15.3C0 11.9 0.9 8.75 2.7 5.85C4.55 2.9 7.2 0.95 10.65 0L12.6 2.85C10.2 3.75 8.3 5.05 6.9 6.75C5.55 8.45 4.8 10.35 4.65 12.45C5.3 12.1 6.1 11.925 7.05 11.925C8.85 11.925 10.325 12.5 11.475 13.65C12.625 14.75 13.2 16.225 13.2 18.075C13.2 19.875 12.6 21.325 11.4 22.425C10.25 23.475 8.8 24 7.05 24ZM23.85 24C21.75 24 20.05 23.25 18.75 21.75C17.45 20.2 16.8 18.05 16.8 15.3C16.8 11.9 17.7 8.75 19.5 5.85C21.35 2.9 24 0.95 27.45 0L29.4 2.85C27 3.75 25.1 5.05 23.7 6.75C22.35 8.45 21.6 10.35 21.45 12.45C22.1 12.1 22.9 11.925 23.85 11.925C25.65 11.925 27.125 12.5 28.275 13.65C29.425 14.75 30 16.225 30 18.075C30 19.875 29.4 21.325 28.2 22.425C27.05 23.475 25.6 24 23.85 24Z"
                  fill="#CF000F"
                />
              </svg>
            </div>

            <div className={`tm-slides-viewport tm-dir-${direction}`}>
              {TESTIMONIALS_DATA.map((item, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <div
                    key={item.id}
                    className={`tm-slide-item ${isActive ? 'is-active' : ''}`}
                    style={{
                      transitionDuration: `${TRANSITION_DURATION_MS}ms`,
                    }}
                    aria-hidden={!isActive}
                  >
                    <p className="tm-quote-text">{item.quote}</p>
                    <div className="tm-author-block">
                      <h3 className="tm-author-name">{item.name}</h3>
                      <p className="tm-author-role">{item.role}</p>
                      <p className="tm-author-company">{item.company}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Infinite Navigation Controls */}
        <div className="tm-controls">
          <button
            type="button"
            className="tm-nav-btn tm-nav-prev"
            onClick={handlePrev}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={16} strokeWidth={2.2} />
          </button>
          <button
            type="button"
            className="tm-nav-btn tm-nav-next"
            onClick={handleNext}
            aria-label="Next testimonial"
          >
            <ChevronRight size={16} strokeWidth={2.2} />
          </button>
        </div>
      </div>
    </section>
  );
}
