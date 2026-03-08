import Link from 'next/link';
export default function TermsPage() {
  return (
    <div className="min-h-screen bg-warm">
      <div className="bg-deep text-white py-16"><div className="max-w-[800px] mx-auto px-6"><Link href="/" className="text-sm text-white/50 hover:text-white mb-4 block no-underline">← Back to Home</Link><h1 className="font-serif text-3xl">Terms of Use</h1><p className="text-white/60 text-sm mt-2">Last updated: March 2026</p></div></div>
      <div className="max-w-[800px] mx-auto px-6 py-12 prose prose-sm prose-gray">
        <h2 className="font-serif text-xl text-deep">1. About This Website</h2>
        <p className="text-gray-600 leading-relaxed">This website is operated by A Tharmanathan Insurance Agency, an authorised representative of Great Eastern Life Assurance (Malaysia) Berhad (93745-A). The information provided is for general informational purposes and does not constitute financial advice.</p>
        <h2 className="font-serif text-xl text-deep mt-8">2. Insurance Products</h2>
        <p className="text-gray-600 leading-relaxed">All insurance products displayed are underwritten by Great Eastern Life. Product benefits, terms, premiums, and exclusions are subject to the actual policy contract. The website provides general descriptions only. Please refer to the product disclosure sheet and policy documents for full details.</p>
        <h2 className="font-serif text-xl text-deep mt-8">3. Illustrative Scenarios</h2>
        <p className="text-gray-600 leading-relaxed">Case studies and scenarios shown on this website are illustrative examples only. Individual outcomes may vary based on policy terms, coverage selected, and insurer assessment. Claim timelines depend on documentation completeness and underwriting review.</p>
        <h2 className="font-serif text-xl text-deep mt-8">4. Calculator Disclaimer</h2>
        <p className="text-gray-600 leading-relaxed">The insurance coverage calculator provides estimates only and should not be relied upon as financial advice. Actual coverage needs may differ based on individual circumstances. Consult a licensed advisor for personalised recommendations.</p>
        <h2 className="font-serif text-xl text-deep mt-8">5. No Online Purchase</h2>
        <p className="text-gray-600 leading-relaxed">This website does not process insurance purchases directly. Enquiry submissions are requests for advisor follow-up only. Coverage begins only after insurer approval, policy issuance, and first premium payment through the official insurer process.</p>
        <h2 className="font-serif text-xl text-deep mt-8">6. Regulatory Compliance</h2>
        <p className="text-gray-600 leading-relaxed">A Tharmanathan Insurance Agency is regulated by Bank Negara Malaysia. For complaints or disputes, you may contact Bank Negara Malaysia or the Financial Ombudsman.</p>
      </div>
    </div>
  );
}
