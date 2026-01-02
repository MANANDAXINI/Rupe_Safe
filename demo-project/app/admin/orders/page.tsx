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
import { Eye, Trash2, ShoppingCart } from 'lucide-react';
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
            <div className="space-y-8 pb-10">
                <div className="flex flex-col gap-1 border-b pb-6">
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight">Orders & Transactions</h1>
                    <p className="text-gray-500 font-medium">Track and manage financial activities and service fulfillment.</p>
                </div>

                <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-50/50 hover:bg-gray-50/50 border-b border-gray-100">
                                    <TableHead className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Order Details</TableHead>
                                    <TableHead className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Customer</TableHead>
                                    <TableHead className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center">Amount</TableHead>
                                    <TableHead className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center">Status</TableHead>
                                    <TableHead className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="divide-y divide-gray-50">
                                {orders.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="px-8 py-20 text-center">
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center">
                                                    <ShoppingCart className="w-6 h-6 text-gray-200" />
                                                </div>
                                                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">No transactions found</p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    orders.map((order) => (
                                        <TableRow key={order.id} className="hover:bg-gray-50/50 transition-colors group text-sm">
                                            <TableCell className="px-8 py-5">
                                                <div className="flex flex-col gap-0.5">
                                                    <span className="font-bold text-gray-900 tracking-tight">#{order.id.slice(0, 8).toUpperCase()}</span>
                                                    <span className="text-[11px] font-bold text-blue-600 uppercase tracking-tighter">{order.service?.title || 'Unknown Service'}</span>
                                                    <span className="text-[10px] text-gray-400 font-mono mt-1">
                                                        {new Date(order.createdAt).toLocaleDateString('en-GB', {
                                                            day: '2-digit',
                                                            month: 'short',
                                                            year: 'numeric'
                                                        })}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="px-8 py-5">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-gray-900 leading-none">{order.user.name}</span>
                                                    <span className="text-[11px] font-medium text-gray-400 mt-1">{order.user.email}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="px-8 py-5 text-center">
                                                <div className="flex flex-col items-center">
                                                    <span className="text-base font-black text-gray-900 tracking-tighter">{order.currency} {order.amount}</span>
                                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">{order.paymentMethod || 'Gateway'}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="px-8 py-5 text-center">
                                                <div className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${order.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                                                    order.status === 'PENDING' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                                                        'bg-rose-50 text-rose-600 border border-rose-100'
                                                    }`}>
                                                    <div className={`w-1 h-1 rounded-full mr-1.5 ${order.status === 'COMPLETED' ? 'bg-emerald-600' :
                                                        order.status === 'PENDING' ? 'bg-amber-600 animate-pulse' :
                                                            'bg-rose-600'
                                                        }`} />
                                                    {order.status}
                                                </div>
                                            </TableCell>
                                            <TableCell className="px-8 py-5 text-right">
                                                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-gray-400 hover:text-black hover:bg-white border border-transparent hover:border-gray-100 transition-all shadow-none hover:shadow-sm">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Failed to fetch orders:', error);
        return <div className="p-8 text-center text-red-500">Error loading orders.</div>;
    }
}
