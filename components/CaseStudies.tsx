import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CaseStudyItem {
  tag: string;
  title: string;
  description: string;
  link: string;
  align: 'left' | 'right';
}

const caseStudiesData: CaseStudyItem[] = [
  {
    tag: 'PHYSICIANS CHOICE / BRAND IDENTITY',
    title: 'Building a brand that could grow beyond the logo',
    description: 'From a simplified name and refreshed identity to a website, trade show presence and digital products, the brand was designed to work consistently across every touchpoint.',
    link: '#view-case-study',
    align: 'left',
  },
  {
    tag: 'PRECISEMDX / WEBSITE & APPLICATIONS',
    title: 'Creating consistency across product, brand and communication',
    description: 'From UX/UI improvements across multiple applications to a refreshed identity, website and supporting marketing materials, the work evolved into a cohesive visual system across the company.',
    link: '#view-case-study',
    align: 'right',
  },
  {
    tag: 'SOFTTEK / PRESENTATIONS',
    title: 'Turning complex information into clear, persuasive narratives',
    description: 'From shaping the message and organizing the content to visual design and final presentation files, the work supported CEO-level proposals and offering presentations across Softtek\'s Healthcare and Insurance verticals.',
    link: '#view-case-study',
    align: 'left',
  },
];

export function CaseStudiesContent() {
  return (
    <section id="case-studies" className="case-studies-section">
      <div className="lule-container">
        {/* Header */}
        <div className="case-studies-header" data-aos="fade-up">
          <span className="section-tag">Case Studies</span>
          <h2 className="section-title">A closer look at how the work comes together</h2>
        </div>

        {/* Case Studies Cards Stack */}
        <div className="case-studies-grid">
          {caseStudiesData.map((item, index) => (
            <div
              key={item.tag}
              className={`case-study-card ${item.align === 'right' ? 'is-right' : ''}`}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="case-study-card-content">
                <span className="case-study-tag">{item.tag}</span>
                <h3 className="case-study-title">{item.title}</h3>
                <p className="case-study-text">{item.description}</p>
                <a href={item.link} className="case-study-link">
                  <span>View case study</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CaseStudiesContent;

