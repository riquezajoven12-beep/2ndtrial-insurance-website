import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

async function getData() {
  const cookieStore = cookies();
  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get(name: string) { return cookieStore.get(name)?.value; } } } as any);
  const { data: agents } = await supabase.from('users').select('*').eq('role', 'agent').order('created_at');
  const { data: clients } = await supabase.from('clients').select('assigned_agent, monthly_premium, status');
  return { agents: agents || [], clients: clients || [] };
}

export default async function AgentsPage() {
  const { agents, clients } = await getData();
  return (<div>
    <div className="mb-8"><h1 className="font-serif text-2xl text-deep mb-1">Agent Management</h1>
    <p className="text-sm text-gray-400">{agents.length} agents registered</p></div>
    <div className="admin-card overflow-x-auto">
      <table className="w-full text-sm">
        <thead><tr className="border-b-2 border-gray-100">
          <th className="text-left py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Agent</th>
          <th className="text-left py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Code</th>
          <th className="text-left py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Email</th>
          <th className="text-left py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Clients</th>
          <th className="text-left py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Active</th>
          <th className="text-left py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Monthly Premium</th>
          <th className="text-left py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
        </tr></thead>
        <tbody>
          {agents.map((a: any) => {
            const ac = clients.filter((c: any) => c.assigned_agent === a.id);
            const active = ac.filter((c: any) => c.status === 'active');
            const prem = active.reduce((s: number, c: any) => s + (c.monthly_premium || 0), 0);
            return (<tr key={a.id} className="border-b border-gray-50 hover:bg-gray-50">
              <td className="py-3 px-4 font-semibold text-deep">{a.full_name}</td>
              <td className="py-3 px-4"><span className="status-badge status-new">{a.agent_code || '-'}</span></td>
              <td className="py-3 px-4 text-gray-500">{a.email}</td>
              <td className="py-3 px-4 text-gray-500">{ac.length}</td>
              <td className="py-3 px-4 text-gray-500">{active.length}</td>
              <td className="py-3 px-4 font-semibold text-teal">RM {prem.toLocaleString()}</td>
              <td className="py-3 px-4"><span className={`status-badge ${a.is_active ? 'status-done' : 'status-danger'}`}>{a.is_active ? 'Active' : 'Inactive'}</span></td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
    <p className="mt-4 text-xs text-gray-400">To add new agents: create a Supabase Auth user, then insert into the users table with role = &apos;agent&apos;.</p>
  </div>);
}
