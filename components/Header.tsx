import React from 'react';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="lule-header">
      <a href="#" className="lule-logo" aria-label="LULE Home">
        <Image src="/logo.svg" alt="LULE Logo" width={80} height={80} />
      </a>
      <nav className="lule-nav">
        <a href="#work">Work</a>
        <a href="#capabilities">Capabilities</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}
