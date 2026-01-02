import { prisma } from '@/lib/prisma';
import { UserTable } from '@/components/admin/UserTable';

export const dynamic = 'force-dynamic';

export default async function UsersPage() {
    // Safety check: If DATABASE_URL is missing (e.g. during build), return placeholder.
    if (!process.env.DATABASE_URL) {
        return (
            <div className="p-8 text-center text-gray-500">
                <h1 className="text-2xl font-bold mb-4">Users</h1>
                <p>Database connection not available during build.</p>
            </div>
        );
    }

    try {
        const users = await prisma.user.findMany({
            orderBy: { createdAt: 'desc' },
        });

        return (
            <div className="space-y-8 pb-10">
                <div className="flex flex-col gap-1 border-b pb-6">
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight">System Users</h1>
                    <p className="text-gray-500 font-medium">Control administrative permissions and audit customer accounts.</p>
                </div>

                <UserTable initialUsers={users} />
            </div>
        );
    } catch (error) {
        console.error('Failed to fetch users:', error);
        return <div className="p-8 text-center text-red-500">Error loading users.</div>;
    }
}
