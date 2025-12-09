'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit2, Trash2, Loader2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { toast } from 'sonner';
import BlogList from '@/components/admin/BlogList';

interface Blog {
    id: string;
    title: string;
    slug: string;
    published: boolean;
    createdAt: string;
    author: {
        name: string | null;
        email: string;
    };
}

export default function AdminBlogsPage() {
    const router = useRouter();
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState<string | null>(null);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await fetch('/api/admin/blogs', {
                credentials: 'include',
            });
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

    const handleDelete = async (id: string, title: string) => {
        if (!confirm(`Are you sure you want to delete "${title}"?`)) {
            return;
        }

        setDeleting(id);
        try {
            const response = await fetch(`/api/admin/blogs/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (response.ok) {
                toast.success('Blog deleted successfully');
                setBlogs(blogs.filter(blog => blog.id !== id));
            } else {
                toast.error('Failed to delete blog');
            }
        } catch (error) {
            console.error('Delete failed:', error);
            toast.error('Failed to delete blog');
        } finally {
            setDeleting(null);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
                <Link href="/admin/blogs/new">
                    <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2 text-white">
                        <Plus className="w-4 h-4" />
                        Create Blog
                    </Button>
                </Link>
            </div>
            
            {/* The BlogList component will handle the client-side interactions */}
            <BlogList initialBlogs={blogs} />
        </div>
    );
}
