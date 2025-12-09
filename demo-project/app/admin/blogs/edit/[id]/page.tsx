'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Loader2, Upload, X } from 'lucide-react';
import Link from 'next/link';
import { RichTextEditor } from '@/components/admin/RichTextEditor';
import { toast } from 'sonner';

export default function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        content: '',
        excerpt: '',
        coverImage: '',
        published: false,
    });

    useEffect(() => {
        async function fetchBlog() {
            try {
                const response = await fetch(`/api/admin/blogs/${id}`, {
                    credentials: 'include',
                });
                if (response.ok) {
                    const blog = await response.json();
                    setFormData({
                        title: blog.title,
                        slug: blog.slug,
                        content: blog.content,
                        excerpt: blog.excerpt || '',
                        coverImage: blog.coverImage || '',
                        published: blog.published,
                    });
                    if (blog.coverImage) {
                        setImagePreview(blog.coverImage);
                    }
                } else {
                    toast.error('Failed to load blog');
                    router.push('/admin/blogs');
                }
            } catch (error) {
                console.error('Fetch failed:', error);
                toast.error('Failed to load blog');
                router.push('/admin/blogs');
            } finally {
                setIsLoading(false);
            }
        }

        fetchBlog();
    }, [id, router]);

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    };

    const handleTitleChange = (title: string) => {
        setFormData({
            ...formData,
            title,
            slug: generateSlug(title),
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error('Image size must be less than 5MB');
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result as string;
                setImagePreview(base64);
                setFormData({ ...formData, coverImage: base64 });
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImagePreview(null);
        setFormData({ ...formData, coverImage: '' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.title.trim()) {
            toast.error('Title is required');
            return;
        }
        if (!formData.slug.trim()) {
            toast.error('Slug is required');
            return;
        }
        if (!formData.content.trim() || formData.content === '<p></p>') {
            toast.error('Content is required');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch(`/api/admin/blogs/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toast.success('Blog updated successfully!');
                router.push('/admin/blogs');
                router.refresh();
            } else {
                const error = await response.json();
                toast.error(error.error || 'Failed to update blog');
            }
        } catch (error) {
            console.error('Submit failed:', error);
            toast.error('Failed to update blog');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/blogs">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                </Link>
                <h1 className="text-3xl font-bold text-gray-900">Edit Blog</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Blog Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Title *</Label>
                                    <Input
                                        id="title"
                                        value={formData.title}
                                        onChange={(e) => handleTitleChange(e.target.value)}
                                        placeholder="Enter blog title"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="slug">URL Slug *</Label>
                                    <Input
                                        id="slug"
                                        value={formData.slug}
                                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                        placeholder="my-blog-post"
                                        required
                                    />
                                    <p className="text-sm text-gray-500">
                                        URL: /blogs/{formData.slug || 'your-slug'}
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="excerpt">Excerpt</Label>
                                    <Textarea
                                        id="excerpt"
                                        value={formData.excerpt}
                                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                        placeholder="A short summary of the blog post (shown in blog cards)"
                                        rows={3}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Content *</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <RichTextEditor
                                    content={formData.content}
                                    onChange={(content) => setFormData({ ...formData, content })}
                                    placeholder="Start writing your blog content..."
                                />
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Publish</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="published">Published</Label>
                                    <Switch
                                        id="published"
                                        checked={formData.published}
                                        onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                                    />
                                </div>
                                <p className="text-sm text-gray-500">
                                    {formData.published 
                                        ? 'This blog is visible to the public.' 
                                        : 'This blog is saved as a draft.'}
                                </p>
                                <Button type="submit" disabled={isSubmitting} className="w-full">
                                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Update Blog
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Cover Image</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {imagePreview ? (
                                    <div className="relative">
                                        <img 
                                            src={imagePreview} 
                                            alt="Cover preview" 
                                            className="w-full h-48 object-cover rounded-md" 
                                        />
                                        <Button 
                                            type="button"
                                            variant="destructive" 
                                            size="icon" 
                                            className="absolute top-2 right-2"
                                            onClick={removeImage}
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="w-full h-48 border-2 border-dashed rounded-md flex items-center justify-center bg-gray-50">
                                        <span className="text-gray-400">No image selected</span>
                                    </div>
                                )}
                                <div className="relative">
                                    <Button type="button" variant="outline" className="w-full">
                                        <Upload className="w-4 h-4 mr-2" />
                                        {imagePreview ? 'Change Image' : 'Upload Image'}
                                    </Button>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                </div>
                                <p className="text-xs text-gray-500 text-center">
                                    Recommended: 1200x630px, Max 5MB
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Or Use Image URL</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Input
                                    placeholder="https://example.com/image.jpg"
                                    value={formData.coverImage.startsWith('data:') ? '' : formData.coverImage}
                                    onChange={(e) => {
                                        setFormData({ ...formData, coverImage: e.target.value });
                                        setImagePreview(e.target.value || null);
                                    }}
                                />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </form>
        </div>
    );
}
