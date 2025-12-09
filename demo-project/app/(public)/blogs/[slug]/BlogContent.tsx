// filepath: d:\Rupesafe-2\project\app\(public)\blogs\[slug]\BlogContent.tsx
'use client';

import { Blog } from '@prisma/client';
import { Calendar, Clock, User as UserIcon, Share2, Copy, ArrowLeft, Send } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// Define a more specific type for the blog prop passed from the server
type BlogWithAuthor = Blog & {
    author: {
        name: string | null;
        image: string | null;
    };
};

// Adjust the type for client-side usage where Date is a string
type ClientBlog = Omit<BlogWithAuthor, 'createdAt' | 'updatedAt'> & {
    createdAt: string;
    updatedAt: string;
};

interface BlogContentProps {
    blog: ClientBlog;
    readingTime: number;
}

export default function BlogContent({ blog, readingTime }: BlogContentProps) {

    const handleShare = async () => {
        const url = window.location.href;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: blog.title,
                    text: blog.excerpt ?? '',
                    url: url,
                });
            } catch (error) {
                // User likely cancelled the share action
            }
        } else {
            copyToClipboard();
        }
    };

    const copyToClipboard = () => {
        const url = window.location.href;
        try {
            navigator.clipboard.writeText(url);
            toast.success('Link copied to clipboard!');
        } catch (error) {
            toast.error('Failed to copy link.');
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div className="bg-white font-sans">
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <article>
                    {/* Header Section */}
                    <header className="mb-8 md:mb-12 text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-4">
                            {blog.title}
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 mt-4 max-w-3xl mx-auto">
                            {blog.excerpt}
                        </p>
                    </header>

                    {/* Meta Info Section */}
                    <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4 mb-8 md:mb-12 border-y border-slate-200 py-4">
                        <div className="flex items-center gap-2 text-slate-600">
                            <UserIcon className="w-5 h-5" />
                            <span className="font-medium text-slate-800">{blog.author?.name || 'Rupesafe Team'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                            <Calendar className="w-5 h-5" />
                            <span>{formatDate(blog.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                            <Clock className="w-5 h-5" />
                            <span>{readingTime} min read</span>
                        </div>
                        <button
                            onClick={handleShare}
                            className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors duration-200"
                            aria-label="Share post"
                        >
                            <Share2 className="w-5 h-5" />
                            <span>Share</span>
                        </button>
                    </div>

                    {/* Cover Image */}
                    {blog.coverImage && (
                        <div className="mb-8 md:mb-12 rounded-2xl overflow-hidden shadow-lg">
                            <img
                                src={blog.coverImage}
                                alt={blog.title}
                                className="w-full h-auto object-cover"
                                width={1200}
                                height={630}
                            />
                        </div>
                    )}

                    {/* Blog Content */}
                    <div
                        className="prose prose-xl max-w-none mx-auto 
                                   prose-p:text-slate-800 prose-p:leading-loose prose-p:tracking-normal
                                   prose-headings:text-slate-900 prose-headings:font-bold
                                   prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                                   prose-strong:text-slate-900
                                   prose-blockquote:border-l-blue-500 prose-blockquote:text-slate-600
                                   prose-code:bg-slate-100 prose-code:p-1 prose-code:rounded-md prose-code:font-mono
                                   prose-li:marker:text-blue-600"
                        dangerouslySetInnerHTML={{ __html: blog.content || '' }}
                    />
                </article>

                {/* --- NEW: Action Section --- */}
                <section className="mt-16 pt-12 border-t-2 border-dashed">
                    <div className="bg-slate-50 rounded-2xl p-8 text-center">
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                            Thanks for reading!
                        </h3>
                        <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                            If you enjoyed this article, check out our other posts or get in touch with us.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                            <Button onClick={copyToClipboard} variant="outline" size="lg">
                                <Copy className="w-5 h-5 mr-2" />
                                Copy Link
                            </Button>
                            <Link href="/blogs" passHref>
                                <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6">
                                    <ArrowLeft className="w-5 h-5 mr-2" />
                                    View All Blogs
                                </Button>
                            </Link>
                            <Link href="/contact" passHref>
                                <Button variant="outline" size="lg">
                                    <Send className="w-5 h-5 mr-2" />
                                    Contact Us
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
