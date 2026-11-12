'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// ============================================================================
// CONFIGURACIÓN DEL EFECTO MÁQUINA DE ESCRIBIR (en milisegundos)
// ============================================================================
export const HERO_ROTATING_WORDS = [
  'brand identities',
  'websites',
  'user interfaces',
  'online stores',
  'presentations',
  'marketing materials',
];

export const HOLD_DURATION_MS = 2000; // Tiempo mostrando cada frase con el "_" parpadeando (2s)
export const TYPE_SPEED_MS = 65;      // Velocidad al escribir cada letra (ms)
export const DELETE_SPEED_MS = 35;    // Velocidad al borrar cada letra (ms)

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState(HERO_ROTATING_WORDS[0]);
  const [phase, setPhase] = useState<'holding' | 'deleting' | 'typing'>('holding');

  useEffect(() => {
    const currentFullWord = HERO_ROTATING_WORDS[wordIndex];

    if (phase === 'holding') {
      const holdTimer = setTimeout(() => {
        setPhase('deleting');
      }, HOLD_DURATION_MS);
      return () => clearTimeout(holdTimer);
    }

    if (phase === 'deleting') {
      if (displayedText.length > 0) {
        const deleteTimer = setTimeout(() => {
          setDisplayedText((prev) => prev.slice(0, -1));
        }, DELETE_SPEED_MS);
        return () => clearTimeout(deleteTimer);
      } else {
        setWordIndex((prev) => (prev + 1) % HERO_ROTATING_WORDS.length);
        setPhase('typing');
      }
    }

    if (phase === 'typing') {
      if (displayedText.length < currentFullWord.length) {
        const typeTimer = setTimeout(() => {
          setDisplayedText(currentFullWord.slice(0, displayedText.length + 1));
        }, TYPE_SPEED_MS);
        return () => clearTimeout(typeTimer);
      } else {
        setPhase('holding');
      }
    }
  }, [displayedText, phase, wordIndex]);

  return (
    <section className="hero-section">
      {/* Background blurred circles from Image 2 */}
      <div className="circles-animation">
        <Image
          src="/circles-new.svg"
          width={1360}
          height={970}
          alt="Background blurred color accents"
          className="hero-bg-circles"
        />
        <Image
          src="/circles-new.svg"
          width={1360}
          height={970}
          alt="Background blurred color accents"
          className="hero-bg-circles circles-2"
        />
      </div>

      <div className="hero-content" data-aos="fade-left">
        <h1 className="hero-headline">
          <span className="brand-red">LULE</span> creates{' '}
          <span className="hero-typewriter-word">
            {displayedText}
            <span
              className={`hero-typewriter-cursor ${phase === 'holding' ? 'is-blinking' : ''}`}
              aria-hidden="true"
            >
              _
            </span>
          </span>
          <br />
          with narrative and brand character at the core,
          expressed through cohesive design
        </h1>
        {/* <div data-aos="fade-up" data-aos-delay="200">
          <a href="#contact" className="hero-btn">
            Work with LULE
          </a>
        </div> */}
      </div>
    </section>
  );
}
