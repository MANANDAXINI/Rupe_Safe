import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const partner = await prisma.partner.findUnique({
            where: { id: params.id },
        });

        if (!partner) {
            return NextResponse.json({ error: 'Partner not found' }, { status: 404 });
        }

        return NextResponse.json(partner);
    } catch (error) {
        console.error('Fetch partner error:', error);
        return NextResponse.json({ error: 'Failed to fetch partner' }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();
        const { name, logo } = body;

        const partner = await prisma.partner.update({
            where: { id: params.id },
            data: {
                name,
                logo,
            },
        });

        return NextResponse.json(partner);
    } catch (error) {
        console.error('Update partner error:', error);
        return NextResponse.json({ error: 'Failed to update partner' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.partner.delete({
            where: { id: params.id },
        });

        return NextResponse.json({ message: 'Partner deleted successfully' });
    } catch (error) {
        console.error('Delete partner error:', error);
        return NextResponse.json({ error: 'Failed to delete partner' }, { status: 500 });
    }
}
