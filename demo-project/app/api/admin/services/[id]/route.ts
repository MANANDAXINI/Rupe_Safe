import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await requireAdmin();
        const service = await prisma.service.findUnique({
            where: { id: params.id },
        });

        if (!service) {
            return NextResponse.json({ error: 'Service not found' }, { status: 404 });
        }

        return NextResponse.json(service);
    } catch (error) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await requireAdmin();
        const body = await request.json();
        const { title, description, icon, features } = body;

        const service = await prisma.service.update({
            where: { id: params.id },
            data: {
                title,
                description,
                icon: icon || null,
                features: features || [],
            },
        });

        return NextResponse.json(service);
    } catch (error) {
        console.error('Update service error:', error);
        return NextResponse.json(
            { error: 'Failed to update service' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await requireAdmin();
        await prisma.service.delete({
            where: { id: params.id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete service error:', error);
        return NextResponse.json(
            { error: 'Failed to delete service' },
            { status: 500 }
        );
    }
}
