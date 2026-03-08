import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import Link from 'next/link';

async function getDashboardData() {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get(name: string) { return cookieStore.get(name)?.value; } } } as any
  );

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return null;

  const { data: user } = await supabase.from('users').select('*').eq('auth_id', session.user.id).single();
  if (!user) return null;

  const isSA = user.role === 'super_admin';

  // Fetch counts based on role
  let leadsQuery = supabase.from('leads').select('*', { count: 'exact', head: false });
  let enquiriesQuery = supabase.from('enquiries').select('*', { count: 'exact', head: false });
  let clientsQuery = supabase.from('clients').select('*', { count: 'exact', head: false });

  if (!isSA) {
    leadsQuery = leadsQuery.eq('assigned_agent', user.id);
    enquiriesQuery = enquiriesQuery.eq('assigned_agent', user.id);
    clientsQuery = clientsQuery.eq('assigned_agent', user.id);
  }

  const [leadsRes, enquiriesRes, clientsRes] = await Promise.all([
    leadsQuery.order('created_at', { ascending: false }).limit(10),
    enquiriesQuery.order('created_at', { ascending: false }).limit(10),
    clientsQuery,
  ]);

  const clients = clientsRes.data || [];
  const activeClients = clients.filter(c => c.status === 'active');
  const totalPremium = activeClients.reduce((s, c) => s + (c.monthly_premium || 0), 0);

  let agentCount = 0;
  if (isSA) {
    const { count } = await supabase.from('users').select('*', { count: 'exact', head: true }).eq('role', 'agent').eq('is_active', true);
    agentCount = count || 0;
  }

  return {
    user,
    isSA,
    leads: leadsRes.data || [],
    leadCount: leadsRes.data?.length || 0,
    enquiries: enquiriesRes.data || [],
    enquiryCount: enquiriesRes.data?.length || 0,
    clientCount: clients.length,
    activeClientCount: activeClients.length,
    totalPremium,
    agentCount,
  };
}

export default async function AdminDashboard() {
  const data = await getDashboardData();
  if (!data) return <p>Error loading dashboard.</p>;

  const { user, isSA, leads, enquiries, leadCount, enquiryCount, clientCount, activeClientCount, totalPremium, agentCount } = data;

  const stats = [
    { label: isSA ? 'Total Leads' : 'My Leads', value: leadCount, color: 'text-teal' },
    { label: isSA ? 'Total Enquiries' : 'My Enquiries', value: enquiryCount, color: 'text-amber-600' },
    { label: isSA ? 'Total Clients' : 'My Clients', value: clientCount, color: 'text-blue-600' },
    { label: 'Monthly Premium', value: `RM ${totalPremium.toLocaleString()}`, color: 'text-green-600' },
  ];

  if (isSA) {
    stats.push(
      { label: 'Active Agents', value: agentCount, color: 'text-purple-600' },
      { label: 'Active Policies', value: activeClientCount, color: 'text-teal' },
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-2xl text-deep mb-1">
          {isSA ? '👑 Super Admin Dashboard' : '📋 Agent Dashboard'}
        </h1>
        <p className="text-sm text-gray-400">Welcome back, {user.full_name}</p>
      </div>

      {/* Stats Grid */}
      <div className={`grid ${isSA ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6' : 'grid-cols-2 md:grid-cols-4'} gap-4 mb-8`}>
        {stats.map((stat, i) => (
          <div key={i} className="admin-card text-center">
            <div className={`font-serif text-2xl ${stat.color}`}>{stat.value}</div>
            <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="admin-card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-serif text-lg">Recent Leads</h3>
            <Link href="/admin/leads" className="text-xs text-teal font-semibold">View All →</Link>
          </div>
          {leads.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">No leads yet. They&apos;ll appear here when visitors submit assessment requests.</p>
          ) : (
            <div className="space-y-3">
              {leads.slice(0, 5).map((lead: any) => (
                <div key={lead.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <div className="text-sm font-semibold text-deep">{lead.full_name}</div>
                    <div className="text-xs text-gray-400">{lead.phone} · {lead.interests?.join(', ')}</div>
                  </div>
                  <span className={`status-badge ${lead.status === 'new' ? 'status-new' : lead.status === 'contacted' ? 'status-progress' : 'status-done'}`}>
                    {lead.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="admin-card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-serif text-lg">Recent Enquiries</h3>
            <Link href="/admin/orders" className="text-xs text-teal font-semibold">View All →</Link>
          </div>
          {enquiries.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">No enquiries yet. They&apos;ll appear here when visitors request quotes.</p>
          ) : (
            <div className="space-y-3">
              {enquiries.slice(0, 5).map((enq: any) => (
                <div key={enq.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <div className="text-sm font-semibold text-deep">{enq.full_name}</div>
                    <div className="text-xs text-gray-400">
                      {enq.phone} · {enq.product_interests?.map((p: any) => p.name).join(', ')}
                    </div>
                  </div>
                  <span className={`status-badge ${enq.status === 'new' ? 'status-new' : 'status-progress'}`}>
                    {enq.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
