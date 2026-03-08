'use client';

import { useState } from 'react';
import { createBrowserSupabase } from '@/lib/supabase';

export default function EnquiriesTable({ enquiries, isSA, agents }: { enquiries: any[]; isSA: boolean; agents: any[] }) {
  const [items, setItems] = useState(enquiries);

  async function updateStatus(id: string, status: string) {
    const supabase = createBrowserSupabase();
    await supabase.from('enquiries').update({ status }).eq('id', id);
    setItems(prev => prev.map(e => e.id === id ? { ...e, status } : e));
  }

  if (items.length === 0) {
    return <div className="admin-card text-center py-12 text-gray-400">No enquiries yet.</div>;
  }

  return (
    <div className="admin-card overflow-x-auto">
      <table className="w-full text-sm">
        <thead><tr className="border-b-2 border-gray-100">
          <th className="text-left py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Ref</th>
          <th className="text-left py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Date</th>
          <th className="text-left py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Name</th>
          <th className="text-left py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Phone</th>
          <th className="text-left py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Plans</th>
          <th className="text-left py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
        </tr></thead>
        <tbody>
          {items.map(enq => (
            <tr key={enq.id} className="border-b border-gray-50 hover:bg-gray-50">
              <td className="py-3 px-4 text-xs text-gray-400 font-mono">{enq.reference_code}</td>
              <td className="py-3 px-4 text-gray-500">{new Date(enq.created_at).toLocaleDateString('en-MY')}</td>
              <td className="py-3 px-4">
                <div className="font-semibold text-deep">{enq.full_name}</div>
                <div className="text-xs text-gray-400">{enq.email || '-'}</div>
              </td>
              <td className="py-3 px-4 text-gray-500">{enq.phone}</td>
              <td className="py-3 px-4 text-gray-500 text-xs">{enq.product_interests?.map((p: any) => p.name).join(', ') || '-'}</td>
              <td className="py-3 px-4">
                <select value={enq.status} onChange={e => updateStatus(enq.id, e.target.value)}
                  className="text-xs border border-gray-200 rounded-full px-3 py-1 font-semibold bg-white">
                  <option value="new">New</option>
                  <option value="processing">Processing</option>
                  <option value="quoted">Quoted</option>
                  <option value="accepted">Accepted</option>
                  <option value="declined">Declined</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
