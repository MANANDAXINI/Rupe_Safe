import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

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

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, logo } = body;

        if (!name) {
            return NextResponse.json({ error: 'Name is required' }, { status: 400 });
        }

        const partner = await prisma.partner.create({
            data: {
                name,
                logo,
            },
        });

        return NextResponse.json(partner);
    } catch (error) {
        console.error('Create partner error:', error);
        return NextResponse.json({ error: 'Failed to create partner' }, { status: 500 });
    }
}
