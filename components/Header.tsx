'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`lule-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="lule-container lule-header-inner">
        <a href="#" className="lule-logo" aria-label="LULE Home">
          <Image src="/logo.svg" alt="LULE Logo" width={80} height={80} priority />
        </a>
        <nav className="lule-nav">
          <a href="#work">Work</a>
          <a href="#capabilities">Capabilities</a>
          <a href="#about">About</a>
          <a className="cta-button" href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}

