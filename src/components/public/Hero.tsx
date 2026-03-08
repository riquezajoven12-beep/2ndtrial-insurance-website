export default function Hero() {
  return (
    <section className="pt-36 pb-20 bg-gradient-to-br from-deep via-navy to-[#143D4D] relative overflow-hidden">
      <div className="absolute inset-0 opacity-20" style={{backgroundImage:"url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"}} />
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="max-w-[720px]">
          <div className="inline-flex items-center gap-2 bg-teal/20 border border-teal/30 px-4 py-1.5 rounded-full text-teal-light text-xs font-semibold mb-6 tracking-wider uppercase">
            ✓ Licensed Great Eastern Advisor
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-[3.4rem] text-white mb-5 font-normal leading-tight">
            Protect Your Family With <em className="text-gold-light">The Right Insurance</em> — Not Just Any Policy
          </h1>
          <p className="text-lg text-white/75 mb-9 max-w-[560px] leading-relaxed">
            Trusted Great Eastern advisor helping Malaysian families secure medical, life, and retirement protection with clear guidance and zero sales pressure.
          </p>
          <div className="flex gap-3 flex-wrap mb-12">
            <a href="#contact" className="btn-primary">Get Free Coverage Assessment →</a>
            <a href="#calculator" className="btn-secondary">📊 Calculate Your Insurance Needs</a>
          </div>
          <div className="flex gap-8 flex-wrap p-5 bg-red-500/15 border border-red-500/20 rounded-xl">
            <div className="flex items-center gap-2.5 text-white/90 text-sm">📈 Medical inflation rising 12–15% annually</div>
            <div className="flex items-center gap-2.5 text-white/90 text-sm">🏥 1 hospital stay can cost RM50,000+</div>
            <div className="flex items-center gap-2.5 text-white/90 text-sm">🛡️ Protect your family before illness strikes</div>
          </div>
        </div>
      </div>
    </section>
  );
}
