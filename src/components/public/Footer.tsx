import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-deep text-white/70 pt-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-teal rounded-lg flex items-center justify-center text-white font-bold text-sm">AT</div>
              <div>
                <div className="font-serif text-white text-lg">A Tharmanathan</div>
                <div className="text-[0.7rem] text-white/40">Insurance Agency</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mt-3">Your trusted Great Eastern Malaysia representative. Helping families secure their financial future with clarity and zero pressure.</p>
          </div>
          <div>
            <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-5 font-sans">Solutions</h4>
            <a href="#solutions" className="block text-sm py-1 hover:text-gold-light transition-colors">Young Professional</a>
            <a href="#solutions" className="block text-sm py-1 hover:text-gold-light transition-colors">Young Family</a>
            <a href="#solutions" className="block text-sm py-1 hover:text-gold-light transition-colors">Business Owner</a>
            <a href="#solutions" className="block text-sm py-1 hover:text-gold-light transition-colors">Pre-Retirement</a>
          </div>
          <div>
            <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-5 font-sans">Products</h4>
            <a href="#products" className="block text-sm py-1 hover:text-gold-light transition-colors">Life Insurance Malaysia</a>
            <a href="#products" className="block text-sm py-1 hover:text-gold-light transition-colors">Medical Card Malaysia</a>
            <a href="#products" className="block text-sm py-1 hover:text-gold-light transition-colors">Education Insurance</a>
            <a href="#products" className="block text-sm py-1 hover:text-gold-light transition-colors">Retirement Planning</a>
          </div>
          <div>
            <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-5 font-sans">Resources</h4>
            <a href="#calculator" className="block text-sm py-1 hover:text-gold-light transition-colors">Coverage Calculator</a>
            <a href="#faq" className="block text-sm py-1 hover:text-gold-light transition-colors">FAQ</a>
            <a href="#contact" className="block text-sm py-1 hover:text-gold-light transition-colors">Free Assessment</a>
            <Link href="/privacy" className="block text-sm py-1 hover:text-gold-light transition-colors">Privacy Policy</Link>
          </div>
        </div>

        <div className="p-5 bg-white/3 rounded-xl mb-8 text-xs text-white/35 leading-relaxed">
          <strong>Disclaimer:</strong> A Tharmanathan Insurance Agency is an authorised representative of Great Eastern Life Assurance (Malaysia) Berhad (93745-A), regulated by Bank Negara Malaysia. All insurance products are underwritten by Great Eastern Life. Information on this website is for general informational purposes and does not constitute financial advice. Product benefits, terms, and premiums are subject to the policy contract. Individual outcomes may vary. Case studies and scenarios shown are illustrative examples, subject to policy terms and insurer assessment. Claim timelines depend on documentation completeness and underwriting review.
        </div>

        <div className="border-t border-white/8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/35">
            © 2026 A Tharmanathan Insurance Agency. All rights reserved. | Insurance Advisor Malaysia | Medical Card Malaysia | Great Eastern Agent PJ
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-xs text-white/45 hover:text-white/70 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-xs text-white/45 hover:text-white/70 transition-colors">Terms</Link>
            <Link href="/disclaimer" className="text-xs text-white/45 hover:text-white/70 transition-colors">Product Disclosure</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
