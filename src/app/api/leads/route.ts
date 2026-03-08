import { NextRequest, NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase';
import { leadSchema } from '@/lib/validations';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Server-side validation
    const parsed = leadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const supabase = createServiceSupabase();

    // Insert lead
    const { data: lead, error } = await supabase
      .from('leads')
      .insert({
        full_name: parsed.data.full_name,
        phone: parsed.data.phone,
        email: parsed.data.email || null,
        age: parsed.data.age || null,
        family_size: parsed.data.family_size || null,
        monthly_budget: parsed.data.monthly_budget || null,
        interests: parsed.data.interests,
        preferred_contact_time: parsed.data.preferred_contact_time || null,
        source: 'website',
        status: 'new',
      })
      .select('reference_code')
      .single();

    if (error) {
      console.error('Lead insert error:', error);
      return NextResponse.json({ error: 'Failed to submit' }, { status: 500 });
    }

    // Log consent
    await supabase.from('consent_records').insert({
      entity_type: 'lead',
      entity_id: lead.reference_code,
      consent_type: 'contact_consent',
      consented: true,
      ip_address: request.headers.get('x-forwarded-for') || 'unknown',
      user_agent: request.headers.get('user-agent') || 'unknown',
    });

    // Optional: Send email notification via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: 'notifications@tharmanathan.com',
          to: process.env.NOTIFICATION_EMAIL || 'admin@tharmanathan.com',
          subject: `New Lead: ${parsed.data.full_name} [${lead.reference_code}]`,
          html: `
            <h2>New Assessment Request</h2>
            <p><strong>Ref:</strong> ${lead.reference_code}</p>
            <p><strong>Name:</strong> ${parsed.data.full_name}</p>
            <p><strong>Phone:</strong> ${parsed.data.phone}</p>
            <p><strong>Email:</strong> ${parsed.data.email || 'N/A'}</p>
            <p><strong>Interests:</strong> ${parsed.data.interests.join(', ')}</p>
            <p><strong>Budget:</strong> RM ${parsed.data.monthly_budget || 'Not specified'}/month</p>
            <p><strong>Contact Time:</strong> ${parsed.data.preferred_contact_time || 'Any'}</p>
          `,
        });
      } catch (e) { console.error('Email notification failed:', e); }
    }

    return NextResponse.json({
      success: true,
      reference: lead.reference_code,
      message: 'Your assessment request has been received. We will reach out, usually within business hours.',
    });

  } catch (err) {
    console.error('Lead API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
