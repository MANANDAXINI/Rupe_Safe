import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminFromCookie } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const admin = getAdminFromCookie();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const prismaAny = prisma as any;

    try {
      const model = prismaAny.contactSubmission;
      if (model) {
        const submissions = await model.findMany({
          orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(submissions);
      }
    } catch (prismaErr) {
      console.error('Prisma ContactSubmission fetch failed:', prismaErr);
    }

    const rawData: any[] = await prisma.$queryRawUnsafe(`
      SELECT * FROM "ContactSubmission"
      ORDER BY "createdAt" DESC
    `);

    return NextResponse.json(rawData);
  } catch (error) {
    console.error('Fetch contact submissions error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
