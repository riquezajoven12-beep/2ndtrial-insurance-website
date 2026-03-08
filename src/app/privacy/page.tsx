import Link from 'next/link';
export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-warm">
      <div className="bg-deep text-white py-16"><div className="max-w-[800px] mx-auto px-6"><Link href="/" className="text-sm text-white/50 hover:text-white mb-4 block no-underline">← Back to Home</Link><h1 className="font-serif text-3xl">Privacy Policy</h1><p className="text-white/60 text-sm mt-2">Last updated: March 2026</p></div></div>
      <div className="max-w-[800px] mx-auto px-6 py-12 prose prose-sm prose-gray">
        <h2 className="font-serif text-xl text-deep">1. Introduction</h2>
        <p className="text-gray-600 leading-relaxed">A Tharmanathan Insurance Agency (&ldquo;we&rdquo;, &ldquo;our&rdquo;) is committed to protecting your personal data in compliance with the Personal Data Protection Act 2010 (PDPA) of Malaysia. This policy explains how we collect, use, and protect your information.</p>
        <h2 className="font-serif text-xl text-deep mt-8">2. Data We Collect</h2>
        <p className="text-gray-600 leading-relaxed">Through our website forms, we collect: full name, phone number, email address, age range, family size, insurance interests, and preferred contact time. We do not collect sensitive personal data (IC numbers, health information, financial details) through our public website forms.</p>
        <h2 className="font-serif text-xl text-deep mt-8">3. How We Use Your Data</h2>
        <p className="text-gray-600 leading-relaxed">Your data is used solely to: respond to your insurance enquiries, provide personalised coverage recommendations, contact you regarding your assessment requests, and improve our services. We do not sell or share your data with third parties for marketing purposes.</p>
        <h2 className="font-serif text-xl text-deep mt-8">4. Data Protection</h2>
        <p className="text-gray-600 leading-relaxed">Your data is stored securely using industry-standard encryption and access controls. Only authorised staff can access your information. We use Supabase (cloud database) with Row Level Security to ensure data isolation between agents.</p>
        <h2 className="font-serif text-xl text-deep mt-8">5. Data Retention</h2>
        <p className="text-gray-600 leading-relaxed">We retain your data for as long as necessary to fulfil the purpose for which it was collected, or as required by law. You may request deletion of your data at any time.</p>
        <h2 className="font-serif text-xl text-deep mt-8">6. Your Rights</h2>
        <p className="text-gray-600 leading-relaxed">Under the PDPA, you have the right to: access your personal data, correct inaccurate data, withdraw consent for data processing, and request deletion of your data. To exercise these rights, contact us at info@tharmanathan.com.</p>
        <h2 className="font-serif text-xl text-deep mt-8">7. Contact</h2>
        <p className="text-gray-600 leading-relaxed">For privacy-related enquiries, contact: A Tharmanathan Insurance Agency, Petaling Jaya, Selangor. Email: info@tharmanathan.com</p>
      </div>
    </div>
  );
}
