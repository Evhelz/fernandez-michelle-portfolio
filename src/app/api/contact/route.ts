import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    // Get the API key inside the handler – it will be available at runtime
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const { name, email, subject, message } = await request.json();

    // Validate fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // Create the Resend instance here (inside the handler)
    const resend = new Resend(resendApiKey);

    await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: 'fernandezmichellet@gmail.com',
      reply_to: email,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <h2>New message from ${name}</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr />
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}