import { redirect } from 'next/navigation';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import Link from 'next/link';

async function getUser() {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get(name: string) { return cookieStore.get(name)?.value; } } } as any
  );

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) redirect('/admin/login');

  const { data: user } = await supabase
    .from('users')
    .select('*')
    .eq('auth_id', session.user.id)
    .single();

  if (!user || !user.is_active) redirect('/admin/login');
  return user;
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser();
  const isSA = user.role === 'super_admin';

  const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: '📊', roles: ['super_admin', 'agent'] },
    { href: '/admin/leads', label: 'Leads', icon: '📋', roles: ['super_admin', 'agent'] },
    { href: '/admin/orders', label: 'Enquiries', icon: '📦', roles: ['super_admin', 'agent'] },
    { href: '/admin/clients', label: isSA ? 'All Clients' : 'My Clients', icon: '👥', roles: ['super_admin', 'agent'] },
    { href: '/admin/agents', label: 'Agents', icon: '🏢', roles: ['super_admin'] },
    { href: '/admin/settings', label: 'Settings', icon: '⚙️', roles: ['super_admin'] },
  ].filter(item => item.roles.includes(user.role));

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-deep text-white flex flex-col fixed h-full z-30">
        <div className="p-6 border-b border-white/10">
          <div className="font-serif text-lg">A Tharmanathan</div>
          <div className="text-[0.65rem] text-white/40 tracking-wider">
            {isSA ? '👑 Super Admin' : '📋 Agent'} Portal
          </div>
        </div>

        <nav className="flex-1 py-4">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-6 py-3 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors no-underline"
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-white/10">
          <div className="text-sm font-semibold text-white/80">{user.full_name}</div>
          <div className="text-xs text-white/40">{user.email}</div>
          <form action="/api/auth/signout" method="POST" className="mt-3">
            <button type="submit" className="text-xs text-white/40 hover:text-white transition-colors">
              Logout →
            </button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
