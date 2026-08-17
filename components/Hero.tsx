import React from 'react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="hero-section">
      {/* Background blurred circles from Image 2 */}
      <div className="circles-animation">
        <Image
          src="/circles.svg"
          width={1360}
          height={970}
          alt="Background blurred color accents"
          className="hero-bg-circles"
        />
        <Image
          src="/circles.svg"
          width={1360}
          height={970}
          alt="Background blurred color accents"
          className="hero-bg-circles circles-2"
        />
      </div>

      <div className="hero-content">
        <h1 className="hero-headline">
          <span className="brand-red">LULE</span> connects the right message with a distinctive brand to create a coherent experience.
        </h1>
        <p className="hero-description">
          We create clear narratives and memorable brand identities across websites, applications and presentations, unified through cohesive design from concept shaping through thoughtful implementation.
        </p>
        <a href="#contact" className="hero-btn">
          Tell us about your project
        </a>
      </div>
    </section>
  );
}
