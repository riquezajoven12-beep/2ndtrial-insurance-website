'use client';

import { useState, useEffect } from 'react';

export default function FloatingCTA() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP || '60123456789';

  return (
    <>
      {/* Floating buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2.5">
        <a
          href={`https://wa.me/${whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-[52px] h-[52px] rounded-full bg-[#25D366] text-white flex items-center justify-center text-2xl shadow-lg hover:scale-110 transition-transform"
          title="WhatsApp"
        >💬</a>
        <a
          href={`tel:+${whatsapp}`}
          className="w-[52px] h-[52px] rounded-full bg-teal text-white flex items-center justify-center text-2xl shadow-lg hover:scale-110 transition-transform"
          title="Call Advisor"
        >📞</a>
        <a
          href="#contact"
          className="w-[52px] h-[52px] rounded-full bg-gold text-deep flex items-center justify-center text-xl shadow-lg hover:scale-110 transition-transform"
          title="Free Consultation"
        >📋</a>
      </div>

      {/* Scroll to top */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 left-6 z-40 w-11 h-11 rounded-full bg-deep text-white flex items-center justify-center text-lg shadow-lg hover:bg-teal transition-colors"
        >↑</button>
      )}
    </>
  );
}
