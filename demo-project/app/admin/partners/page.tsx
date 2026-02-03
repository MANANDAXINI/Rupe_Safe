'use client';

import { Plus, Edit2, Trash2, Loader2, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export default function AdminPartners() {
    const router = useRouter();
    const [partners, setPartners] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);

    const fetchPartners = async () => {
        try {
            const response = await fetch('/api/admin/partners');
            if (response.ok) {
                const data = await response.json();
                setPartners(data);
            } else {
                toast.error('Failed to load partners');
            }
        } catch (error) {
            console.error('Failed to fetch partners:', error);
            toast.error('Failed to load partners');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPartners();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this partner?')) return;

        setIsDeleting(id);
        try {
            const response = await fetch(`/api/admin/partners/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                toast.success('Partner deleted successfully');
                fetchPartners();
            } else {
                toast.error('Failed to delete partner');
            }
        } catch (error) {
            console.error('Delete failed:', error);
            toast.error('Error deleting partner');
        } finally {
            setIsDeleting(null);
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
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Institutional Partners</h1>
                    <p className="text-gray-500 text-sm mt-1">Found {partners.length} active partners displayed in Hero and About sections</p>
                </div>
                <Link href="/admin/partners/new">
                    <Button className="bg-black hover:bg-gray-800 text-white rounded-full px-6 transition-all duration-300">
                        <Plus className="w-4 h-4 mr-2" />
                        New Partner
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {partners.length === 0 ? (
                    <div className="col-span-full text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900">No partners yet</h3>
                        <p className="text-gray-500 mt-2">Add your institutional partners here.</p>
                        <Link href="/admin/partners/new" className="mt-6 inline-block">
                            <Button variant="outline" className="rounded-full">Add Partner</Button>
                        </Link>
                    </div>
                ) : (
                    partners.map((partner) => (
                        <div key={partner.id} className="group relative bg-white rounded-xl border border-gray-200 p-6 hover:border-black transition-all duration-300 flex flex-col items-center">
                            <div className="w-full h-24 bg-gray-50 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-gray-100">
                                {partner.logo ? (
                                    <img src={partner.logo} alt={partner.name} className="max-h-16 max-w-[80%] object-contain grayscale" />
                                ) : (
                                    <ImageIcon className="w-8 h-8 text-gray-300" />
                                )}
                            </div>

                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest text-center mb-6">
                                {partner.name}
                            </h3>

                            <div className="flex items-center gap-2 w-full pt-4 border-t border-gray-50 justify-center">
                                <Link href={`/admin/partners/edit/${partner.id}`}>
                                    <Button variant="ghost" size="sm" className="h-8 rounded-full hover:bg-gray-100 text-gray-600 gap-2 px-4 text-[10px] font-bold uppercase">
                                        <Edit2 className="w-3 h-3" />
                                        Edit
                                    </Button>
                                </Link>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors gap-2 px-4 text-[10px] font-bold uppercase"
                                    onClick={() => handleDelete(partner.id)}
                                    disabled={isDeleting === partner.id}
                                >
                                    {isDeleting === partner.id ? (
                                        <Loader2 className="w-3 h-3 animate-spin" />
                                    ) : (
                                        <>
                                            <Trash2 className="w-3 h-3" />
                                            Delete
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
