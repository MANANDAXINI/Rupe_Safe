'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Plus, X } from 'lucide-react';
import Link from 'next/link';

export default function NewServicePage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        icon: '',
        features: [''],
    });

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
            const response = await fetch('/api/admin/services', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    features: formData.features.filter((f) => f.trim() !== ''),
                }),
            });

            if (response.ok) {
                router.push('/admin/services');
                router.refresh();
            } else {
                alert('Failed to create service');
            }
        } catch (error) {
            console.error('Submit failed:', error);
            alert('Failed to create service');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/services">
                    <Button variant="ghost" size="sm">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Add New Service</h1>
                    <p className="mt-2 text-gray-600">Create a new service for your website</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Service Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title *</Label>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Enter service title"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description *</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Enter service description"
                                rows={4}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="icon">Icon (emoji or text)</Label>
                            <Input
                                id="icon"
                                value={formData.icon}
                                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                placeholder="🔒 or any emoji"
                                maxLength={10}
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label>Features</Label>
                                <Button type="button" variant="outline" size="sm" onClick={handleAddFeature}>
                                    <Plus className="w-4 h-4 mr-1" />
                                    Add Feature
                                </Button>
                            </div>
                            <div className="space-y-2">
                                {formData.features.map((feature, index) => (
                                    <div key={index} className="flex gap-2">
                                        <Input
                                            value={feature}
                                            onChange={(e) => handleFeatureChange(index, e.target.value)}
                                            placeholder={`Feature ${index + 1}`}
                                        />
                                        {formData.features.length > 1 && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleRemoveFeature(index)}
                                            >
                                                <X className="w-4 h-4" />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Button type="submit" disabled={isSubmitting} className="flex-1">
                                {isSubmitting ? 'Creating...' : 'Create Service'}
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
