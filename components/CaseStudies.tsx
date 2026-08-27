import React from 'react';
import { ArrowRight } from 'lucide-react';

export function CaseStudiesHeader() {
  return (
    <div className="case-studies-header">
      <span className="section-tag">Case Studies</span>
      <h2 className="section-title">A closer look at how the work comes together.</h2>
    </div>
  );
}

export function CaseStudiesContent() {
  return (
    <>
    <div className="case-studies-gray-box">
      <div className="lule-container">
        <div className="case-study-card">
          <span className="case-study-tag">PHYSICIANS CHOICE / BRAND IDENTITY</span>
          <h3 className="case-study-title">Building a brand that could grow beyond the logo</h3>
          <p className="case-study-text">
            From a simplified name and refreshed identity to a website, trade show presence and digital products, the brand was designed to work consistently across every touchpoint.
          </p>
          <a href="#view-case-study" className="case-study-link">
            View case study <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </div>
    <div className="case-studies-yellow-box">
      <div className="lule-container">
        <div className="case-study-card">
          <span className="case-study-tag">PreciseMDX / Website & Applications</span>
          <h3 className="case-study-title">Creating consistency across product, brand and communication</h3>
          <p className="case-study-text">
            From UX/UI improvements across multiple applications to a refreshed identity, website and supporting marketing materials, the work evolved into a cohesive visual system across the company.          </p>
          <a href="#view-case-study" className="case-study-link">
            View case study <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </div>
    <div className="case-studies-cyan-box">
      <div className="lule-container">
        <div className="case-study-card">
          <span className="case-study-tag">SOFTTEK / PRESENTATIONS</span>
          <h3 className="case-study-title">Turning complex information into clear, persuasive narratives</h3>
          <p className="case-study-text">
            From shaping the message and organizing the content to visual design and final presentation files, the work supported CEO-level proposals and offering presentations across Softtek’s Healthcare and Insurance verticals.
          </p>
          <a href="#view-case-study" className="case-study-link">
            View case study <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </div>
    </>
  );
}
