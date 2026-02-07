import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const partners = await prisma.partner.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(partners);
    } catch (error) {
        console.error('Fetch partners error:', error);
        return NextResponse.json({ error: 'Failed to fetch partners' }, { status: 500 });
    }
}
