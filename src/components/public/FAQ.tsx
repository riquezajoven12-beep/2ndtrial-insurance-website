'use client';

import { useState } from 'react';

const faqs = [
  { q: 'How much life insurance coverage do I need?', a: 'A common guideline is 10x your annual income, adjusted for dependents, debts, and existing savings. Our free coverage assessment provides a personalised recommendation. Use the calculator above for a quick estimate.' },
  { q: "What's the difference between medical insurance and company coverage?", a: "Company medical coverage typically ends when you leave employment. Personal medical insurance provides lifetime renewable coverage, higher annual limits, and freedom to choose any hospital." },
  { q: 'Are insurance premiums tax-deductible in Malaysia?', a: 'Yes, certain insurance premiums qualify for tax relief under LHDN guidelines, including categories for life insurance, EPF contributions, and medical/education insurance. The exact relief amounts and conditions are subject to current LHDN rules and your individual filing profile. We will help you understand which reliefs may apply to your situation.' },
  { q: 'How does the claims process work?', a: "For medical claims, most panel hospital admissions are cashless — present your medical card. For other claims, submit documents through the Great Eastern app or to us directly. Claim timelines depend on documentation completeness and underwriting review." },
  { q: 'Why choose a personal advisor over buying online?', a: 'A personal advisor provides needs analysis, policy comparison, claims assistance, and annual reviews as your life changes. This ongoing relationship ensures you are never under-insured or over-paying.' },
  { q: 'How do I get started?', a: 'Simply fill in the free assessment form below, or contact us via WhatsApp. We will review your situation and provide a no-obligation recommendation, usually within business hours.' },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center">
          <div className="section-label">Common Questions</div>
          <h2 className="text-3xl md:text-4xl text-deep mb-12">Frequently Asked Questions</h2>
        </div>
        <div className="max-w-[760px] mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-gray-200 rounded-xl overflow-hidden bg-white">
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full px-6 py-5 text-left flex justify-between items-center font-semibold text-deep hover:bg-gray-50 transition-colors"
              >
                <span className="text-[0.95rem] pr-4">{faq.q}</span>
                <span className={`text-gray-400 transition-transform text-xl ${openIdx === i ? 'rotate-180' : ''}`}>▼</span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openIdx === i ? 'max-h-60' : 'max-h-0'}`}>
                <div className="px-6 pb-5 text-sm text-gray-500 leading-relaxed">{faq.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
