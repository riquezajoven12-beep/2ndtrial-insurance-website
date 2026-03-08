'use client';

import { useState } from 'react';

export default function LeadFunnel() {
  const [step, setStep] = useState(1);
  const [interests, setInterests] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  function toggleInterest(v: string) {
    setInterests(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v]);
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = new FormData(e.currentTarget);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: form.get('name'),
          phone: form.get('phone'),
          email: form.get('email') || '',
          age: form.get('age') ? Number(form.get('age')) : undefined,
          family_size: form.get('family') || undefined,
          monthly_budget: form.get('budget') ? Number(form.get('budget')) : undefined,
          interests,
          preferred_contact_time: form.get('time') || undefined,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(data.reference);
      } else {
        alert(data.error || 'Submission failed.');
      }
    } catch {
      alert('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  const options = [
    { value: 'medical', icon: '🏥', label: 'Medical Insurance' },
    { value: 'life', icon: '❤️', label: 'Life Protection' },
    { value: 'education', icon: '🎓', label: 'Education Planning' },
    { value: 'retirement', icon: '🌴', label: 'Retirement Planning' },
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-deep to-navy text-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center">
          <div className="text-xs font-bold text-gold-light uppercase tracking-widest mb-3">Get Started</div>
          <h2 className="text-3xl md:text-4xl text-white mb-4">Get Your Free Coverage Assessment</h2>
          <p className="text-white/50 mb-8 text-sm">3 simple steps — takes less than 2 minutes</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-12 max-w-[680px] mx-auto">
          {/* Progress dots */}
          <div className="flex justify-center gap-2 mb-9">
            {[1, 2, 3].map(s => (
              <div key={s} className={`w-10 h-1 rounded-full transition-colors ${s <= step ? 'bg-gold' : 'bg-white/20'}`} />
            ))}
          </div>

          {success ? (
            <div className="text-center py-6">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-xl text-gold-light mb-2">Assessment Request Received!</h3>
              <p className="text-white/50 text-sm mb-2">Reference: <strong className="text-gold-light">{success}</strong></p>
              <p className="text-white/60 text-sm">We&apos;ll review your details and contact you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={submit}>
              {/* Step 1: Interests */}
              {step === 1 && (
                <div>
                  <h3 className="text-center text-xl text-white mb-2">What protection are you looking for?</h3>
                  <p className="text-center text-white/50 text-sm mb-7">Select all that apply</p>
                  <div className="grid grid-cols-2 gap-3">
                    {options.map(opt => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => toggleInterest(opt.value)}
                        className={`p-4 rounded-xl border text-center text-sm transition-all ${
                          interests.includes(opt.value)
                            ? 'border-gold bg-gold/10 text-white'
                            : 'border-white/12 bg-white/5 text-white/80 hover:border-gold/50'
                        }`}
                      >
                        <span className="text-2xl block mb-2">{opt.icon}</span>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-end mt-6">
                    <button type="button" onClick={() => { if (interests.length) setStep(2); else alert('Select at least one.'); }} className="btn-primary">Next Step →</button>
                  </div>
                </div>
              )}

              {/* Step 2: Details */}
              {step === 2 && (
                <div>
                  <h3 className="text-center text-xl text-white mb-2">Tell us about yourself</h3>
                  <p className="text-center text-white/50 text-sm mb-7">This helps us tailor recommendations</p>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-semibold text-white/60 mb-1.5 uppercase tracking-wider">Age</label>
                      <input name="age" type="number" placeholder="e.g. 32" className="w-full p-3 bg-white/10 border border-white/15 rounded-lg text-white placeholder-white/30 outline-none focus:border-gold" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/60 mb-1.5 uppercase tracking-wider">Family Size</label>
                      <select name="family" className="w-full p-3 bg-white/10 border border-white/15 rounded-lg text-white outline-none focus:border-gold">
                        <option value="single" className="bg-deep">Just me</option>
                        <option value="couple" className="bg-deep">Me + spouse</option>
                        <option value="small" className="bg-deep">Family (1-2 kids)</option>
                        <option value="large" className="bg-deep">Family (3+ kids)</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/60 mb-1.5 uppercase tracking-wider">Monthly Budget (RM)</label>
                    <input name="budget" type="number" placeholder="e.g. 300" className="w-full p-3 bg-white/10 border border-white/15 rounded-lg text-white placeholder-white/30 outline-none focus:border-gold" />
                  </div>
                  <div className="flex justify-between mt-6">
                    <button type="button" onClick={() => setStep(1)} className="px-7 py-3 border border-white/20 rounded-lg text-white/70 text-sm hover:border-white/40">← Back</button>
                    <button type="button" onClick={() => setStep(3)} className="btn-primary">Next Step →</button>
                  </div>
                </div>
              )}

              {/* Step 3: Contact */}
              {step === 3 && (
                <div>
                  <h3 className="text-center text-xl text-white mb-2">How should we reach you?</h3>
                  <p className="text-center text-white/50 text-sm mb-7">We&apos;ll contact you within 24 hours</p>
                  <div className="space-y-3">
                    <input name="name" required placeholder="Full name *" className="w-full p-3.5 bg-white/8 border border-white/15 rounded-lg text-white placeholder-white/30 outline-none focus:border-gold" />
                    <input name="phone" required placeholder="Phone / WhatsApp *" className="w-full p-3.5 bg-white/8 border border-white/15 rounded-lg text-white placeholder-white/30 outline-none focus:border-gold" />
                    <input name="email" type="email" placeholder="Email (optional)" className="w-full p-3.5 bg-white/8 border border-white/15 rounded-lg text-white placeholder-white/30 outline-none focus:border-gold" />
                    <select name="time" className="w-full p-3.5 bg-white/8 border border-white/15 rounded-lg text-white outline-none focus:border-gold">
                      <option value="" className="bg-deep">Preferred contact time</option>
                      <option value="morning" className="bg-deep">Morning (9am - 12pm)</option>
                      <option value="afternoon" className="bg-deep">Afternoon (12pm - 5pm)</option>
                      <option value="evening" className="bg-deep">Evening (5pm - 8pm)</option>
                      <option value="weekend" className="bg-deep">Weekend</option>
                    </select>
                  </div>
                  <div className="flex justify-between mt-6">
                    <button type="button" onClick={() => setStep(2)} className="px-7 py-3 border border-white/20 rounded-lg text-white/70 text-sm hover:border-white/40">← Back</button>
                    <button type="submit" disabled={submitting} className="btn-primary">
                      {submitting ? 'Submitting...' : 'Get Free Assessment →'}
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
