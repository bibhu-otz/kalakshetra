import { NextRequest, NextResponse } from 'next/server';

// Contact form submission schema
interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

// Simple validation
function validateContactForm(data: unknown): data is ContactFormData {
  if (!data || typeof data !== 'object') return false;
  const obj = data as Record<string, unknown>;
  return (
    typeof obj.name === 'string' && obj.name.length >= 2 &&
    typeof obj.email === 'string' && obj.email.includes('@') &&
    typeof obj.subject === 'string' && obj.subject.length >= 5 &&
    typeof obj.message === 'string' && obj.message.length >= 10
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    if (!validateContactForm(body)) {
      return NextResponse.json(
        { error: 'Invalid form data' },
        { status: 400 }
      );
    }

    // In production, you can:
    // 1. Send email using a service like SendGrid, Resend, or Nodemailer
    // 2. Store in database or CMS
    // 3. Forward to a third-party service

    // Example: Log the submission (replace with actual implementation)
    console.log('Contact form submission:', {
      name: body.name,
      email: body.email,
      phone: body.phone,
      subject: body.subject,
      message: body.message,
      timestamp: new Date().toISOString(),
    });

    // For now, we'll simulate success
    // TODO: Implement actual email sending
    // 
    // Example with Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'noreply@kalakshetraodisha.com',
    //   to: process.env.CONTACT_EMAIL || 'kalakshetra@gmail.com',
    //   subject: `Contact Form: ${body.subject}`,
    //   html: `
    //     <h2>New Contact Form Submission</h2>
    //     <p><strong>Name:</strong> ${body.name}</p>
    //     <p><strong>Email:</strong> ${body.email}</p>
    //     <p><strong>Phone:</strong> ${body.phone || 'Not provided'}</p>
    //     <p><strong>Subject:</strong> ${body.subject}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${body.message}</p>
    //   `,
    // });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your message. We will get back to you soon!' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to process your request. Please try again.' },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
