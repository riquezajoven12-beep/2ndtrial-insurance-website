import type { Testimonial } from '@/types/database';

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section id="testimonials" className="py-20 bg-cream">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center">
          <div className="section-label">Client Voices</div>
          <h2 className="text-3xl md:text-4xl text-deep mb-12">What Our Clients Say</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map(t => (
            <div key={t.id} className="bg-white border border-gray-200 rounded-xl p-8 relative">
              <div className="absolute top-4 left-6 text-6xl text-teal/10 font-serif leading-none">&ldquo;</div>
              <p className="text-sm text-gray-500 leading-relaxed mb-5 relative z-10">{t.quote}</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-teal text-white flex items-center justify-center font-bold text-sm">
                  {t.initials || t.client_name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-semibold text-sm text-deep">{t.client_name}</div>
                  <div className="text-xs text-gray-400">{t.occupation}{t.age_range ? `, ${t.age_range}` : ''}</div>
                  {t.plan_type && (
                    <span className="inline-block mt-1 text-[0.68rem] px-2.5 py-0.5 bg-teal/8 text-teal rounded-full font-semibold">
                      {t.plan_type}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
