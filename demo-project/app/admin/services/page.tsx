'use client';

import { prisma } from '@/lib/prisma';
import { Plus, Edit2, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export default function AdminServices() {
  const router = useRouter();
  const [services, setServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/admin/services');
      if (response.ok) {
        const data = await response.json();
        setServices(data);
      } else {
        toast.error('Failed to load services');
      }
    } catch (error) {
      console.error('Failed to fetch services:', error);
      toast.error('Failed to load services');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    setIsDeleting(id);
    try {
      const response = await fetch(`/api/admin/services/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        toast.success('Service deleted successfully');
        fetchServices();
      } else {
        toast.error('Failed to delete service');
      }
    } catch (error) {
      console.error('Delete failed:', error);
      toast.error('Error deleting service');
    } finally {
      setIsDeleting(null);
    }
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentServices = services.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(services.length / itemsPerPage);

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
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Services</h1>
          <p className="text-gray-500 text-sm mt-1">Found {services.length} active services on your website</p>
        </div>
        <Link href="/admin/services/new">
          <Button className="bg-black hover:bg-gray-800 text-white rounded-full px-6 transition-all duration-300">
            <Plus className="w-4 h-4 mr-2" />
            New Service
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.length === 0 ? (
          <div className="col-span-full text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">No services yet</h3>
            <p className="text-gray-500 mt-2">Get started by creating your first service.</p>
            <Link href="/admin/services/new" className="mt-6 inline-block">
              <Button variant="outline" className="rounded-full">Add Service</Button>
            </Link>
          </div>
        ) : (
          currentServices.map((service) => (
            <div key={service.id} className="group relative bg-white rounded-xl border border-gray-200 p-6 hover:border-black transition-all duration-300 flex flex-col">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-xl group-hover:bg-black group-hover:text-white transition-all duration-300 outline outline-1 outline-gray-100">
                  {service.icon || '💼'}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{service.title}</h3>
              </div>

              <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-6 flex-1">
                {service.description}
              </p>

              <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                <span className="text-[11px] font-medium text-gray-400">
                  {service.features.length} Feature{service.features.length !== 1 ? 's' : ''}
                </span>
                <div className="flex items-center gap-1">
                  <Link href={`/admin/services/edit/${service.id}`}>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-gray-100 text-gray-600">
                      <Edit2 className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                    onClick={() => handleDelete(service.id)}
                    disabled={isDeleting === service.id}
                  >
                    {isDeleting === service.id ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="w-3.5 h-3.5" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="rounded-full px-4"
          >
            Previous
          </Button>
          <div className="flex items-center gap-1 px-4">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-8 h-8 rounded-full text-xs font-medium transition-all ${currentPage === i + 1
                    ? 'bg-black text-white'
                    : 'text-gray-500 hover:bg-gray-100'
                  }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="rounded-full px-4"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
