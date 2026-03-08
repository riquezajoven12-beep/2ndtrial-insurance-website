'use client';

import { useState } from 'react';
import type { Product } from '@/types/database';

export default function Products({ products }: { products: Product[] }) {
  const [selected, setSelected] = useState<Product[]>([]);
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  function toggleProduct(p: Product) {
    setSelected(prev =>
      prev.find(x => x.id === p.id)
        ? prev.filter(x => x.id !== p.id)
        : [...prev, p]
    );
  }

  async function submitEnquiry(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = new FormData(e.currentTarget);

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: form.get('name'),
          phone: form.get('phone'),
          email: form.get('email') || '',
          product_interests: selected.map(p => ({ id: p.id, name: p.name })),
          message: form.get('message') || '',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(data.reference);
        setSelected([]);
      } else {
        alert(data.error || 'Submission failed. Please try again.');
      }
    } catch {
      alert('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="products" className="py-20 bg-cream">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center">
          <div className="section-label">Great Eastern Products</div>
          <h2 className="text-3xl md:text-4xl text-deep mb-4">Explore Protection Options</h2>
          <p className="text-gray-500 max-w-[600px] mx-auto mb-12">
            Select the plans you&apos;re interested in and request a personalised quote from a licensed advisor.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(p => {
            const isSelected = selected.find(x => x.id === p.id);
            return (
              <div key={p.id} className={`bg-white border rounded-xl p-8 transition-all flex flex-col ${isSelected ? 'border-teal shadow-lg ring-2 ring-teal/20' : 'border-gray-200 hover:-translate-y-1 hover:shadow-xl'}`}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 bg-gray-50">{p.icon}</div>
                <h3 className="text-xl text-deep mb-1">{p.name}</h3>
                <div className="text-sm text-teal font-bold mb-3">From RM {p.starting_price}/month</div>
                <p className="text-sm text-gray-500 mb-5 leading-relaxed">{p.description}</p>
                <ul className="mb-6 flex-1 space-y-2">
                  {(p.features as string[]).map((f, i) => (
                    <li key={i} className="text-sm text-gray-500 flex items-center gap-2">
                      <span className="text-teal font-bold text-xs">✓</span>{f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => toggleProduct(p)}
                  className={`w-full py-3 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                    isSelected
                      ? 'bg-teal text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-teal hover:text-white'
                  }`}
                >
                  {isSelected ? '✓ Selected' : 'Compare This Plan'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Sticky quote bar */}
        {selected.length > 0 && !showEnquiry && !success && (
          <div className="fixed bottom-0 left-0 right-0 bg-deep text-white py-4 px-6 z-40 shadow-2xl border-t border-white/10">
            <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-4 flex-wrap">
              <div>
                <span className="text-sm text-white/60">Selected: </span>
                <span className="font-semibold">{selected.map(p => p.name).join(', ')}</span>
              </div>
              <button onClick={() => setShowEnquiry(true)} className="btn-primary">
                Request Personalised Quote →
              </button>
            </div>
          </div>
        )}

        {/* Enquiry modal */}
        {showEnquiry && !success && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-6">
            <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="p-8 border-b">
                <h3 className="text-xl text-deep mb-1">Request Your Personalised Quote</h3>
                <p className="text-sm text-gray-400">A licensed advisor will reach out to you, usually within business hours</p>
              </div>
              <form onSubmit={submitEnquiry} className="p-8 space-y-4">
                <div className="bg-cream rounded-lg p-4 mb-2">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Selected Plans</div>
                  {selected.map(p => (
                    <div key={p.id} className="flex justify-between text-sm py-1">
                      <span>{p.icon} {p.name}</span>
                      <span className="text-teal font-semibold">From RM {p.starting_price}/mo</span>
                    </div>
                  ))}
                </div>
                <input name="name" required placeholder="Full name *" className="input-field" />
                <input name="phone" required placeholder="Phone / WhatsApp *" className="input-field" />
                <input name="email" type="email" placeholder="Email (optional)" className="input-field" />
                <textarea name="message" placeholder="Any specific questions or needs..." className="input-field min-h-[80px] resize-y" />
                <p className="text-xs text-gray-400 leading-relaxed">
                  By submitting, you agree to be contacted by A Tharmanathan Insurance Agency.
                  Your data is handled per our <a href="/privacy" className="underline">Privacy Policy</a> and Great Eastern&apos;s data protection standards.
                </p>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowEnquiry(false)} className="flex-1 py-3 border border-gray-200 rounded-lg text-sm text-gray-500 hover:bg-gray-50">Cancel</button>
                  <button type="submit" disabled={submitting} className="flex-[2] btn-primary justify-center">
                    {submitting ? 'Submitting...' : 'Submit Enquiry →'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-6">
            <div className="bg-white rounded-xl p-12 text-center max-w-md shadow-2xl">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-xl text-deep mb-2">Enquiry Submitted!</h3>
              <p className="text-sm text-gray-400 mb-2">Reference: <strong className="text-teal">{success}</strong></p>
              <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                A licensed advisor will review your selected plans and reach out with a personalised recommendation.
              </p>
              <button onClick={() => { setSuccess(null); setShowEnquiry(false); }} className="btn-teal">
                Back to Home
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
