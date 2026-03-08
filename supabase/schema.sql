-- ============================================================
-- A THARMANATHAN INSURANCE AGENCY — FULL DATABASE SCHEMA
-- Run this in Supabase SQL Editor (Settings > SQL Editor)
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- 1. USERS & ROLES (Server-side auth — replaces hardcoded JS)
-- ============================================================
CREATE TYPE user_role AS ENUM ('super_admin', 'agent', 'viewer');

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'agent',
  agent_code TEXT UNIQUE,
  phone TEXT,
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 2. PRODUCTS (CMS-managed, not hardcoded)
-- ============================================================
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  icon TEXT DEFAULT '🛡️',
  description TEXT,
  starting_price INTEGER DEFAULT 0,
  features JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Seed products
INSERT INTO products (name, slug, category, icon, description, starting_price, features, sort_order) VALUES
('Life Protection', 'life-protection', 'Life', '❤️', 'Financial security for your loved ones when they need it most.', 85, '["Comprehensive death & TPD coverage","Flexible sum assured from RM100K","Optional critical illness rider","Affordable premiums for all ages"]', 1),
('Medical & Health', 'medical-health', 'Health', '🏥', 'Cashless hospital admission and comprehensive medical coverage.', 150, '["Cashless admission at panel hospitals","Annual limits up to RM2M+","Outpatient & specialist coverage","No-claim bonus benefits"]', 2),
('Education Planning', 'education-planning', 'Education', '🎓', 'Guaranteed education funding for your children''s future.', 120, '["Guaranteed maturity benefit","Premium waiver on death/TPD","Flexible payout schedules","Additional savings component"]', 3),
('Savings & Investment', 'savings-investment', 'Investment', '💰', 'Grow your wealth with insurance-linked investment plans.', 200, '["Professional fund management","Multiple fund options","Insurance + investment combined","Tax relief eligible"]', 4),
('Retirement Planning', 'retirement-planning', 'Retirement', '🌴', 'Secure your golden years with guaranteed retirement income.', 180, '["Guaranteed monthly income","Capital preservation options","EPF supplementary planning","Flexible retirement age"]', 5),
('Personal Accident', 'personal-accident', 'Accident', '⚡', '24/7 coverage for accidents at work, home, or travelling.', 45, '["24-hour worldwide coverage","Accidental death & disability","Medical expenses reimbursement","Weekly income benefit"]', 6);

-- ============================================================
-- 3. LEADS (Assessment requests / enquiries)
-- ============================================================
CREATE TYPE lead_status AS ENUM ('new', 'contacted', 'qualified', 'converted', 'lost');

CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reference_code TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  age INTEGER,
  family_size TEXT,
  monthly_budget INTEGER,
  interests TEXT[],
  preferred_contact_time TEXT,
  source TEXT DEFAULT 'website',
  status lead_status DEFAULT 'new',
  assigned_agent UUID REFERENCES users(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 4. ENQUIRIES (Product-specific quote requests — replaces fake cart/checkout)
-- ============================================================
CREATE TYPE enquiry_status AS ENUM ('new', 'processing', 'quoted', 'accepted', 'declined');

CREATE TABLE enquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reference_code TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  product_interests JSONB DEFAULT '[]'::jsonb,
  message TEXT,
  source TEXT DEFAULT 'website',
  status enquiry_status DEFAULT 'new',
  assigned_agent UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 5. CLIENTS (Real CRM — replaces in-memory JS array)
-- ============================================================
CREATE TYPE client_status AS ENUM ('prospect', 'active', 'lapsed', 'cancelled');

CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_code TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  date_of_birth DATE,
  address TEXT,
  plans TEXT,
  monthly_premium INTEGER DEFAULT 0,
  status client_status DEFAULT 'prospect',
  assigned_agent UUID REFERENCES users(id) ON DELETE SET NULL,
  renewal_date DATE,
  notes TEXT,
  lead_id UUID REFERENCES leads(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 6. FOLLOW-UPS (Task management for agents)
-- ============================================================
CREATE TYPE followup_type AS ENUM ('call', 'meeting', 'email', 'whatsapp', 'renewal', 'other');
CREATE TYPE followup_status AS ENUM ('pending', 'completed', 'cancelled', 'overdue');

CREATE TABLE follow_ups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  assigned_agent UUID REFERENCES users(id) ON DELETE SET NULL,
  type followup_type DEFAULT 'call',
  status followup_status DEFAULT 'pending',
  due_date TIMESTAMPTZ NOT NULL,
  title TEXT NOT NULL,
  notes TEXT,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 7. AUDIT LOG (Compliance + tracking)
-- ============================================================
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id UUID,
  details JSONB DEFAULT '{}'::jsonb,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 8. CONSENT RECORDS (PDPA compliance)
-- ============================================================
CREATE TABLE consent_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  consent_type TEXT NOT NULL,
  consented BOOLEAN DEFAULT false,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 9. SITE SETTINGS (CMS-managed content)
-- ============================================================
CREATE TABLE site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO site_settings (key, value) VALUES
('agency_name', '"A Tharmanathan Insurance Agency"'),
('agency_phone', '"+60 12-345 6789"'),
('agency_email', '"info@tharmanathan.com"'),
('agency_address', '"Petaling Jaya, Selangor"'),
('whatsapp_number', '"60123456789"'),
('notification_email', '"admin@tharmanathan.com"');

-- ============================================================
-- 10. TESTIMONIALS (Editable via admin)
-- ============================================================
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_name TEXT NOT NULL,
  occupation TEXT,
  age_range TEXT,
  plan_type TEXT,
  quote TEXT NOT NULL,
  initials TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO testimonials (client_name, occupation, age_range, plan_type, quote, initials, sort_order) VALUES
('Priya Devi', 'Teacher', '38', 'Medical + Education Plan', 'Tharmanathan took the time to understand my family''s actual needs instead of pushing the most expensive plan. His annual reviews ensure we''re always properly covered.', 'PD', 1),
('Raj Kumar', 'Engineer', '45', 'Family Medical Plan', 'When my father was hospitalised unexpectedly, the claim was processed within a week. Having a dedicated advisor who handled everything made a stressful time much easier.', 'RK', 2),
('Siti Lim', 'Business Owner', '52', 'Keyman + Life Plan', 'As a business owner, I needed keyman insurance and proper succession planning. Tharmanathan structured everything clearly and helped me understand exactly what I was getting.', 'SL', 3);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE follow_ups ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE consent_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Public read for products, testimonials, site_settings
CREATE POLICY "Public can read active products" ON products FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read active testimonials" ON testimonials FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read site settings" ON site_settings FOR SELECT USING (true);

-- Public can insert leads and enquiries
CREATE POLICY "Public can create leads" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can create enquiries" ON enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can create consent records" ON consent_records FOR INSERT WITH CHECK (true);

-- Authenticated users (agents/admins) full access to their data
CREATE POLICY "Auth users read own profile" ON users FOR SELECT USING (auth.uid() = auth_id);
CREATE POLICY "Super admin full users" ON users FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE auth_id = auth.uid() AND role = 'super_admin')
);

CREATE POLICY "Agents see assigned leads" ON leads FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE auth_id = auth.uid() AND (role = 'super_admin' OR id = leads.assigned_agent))
);
CREATE POLICY "Agents update assigned leads" ON leads FOR UPDATE USING (
  EXISTS (SELECT 1 FROM users WHERE auth_id = auth.uid() AND (role = 'super_admin' OR id = leads.assigned_agent))
);

CREATE POLICY "Agents see assigned enquiries" ON enquiries FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE auth_id = auth.uid() AND (role = 'super_admin' OR id = enquiries.assigned_agent))
);

CREATE POLICY "Agents see assigned clients" ON clients FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE auth_id = auth.uid() AND (role = 'super_admin' OR id = clients.assigned_agent))
);
CREATE POLICY "Agents manage assigned clients" ON clients FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE auth_id = auth.uid() AND (role = 'super_admin' OR id = clients.assigned_agent))
);

CREATE POLICY "Agents see assigned followups" ON follow_ups FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE auth_id = auth.uid() AND (role = 'super_admin' OR id = follow_ups.assigned_agent))
);

CREATE POLICY "Super admin full audit" ON audit_logs FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE auth_id = auth.uid() AND role = 'super_admin')
);

CREATE POLICY "Super admin full products" ON products FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE auth_id = auth.uid() AND role = 'super_admin')
);

CREATE POLICY "Super admin full testimonials" ON testimonials FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE auth_id = auth.uid() AND role = 'super_admin')
);

CREATE POLICY "Super admin full settings" ON site_settings FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE auth_id = auth.uid() AND role = 'super_admin')
);

-- ============================================================
-- HELPER FUNCTIONS
-- ============================================================

-- Auto-generate reference codes
CREATE OR REPLACE FUNCTION generate_lead_ref() RETURNS TRIGGER AS $$
BEGIN
  NEW.reference_code := 'L-' || TO_CHAR(now(), 'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM()*9999)::TEXT, 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER lead_ref_trigger BEFORE INSERT ON leads
FOR EACH ROW WHEN (NEW.reference_code IS NULL)
EXECUTE FUNCTION generate_lead_ref();

CREATE OR REPLACE FUNCTION generate_enquiry_ref() RETURNS TRIGGER AS $$
BEGIN
  NEW.reference_code := 'E-' || TO_CHAR(now(), 'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM()*9999)::TEXT, 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER enquiry_ref_trigger BEFORE INSERT ON enquiries
FOR EACH ROW WHEN (NEW.reference_code IS NULL)
EXECUTE FUNCTION generate_enquiry_ref();

CREATE OR REPLACE FUNCTION generate_client_code() RETURNS TRIGGER AS $$
BEGIN
  NEW.client_code := 'C-' || LPAD((SELECT COUNT(*) + 1 FROM clients)::TEXT, 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER client_code_trigger BEFORE INSERT ON clients
FOR EACH ROW WHEN (NEW.client_code IS NULL)
EXECUTE FUNCTION generate_client_code();

-- Updated_at auto-update
CREATE OR REPLACE FUNCTION update_modified_column() RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_modtime BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER update_leads_modtime BEFORE UPDATE ON leads FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER update_enquiries_modtime BEFORE UPDATE ON enquiries FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER update_clients_modtime BEFORE UPDATE ON clients FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER update_products_modtime BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_modified_column();

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_agent ON leads(assigned_agent);
CREATE INDEX idx_enquiries_status ON enquiries(status);
CREATE INDEX idx_clients_agent ON clients(assigned_agent);
CREATE INDEX idx_clients_status ON clients(status);
CREATE INDEX idx_followups_agent ON follow_ups(assigned_agent);
CREATE INDEX idx_followups_due ON follow_ups(due_date) WHERE status = 'pending';
CREATE INDEX idx_audit_user ON audit_logs(user_id);
CREATE INDEX idx_audit_created ON audit_logs(created_at DESC);
