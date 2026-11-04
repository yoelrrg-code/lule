'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// ============================================================================
// CONFIGURACIÓN DE TIEMPOS DE TRANSICIÓN (en milisegundos)
// Cambia estos valores para ajustar cada cuánto tiempo rotan las imágenes
// de cada subsección y cuánto dura el efecto de transición.
// ============================================================================
export const SUBSECTION_TIMINGS = {
  websites: 4000,           // Tiempo entre imágenes en "Websites" (ms)
  brandIdentity: 3500,      // Tiempo entre imágenes en "Brand Identity" (ms)
  applications: 4500,       // Tiempo entre imágenes en "Applications" (ms)
  onlineStores: 4200,       // Tiempo entre imágenes en "Online Stores" (ms)
  presentations: 4800,      // Tiempo entre imágenes en "Presentations" (ms)
  marketingMaterials: 3800, // Tiempo entre imágenes en "Marketing Materials" (ms)
};

// Duración del efecto visual de transición entre imágenes (en milisegundos)
export const TRANSITION_DURATION_MS = 900;

// ============================================================================
// CONFIGURACIÓN DE SUBSECCIONES E IMÁGENES
// Cada "slot" admite múltiples imágenes que rotarán automáticamente según el
// tiempo configurado arriba para su subsección.
// ============================================================================
export interface WorkSlotConfig {
  images: string[];
  alt: string;
}

export interface WorkSubsectionConfig {
  id: string;
  title: string;
  description: string;
  layout: 'single' | 'grid-2x2' | 'grid-2-col-portrait';
  intervalMs: number;
  slots: WorkSlotConfig[];
}

export const SELECTED_WORK_SECTIONS: WorkSubsectionConfig[] = [
  {
    id: 'websites',
    title: 'WEBSITES',
    description:
      'Clear, responsive websites where messaging, usability and structure come together through good design.',
    layout: 'single',
    intervalMs: SUBSECTION_TIMINGS.websites,
    slots: [
      {
        images: ['/works/websites-1.jpg', '/works/stores-1.jpg'],
        alt: 'Websites showcase',
      },
    ],
  },
  {
    id: 'brand-identity',
    title: 'BRAND IDENTITY',
    description:
      'Visual identities designed to communicate clearly and work consistently across digital and physical touchpoints.',
    layout: 'grid-2x2',
    intervalMs: SUBSECTION_TIMINGS.brandIdentity,
    slots: [
      {
        images: ['/works/brand-1.jpg', '/works/brand-2.jpg', '/works/brand-3.jpg', '/works/brand-4.jpg'],
        alt: 'Brand Identity showcase 1',
      },
      {
        images: ['/works/brand-2.jpg', '/works/brand-1.jpg', '/works/brand-4.jpg', '/works/brand-3.jpg'],
        alt: 'Brand Identity showcase 2',
      },
      {
        images: ['/works/brand-3.jpg', '/works/brand-4.jpg', '/works/brand-1.jpg', '/works/brand-2.jpg'],
        alt: 'Brand Identity showcase 3',
      },
      {
        images: ['/works/brand-4.jpg', '/works/brand-3.jpg', '/works/brand-2.jpg', '/works/brand-1.jpg'],
        alt: 'Brand Identity showcase 4',
      },
    ],
  },
  {
    id: 'applications',
    title: 'APPLICATIONS',
    description:
      'User interfaces where product, brand, usability and design come together to create clear digital experiences.',
    layout: 'single',
    intervalMs: SUBSECTION_TIMINGS.applications,
    slots: [
      {
        images: ['/works/app-1.jpg', '/works/stores-1.jpg'],
        alt: 'Applications showcase',
      },
    ],
  },
  {
    id: 'online-stores',
    title: 'ONLINE STORES',
    description:
      'Branded shopping experiences designed to connect products, brand and customer experience.',
    layout: 'single',
    intervalMs: SUBSECTION_TIMINGS.onlineStores,
    slots: [
      {
        images: ['/works/stores-1.jpg', '/works/app-1.jpg'],
        alt: 'Online Stores showcase',
      },
    ],
  },
  {
    id: 'presentations',
    title: 'PRESENTATIONS',
    description:
      'Clear narratives and strong visual systems for executive, sales and business presentations.',
    layout: 'single',
    intervalMs: SUBSECTION_TIMINGS.presentations,
    slots: [
      {
        images: [
          '/works/presentation-1.jpg',
          '/works/presentation-2.jpg',
          '/works/presentation-3.jpg',
          '/works/presentation-4.jpg',
          '/works/presentation-5.jpg',
          '/works/presentation-6.jpg',
        ],
        alt: 'Presentations showcase',
      },
    ],
  },
  {
    id: 'marketing-materials',
    title: 'MARKETING MATERIALS',
    description:
      'Branded assets that extend the identity across digital and physical communication, from social content to print pieces.',
    layout: 'grid-2-col-portrait',
    intervalMs: SUBSECTION_TIMINGS.marketingMaterials,
    slots: [
      {
        images: ['/works/marketing-1.jpg', '/works/marketing-2.jpg'],
        alt: 'Marketing Materials showcase 1',
      },
      {
        images: ['/works/marketing-2.jpg', '/works/marketing-1.jpg'],
        alt: 'Marketing Materials showcase 2',
      },
    ],
  },
];

interface WorkImageSlotProps {
  images: string[];
  alt: string;
  intervalMs: number;
  priority?: boolean;
}

function WorkImageSlot({ images, alt, intervalMs, priority = false }: WorkImageSlotProps) {
  const [{ activeIndex, leavingIndex }, setSlideState] = useState<{
    activeIndex: number;
    leavingIndex: number | null;
  }>({
    activeIndex: 0,
    leavingIndex: null,
  });

  useEffect(() => {
    if (!images || images.length <= 1 || intervalMs <= 0) return;

    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const timer = setInterval(() => {
      setSlideState((prev) => ({
        activeIndex: (prev.activeIndex + 1) % images.length,
        leavingIndex: prev.activeIndex,
      }));

      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setSlideState((prev) => ({
          ...prev,
          leavingIndex: null,
        }));
      }, TRANSITION_DURATION_MS);
    }, intervalMs);

    return () => {
      clearInterval(timer);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [images, intervalMs]);

  return (
    <div className="sw-image-slot image-radius">
      {images.map((src, idx) => {
        const isActive = idx === activeIndex;
        const isLeaving = idx === leavingIndex && !isActive;
        return (
          <Image
            key={`${src}-${idx}`}
            src={src}
            alt={`${alt} - ${idx + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 1180px"
            priority={priority && idx === 0}
            className={`sw-slot-img ${isActive ? 'is-active' : ''} ${isLeaving ? 'is-leaving' : ''}`}
            style={{
              transitionDuration: `${TRANSITION_DURATION_MS}ms`,
              animationDuration: `${intervalMs + TRANSITION_DURATION_MS}ms`,
            }}
          />
        );
      })}
    </div>
  );
}

export default function SelectedWork() {
  return (
    <section id="work" className="selected-work-section">
      <div className="lule-container">
        {/* Section Header */}
        <div className="selected-work-header">
          <div className="selected-work-title-group">
            <span className="selected-work-tag" data-aos="fade-up" data-aos-delay="100">
              Selected Work
            </span>
            <h2 className="selected-work-heading" data-aos="fade-up" data-aos-delay="200">
              Different needs. One clear, connected approach
            </h2>
          </div>
        </div>

        {/* Vertical Subsections Grid */}
        <div className="selected-work-list">
          {SELECTED_WORK_SECTIONS.map((subsection, sectionIdx) => (
            <div
              key={subsection.id}
              className="sw-subsection"
              data-aos="fade-up"
              data-aos-delay="150"
            >
              <div className={`sw-media-grid sw-layout-${subsection.layout}`}>
                {subsection.slots.map((slot, slotIdx) => (
                  <WorkImageSlot
                    key={`${subsection.id}-slot-${slotIdx}`}
                    images={slot.images}
                    alt={slot.alt}
                    intervalMs={subsection.intervalMs}
                    priority={sectionIdx === 0 && slotIdx === 0}
                  />
                ))}
              </div>

              <div className="sw-caption">
                <span className="sw-item-tag">{subsection.title}</span>
                <p className="sw-item-desc">{subsection.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
