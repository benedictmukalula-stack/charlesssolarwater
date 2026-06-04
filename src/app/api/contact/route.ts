import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, service, message } = body;

    // Validate required fields
    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: 'Name, email, service, and message are required.' },
        { status: 400 }
      );
    }

    // Persist to database
    await db.contactSubmission.create({
      data: { name, email, phone: phone || null, service, message },
    });

    return NextResponse.json({
      success: true,
      message: 'Your inquiry has been received. Our engineering team will respond within 24 hours.',
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to process your request. Please try again.' },
      { status: 500 }
    );
  }
}
