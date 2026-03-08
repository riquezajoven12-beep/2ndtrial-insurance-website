import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import ClientsTable from '@/components/admin/ClientsTable';

async function getData() {
  const cookieStore = cookies();
  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get(name: string) { return cookieStore.get(name)?.value; } } } as any);
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return null;
  const { data: user } = await supabase.from('users').select('*').eq('auth_id', session.user.id).single();
  if (!user) return null;
  const isSA = user.role === 'super_admin';
  let query = supabase.from('clients').select('*').order('created_at', { ascending: false });
  if (!isSA) query = query.eq('assigned_agent', user.id);
  const { data: clients } = await query;
  let agents: any[] = [];
  if (isSA) { const { data } = await supabase.from('users').select('id,full_name').eq('role','agent').eq('is_active',true); agents = data || []; }
  return { clients: clients || [], user, isSA, agents };
}

export default async function ClientsPage() {
  const data = await getData();
  if (!data) return <p>Error loading.</p>;
  return (<div>
    <div className="mb-8"><h1 className="font-serif text-2xl text-deep mb-1">{data.isSA ? 'All Clients' : 'My Clients'}</h1>
    <p className="text-sm text-gray-400">Client portfolio ({data.clients.length})</p></div>
    <ClientsTable clients={data.clients} isSA={data.isSA} agents={data.agents} currentUserId={data.user.id} />
  </div>);
}
