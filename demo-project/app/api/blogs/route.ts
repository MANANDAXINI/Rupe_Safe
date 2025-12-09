import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const blogs = await prisma.blog.findMany({
            where: { published: true },
            orderBy: { createdAt: 'desc' },
            include: {
                author: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
        });
        return NextResponse.json(blogs);
    } catch (error) {
        console.error('Fetch blogs error:', error);
        return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
    }
}