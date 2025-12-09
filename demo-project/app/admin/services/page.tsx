import { prisma } from '@/lib/prisma';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminServices() {
  // Safety check: If DATABASE_URL is missing (e.g. during build), return placeholder.
  if (!process.env.DATABASE_URL) {
      return (
          <div className="p-8 text-center text-gray-500">
              <h1 className="text-2xl font-bold mb-4">Services</h1>
              <p>Database connection not available during build.</p>
          </div>
      );
  }

  try {
    const services = await prisma.service.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Services Management</h1>
          <Link href="/admin/services/new">
            <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2 text-white">
              <Plus className="w-4 h-4" />
              Add Service
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.length === 0 ? (
            <div className="col-span-full text-center py-12 bg-white rounded-lg border border-gray-200">
              <p className="text-gray-500">No services found. Create one to get started.</p>
            </div>
          ) : (
            services.map((service) => (
              <div key={service.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                <h3 className="text-lg font-bold mb-2 text-gray-900">{service.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                    Active
                  </span>
                  <div className="flex gap-2">
                    <Link href={`/admin/services/edit/${service.id}`}>
                      <Button variant="ghost" size="sm" className="hover:bg-gray-100 text-gray-600 hover:text-gray-900">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button variant="ghost" size="sm" className="hover:bg-red-50 text-gray-600 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Failed to fetch services:', error);
    return <div className="p-8 text-center text-red-500">Error loading services.</div>;
  }
}
