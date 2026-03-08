export default function CaseStudies() {
  const cases = [
    {
      title: 'Young Father, Age 34', plan: 'Medical + Life Plan',
      details: [
        { label: 'Monthly Premium', value: 'RM220/month' },
        { label: 'Medical Coverage', value: 'RM1,000,000' },
        { label: 'Life Coverage', value: 'RM500,000' },
      ],
      outcome: 'Illustrative: RM38,000 hospitalisation claim approved — individual outcomes vary based on policy terms and documentation',
    },
    {
      title: 'Working Mother, Age 41', plan: 'Critical Illness + Medical',
      details: [
        { label: 'Monthly Premium', value: 'RM350/month' },
        { label: 'CI Coverage', value: 'RM200,000' },
        { label: 'Medical Coverage', value: 'RM1,500,000' },
      ],
      outcome: 'Illustrative: RM200,000 critical illness payout — subject to policy terms, medical assessment, and insurer review',
    },
    {
      title: 'Retiree, Age 58', plan: 'Retirement + Medical',
      details: [
        { label: 'Total Premiums Paid', value: 'RM180,000' },
        { label: 'Retirement Fund', value: 'RM320,000' },
        { label: 'Medical Coverage', value: 'Lifetime renewal' },
      ],
      outcome: 'Illustrative: RM2,500/month retirement income — per policy contract terms, not a guarantee of typical results',
    },
  ];

  return (
    <section id="cases" className="py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center">
          <div className="section-label">Illustrative Scenarios</div>
          <h2 className="text-3xl md:text-4xl text-deep mb-4">How Insurance Can Make a Difference</h2>
          <p className="text-gray-500 max-w-[600px] mx-auto mb-12">These illustrative scenarios show how proper coverage can protect Malaysian families. Individual outcomes may vary based on policy terms and insurer assessment.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="p-6 bg-gradient-to-br from-teal to-navy text-white">
                <h4 className="text-lg mb-1">{c.title}</h4>
                <span className="text-sm text-white/70">{c.plan}</span>
              </div>
              <div className="p-6">
                {c.details.map((d, j) => (
                  <div key={j} className="flex justify-between py-2.5 border-b border-gray-100 last:border-0 text-sm">
                    <span className="text-gray-400">{d.label}</span>
                    <span className="font-semibold text-deep">{d.value}</span>
                  </div>
                ))}
                <div className="mt-4 p-3.5 bg-green-50 rounded-lg border-l-[3px] border-green-600">
                  <div className="text-[0.68rem] font-bold text-green-700 uppercase tracking-wider mb-1">Illustrative Outcome</div>
                  <div className="text-sm font-bold text-deep">{c.outcome}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
