import React from 'react';
import Image from 'next/image';

export default function Hero() {
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
          <span className="brand-red">LULE</span> connects the right message with a distinctive brand to create a coherent experience.
        </h1>
        <p className="hero-description">
          We create clear narratives and memorable brand identities across digital products, presentations and marketing materials, unified through cohesive design, from concept shaping through thoughtful implementation.
        </p>
        {/* <div data-aos="fade-up" data-aos-delay="200">
          <a href="#contact" className="hero-btn">
            Work with LULE
          </a>
        </div> */}
      </div>
    </section>
  );
}
