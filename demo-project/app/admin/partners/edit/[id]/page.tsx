'use client';

import { ArrowLeft, Loader2, Save, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export default function EditPartner() {
    const router = useRouter();
    const params = useParams();
    const id = params.id;
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        logo: ''
    });

    useEffect(() => {
        const fetchPartner = async () => {
            try {
                const response = await fetch(`/api/admin/partners/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setFormData({
                        name: data.name,
                        logo: data.logo || ''
                    });
                } else {
                    toast.error('Failed to load partner');
                    router.push('/admin/partners');
                }
            } catch (error) {
                console.error('Fetch failed:', error);
                toast.error('Error loading partner');
            } finally {
                setIsFetching(false);
            }
        };

        if (id) fetchPartner();
    }, [id, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name) {
            toast.error('Name is required');
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`/api/admin/partners/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toast.success('Partner updated successfully');
                router.push('/admin/partners');
                router.refresh();
            } else {
                const error = await response.json();
                toast.error(error.error || 'Failed to update partner');
            }
        } catch (error) {
            console.error('Update failed:', error);
            toast.error('Error updating partner');
        } finally {
            setIsLoading(false);
        }
    };

    if (isFetching) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center gap-4 border-b pb-6">
                <Link href="/admin/partners">
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <ArrowLeft className="w-4 h-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Edit Partner</h1>
                    <p className="text-gray-500 text-sm mt-1">Update institutional partner details</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <div className="grid gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Partner Name</label>
                        <input
                            type="text"
                            placeholder="e.g. Acme Corporation"
                            className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-black transition-all outline-none font-medium"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Logo URL (Optional)</label>
                        <div className="relative">
                            <Globe className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="url"
                                placeholder="https://example.com/logo.png"
                                className="w-full pl-14 pr-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-black transition-all outline-none font-medium"
                                value={formData.logo}
                                onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4 pt-6 border-t font-bold">
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="bg-black hover:bg-gray-800 text-white rounded-full px-10 h-14 transition-all duration-300 shadow-xl shadow-black/10 group"
                    >
                        {isLoading ? (
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                            <Save className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                        )}
                        Update Partner
                    </Button>
                    <Link href="/admin/partners">
                        <Button type="button" variant="ghost" className="rounded-full h-14 px-8 uppercase tracking-widest text-[10px]">
                            Cancel
                        </Button>
                    </Link>
                </div>
            </form>
        </div>
    );
}
