import React from 'react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="lule-main-footer" id="contact">
      <div className="lule-container footer-container" data-aos="fade-up">
        {/* Logo Badge */}
        <a href="#" className="footer-logo-link" aria-label="LULE Home">
          <Image src="/logo.svg" alt="LULE Logo" width={88} height={88} />
        </a>

        {/* Navigation Links */}
        <nav className="footer-nav">
          <a href="#work">Work</a>
          <a href="#capabilities">Capabilities</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>

        {/* Info & Legal */}
        <div className="footer-info">
          <p className="footer-worldwide">Working with clients worldwide.</p>
          <p className="footer-company">LULE is a brand of LUGAR 921 LLC</p>
          <p className="footer-copyright">© {new Date().getFullYear()} LULE</p>
        </div>
      </div>
    </footer>
  );
}
