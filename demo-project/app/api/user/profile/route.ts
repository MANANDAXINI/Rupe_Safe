import { NextResponse } from 'next/server';
import { getUserFromCookie } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const user = await getUserFromCookie();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const fullUser = await prisma.user.findUnique({
            where: { id: user.id },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                phone: true,
                company: true,
                bio: true,
                isAdmin: true,
                createdAt: true,
            }
        });

        return NextResponse.json(fullUser);
    } catch (error) {
        console.error('Profile fetch failed:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        const user = await getUserFromCookie();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { name, phone, company, bio } = body;

        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: {
                name,
                phone,
                company,
                bio,
            },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                phone: true,
                company: true,
                bio: true,
                isAdmin: true,
            }
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error('Profile update failed:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
