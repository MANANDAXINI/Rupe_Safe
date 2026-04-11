import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Public endpoint — no auth required
export async function GET() {
    if (!process.env.DATABASE_URL) {
        return NextResponse.json([]);
    }

    try {
        const services = await prisma.service.findMany({
            orderBy: { createdAt: 'asc' },
            select: {
                id: true,
                title: true,
                slug: true,
                description: true,
                icon: true,
                image: true,
                features: true,
            },
        });
        return NextResponse.json(services);
    } catch (error) {
        console.error('Public services fetch error:', error);
        return NextResponse.json([], { status: 200 });
    }
}
