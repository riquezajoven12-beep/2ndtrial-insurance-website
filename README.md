# A Tharmanathan Insurance Agency — Full-Stack Platform

Production-grade insurance advisory platform built with Next.js + Supabase + Tailwind CSS.

## What This Replaces

The old single-HTML prototype had:
- ❌ Hardcoded passwords in View Source
- ❌ Fake cart/checkout (data lost on refresh)
- ❌ Client-side "admin panel" with no security
- ❌ Sensitive data (IC, DOB) collected insecurely

This platform has:
- ✅ Real Supabase Auth (server-side, hashed passwords, secure sessions)
- ✅ Real PostgreSQL database (leads, clients, enquiries persist forever)
- ✅ Role-based access (Super Admin vs Agent — enforced server-side with RLS)
- ✅ Real email notifications on new leads/enquiries
- ✅ PDPA-compliant consent logging
- ✅ Audit trail
- ✅ "Request Quote" flow instead of fake "Buy Online" checkout
- ✅ No sensitive data collected on public forms

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth + Middleware |
| Styling | Tailwind CSS |
| Email | Resend |
| Hosting | Vercel |
| Validation | Zod |

---

## Deployment Guide (Step by Step)

### Step 1: Create Supabase Project (5 min)

1. Go to [supabase.com](https://supabase.com) → Sign up (free)
2. Click **New Project**
   - Name: `tharmanathan-insurance`
   - Region: **Singapore** (closest to Malaysia)
   - Set a database password (save it!)
3. Wait for project to initialise (~2 min)

### Step 2: Run Database Schema (3 min)

1. In Supabase, go to **SQL Editor** (left sidebar)
2. Click **New Query**
3. Open the file `supabase/schema.sql` from this project
4. Paste the entire contents into the editor
5. Click **Run** (green button)
6. You should see "Success" — all tables, policies, and seed data created

### Step 3: Create Your First Admin User (3 min)

1. In Supabase, go to **Authentication** → **Users** → **Add User**
2. Enter your email + a strong password
3. Click **Create User**
4. Copy the user's UUID from the table
5. Go to **SQL Editor** and run:

```sql
INSERT INTO users (auth_id, email, full_name, role, agent_code, phone)
VALUES (
  'PASTE-UUID-HERE',
  'your@email.com',
  'A. Tharmanathan',
  'super_admin',
  'SA001',
  '+60 12-345 6789'
);
```

6. To add agents, repeat steps 1-5 with `role = 'agent'`

### Step 4: Get API Keys (1 min)

1. In Supabase, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

### Step 5: Push to GitHub (3 min)

1. Create a new GitHub repository (private)
2. Push this project:

```bash
cd tharma-insurance
git init
git add .
git commit -m "Initial commit — full-stack insurance platform"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/tharma-insurance.git
git push -u origin main
```

### Step 6: Deploy to Vercel (5 min)

1. Go to [vercel.com](https://vercel.com) → Sign in with GitHub
2. Click **Add New** → **Project**
3. Import your `tharma-insurance` repository
4. In **Environment Variables**, add:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Your service role key |
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.com` |
| `RESEND_API_KEY` | (optional — for email notifications) |
| `NOTIFICATION_EMAIL` | Your notification email |

5. Click **Deploy**
6. Your site is live at `your-project.vercel.app`!

### Step 7: Connect Domain (5 min)

1. In Vercel → **Settings** → **Domains**
2. Add your domain
3. Update DNS at your registrar:
   - **A record:** `76.76.21.21`
   - **CNAME (www):** `cname.vercel-dns.com`
4. Wait 10-30 minutes for propagation

---

## Architecture

```
src/
├── app/
│   ├── page.tsx                 # Public homepage (server-rendered)
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Tailwind + custom styles
│   ├── privacy/page.tsx         # Privacy policy (PDPA)
│   ├── terms/page.tsx           # Terms of use
│   ├── disclaimer/page.tsx      # Product disclosure
│   ├── api/
│   │   ├── leads/route.ts       # Lead submission API
│   │   ├── enquiries/route.ts   # Enquiry submission API
│   │   └── auth/route.ts        # Auth signout
│   └── admin/
│       ├── login/page.tsx       # Secure login (Supabase Auth)
│       ├── layout.tsx           # Admin sidebar + role check
│       ├── dashboard/page.tsx   # Stats + recent activity
│       ├── leads/page.tsx       # Lead management + status pipeline
│       ├── orders/page.tsx      # Enquiry management
│       ├── clients/page.tsx     # Client CRM + add client
│       ├── agents/page.tsx      # Agent overview + performance
│       └── settings/page.tsx    # Agency config + notifications
├── components/
│   ├── public/                  # 16 marketing site components
│   │   ├── Header.tsx           # Fixed nav with mobile menu
│   │   ├── Hero.tsx             # Value proposition + urgency
│   │   ├── TrustBar.tsx         # Authority badges
│   │   ├── About.tsx            # Vision, Mission, Stats
│   │   ├── Advisor.tsx          # Credentials + compliance
│   │   ├── Calculator.tsx       # Interactive coverage calculator
│   │   ├── LifeStages.tsx       # 4 life-stage segments
│   │   ├── Products.tsx         # Compare + Request Quote flow
│   │   ├── ClaimProcess.tsx     # 3-step visual process
│   │   ├── CaseStudies.tsx      # Illustrative scenarios
│   │   ├── Testimonials.tsx     # From database
│   │   ├── FAQ.tsx              # Accordion
│   │   ├── LeadFunnel.tsx       # 3-step form → API
│   │   ├── KnowledgeHub.tsx     # Blog previews + lead magnet
│   │   ├── Footer.tsx           # SEO + compliance
│   │   └── FloatingCTA.tsx      # WhatsApp + Call + Consult
│   └── admin/                   # Admin UI components
│       ├── LeadsTable.tsx       # Status updates + agent assign
│       ├── EnquiriesTable.tsx   # Enquiry pipeline
│       └── ClientsTable.tsx     # CRM with filters + add
├── lib/
│   ├── supabase.ts              # Browser + service clients
│   └── validations.ts           # Zod schemas
├── types/
│   └── database.ts              # Full TypeScript types
└── middleware.ts                 # Auth guard for /admin/*

supabase/
└── schema.sql                   # 10 tables + RLS + triggers + indexes
```

## User Roles

| Role | Access |
|------|--------|
| **Super Admin** | Everything — all leads, clients, agents, settings, audit logs |
| **Agent** | Own leads, own clients, own enquiries only |
| **Viewer** | Read-only dashboard (future) |

Roles are enforced:
1. **Server-side** via Supabase Row Level Security (RLS)
2. **Middleware** blocks unauthenticated access to `/admin/*`
3. **Layout** hides nav items based on role
4. **API routes** validate on every request

## What's Production-Ready vs TODO

### ✅ Done
- Database schema with all tables, RLS, indexes, triggers
- Supabase Auth integration (real hashed passwords, secure sessions)
- Middleware for route protection on all /admin/* routes
- Admin login page (real auth, not client-side)
- Admin layout with role-based sidebar (Super Admin vs Agent)
- Admin dashboard with live stats from database
- Admin leads management page with status updates + agent assignment
- Admin enquiries management page with status pipeline
- Admin clients CRM with filters, add client form, status badges
- Admin agents overview with client counts + revenue per agent
- Admin settings page (agency details + notifications)
- Lead submission API (Zod validation + consent logging + email notification)
- Enquiry submission API (replaces fake checkout — "Request Quote" flow)
- Products rendered from database (not hardcoded)
- Testimonials rendered from database
- All 16 public page components fully ported from v3 design:
  - Header, Hero, TrustBar, About (Vision/Mission/Stats)
  - Advisor credentials, Calculator (interactive)
  - LifeStages (4 segments), Products (compare + request quote)
  - ClaimProcess (3-step), CaseStudies (compliance-safe language)
  - Testimonials (from DB), FAQ (accordion)
  - LeadFunnel (3-step with real API), KnowledgeHub + lead magnet
  - Footer (SEO keywords + compliance disclaimer), FloatingCTA
- Privacy Policy page (PDPA compliant)
- Terms of Use page
- Product Disclosure & Disclaimer page
- TypeScript types for all database entities
- Zod validation schemas for all form inputs

### 📝 Future Enhancements
- Blog/article detail pages with real content (SEO growth engine)
- GA4 + Meta Pixel integration
- Image uploads for advisor photo
- WhatsApp Business API integration
- Lead scoring and auto-assignment logic
- PDF quote generation
- Appointment booking flow
- Testimonial management in admin

## Security Model

| Threat | Mitigation |
|--------|-----------|
| Hardcoded credentials | Eliminated — Supabase Auth with hashed passwords |
| Client-side role bypass | Server-side RLS + middleware enforcement |
| Data loss on refresh | PostgreSQL database — persistent |
| Sensitive data exposure | No IC/DOB on public forms; only name/phone/email |
| No audit trail | audit_logs table with user, action, timestamp |
| No consent tracking | consent_records table (PDPA compliance) |
| XSS/injection | Zod validation + React auto-escaping |
| Brute force login | Supabase built-in rate limiting |

---

## Local Development

```bash
# Install dependencies
npm install

# Copy env
cp .env.example .env.local
# Fill in your Supabase keys

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

Admin: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

---

© 2026 A Tharmanathan Insurance Agency. All rights reserved.
