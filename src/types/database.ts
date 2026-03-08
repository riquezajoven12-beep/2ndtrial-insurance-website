export type UserRole = 'super_admin' | 'agent' | 'viewer';
export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
export type EnquiryStatus = 'new' | 'processing' | 'quoted' | 'accepted' | 'declined';
export type ClientStatus = 'prospect' | 'active' | 'lapsed' | 'cancelled';

export interface User {
  id: string;
  auth_id: string;
  email: string;
  full_name: string;
  role: UserRole;
  agent_code: string | null;
  phone: string | null;
  is_active: boolean;
  last_login: string | null;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  icon: string;
  description: string;
  starting_price: number;
  features: string[];
  is_active: boolean;
  sort_order: number;
}

export interface Lead {
  id: string;
  reference_code: string;
  full_name: string;
  phone: string;
  email: string | null;
  age: number | null;
  family_size: string | null;
  monthly_budget: number | null;
  interests: string[];
  preferred_contact_time: string | null;
  source: string;
  status: LeadStatus;
  assigned_agent: string | null;
  notes: string | null;
  created_at: string;
}

export interface Enquiry {
  id: string;
  reference_code: string;
  full_name: string;
  phone: string;
  email: string | null;
  product_interests: { id: string; name: string }[];
  message: string | null;
  source: string;
  status: EnquiryStatus;
  assigned_agent: string | null;
  created_at: string;
}

export interface Client {
  id: string;
  client_code: string;
  full_name: string;
  phone: string;
  email: string | null;
  date_of_birth: string | null;
  address: string | null;
  plans: string | null;
  monthly_premium: number;
  status: ClientStatus;
  assigned_agent: string | null;
  renewal_date: string | null;
  notes: string | null;
  lead_id: string | null;
  created_at: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  occupation: string | null;
  age_range: string | null;
  plan_type: string | null;
  quote: string;
  initials: string | null;
  is_active: boolean;
  sort_order: number;
}

export interface FollowUp {
  id: string;
  client_id: string | null;
  lead_id: string | null;
  assigned_agent: string | null;
  type: string;
  status: string;
  due_date: string;
  title: string;
  notes: string | null;
  completed_at: string | null;
  created_at: string;
}
