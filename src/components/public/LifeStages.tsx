export default function LifeStages() {
  const stages = [
    { emoji: '💼', title: 'Young Professional', desc: 'Protect your income and get a medical card before you need it.', tags: ['Income Protection', 'Medical Card', 'Critical Illness'] },
    { emoji: '👨‍👩‍👧', title: 'Young Family', desc: 'Secure medical coverage, life protection, and your children\'s education.', tags: ['Medical + Life', 'Education Fund', 'Family Coverage'] },
    { emoji: '🏢', title: 'Business Owner', desc: 'Protect key personnel and plan your business legacy.', tags: ['Keyman Insurance', 'Legacy Planning', 'Business Protection'] },
    { emoji: '🌅', title: 'Pre-Retirement', desc: 'Protect your wealth and secure guaranteed income.', tags: ['Wealth Protection', 'Annuity', 'Estate Planning'] },
  ];

  return (
    <section id="solutions" className="py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center">
          <div className="section-label">Solutions For You</div>
          <h2 className="text-3xl md:text-4xl text-deep mb-4">Insurance That Fits Your Life Stage</h2>
          <p className="text-gray-500 max-w-[600px] mx-auto mb-12">We don&apos;t sell products — we solve problems. Find the protection that matches where you are right now.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stages.map((s, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-8 transition-all hover:-translate-y-1 hover:shadow-xl hover:border-teal cursor-pointer relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-teal scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              <div className="text-4xl mb-4">{s.emoji}</div>
              <h3 className="text-lg text-deep mb-2">{s.title}</h3>
              <p className="text-sm text-gray-500 mb-4 leading-relaxed">{s.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {s.tags.map((t, j) => (
                  <span key={j} className="text-[0.68rem] px-2.5 py-1 bg-teal/8 text-teal rounded-full font-semibold">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
