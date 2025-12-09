import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminFromCookie } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// GET all blogs for the admin panel
export async function GET(request: NextRequest) {
    // Safety check for build time
    if (!process.env.DATABASE_URL) {
        return NextResponse.json([]);
    }

    try {
        // The middleware already protects this route, so we can proceed.
        // We can optionally check for the admin again for belt-and-suspenders security.
        const admin = getAdminFromCookie();
        if (!admin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const blogs = await prisma.blog.findMany({
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
        console.error('Failed to fetch blogs:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// CREATE a new blog post
export async function POST(request: NextRequest) {
    try {
        // 1. Get the admin details from our secure 'admin-token' cookie.
        const admin = getAdminFromCookie();
        if (!admin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // 2. Find the user in the database corresponding to the admin's email.
        // This is crucial to get the `authorId`.
        const author = await prisma.user.findUnique({
            where: { email: admin.email },
        });

        // 3. Double-check if the user exists and is marked as an admin in the database.
        if (!author || !author.isAdmin) {
            return NextResponse.json({ error: 'Forbidden: Admin user not found in database or lacks admin privileges.' }, { status: 403 });
        }

        const body = await request.json();
        const { title, slug, content, excerpt, coverImage, published } = body;

        // 4. Validate the incoming data.
        if (!title || !slug || !content) {
            return NextResponse.json({ error: 'Title, slug, and content are required.' }, { status: 400 });
        }

        const formattedSlug = slug.trim().toLowerCase();

        // 5. Check for slug uniqueness to prevent duplicate URLs.
        const existingBlog = await prisma.blog.findUnique({
            where: { slug: formattedSlug },
        });

        if (existingBlog) {
            return NextResponse.json({ error: 'A blog with this slug already exists.' }, { status: 409 }); // 409 Conflict is more appropriate
        }

        // 6. Create the blog post with the correct authorId.
        const newBlog = await prisma.blog.create({
            data: {
                title: title.trim(),
                slug: formattedSlug,
                content: content,
                excerpt: excerpt?.trim() || null,
                coverImage: coverImage || null,
                published: published === true,
                authorId: author.id, // Use the ID from the user found in the database.
            },
        });

        return NextResponse.json(newBlog, { status: 201 });

    } catch (error: any) {
        console.error('Failed to create blog:', error);
        // Handle potential database errors, like a race condition on slug creation.
        if (error.code === 'P2002') {
            return NextResponse.json({ error: 'A blog with this slug already exists.' }, { status: 409 });
        }
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
