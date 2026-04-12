// filepath: d:\Rupexa Private Limited\project\app\(public)\blogs\[slug]\BlogContent.tsx
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
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <article>
                    {/* Header Section */}
                    <header className="mb-8 md:mb-12 text-left">
                        <h1 className="text-4xl md:text-5xl font-semibold text-[#192839] leading-tight mb-4">
                            {blog.title}
                        </h1>
                            <p className="text-[16px] text-[#40566d] mt-4 max-w-4xl leading-relaxed">
                            {blog.excerpt}
                        </p>
                    </header>

                    {/* Meta Info Section */}
                    <div className="flex flex-wrap justify-start items-center gap-x-6 gap-y-4 mb-8 md:mb-12 border-y border-slate-200 py-4">
                        <div className="flex items-center gap-2 text-slate-600">
                            <UserIcon className="w-5 h-5" />
                            <span className="font-medium text-slate-800">{blog.author?.name || 'Rupexa Private Limited Team'}</span>
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
                        <div className="mb-8 md:mb-12 rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
                            <img
                                src={blog.coverImage}
                                alt={blog.title}
                                className="w-full h-auto max-h-[500px] object-cover"
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

                <section className="mt-16 relative bg-gradient-to-br from-blue-700 to-indigo-800 rounded-2xl p-12 overflow-hidden">
                    <div className="absolute -top-10 -left-10 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="relative z-10 text-center">
                        <h3 className="text-[24px] font-semibold text-white mb-3">
                            Thanks for reading!
                        </h3>
                        <p className="text-blue-100 text-[15px] mb-8 max-w-xl mx-auto">
                            If you enjoyed this article, check out our other posts or get in touch with us.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
                            <Link href="/blogs" passHref>
                                <button className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-blue-600 font-medium px-6 py-2.5 text-[14px] transition-colors rounded-lg">
                                    <ArrowLeft className="w-4 h-4" />
                                    View All Blogs
                                </button>
                            </Link>
                            <button
                                onClick={copyToClipboard}
                                className="inline-flex items-center gap-2 border border-white/40 hover:border-white/70 text-white font-medium px-6 py-2.5 text-[14px] transition-all rounded-lg"
                            >
                                <Copy className="w-4 h-4" />
                                Copy Link
                            </button>
                            <Link href="/contact" passHref>
                                <button className="inline-flex items-center gap-2 border border-white/40 hover:border-white/70 text-white font-medium px-6 py-2.5 text-[14px] transition-all rounded-lg">
                                    <Send className="w-4 h-4" />
                                    Contact Us
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            {/* Bottom CTA Strip */}
            <section className="relative bg-gradient-to-br from-blue-700 to-indigo-800 py-14 overflow-hidden">
                <div className="absolute -top-16 -left-16 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <h3 className="text-[22px] font-semibold text-white mb-2">Ready to transform your business?</h3>
                    <p className="text-blue-100 text-[14px] mb-7">Connect with the Rupexa team and discover how we can help you grow.</p>
                    <Link href="/contact" className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-blue-600 font-medium px-6 py-2.5 text-[14px] transition-colors rounded-lg">
                        Get In Touch <ArrowLeft className="w-4 h-4 rotate-180" />
                    </Link>
                </div>
            </section>
        </div>
    );
}
