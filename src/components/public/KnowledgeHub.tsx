'use client';

import { useState } from 'react';

export default function KnowledgeHub() {
  const [email, setEmail] = useState('');

  const articles = [
    { thumb: '🏥', bg: 'from-green-100 to-green-200', tag: 'Medical Insurance', title: 'Best Medical Cards in Malaysia 2026: What to Look For', desc: 'Compare annual limits, panel hospitals, and key features.' },
    { thumb: '📊', bg: 'from-blue-100 to-blue-200', tag: 'Planning Guide', title: 'How Much Life Insurance Do Malaysians Actually Need?', desc: 'A practical formula to calculate your ideal coverage.' },
    { thumb: '⚠️', bg: 'from-orange-100 to-orange-200', tag: 'Common Mistakes', title: 'Top 5 Insurance Mistakes Malaysians Make', desc: 'From under-insurance to ignoring riders — learn what most get wrong.' },
  ];

  function handleDownload() {
    if (!email || !email.includes('@')) { alert('Please enter a valid email address.'); return; }
    alert('Thank you! Your free Insurance Planning Guide will be sent to ' + email + ' shortly.');
    setEmail('');
  }

  return (
    <section id="resources" className="py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center">
          <div className="section-label">Knowledge Hub</div>
          <h2 className="text-3xl md:text-4xl text-deep mb-4">Insurance Insights for Malaysians</h2>
          <p className="text-gray-500 max-w-[600px] mx-auto mb-12">Practical guides to help you make informed insurance decisions.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((a, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className={`h-40 flex items-center justify-center text-5xl bg-gradient-to-br ${a.bg}`}>{a.thumb}</div>
              <div className="p-6">
                <div className="text-[0.68rem] font-bold text-teal uppercase tracking-wider mb-2">{a.tag}</div>
                <h4 className="text-deep text-[1.05rem] mb-2 leading-snug">{a.title}</h4>
                <p className="text-sm text-gray-400">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lead magnet */}
        <div className="bg-teal rounded-xl p-12 mt-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="font-serif text-2xl text-white mb-2">📘 Free Insurance Planning Guide</h3>
            <p className="text-white/80 text-sm">Download our comprehensive guide for Malaysian families.</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 md:min-w-[280px] px-5 py-3.5 border border-white/30 bg-white/10 rounded-lg text-white text-sm placeholder-white/40 outline-none focus:border-white/60"
            />
            <button onClick={handleDownload} className="btn-primary whitespace-nowrap">Download Free →</button>
          </div>
        </div>
      </div>
    </section>
  );
}
