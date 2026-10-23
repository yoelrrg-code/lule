import Image from 'next/image';
import React from 'react';

export default function Capabilities() {
  return (
    <section className="capabilities-section" id="capabilities">
      <div className="lule-container" data-aos="fade-up">
        <span className="section-tag">Capabilities</span>
        <h2 className="section-title">
          Connecting message, brand and experience
        </h2>
        <p className="capabilities-description">
          We shape clear narratives and visual direction across everything we create, from brand identities and digital products to presentations and marketing materials, bringing the same thinking from concept through implementation.
        </p>

        <div className="capabilities-grid">
          {/* Item 1 */}
          <div className="capability-card" data-aos="fade-up" data-aos-delay="100">
            <div className="capability-icon">
              <Image
                src="/cap1.svg"
                width={83}
                height={72}
                alt="capability 1"
              />
            </div>
            <h3 className="capability-card-title">Narrative &amp; Identity</h3>
            <p className="capability-card-text">
              We define clear messages, narratives and visual identities that give brands, products and ideas clear direction.
            </p>
          </div>

          {/* Item 2 */}
          <div className="capability-card" data-aos="fade-up" data-aos-delay="200">
            <div className="capability-icon">
              <Image
                src="/cap2.svg"
                width={76}
                height={72}
                alt="capability 2"
              />
            </div>
            <h3 className="capability-card-title">Digital Products</h3>
            <p className="capability-card-text">
              We create websites, online stores and applications where brand, functionality and user experience come together.
            </p>
          </div>

          {/* Item 3 */}
          <div className="capability-card" data-aos="fade-up" data-aos-delay="300">
            <div className="capability-icon">
              <Image
                src="/cap3.svg"
                width={73}
                height={72}
                alt="capability 3"
              />
            </div>
            <h3 className="capability-card-title">Brand Communications</h3>
            <p className="capability-card-text">
              We extend ideas and identities through presentations and branded assets across digital and physical channels.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
