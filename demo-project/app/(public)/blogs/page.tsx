'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Calendar, User, Share2, Loader2, Rss, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

interface Blog {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    coverImage: string | null;
    createdAt: string;
    author: {
        name: string | null;
        email: string;
    };
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function BlogsPage() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await fetch('/api/blogs');
            if (response.ok) {
                const data = await response.json();
                setBlogs(data);
            }
        } catch (error) {
            console.error('Failed to fetch blogs:', error);
            toast.error('Failed to load blogs');
        } finally {
            setLoading(false);
        }
    };

    const handleShare = async (e: React.MouseEvent, blog: Blog) => {
        e.preventDefault(); // Prevent link navigation when clicking share
        const url = `${window.location.origin}/blogs/${blog.slug}`;
        
        if (navigator.share) {
            try {
                await navigator.share({
                    title: blog.title,
                    text: blog.excerpt || blog.title,
                    url: url,
                });
                toast.success('Shared successfully!');
            } catch (error) {
                // User cancelled share
            }
        } else {
            try {
                await navigator.clipboard.writeText(url);
                toast.success('Link copied to clipboard!');
            } catch (error) {
                toast.error('Failed to copy link');
            }
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <main className="min-h-screen bg-white font-sans selection:bg-blue-100">
            
            {/* 1. Hero Section */}
            <section className="relative pt-40 pb-28 overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50 rounded-full blur-3xl -mr-40 -mt-40 opacity-70 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gray-100 rounded-full blur-3xl -ml-20 -mb-20 opacity-70 pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="flex flex-col items-center"
                    >
                        <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-8">
                            <Rss className="w-5 h-5 text-blue-600" />
                            <span className="text-sm font-semibold text-blue-700">Our Blog</span>
                        </motion.div>

                        <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6 max-w-4xl">
                            Insights, Stories, and <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                                Tech Trends
                            </span>
                        </motion.h1>

                        <motion.p variants={fadeInUp} className="text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed">
                            Explore our latest articles on technology, business, and innovation. Stay ahead of the curve with expert analysis and practical tips.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* 2. Blogs Grid */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
                        </div>
                    ) : blogs.length === 0 ? (
                        <div className="text-center py-20">
                            <h2 className="text-2xl font-semibold text-gray-700">No blogs published yet.</h2>
                            <p className="text-gray-500 mt-2">Check back soon for new articles!</p>
                        </div>
                    ) : (
                        <motion.div 
                            className="grid grid-cols-1 md:grid-cols-2 gap-12"
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                        >
                            {blogs.map((blog) => (
                                <motion.div key={blog.id} variants={cardVariants}>
                                    <Link href={`/blogs/${blog.slug}`} passHref>
                                        <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 h-full flex flex-col border-4 border-blue-600 overflow-hidden">
                                            {blog.coverImage && (
                                                <div className="overflow-hidden">
                                                    <img 
                                                        src={blog.coverImage} 
                                                        alt={blog.title} 
                                                        className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500" 
                                                    />
                                                </div>
                                            )}
                                            <div className="p-8 flex flex-col flex-grow">
                                                <h2 className="text-2xl font-bold text-slate-800 mb-4 line-clamp-2 group-hover:text-blue-700 transition-colors duration-300">{blog.title}</h2>
                                                <p className="text-slate-600 text-lg line-clamp-3 mb-6 flex-grow">{blog.excerpt}</p>
                                                
                                                <div className="flex items-center text-base text-slate-500 space-x-6 mt-auto mb-6">
                                                    <div className="flex items-center gap-2">
                                                        <User className="w-5 h-5" />
                                                        <span className="font-medium">{blog.author.name || 'Admin'}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="w-5 h-5" />
                                                        <span>{formatDate(blog.createdAt)}</span>
                                                    </div>
                                                </div>

                                                <div className="flex justify-between items-center mt-4 border-t pt-6">
                                                    <div className="flex items-center text-blue-600 font-bold text-lg">
                                                        Read More
                                                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1.5 transition-transform duration-300" />
                                                    </div>
                                                    <Button 
                                                        variant="ghost" 
                                                        size="icon" 
                                                        onClick={(e) => handleShare(e, blog)}
                                                        className="rounded-full w-12 h-12 hover:bg-blue-100"
                                                    >
                                                        <Share2 className="w-6 h-6 text-slate-500 hover:text-blue-600" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </section>
        </main>
    );
}