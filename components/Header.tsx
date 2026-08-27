'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={`lule-header ${isScrolled ? 'is-scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="lule-container lule-header-inner">
        <a href="#" className="lule-logo" aria-label="LULE Home" onClick={closeMenu}>
          <Image src="/logo.svg" alt="LULE Logo" width={80} height={80} priority />
        </a>

        <button
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>

        <nav className={`lule-nav ${isMenuOpen ? 'is-open' : ''}`}>
          <a href="#" className="lule-logo" aria-label="LULE Home" onClick={closeMenu}>
            <Image src="/logo.svg" alt="LULE Logo" width={80} height={80} priority />
          </a>
          <a href="#work" onClick={closeMenu}>Work</a>
          <a href="#capabilities" onClick={closeMenu}>Capabilities</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a className="cta-button" href="#contact" onClick={closeMenu}>Contact</a>
        </nav>
      </div>
    </header>
  );
}


