'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200 transition-shadow ${scrolled ? 'shadow-md' : ''}`}>
      <div className="max-w-[1200px] mx-auto px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 no-underline">
          <div className="w-10 h-10 bg-teal rounded-lg flex items-center justify-center text-white font-bold text-sm">AT</div>
          <div>
            <div className="font-serif text-lg text-deep">A Tharmanathan</div>
            <div className="text-[0.7rem] text-gray-400 tracking-wider">Insurance Agency</div>
          </div>
        </Link>

        <nav className={`${menuOpen ? 'flex flex-col absolute top-full left-0 right-0 bg-white p-6 gap-4 border-b shadow-lg' : 'hidden'} md:flex md:static md:flex-row md:p-0 md:gap-6 md:border-0 md:shadow-none items-center`}>
          <a href="#about" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-gray-500 hover:text-teal no-underline transition-colors">About</a>
          <a href="#solutions" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-gray-500 hover:text-teal no-underline transition-colors">Solutions</a>
          <a href="#products" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-gray-500 hover:text-teal no-underline transition-colors">Products</a>
          <a href="#faq" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-gray-500 hover:text-teal no-underline transition-colors">FAQ</a>
          <a href="#contact" onClick={() => setMenuOpen(false)} className="bg-teal text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-teal-light transition-all no-underline">Free Assessment →</a>
        </nav>

        <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <div className="w-6 h-0.5 bg-deep mb-1.5" />
          <div className="w-6 h-0.5 bg-deep mb-1.5" />
          <div className="w-6 h-0.5 bg-deep" />
        </button>
      </div>
    </header>
  );
}
