import React from 'react';
import Image from 'next/image';

export default function ConversationCTA() {
  return (
    <section className="cta-wrapper-section">
      <div className="lule-container">
        <div className="cta-card">
          {/* Ambient Blurred Accents */}
          <div className="cta-glow">
            <Image src="/circles-cta.svg" alt="CTA Glow" className='cta-glow-circles' width={50} height={50} />
          </div>

          <div className="cta-card-content">
            <h3 className="cta-card-heading">
              Good work starts with the right conversation.
            </h3>
            <a href="#contact" className="cta-card-btn">
              Talk to LULE
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
