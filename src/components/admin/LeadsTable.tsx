'use client';

import { useState } from 'react';
import { createBrowserSupabase } from '@/lib/supabase';

const statusColors: Record<string, string> = {
  new: 'status-new', contacted: 'status-progress', qualified: 'bg-blue-100 text-blue-700',
  converted: 'status-done', lost: 'status-danger',
};

export default function LeadsTable({ leads, isSA, agents }: { leads: any[]; isSA: boolean; agents: any[] }) {
  const [items, setItems] = useState(leads);

  async function updateStatus(id: string, status: string) {
    const supabase = createBrowserSupabase();
    await supabase.from('leads').update({ status }).eq('id', id);
    setItems(prev => prev.map(l => l.id === id ? { ...l, status } : l));
  }

  async function assignAgent(id: string, agentId: string) {
    const supabase = createBrowserSupabase();
    await supabase.from('leads').update({ assigned_agent: agentId || null }).eq('id', id);
    setItems(prev => prev.map(l => l.id === id ? { ...l, assigned_agent: agentId } : l));
  }

  if (items.length === 0) {
    return <div className="admin-card text-center py-12 text-gray-400">No leads yet. They will appear here when visitors submit assessment requests.</div>;
  }

  return (
    <div className="admin-card overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b-2 border-gray-100">
            <th className="text-left py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Ref</th>
            <th className="text-left py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Date</th>
            <th className="text-left py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Name</th>
            <th className="text-left py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Phone</th>
            <th className="text-left py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Interest</th>
            {isSA && <th className="text-left py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Agent</th>}
            <th className="text-left py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody>
          {items.map(lead => (
            <tr key={lead.id} className="border-b border-gray-50 hover:bg-gray-50">
              <td className="py-3 px-4 text-xs text-gray-400 font-mono">{lead.reference_code}</td>
              <td className="py-3 px-4 text-gray-500">{new Date(lead.created_at).toLocaleDateString('en-MY')}</td>
              <td className="py-3 px-4">
                <div className="font-semibold text-deep">{lead.full_name}</div>
                <div className="text-xs text-gray-400">{lead.email || '-'}</div>
              </td>
              <td className="py-3 px-4 text-gray-500">{lead.phone}</td>
              <td className="py-3 px-4 text-gray-500">{lead.interests?.join(', ') || '-'}</td>
              {isSA && (
                <td className="py-3 px-4">
                  <select
                    value={lead.assigned_agent || ''}
                    onChange={e => assignAgent(lead.id, e.target.value)}
                    className="text-xs border border-gray-200 rounded px-2 py-1 bg-white"
                  >
                    <option value="">Unassigned</option>
                    {agents.map(a => <option key={a.id} value={a.id}>{a.full_name}</option>)}
                  </select>
                </td>
              )}
              <td className="py-3 px-4">
                <select
                  value={lead.status}
                  onChange={e => updateStatus(lead.id, e.target.value)}
                  className={`text-xs border-0 rounded-full px-3 py-1 font-semibold ${statusColors[lead.status] || 'status-new'}`}
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="converted">Converted</option>
                  <option value="lost">Lost</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
