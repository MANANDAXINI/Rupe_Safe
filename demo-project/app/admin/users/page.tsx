import { prisma } from '@/lib/prisma';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from '@prisma/client';

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
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight">User Management</h1>
                    <p className="text-gray-500 font-medium">Manage and audit all registered customer accounts.</p>
                </div>

                <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-50/50 hover:bg-gray-50/50 border-b border-gray-100">
                                    <TableHead className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">User Profile</TableHead>
                                    <TableHead className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center">Identity</TableHead>
                                    <TableHead className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center">Access Level</TableHead>
                                    <TableHead className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-right">Join Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="divide-y divide-gray-50">
                                {users.map((user: User) => (
                                    <TableRow key={user.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <TableCell className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <Avatar className="h-10 w-10 border-2 border-white shadow-sm transition-transform group-hover:scale-105">
                                                    <AvatarImage src={user.image || ''} />
                                                    <AvatarFallback className="bg-blue-50 text-blue-600 font-black text-xs">{user.name?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex flex-col gap-0.5">
                                                    <span className="font-bold text-gray-900">{user.name || 'Anonymous User'}</span>
                                                    <span className="text-[11px] font-medium text-gray-400 tracking-tight">ID: {user.id.slice(0, 8)}...</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-8 py-5 text-center">
                                            <span className="text-sm font-semibold text-gray-600 lowercase">{user.email}</span>
                                        </TableCell>
                                        <TableCell className="px-8 py-5 text-center">
                                            <div className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${user.isAdmin
                                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                                                    : 'bg-gray-100 text-gray-500 border border-gray-200'
                                                }`}>
                                                {user.isAdmin ? 'Administrator' : 'General User'}
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-8 py-5 text-right font-mono text-xs font-bold text-gray-400">
                                            {new Date(user.createdAt).toLocaleDateString('en-GB', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Failed to fetch users:', error);
        return <div className="p-8 text-center text-red-500">Error loading users.</div>;
    }
}
