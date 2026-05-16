import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    // ==================================================================
    // INTEGRATION OPTIONS — uncomment the one you want to use:
    //
    // Option 1: Mailchimp
    // const response = await fetch(
    //   `https://${process.env.MAILCHIMP_SERVER}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members`,
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Basic ${Buffer.from(`anystring:${process.env.MAILCHIMP_API_KEY}`).toString('base64')}`,
    //     },
    //     body: JSON.stringify({ email_address: email, status: 'subscribed' }),
    //   }
    // );
    //
    // Option 2: ConvertKit
    // const response = await fetch(
    //   `https://api.convertkit.com/v3/forms/${process.env.CONVERTKIT_FORM_ID}/subscribe`,
    //   {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ api_key: process.env.CONVERTKIT_API_KEY, email }),
    //   }
    // );
    //
    // Option 3: Resend
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.contacts.create({ email, audienceId: process.env.RESEND_AUDIENCE_ID });
    // ==================================================================

    // For now: log and return success
    console.log('Newsletter subscription:', email);

    return NextResponse.json({ success: true, message: 'Subscribed!' });
  } catch (error) {
    console.error('Newsletter error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
