import React from 'react';
import Image from 'next/image';

export default function About() {
  return (
    <section className="about-section" id="about">
      <div className="about-text-container">
        <div className="lule-container">
          <span className="section-tag" data-aos="fade-up">About</span>
          <h2 className="about-title" data-aos="fade-up" data-aos-delay="100">
            More than twenty years shaping ideas into meaningful work
          </h2>
          <div className="about-content" data-aos="fade-up" data-aos-delay="150">
            <p className="about-paragraph">
              <strong className="about-brand-red">LULE</strong> is a founder-led studio built on more than two decades of experience working with international clients across the U.S., Europe and Latin America. Long before remote collaboration became common, working closely with clients and distributed teams was already part of the way projects were developed, refined and delivered.
            </p>
            <p className="about-paragraph">
              That experience includes working closely with C-level leadership, marketing teams and developers. Paco Lule leads every project and works directly with clients from the first conversation through delivery, bringing together branding, storytelling and design to shape work that is clear, relevant and ready for real-world use.
            </p>
          </div>
        </div>
      </div>

      <div className="about-mountain-wrapper" data-aos="fade-up" data-aos-delay="200">
        <Image
          src="/bg-desk.jpg"
          alt="Mountain landscape background"
          width={1440}
          height={420}
          priority
          className="about-mountain-img desktop"
        />
        <Image
          src="/bg-mobile.jpg"
          alt="Mountain landscape background"
          width={1440}
          height={420}
          priority
          className="about-mountain-img mobile"
        />
        <div className="about-mountain-overlay" />
      </div>
    </section>
  );
}
