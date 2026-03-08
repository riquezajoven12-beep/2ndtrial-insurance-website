import Link from 'next/link';
export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-warm">
      <div className="bg-deep text-white py-16"><div className="max-w-[800px] mx-auto px-6"><Link href="/" className="text-sm text-white/50 hover:text-white mb-4 block no-underline">← Back to Home</Link><h1 className="font-serif text-3xl">Product Disclosure & Disclaimer</h1><p className="text-white/60 text-sm mt-2">Last updated: March 2026</p></div></div>
      <div className="max-w-[800px] mx-auto px-6 py-12 prose prose-sm prose-gray">
        <h2 className="font-serif text-xl text-deep">Product Disclosure</h2>
        <p className="text-gray-600 leading-relaxed">All insurance products featured on this website are products of Great Eastern Life Assurance (Malaysia) Berhad. For detailed product disclosure sheets, benefit illustrations, and policy terms, please contact your advisor or visit <a href="https://www.greateasternlife.com/my/en.html" target="_blank" rel="noopener noreferrer" className="text-teal underline">Great Eastern Malaysia</a>.</p>
        <h2 className="font-serif text-xl text-deep mt-8">General Disclaimer</h2>
        <p className="text-gray-600 leading-relaxed">The information on this website does not constitute an offer, invitation, or solicitation to purchase any insurance product. All information is subject to change without notice. A Tharmanathan Insurance Agency makes no warranty regarding the accuracy or completeness of information provided. Past performance of investment-linked funds is not indicative of future performance.</p>
        <h2 className="font-serif text-xl text-deep mt-8">Complaint Handling</h2>
        <p className="text-gray-600 leading-relaxed">If you have a complaint, please contact us at info@tharmanathan.com. If unresolved, you may escalate to Great Eastern Malaysia or Bank Negara Malaysia&apos;s LINK & BNMTELELINK service.</p>
      </div>
    </div>
  );
}
