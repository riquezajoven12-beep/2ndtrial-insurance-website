export default function About() {
  const stats = [
    { num: 'Est. 1908', label: 'Great Eastern Group Founded' },
    { num: 'Millions', label: 'Policyholders Across the Region' },
    { num: 'A-Rated', label: 'Financial Strength' },
    { num: '24/7', label: 'Claims Support & Service' },
  ];

  return (
    <section id="about" className="py-20 bg-cream">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center">
          <div className="section-label">About Us</div>
          <h2 className="text-3xl md:text-4xl text-deep mb-12">Our Vision & Mission</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white border border-gray-200 rounded-xl p-9">
            <h3 className="text-xl text-deep mb-3">🔭 Our Vision</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              To be the most trusted insurance advisory in Malaysia — known for putting client needs first, providing transparent guidance, and building lasting financial security for every family we serve.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-9">
            <h3 className="text-xl text-deep mb-3">🎯 Our Mission</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              To educate, empower, and protect Malaysian families through personalised insurance planning. We combine Great Eastern&apos;s 116-year legacy with a modern, no-pressure advisory approach to deliver real peace of mind.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="text-center p-6 bg-white border border-gray-200 rounded-xl">
              <div className="font-serif text-3xl text-teal">{s.num}</div>
              <div className="text-xs text-gray-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
