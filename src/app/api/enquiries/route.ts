import { NextRequest, NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/supabase';
import { enquirySchema } from '@/lib/validations';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = enquirySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const supabase = createServiceSupabase();

    const { data: enquiry, error } = await supabase
      .from('enquiries')
      .insert({
        full_name: parsed.data.full_name,
        phone: parsed.data.phone,
        email: parsed.data.email || null,
        product_interests: parsed.data.product_interests,
        message: parsed.data.message || null,
        source: 'website',
        status: 'new',
      })
      .select('reference_code')
      .single();

    if (error) {
      console.error('Enquiry insert error:', error);
      return NextResponse.json({ error: 'Failed to submit' }, { status: 500 });
    }

    // Log consent
    await supabase.from('consent_records').insert({
      entity_type: 'enquiry',
      entity_id: enquiry.reference_code,
      consent_type: 'contact_consent',
      consented: true,
      ip_address: request.headers.get('x-forwarded-for') || 'unknown',
      user_agent: request.headers.get('user-agent') || 'unknown',
    });

    // Email notification
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);
        const plans = parsed.data.product_interests.map(p => p.name).join(', ');
        await resend.emails.send({
          from: 'notifications@tharmanathan.com',
          to: process.env.NOTIFICATION_EMAIL || 'admin@tharmanathan.com',
          subject: `New Enquiry: ${parsed.data.full_name} — ${plans} [${enquiry.reference_code}]`,
          html: `
            <h2>New Product Enquiry</h2>
            <p><strong>Ref:</strong> ${enquiry.reference_code}</p>
            <p><strong>Name:</strong> ${parsed.data.full_name}</p>
            <p><strong>Phone:</strong> ${parsed.data.phone}</p>
            <p><strong>Plans:</strong> ${plans}</p>
            <p><strong>Message:</strong> ${parsed.data.message || 'None'}</p>
          `,
        });
      } catch (e) { console.error('Email failed:', e); }
    }

    return NextResponse.json({
      success: true,
      reference: enquiry.reference_code,
      message: 'Your enquiry has been received. A licensed advisor will reach out, usually within business hours.',
    });
  } catch (err) {
    console.error('Enquiry API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
