import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminFromCookie } from '@/lib/auth'; // Correctly import getAdminFromCookie

// GET single blog by ID
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        // Use the new authentication check
        const admin = getAdminFromCookie();
        if (!admin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        
        const blog = await prisma.blog.findUnique({
            where: { id: params.id },
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

// UPDATE blog
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        // Use the new authentication check
        const admin = getAdminFromCookie();
        if (!admin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        
        const body = await request.json();
        const { title, slug, content, excerpt, coverImage, published } = body;

        if (!title || !slug || !content) {
            return NextResponse.json(
                { error: 'Title, slug, and content are required' },
                { status: 400 }
            );
        }

        // Check if slug exists for a different blog
        const existingBlog = await prisma.blog.findFirst({
            where: {
                slug,
                NOT: { id: params.id }
            },
        });

        if (existingBlog) {
            return NextResponse.json(
                { error: 'A blog with this slug already exists' },
                { status: 409 } // 409 Conflict is more appropriate
            );
        }

        const updatedBlog = await prisma.blog.update({
            where: { id: params.id },
            data: {
                title,
                slug,
                content,
                excerpt: excerpt || null,
                coverImage: coverImage || null,
                published: published || false,
            },
        });

        return NextResponse.json(updatedBlog);
    } catch (error) {
        console.error('Update blog error:', error);
        return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
    }
}

// DELETE blog
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        // Use the new authentication check
        const admin = getAdminFromCookie();
        if (!admin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        
        await prisma.blog.delete({
            where: { id: params.id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete blog error:', error);
        return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
    }
}