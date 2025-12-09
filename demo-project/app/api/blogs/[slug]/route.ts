import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    request: Request,
    { params }: { params: { slug: string } }
) {
    try {
        const blog = await prisma.blog.findUnique({
            where: { 
                slug: params.slug,
                published: true 
            },
            include: {
                author: {
                    select: {
                        name: true,
                        email: true,
                        image: true,
                    },
                },
            },
        });

        if (!blog) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }

        return NextResponse.json(blog);
    } catch (error) {
        console.error('Fetch blog error:', error);
        return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
    }
}