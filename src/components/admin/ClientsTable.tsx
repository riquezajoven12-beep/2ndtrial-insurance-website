'use client';

import { useState } from 'react';
import { createBrowserSupabase } from '@/lib/supabase';

const statusColors: Record<string, string> = {
  prospect: 'status-progress', active: 'status-done', lapsed: 'status-danger', cancelled: 'bg-gray-100 text-gray-500',
};

export default function ClientsTable({ clients, isSA, agents, currentUserId }: { clients: any[]; isSA: boolean; agents: any[]; currentUserId: string }) {
  const [items, setItems] = useState(clients);
  const [filter, setFilter] = useState('all');
  const [showAdd, setShowAdd] = useState(false);

  const filtered = filter === 'all' ? items : items.filter(c => c.status === filter);

  async function addClient(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const supabase = createBrowserSupabase();
    const { data, error } = await supabase.from('clients').insert({
      full_name: fd.get('name') as string,
      phone: fd.get('phone') as string,
      email: (fd.get('email') as string) || null,
      plans: (fd.get('plans') as string) || null,
      monthly_premium: parseInt(fd.get('premium') as string) || 0,
      notes: (fd.get('notes') as string) || null,
      assigned_agent: isSA ? (fd.get('agent') as string || currentUserId) : currentUserId,
      status: 'prospect',
    }).select().single();
    if (!error && data) { setItems(prev => [data, ...prev]); setShowAdd(false); }
    else alert('Error adding client.');
  }

  return (
    <div>
      {/* Filters */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="flex gap-2">
          {['all', 'prospect', 'active', 'lapsed'].map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${filter === s ? 'bg-teal text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
              {s === 'all' ? `All (${items.length})` : `${s.charAt(0).toUpperCase() + s.slice(1)} (${items.filter(c => c.status === s).length})`}
            </button>
          ))}
        </div>
        <button onClick={() => setShowAdd(!showAdd)} className="btn-teal text-xs">+ Add Client</button>
      </div>

      {/* Add form */}
      {showAdd && (
        <form onSubmit={addClient} className="admin-card mb-4 space-y-3">
          <h4 className="font-semibold text-sm text-deep">Add New Client</h4>
          <div className="grid md:grid-cols-2 gap-3">
            <input name="name" required placeholder="Full name *" className="input-field" />
            <input name="phone" required placeholder="Phone *" className="input-field" />
            <input name="email" placeholder="Email" className="input-field" />
            <input name="plans" placeholder="Plans (e.g. Medical + Life)" className="input-field" />
            <input name="premium" type="number" placeholder="Monthly premium (RM)" className="input-field" />
            {isSA && (
              <select name="agent" className="input-field">
                {agents.map(a => <option key={a.id} value={a.id}>{a.full_name}</option>)}
              </select>
            )}
          </div>
          <textarea name="notes" placeholder="Notes..." className="input-field min-h-[60px]" />
          <div className="flex gap-2">
            <button type="submit" className="btn-teal text-xs">Save Client</button>
            <button type="button" onClick={() => setShowAdd(false)} className="px-4 py-2 border border-gray-200 rounded-lg text-xs text-gray-500">Cancel</button>
          </div>
        </form>
      )}

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="admin-card text-center py-12 text-gray-400">No clients found.</div>
      ) : (
        <div className="admin-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b-2 border-gray-100">
              <th className="text-left py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Code</th>
              <th className="text-left py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Name</th>
              <th className="text-left py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Phone</th>
              <th className="text-left py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Plans</th>
              <th className="text-left py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Premium</th>
              <th className="text-left py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
              <th className="text-left py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Renewal</th>
            </tr></thead>
            <tbody>
              {filtered.map(cl => (
                <tr key={cl.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-3 px-4 text-xs text-gray-400 font-mono">{cl.client_code}</td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-deep">{cl.full_name}</div>
                    <div className="text-xs text-gray-400">{cl.email || '-'}</div>
                  </td>
                  <td className="py-3 px-4 text-gray-500">{cl.phone}</td>
                  <td className="py-3 px-4 text-gray-500 text-xs">{cl.plans || '-'}</td>
                  <td className="py-3 px-4 font-semibold text-teal">RM {(cl.monthly_premium || 0).toLocaleString()}</td>
                  <td className="py-3 px-4"><span className={`status-badge ${statusColors[cl.status] || 'status-new'}`}>{cl.status}</span></td>
                  <td className="py-3 px-4 text-xs text-gray-400">{cl.renewal_date ? new Date(cl.renewal_date).toLocaleDateString('en-MY') : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
