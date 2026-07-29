import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminFromCookie } from '@/lib/auth';

export const dynamic = 'force-dynamic';

function escapeCsv(value: unknown) {
  const str = value == null ? '' : String(value);
  if (/[",\n\r]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export async function GET() {
  try {
    const admin = getAdminFromCookie();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let submissions: any[] = [];
    const prismaAny = prisma as any;

    try {
      const model = prismaAny.contactSubmission;
      if (model) {
        submissions = await model.findMany({
          orderBy: { createdAt: 'desc' },
        });
      }
    } catch (prismaErr) {
      console.error('Prisma ContactSubmission export failed:', prismaErr);
    }

    if (!submissions.length) {
      submissions = await prisma.$queryRawUnsafe(`
        SELECT * FROM "ContactSubmission"
        ORDER BY "createdAt" DESC
      `);
    }

    const headers = [
      'Name',
      'Email',
      'Phone',
      'Subject',
      'Service',
      'Message',
      'Source',
      'Submitted At',
    ];

    const rows = submissions.map((item) => [
      escapeCsv(item.name),
      escapeCsv(item.email),
      escapeCsv(item.phone),
      escapeCsv(item.subject),
      escapeCsv(item.service),
      escapeCsv(item.message),
      escapeCsv(item.source),
      escapeCsv(
        item.createdAt
          ? new Date(item.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
          : ''
      ),
    ]);

    // BOM helps Excel open UTF-8 correctly
    const csvContent = `\uFEFF${[headers.join(','), ...rows.map((r) => r.join(','))].join('\n')}`;
    const filename = `contact_submissions_${new Date().toISOString().split('T')[0]}.csv`;

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error('Export contact submissions error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
