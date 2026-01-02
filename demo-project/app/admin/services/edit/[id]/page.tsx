'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Plus, X, Loader2, Save } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function EditServicePage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        description: '',
        icon: '',
        image: '',
        features: [''],
    });

    useEffect(() => {
        const fetchService = async () => {
            try {
                const response = await fetch(`/api/admin/services/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setFormData({
                        title: data.title || '',
                        slug: data.slug || '',
                        description: data.description || '',
                        icon: data.icon || '',
                        image: data.image || '',
                        features: data.features && data.features.length > 0 ? data.features : [''],
                    });
                } else {
                    toast.error('Failed to fetch service details');
                    router.push('/admin/services');
                }
            } catch (error) {
                console.error('Fetch failed:', error);
                toast.error('Error loading service');
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchService();
        }
    }, [id, router]);

    const handleTitleChange = (title: string) => {
        const slug = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
        setFormData({ ...formData, title, slug });
    };

    const handleAddFeature = () => {
        setFormData({
            ...formData,
            features: [...formData.features, ''],
        });
    };

    const handleRemoveFeature = (index: number) => {
        setFormData({
            ...formData,
            features: formData.features.filter((_, i) => i !== index),
        });
    };

    const handleFeatureChange = (index: number, value: string) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = value;
        setFormData({ ...formData, features: newFeatures });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch(`/api/admin/services/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    features: formData.features.filter((f) => f.trim() !== ''),
                }),
            });

            if (response.ok) {
                toast.success('Service updated successfully');
                router.push('/admin/services');
                router.refresh();
            } else {
                const data = await response.json();
                toast.error(data.error || 'Failed to update service');
            }
        } catch (error) {
            console.error('Submit failed:', error);
            toast.error('Failed to update service');
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
        <div className="max-w-4xl space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/services">
                    <Button variant="ghost" size="sm">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Services
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Edit Service</h1>
                    <p className="mt-1 text-gray-500 text-sm">Update the details for "{formData.title}"</p>
                </div>
            </div>

            <Card className="border-none shadow-xl bg-white/80 backdrop-blur-md">
                <CardHeader className="border-b bg-gray-50/50">
                    <CardTitle className="text-xl font-semibold">Service Details</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-sm font-medium">Title *</Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => handleTitleChange(e.target.value)}
                                    placeholder="Enter service title"
                                    className="focus-visible:ring-blue-500"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="slug" className="text-sm font-medium">URL Slug *</Label>
                                <Input
                                    id="slug"
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                    placeholder="service-url-slug"
                                    className="focus-visible:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-sm font-medium">Description *</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Enter a comprehensive description of the service..."
                                rows={4}
                                className="focus-visible:ring-blue-500"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="icon" className="text-sm font-medium">Icon (Emoji or Icon Name)</Label>
                                <Input
                                    id="icon"
                                    value={formData.icon}
                                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                    placeholder="e.g. 🔒, 💻, or Lucide icon name"
                                    className="focus-visible:ring-blue-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="image" className="text-sm font-medium">Image URL</Label>
                                <Input
                                    id="image"
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    placeholder="https://images.unsplash.com/..."
                                    className="focus-visible:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <Label className="text-sm font-medium">Key Features</Label>
                                <Button type="button" variant="outline" size="sm" onClick={handleAddFeature} className="h-8">
                                    <Plus className="w-3 h-3 mr-1" />
                                    Add Feature
                                </Button>
                            </div>
                            <div className="grid grid-cols-1 gap-3">
                                {formData.features.map((feature, index) => (
                                    <div key={index} className="flex gap-2 group animate-in slide-in-from-left-2 duration-200">
                                        <div className="flex-1">
                                            <Input
                                                value={feature}
                                                onChange={(e) => handleFeatureChange(index, e.target.value)}
                                                placeholder={`Feature description ${index + 1}`}
                                                className="focus-visible:ring-blue-500"
                                            />
                                        </div>
                                        {formData.features.length > 1 && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="text-gray-400 hover:text-red-500 transition-colors"
                                                onClick={() => handleRemoveFeature(index)}
                                            >
                                                <X className="w-4 h-4" />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4 border-t">
                            <Button type="submit" disabled={isSubmitting} className="flex-1 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200">
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4 mr-2" />
                                        Save Changes
                                    </>
                                )}
                            </Button>
                            <Link href="/admin/services" className="flex-1">
                                <Button type="button" variant="outline" className="w-full">
                                    Cancel
                                </Button>
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
