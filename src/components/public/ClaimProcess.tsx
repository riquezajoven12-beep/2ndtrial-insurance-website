export default function ClaimProcess() {
  const steps = [
    { num: 1, title: 'Submit Documents', desc: 'Gather required documents and submit via app, email, or in-person. We help identify exactly what\'s needed.' },
    { num: 2, title: 'Insurer Review', desc: 'Great Eastern processes your claim. We follow up on your behalf and keep you updated throughout.' },
    { num: 3, title: 'Claim Payment', desc: 'Approved claims are paid directly to you or the hospital. Timelines depend on documentation completeness.' },
  ];

  return (
    <section className="py-20 bg-cream">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center">
          <div className="section-label">Simple & Transparent</div>
          <h2 className="text-3xl md:text-4xl text-deep mb-4">3-Step Claim Process</h2>
          <p className="text-gray-500 max-w-[600px] mx-auto mb-12">We guide you through every step — from submission to payment.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-10 left-[15%] right-[15%] h-0.5 bg-gray-200" />
          {steps.map(s => (
            <div key={s.num} className="text-center relative z-10">
              <div className="w-20 h-20 rounded-full bg-teal text-white flex items-center justify-center font-serif text-3xl mx-auto mb-5 border-4 border-cream shadow-lg shadow-teal/20">
                {s.num}
              </div>
              <h4 className="text-lg text-deep mb-2">{s.title}</h4>
              <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
