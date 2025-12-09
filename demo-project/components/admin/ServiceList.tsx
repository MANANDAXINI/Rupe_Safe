'use client';

import { Service } from '@prisma/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface ServiceListProps {
    services: Service[];
}

export function ServiceList({ services: initialServices }: ServiceListProps) {
    const [services, setServices] = useState(initialServices);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const handleDelete = async (id: string) => {
        setIsDeleting(true);
        try {
            const response = await fetch(`/api/admin/services/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setServices(services.filter((s) => s.id !== id));
                setDeleteId(null);
            } else {
                alert('Failed to delete service');
            }
        } catch (error) {
            console.error('Delete failed:', error);
            alert('Failed to delete service');
        } finally {
            setIsDeleting(false);
        }
    };

    if (services.length === 0) {
        return (
            <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                    <p className="text-gray-500">No services found</p>
                    <p className="text-sm text-gray-400 mt-2">Create your first service to get started</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => (
                    <Card key={service.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                {service.icon && <span className="text-2xl">{service.icon}</span>}
                                {service.title}
                            </CardTitle>
                            <CardDescription className="line-clamp-2">
                                {service.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {service.features.length > 0 && (
                                <div className="mb-4">
                                    <p className="text-sm font-medium text-gray-700 mb-2">Features:</p>
                                    <ul className="text-sm text-gray-600 space-y-1">
                                        {service.features.slice(0, 3).map((feature, idx) => (
                                            <li key={idx} className="line-clamp-1">• {feature}</li>
                                        ))}
                                        {service.features.length > 3 && (
                                            <li className="text-gray-400">+{service.features.length - 3} more</li>
                                        )}
                                    </ul>
                                </div>
                            )}
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1"
                                    onClick={() => router.push(`/admin/services/edit/${service.id}`)}
                                >
                                    <Edit className="w-4 h-4 mr-1" />
                                    Edit
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-red-600 hover:bg-red-50 hover:text-red-700"
                                    onClick={() => setDeleteId(service.id)}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the service.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => deleteId && handleDelete(deleteId)}
                            disabled={isDeleting}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            {isDeleting ? 'Deleting...' : 'Delete'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
