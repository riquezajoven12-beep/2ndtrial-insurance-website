'use client';

import { useState } from 'react';

export default function Calculator() {
  const [income, setIncome] = useState('');
  const [age, setAge] = useState('');
  const [dependents, setDependents] = useState('2');
  const [existing, setExisting] = useState('0');
  const [result, setResult] = useState<{ amount: string; note: string } | null>(null);

  function calculate() {
    const inc = parseFloat(income) || 0;
    const a = parseInt(age) || 30;
    const dep = parseInt(dependents) || 0;
    const exist = parseFloat(existing) || 0;
    if (inc <= 0) { alert('Please enter your monthly income.'); return; }

    const annual = inc * 12;
    const mult = a < 30 ? 12 : a < 40 ? 10 : a < 50 ? 8 : 6;
    const depAdd = dep * annual * 0.5;
    const rec = Math.max((annual * mult) + depAdd - exist, 100000);

    setResult({
      amount: 'RM ' + Math.round(rec).toLocaleString(),
      note: `Based on ${mult}x annual income (RM${annual.toLocaleString()}) + RM${depAdd.toLocaleString()} for ${dep} dependent(s), minus RM${exist.toLocaleString()} existing coverage. This is an estimate — get a personalised analysis below.`,
    });
  }

  const fieldClass = 'w-full p-3 bg-white/10 border border-white/15 rounded-lg text-white placeholder-white/30 outline-none focus:border-gold text-sm';
  const labelClass = 'block text-xs font-semibold text-white/60 mb-1.5 uppercase tracking-wider';

  return (
    <section id="calculator" className="py-20 bg-gradient-to-br from-deep to-navy text-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center">
          <div className="text-xs font-bold text-gold-light uppercase tracking-widest mb-3">Insurance Calculator</div>
          <h2 className="text-3xl md:text-4xl text-white mb-4">How Much Life Insurance Do You Actually Need?</h2>
          <p className="text-white/60 max-w-[600px] mx-auto mb-10 text-sm">Find out in 30 seconds — no commitment required</p>
        </div>

        <div className="bg-white/[.07] border border-white/10 rounded-xl p-10 max-w-[700px] mx-auto">
          <div className="grid grid-cols-2 gap-5 mb-5">
            <div>
              <label className={labelClass}>Monthly Income (RM)</label>
              <input type="number" value={income} onChange={e => setIncome(e.target.value)} placeholder="e.g. 5000" className={fieldClass} />
            </div>
            <div>
              <label className={labelClass}>Age</label>
              <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="e.g. 32" className={fieldClass} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 mb-5">
            <div>
              <label className={labelClass}>Dependents</label>
              <select value={dependents} onChange={e => setDependents(e.target.value)} className={fieldClass + ' [&>option]:bg-deep'}>
                <option value="0">None</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4+</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Existing Coverage (RM)</label>
              <input type="number" value={existing} onChange={e => setExisting(e.target.value)} placeholder="e.g. 100000" className={fieldClass} />
            </div>
          </div>
          <button onClick={calculate} className="w-full py-3.5 bg-gold text-deep rounded-lg font-bold text-sm hover:bg-gold-light transition-all mt-3">
            Calculate My Coverage Need →
          </button>

          {result && (
            <div className="mt-6 p-6 bg-teal/15 border border-teal/30 rounded-xl animate-in">
              <div className="text-sm text-white/60 mb-1">Recommended Life Coverage</div>
              <div className="text-4xl font-serif text-gold-light mb-3">{result.amount}</div>
              <div className="text-xs text-white/50 leading-relaxed">{result.note}</div>
              <div className="mt-4 text-center">
                <a href="#contact" className="text-gold-light font-semibold underline text-sm">📞 Get a personalised quote for this coverage →</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
