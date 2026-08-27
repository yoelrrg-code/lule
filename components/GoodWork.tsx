import React from 'react';
import Image from 'next/image';

export default function GoodWork() {
  return (
    <section className="good-work-section">
      <div className="good-work-circles-animation">
        <Image
          src="/circles-2.svg"
          width={1360}
          height={970}
          alt="Background blurred color accents"
          className="hero-bg-circles"
        />
        <Image
          src="/circles-2.svg"
          width={1360}
          height={970}
          alt="Background blurred color accents"
          className="hero-bg-circles circles-2"
        />
      </div>

      <div className="good-work-content" data-aos="fade-up">
        <p className="good-work-text">
          <span className="good-work-red">Good work is more than how it looks.</span>
          The message, the visual language and implementation should all work together as a unified whole.        
        </p>
      </div>
    </section>
  );
}
