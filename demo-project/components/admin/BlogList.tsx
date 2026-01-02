'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Edit2, Trash2, Loader2, Eye, EyeOff, Plus, FileText } from 'lucide-react';
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
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        setBlogs(blogs.filter(blog => blog.id !== id));
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
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (blogs.length === 0) {
    return (
      <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
          <FileText className="w-8 h-8 text-gray-300" />
        </div>
        <h2 className="text-lg font-bold text-gray-900">No blog posts found</h2>
        <p className="text-gray-500 mt-1 max-w-xs mx-auto">Get started by creating your first article to engage with your audience.</p>
        <Link href="/admin/blogs/new" className="mt-6 inline-block">
          <Button className="bg-black hover:bg-gray-800 text-white rounded-full px-8">
            <Plus className="w-4 h-4 mr-2" />
            Create Blog
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative group max-w-md">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-black transition-colors">
          <Plus className="w-4 h-4 rotate-45" />
        </div>
        <input
          type="text"
          placeholder="Search articles..."
          className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-8 py-4 text-left text-[11px] font-bold text-gray-400 uppercase tracking-widest">Article Details</th>
                <th className="px-8 py-4 text-left text-[11px] font-bold text-gray-400 uppercase tracking-widest">Visibility</th>
                <th className="px-8 py-4 text-left text-[11px] font-bold text-gray-400 uppercase tracking-widest">Created On</th>
                <th className="px-8 py-4 text-right text-[11px] font-bold text-gray-400 uppercase tracking-widest">Manage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredBlogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{blog.title}</span>
                      <span className="text-[11px] font-medium text-gray-400 font-mono tracking-tight">/blogs/{blog.slug}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${blog.published
                      ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                      : 'bg-gray-100 text-gray-500 border border-gray-200'
                      }`}>
                      <div className={`w-1 h-1 rounded-full mr-1.5 ${blog.published ? 'bg-emerald-600 animate-pulse' : 'bg-gray-400'}`} />
                      {blog.published ? 'Public' : 'Draft'}
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm font-medium text-gray-500">{formatDate(blog.createdAt)}</td>
                  <td className="px-8 py-5">
                    <div className="flex justify-end items-center gap-1.5">
                      <Link href={`/admin/blogs/edit/${blog.id}`}>
                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-gray-400 hover:text-black hover:bg-white border border-transparent hover:border-gray-100 shadow-none hover:shadow-sm transition-all">
                          <Edit2 className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(blog.id, blog.title)}
                        disabled={deleting === blog.id}
                        className="h-9 w-9 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                      >
                        {deleting === blog.id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="w-3.5 h-3.5" />
                        )}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredBlogs.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-8 py-10 text-center text-gray-400 font-medium">
                    No articles matching your search
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
