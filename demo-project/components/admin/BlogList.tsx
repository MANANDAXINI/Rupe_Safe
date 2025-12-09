'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Edit2, Trash2, Loader2, Eye, EyeOff, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

// Define the type for a single blog post, including the author
type Blog = {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  createdAt: string;
  author: {
    name: string | null;
    email: string;
  };
};

interface BlogListProps {
  initialBlogs: Blog[];
}

export default function BlogList({ initialBlogs }: BlogListProps) {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
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
        // Remove the blog from the local state to update the UI instantly
        setBlogs(blogs.filter(blog => blog.id !== id));
        // Optionally, refresh from server to ensure consistency
        router.refresh();
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || 'Failed to delete blog');
      }
    } catch (error) {
      console.error('Delete failed:', error);
      toast.error('An unexpected error occurred while deleting the blog.');
    } finally {
      setDeleting(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (blogs.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700">No Blogs Found</h2>
        <p className="text-gray-500 mt-2">Get started by creating your first blog post.</p>
        <Link href="/admin/blogs/new" className="mt-4 inline-block">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Blog
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Title</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date Created</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {blogs.map((blog) => (
              <tr key={blog.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{blog.title}</div>
                  <div className="text-sm text-gray-500">/blogs/{blog.slug}</div>
                </td>
                <td className="px-6 py-4">
                  <Badge variant={blog.published ? 'default' : 'secondary'} className={blog.published ? 'bg-green-100 text-green-800' : ''}>
                    {blog.published ? (
                      <Eye className="w-3 h-3 mr-1.5" />
                    ) : (
                      <EyeOff className="w-3 h-3 mr-1.5" />
                    )}
                    {blog.published ? 'Published' : 'Draft'}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{formatDate(blog.createdAt)}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end items-center gap-2">
                    <Link href={`/admin/blogs/edit/${blog.id}`}>
                      <Button variant="outline" size="sm" className="flex items-center gap-1.5">
                        <Edit2 className="w-3.5 h-3.5" />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(blog.id, blog.title)}
                      disabled={deleting === blog.id}
                      className="flex items-center gap-1.5"
                    >
                      {deleting === blog.id ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="w-3.5 h-3.5" />
                      )}
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
