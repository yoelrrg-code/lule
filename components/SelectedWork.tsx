'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// ============================================================================
// CONFIGURACIÓN DE TIEMPOS, LOOP E IMÁGENES DE "SELECTED COLLABORATIONS"
// ============================================================================

// Tiempo entre cada cambio de imagen (fade-in / fade-out) en PC y Precise MDX (3s)
export const FADE_INTERVAL_MS = 3000;

// Duración visual del efecto fade-in / fade-out (en milisegundos)
export const FADE_DURATION_MS = 800;

// Bandera para el carrusel de Softtek:
// - true:  Carrusel en loop infinito continuo de derecha a izquierda.
// - false: El carrusel avanza de derecha a izquierda y se detiene cuando la
//          última imagen queda completamente visible en pantalla.
export const SOFTTEK_CAROUSEL_LOOP = true;

// Velocidad de desplazamiento del carrusel de Softtek (píxeles por frame)
export const SOFTTEK_CAROUSEL_SPEED = 0.2;

// Imágenes de la sección 1: PC / Revenue Cycle Management
export const PC_IMAGES = [
  '/works/PC-slide1.jpg',
  '/works/PC-slide2.jpg',
  '/works/PC-slide3.jpg',
  '/works/PC-slide4.jpg',
];

// Imágenes de la sección 2: Precise MDX
export const PRECISE_MDX_IMAGES = [
  '/works/PMDX-Slide1.jpg',
  '/works/PMDX-Slide2.jpg',
  '/works/PMDX-Slide3.jpg',
  '/works/PMDX-slide4.jpg',
];

// Imágenes de la sección 3: Softtek (Carrusel de presentaciones)
export const SOFTTEK_IMAGES = [
  '/works/presentation-1.jpg',
  '/works/presentation-2.jpg',
  '/works/presentation-3.jpg',
  '/works/presentation-4.jpg',
  '/works/presentation-5.jpg',
  '/works/presentation-6.jpg',
];

interface FadeImageRotatorProps {
  images: string[];
  alt: string;
  intervalMs?: number;
  topWhiteFade?: boolean;
  priority?: boolean;
}

function FadeImageRotator({
  images,
  alt,
  intervalMs = FADE_INTERVAL_MS,
  topWhiteFade = false,
  priority = false,
}: FadeImageRotatorProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1 || intervalMs <= 0) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [images, intervalMs]);

  return (
    <div className="sw-fade-rotator">
      {topWhiteFade && <div className="sw-top-white-fade" aria-hidden="true" />}
      {images.map((src, idx) => {
        const isActive = idx === activeIndex;
        return (
          <Image
            key={`${src}-${idx}`}
            src={src}
            alt={`${alt} - ${idx + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 1180px"
            priority={priority && idx === 0}
            className={`sw-fade-img ${isActive ? 'is-active' : ''}`}
            style={{
              transitionDuration: `${FADE_DURATION_MS}ms`,
            }}
          />
        );
      })}
    </div>
  );
}

interface SofttekCarouselProps {
  images: string[];
  loop?: boolean;
  speed?: number;
}

function SofttekCarousel({
  images,
  loop = SOFTTEK_CAROUSEL_LOOP,
  speed = SOFTTEK_CAROUSEL_SPEED,
}: SofttekCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const isVisibleRef = useRef(true);

  const renderedImages = loop ? [...images, ...images] : images;

  useEffect(() => {
    const viewportEl = viewportRef.current;
    if (!viewportEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(viewportEl);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let animFrameId: number | null = null;

    const step = () => {
      const viewportEl = viewportRef.current;
      const trackEl = trackRef.current;

      if (viewportEl && trackEl && isVisibleRef.current && images.length > 0) {
        const slides = trackEl.querySelectorAll('.sw-softtek-slide');

        if (slides.length > 0) {
          if (loop && slides.length >= images.length * 2) {
            const firstSlide = slides[0] as HTMLElement;
            const secondSetStartSlide = slides[images.length] as HTMLElement;
            const singleSetWidth = secondSetStartSlide.offsetLeft - firstSlide.offsetLeft;

            if (singleSetWidth > 0) {
              offsetRef.current += speed;
              if (offsetRef.current >= singleSetWidth) {
                offsetRef.current -= singleSetWidth;
              }
              trackEl.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
            }
          } else {
            // Non-loop mode: stop when the last slide is fully visible inside the viewport
            const lastSlide = slides[slides.length - 1] as HTMLElement;
            const viewportStyle = window.getComputedStyle(viewportEl);
            const padLeft = parseFloat(viewportStyle.paddingLeft) || 0;
            const totalTrackWidthWithRightPad =
              padLeft + lastSlide.offsetLeft + lastSlide.offsetWidth + padLeft;
            const maxOffset = Math.max(0, totalTrackWidthWithRightPad - viewportEl.clientWidth);

            if (offsetRef.current < maxOffset) {
              offsetRef.current = Math.min(maxOffset, offsetRef.current + speed);
              trackEl.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
            }
          }
        }
      }

      animFrameId = requestAnimationFrame(step);
    };

    animFrameId = requestAnimationFrame(step);
    return () => {
      if (animFrameId !== null) {
        cancelAnimationFrame(animFrameId);
      }
    };
  }, [images.length, loop, speed]);

  return (
    <div className="sw-softtek-carousel-viewport" ref={viewportRef}>
      <div className="sw-softtek-carousel-track" ref={trackRef}>
        {renderedImages.map((src, idx) => (
          <div key={`${src}-${idx}`} className="sw-softtek-slide">
            <Image
              src={src}
              alt={`Softtek presentation slide ${(idx % images.length) + 1}`}
              fill
              sizes="(max-width: 768px) 85vw, 680px"
              className="sw-softtek-img"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SelectedWork() {
  return (
    <section id="work" className="selected-work-section">
      <div className="lule-container">
        {/* Section Header */}
        <div className="selected-work-header-block">
          <span className="selected-work-tag" data-aos="fade-up" data-aos-delay="100">
            SELECTED COLLABORATIONS
          </span>
          <div className="selected-work-header">
            <h2 className="selected-work-heading" data-aos="fade-up" data-aos-delay="150">
              Our work starts with
              <br />
              understanding yours
            </h2>
            <p className="selected-work-intro" data-aos="fade-up" data-aos-delay="200">
              Every organization has different needs. We collaborate with marketing, product,
              development and leadership teams to create and refine digital products and
              experiences, develop or strengthen brand identities, and bring clarity to complex
              communications.
            </p>
          </div>
        </div>

        {/* 3 Collaboration Cards */}
        <div className="selected-work-list">
          {/* CARD 1: PC / Revenue Cycle Management */}
          <article className="sw-collab-card" data-aos="fade-up" data-aos-delay="150">
            <div className="sw-collab-top">
              <span className="sw-collab-pill sw-pill-pc">PC / Revenue Cycle Management</span>
              <h3 className="sw-collab-title">A new name. A transformed identity.</h3>
              <p className="sw-collab-desc">
                Founded in 1989, Physicians Choice was ready for a new brand identity. We helped
                transform the brand into PC, developing a refreshed visual identity and extending it
                across digital and print applications, including its website, business cards,
                handouts, and trade show booth graphics.
              </p>
              <a href="#contact" className="sw-collab-link">
                <span>View case study</span>
                <span className="sw-collab-arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </div>

            <FadeImageRotator
              images={PC_IMAGES}
              alt="PC Revenue Cycle Management showcase"
              priority
            />
          </article>

          {/* CARD 2: Precise MDX */}
          <article className="sw-collab-card" data-aos="fade-up" data-aos-delay="150">
            <div className="sw-collab-top">
              <span className="sw-collab-pill sw-pill-pmdx">Precise MDX</span>
              <h3 className="sw-collab-title">From interface design to brand transformation</h3>
              <p className="sw-collab-desc">
                Our collaboration began with UI design for PreciseMDX&apos;s healthcare applications
                and grew into a broader creative partnership. We redesigned the PreciseQ brand,
                later developed the new identity for PreciseMDX, and expanded our work to include
                website design and marketing materials.
              </p>
              <a href="#contact" className="sw-collab-link">
                <span>View case study</span>
                <span className="sw-collab-arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </div>

            <FadeImageRotator
              images={PRECISE_MDX_IMAGES}
              alt="Precise MDX showcase"
              priority
            />
          </article>

          {/* CARD 3: Softtek */}
          <article className="sw-collab-card" data-aos="fade-up" data-aos-delay="150">
            <div className="sw-collab-top">
              <span className="sw-collab-pill sw-pill-softtek">Softtek</span>
              <h3 className="sw-collab-title">Shaping the story behind the slides.</h3>
              <p className="sw-collab-desc">
                Softtek&apos;s marketing team engaged us to develop executive presentations for
                strategic projects and value propositions across its Insurance and Healthcare
                business verticals. We help structure complex content, shape clear narratives, and
                translate them into compelling presentations while working within Softtek&apos;s
                established brand guidelines.
              </p>
              <a href="#contact" className="sw-collab-link">
                <span>View case study</span>
                <span className="sw-collab-arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </div>

            <SofttekCarousel images={SOFTTEK_IMAGES} />
          </article>
        </div>

        {/* Bottom Explore Block */}
        <div className="sw-explore-more" data-aos="fade-up" data-aos-delay="150">
          <h3 className="sw-explore-title">There&apos;s more to explore</h3>
          <p className="sw-explore-subtitle">
            Discover more of our work across different clients, industries, and disciplines.
          </p>
          <a href="#contact" className="sw-more-btn">
            View more work
          </a>
        </div>
      </div>
    </section>
  );
}
