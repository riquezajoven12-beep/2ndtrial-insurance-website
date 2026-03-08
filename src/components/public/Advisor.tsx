export default function Advisor() {
  const credentials = [
    { icon: '📜', title: 'Licensed Representative', desc: 'Great Eastern Life Assurance (Malaysia) Berhad' },
    { icon: '🎓', title: 'Professional Certification', desc: 'Registered with Bank Negara Malaysia' },
    { icon: '📅', title: 'Years of Experience', desc: 'Serving individuals & families across Malaysia' },
    { icon: '🤝', title: 'Advisory Philosophy', desc: 'No-pressure · Policy comparison · Annual reviews' },
  ];

  return (
    <section id="advisor" className="py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-16 items-center">
          {/* Photo placeholder */}
          <div className="w-full aspect-[4/5] bg-gradient-to-br from-teal to-navy rounded-xl flex items-center justify-center text-white text-7xl">
            👤
          </div>

          <div>
            <div className="section-label">Meet Your Advisor</div>
            <h2 className="text-3xl md:text-4xl text-deep mb-4">A. Tharmanathan</h2>
            <p className="text-gray-500 mb-8 max-w-[520px] leading-relaxed">
              Dedicated to helping Malaysian families navigate insurance with clarity, transparency, and zero pressure. Every recommendation is tailored to your actual needs — not sales targets.
            </p>

            <div className="space-y-4">
              {credentials.map((c, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-cream rounded-lg border border-gray-200">
                  <span className="text-xl">{c.icon}</span>
                  <div>
                    <div className="text-sm font-semibold text-gray-800">{c.title}</div>
                    <div className="text-sm text-gray-500">{c.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-teal/5 border-l-[3px] border-teal rounded-r-lg text-xs text-gray-500 leading-relaxed">
              Licensed representative of Great Eastern Life Assurance (Malaysia) Berhad, regulated by Bank Negara Malaysia. All insurance products are underwritten by Great Eastern Life.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
