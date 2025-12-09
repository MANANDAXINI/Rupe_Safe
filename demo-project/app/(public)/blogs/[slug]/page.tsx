import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import BlogContent from './BlogContent';

const prisma = new PrismaClient();

interface BlogPageProps {
    params: {
        slug: string;
    };
}

async function getBlogBySlug(slug: string) {
    try {
        const blog = await prisma.blog.findUnique({
            where: { slug, published: true },
            include: {
                author: {
                    select: {
                        name: true,
                        image: true,
                    },
                },
            },
        });
        return blog;
    } catch (error)
    {
        console.error("Error fetching blog:", error);
        return null;
    }
}

// Function to estimate reading time
const getReadingTime = (content: string) => {
    if (!content) return 0;
    const wordsPerMinute = 200;
    const textLength = content.trim().split(/\s+/).length;
    return Math.ceil(textLength / wordsPerMinute);
};

export async function generateMetadata({ params }: BlogPageProps) {
    const blog = await getBlogBySlug(params.slug);

    if (!blog) {
        return {
            title: 'Blog Not Found',
        };
    }

    return {
        title: blog.title,
        description: blog.excerpt,
        openGraph: {
            title: blog.title,
            description: blog.excerpt,
            images: blog.coverImage ? [blog.coverImage] : [],
        },
    };
}

export default async function BlogPage({ params }: BlogPageProps) {
    const blog = await getBlogBySlug(params.slug);

    if (!blog) {
        notFound();
    }

    const readingTime = getReadingTime(blog.content || '');

    // The server component now renders the client component with the fetched data
    // Using 'as any' to resolve the Date vs string type issue between server and client
    return <BlogContent blog={blog as any} readingTime={readingTime} />;
}