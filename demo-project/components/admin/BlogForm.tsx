"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RichTextEditor } from '@/components/admin/RichTextEditor';
import { toast } from 'sonner';
import { Loader2, Upload } from 'lucide-react';
import { Blog } from '@prisma/client';

const blogFormSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long.'),
  slug: z.string().min(3, 'Slug must be at least 3 characters long.').regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be a valid URL slug (e.g., "my-first-post").'),
  excerpt: z.string().min(10, 'Excerpt must be at least 10 characters long.').max(200, 'Excerpt must be less than 200 characters.'),
  content: z.string().min(50, 'Content must be at least 50 characters long.'),
  coverImage: z.any().optional(),
});

type BlogFormValues = z.infer<typeof blogFormSchema>;

interface BlogFormProps {
  initialData?: Blog | null;
}

export default function BlogForm({ initialData }: BlogFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.coverImage || null);

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    watch
  } = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: initialData?.title || '',
      slug: initialData?.slug || '',
      excerpt: initialData?.excerpt || '',
      content: initialData?.content || '',
    },
  });

  const title = watch('title');

  useEffect(() => {
    if (!initialData) {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
      setValue('slug', slug);
    }
  }, [title, setValue, initialData]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setValue('coverImage', file);
    }
  };

  const onSubmit = async (data: BlogFormValues) => {
    setLoading(true);
    const formData = new FormData();
    
    formData.append('title', data.title);
    formData.append('slug', data.slug);
    formData.append('excerpt', data.excerpt);
    formData.append('content', data.content);
    if (data.coverImage && data.coverImage instanceof File) {
      formData.append('coverImage', data.coverImage);
    }

    try {
      const url = initialData ? `/api/admin/blogs/${initialData.id}` : '/api/admin/blogs';
      const method = initialData ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }

      toast.success(`Blog ${initialData ? 'updated' : 'created'} successfully!`);
      router.push('/admin/blogs');
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Blog Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" {...register('title')} placeholder="Enter blog title" />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
              </div>
              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input id="slug" {...register('slug')} placeholder="e.g., my-first-blog-post" />
                {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>}
              </div>
              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea id="excerpt" {...register('excerpt')} placeholder="A short summary of the blog post" />
                {errors.excerpt && <p className="text-red-500 text-sm mt-1">{errors.excerpt.message}</p>}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Content</CardTitle>
            </CardHeader>
            <CardContent>
              <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  <RichTextEditor
                    content={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
            </CardContent>
          </Card>
        </div>
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Cover Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="w-full h-48 border-2 border-dashed rounded-md flex items-center justify-center bg-gray-50 overflow-hidden">
                {imagePreview ? (
                  <img src={imagePreview} alt="Cover preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-400">Image Preview</span>
                )}
              </div>
              <div className="relative">
                <Button type="button" variant="outline" className="w-full">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Image
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <Button type="submit" disabled={loading} className="w-full">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {initialData ? 'Update Blog' : 'Publish Blog'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}