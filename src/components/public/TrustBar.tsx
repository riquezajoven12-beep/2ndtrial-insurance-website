export default function TrustBar() {
  const items = [
    { icon: '🏛️', text: 'Bank Negara Regulated' },
    { icon: '📋', text: 'Licensed Great Eastern Rep' },
    { icon: '💰', text: 'RM113B+ Assets' },
    { icon: '👥', text: '4.3M+ Policyholders' },
    { icon: '⭐', text: '116 Years of Trust' },
  ];

  return (
    <div className="bg-cream border-b border-gray-200 py-7">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex justify-center items-center gap-10 flex-wrap">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-2.5 text-sm text-gray-500 font-medium">
              <span className="text-xl">{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
