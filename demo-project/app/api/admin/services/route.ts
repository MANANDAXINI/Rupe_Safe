import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
    // Safety check for build time
    if (!process.env.DATABASE_URL) {
        return NextResponse.json([]);
    }

    try {
        await requireAdmin();
        const services = await prisma.service.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(services);
    } catch (error) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
}

export async function POST(request: NextRequest) {
    try {
        await requireAdmin();
        const body = await request.json();
        const { title, description, icon, features } = body;

        if (!title || !description) {
            return NextResponse.json(
                { error: 'Title and description are required' },
                { status: 400 }
            );
        }

        const service = await prisma.service.create({
            data: {
                title,
                description,
                icon: icon || null,
                features: features || [],
            },
        });

        return NextResponse.json(service, { status: 201 });
    } catch (error) {
        console.error('Create service error:', error);
        return NextResponse.json(
            { error: 'Failed to create service' },
            { status: 500 }
        );
    }
}
