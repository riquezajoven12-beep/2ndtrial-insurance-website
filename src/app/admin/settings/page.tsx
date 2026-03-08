import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

async function getData() {
  const cookieStore = cookies();
  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get(name: string) { return cookieStore.get(name)?.value; } } } as any);
  const { data: settings } = await supabase.from('site_settings').select('*');
  return settings || [];
}

export default async function SettingsPage() {
  const settings = await getData();
  const get = (key: string) => { const s = settings.find((x: any) => x.key === key); return s ? JSON.parse(JSON.stringify(s.value)).replace(/"/g,'') : ''; };
  return (<div>
    <div className="mb-8"><h1 className="font-serif text-2xl text-deep mb-1">Agency Settings</h1>
    <p className="text-sm text-gray-400">Manage your agency configuration</p></div>
    <div className="grid md:grid-cols-2 gap-6">
      <div className="admin-card">
        <h3 className="font-serif text-lg mb-4">Agency Details</h3>
        <div className="space-y-3">
          <div><label className="block text-xs font-semibold text-gray-500 mb-1">Agency Name</label><input defaultValue={get('agency_name')} className="input-field" /></div>
          <div><label className="block text-xs font-semibold text-gray-500 mb-1">Phone</label><input defaultValue={get('agency_phone')} className="input-field" /></div>
          <div><label className="block text-xs font-semibold text-gray-500 mb-1">Email</label><input defaultValue={get('agency_email')} className="input-field" /></div>
          <div><label className="block text-xs font-semibold text-gray-500 mb-1">Address</label><input defaultValue={get('agency_address')} className="input-field" /></div>
        </div>
        <button className="btn-teal mt-4 w-full justify-center">Save Changes</button>
      </div>
      <div className="admin-card">
        <h3 className="font-serif text-lg mb-4">Notifications</h3>
        <div className="space-y-3">
          {['Email on new lead', 'Email on new enquiry', 'WhatsApp alerts', 'Weekly summary report'].map((item, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <span className="text-sm text-gray-600">{item}</span>
              <input type="checkbox" defaultChecked={i < 2} className="w-4 h-4 accent-teal" />
            </div>
          ))}
        </div>
        <button className="btn-teal mt-4 w-full justify-center">Save Notifications</button>
      </div>
    </div>
  </div>);
}
