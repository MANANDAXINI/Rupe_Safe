import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      firstName,
      lastName,
      email,
      phone,
      subject,
      service,
      message,
      source = 'website',
    } = body;

    const fullName =
      (typeof name === 'string' && name.trim()) ||
      [firstName, lastName].filter(Boolean).map((v: string) => v.trim()).join(' ').trim();

    const cleanEmail = typeof email === 'string' ? email.trim() : '';
    const cleanMessage = typeof message === 'string' ? message.trim() : '';

    if (!fullName || !cleanEmail || !cleanMessage) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 });
    }

    const data = {
      name: fullName,
      email: cleanEmail,
      phone: typeof phone === 'string' && phone.trim() ? phone.trim() : null,
      subject: typeof subject === 'string' && subject.trim() ? subject.trim() : null,
      service: typeof service === 'string' && service.trim() ? service.trim() : null,
      message: cleanMessage,
      source: typeof source === 'string' && source.trim() ? source.trim() : 'website',
    };

    const prismaAny = prisma as any;

    try {
      const model = prismaAny.contactSubmission;
      if (model) {
        const submission = await model.create({ data });
        return NextResponse.json(submission, { status: 201 });
      }
    } catch (prismaErr) {
      console.error('Prisma ContactSubmission create failed:', prismaErr);
    }

    // Fallback if client is stale / table missing from generated client
    const id = `cl${Math.random().toString(36).substring(2, 23)}`;
    await prisma.$executeRaw`
      INSERT INTO "ContactSubmission" (
        "id", "name", "email", "phone", "subject", "service", "message", "source", "createdAt", "updatedAt"
      ) VALUES (
        ${id}, ${data.name}, ${data.email}, ${data.phone}, ${data.subject}, ${data.service},
        ${data.message}, ${data.source}, NOW(), NOW()
      )
    `;

    return NextResponse.json({ id, ...data }, { status: 201 });
  } catch (error: any) {
    console.error('Contact submission error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error?.message },
      { status: 500 }
    );
  }
}
