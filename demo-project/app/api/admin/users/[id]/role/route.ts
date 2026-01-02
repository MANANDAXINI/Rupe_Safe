import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminFromCookie } from '@/lib/auth';

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const admin = getAdminFromCookie();
        if (!admin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { isAdmin } = body;

        if (typeof isAdmin !== 'boolean') {
            return NextResponse.json({ error: 'Missing isAdmin status' }, { status: 400 });
        }

        // Prevent admin from de-activating themselves unless there's another admin?
        // For simplicity, we'll just allow it for now, but usually you'd check this.

        const updatedUser = await prisma.user.update({
            where: { id: params.id },
            data: { isAdmin },
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error('Update user role error:', error);
        return NextResponse.json({ error: 'Failed to update user role' }, { status: 500 });
    }
}
