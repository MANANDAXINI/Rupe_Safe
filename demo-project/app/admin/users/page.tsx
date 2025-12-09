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
            <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
                <Card className="border-none shadow-md">
                    <CardHeader>
                        <CardTitle>Registered Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>User</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Joined</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.map((user: User) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src={user.image || ''} />
                                                <AvatarFallback>{user.name?.[0] || 'U'}</AvatarFallback>
                                            </Avatar>
                                            <span className="font-medium">{user.name || 'N/A'}</span>
                                        </TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <span className={`px-2 py-1 rounded-full text-xs ${user.isAdmin ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>
                                                {user.isAdmin ? 'Admin' : 'User'}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        );
    } catch (error) {
        console.error('Failed to fetch users:', error);
        return <div className="p-8 text-center text-red-500">Error loading users.</div>;
    }
}
