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
import { Badge } from '@/components/ui/badge';
import { Eye, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-dynamic';

export default async function OrdersPage() {
    // Safety check: If DATABASE_URL is missing (e.g. during build), return placeholder.
    if (!process.env.DATABASE_URL) {
        return (
            <div className="p-8 text-center text-gray-500">
                <h1 className="text-2xl font-bold mb-4">Orders</h1>
                <p>Database connection not available during build.</p>
            </div>
        );
    }

    try {
        const orders = await prisma.order.findMany({
            include: {
                user: true,
                service: true,
            },
            orderBy: { createdAt: 'desc' },
        });

        return (
            <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-900">Orders & Payments</h1>
                <Card className="border-none shadow-md bg-white">
                    <CardHeader>
                        <CardTitle className="text-gray-900">Recent Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-gray-50 border-gray-200">
                                    <TableHead className="text-gray-600">Order ID</TableHead>
                                    <TableHead className="text-gray-600">User</TableHead>
                                    <TableHead className="text-gray-600">Service</TableHead>
                                    <TableHead className="text-gray-600">Amount</TableHead>
                                    <TableHead className="text-gray-600">Payment</TableHead>
                                    <TableHead className="text-gray-600">Status</TableHead>
                                    <TableHead className="text-gray-600">Date</TableHead>
                                    <TableHead className="text-gray-600">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {orders.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={8} className="text-center text-gray-500 py-8">
                                            No orders found
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    orders.map((order) => (
                                        <TableRow key={order.id} className="hover:bg-gray-50 border-gray-200">
                                            <TableCell className="font-medium text-gray-900">{order.id.slice(0, 8)}...</TableCell>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-gray-900">{order.user.name}</span>
                                                    <span className="text-xs text-gray-500">{order.user.email}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-gray-600">{order.service?.title || 'N/A'}</TableCell>
                                            <TableCell className="font-medium text-gray-900">
                                                {order.currency} {order.amount}
                                            </TableCell>
                                            <TableCell className="text-gray-600">{order.paymentMethod || 'N/A'}</TableCell>
                                            <TableCell>
                                                <Badge className={`${
                                                    order.status === 'COMPLETED' ? 'bg-green-100 text-green-700 hover:bg-green-200' :
                                                    order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' :
                                                    'bg-red-100 text-red-700 hover:bg-red-200'
                                                }`}>
                                                    {order.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-gray-600">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex gap-2">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        );
    } catch (error) {
        console.error('Failed to fetch orders:', error);
        return <div className="p-8 text-center text-red-500">Error loading orders.</div>;
    }
}
