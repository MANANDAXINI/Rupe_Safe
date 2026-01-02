'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, FileText, ShoppingCart, LayoutGrid, Loader2 } from "lucide-react";
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface DashboardData {
    stats: {
        users: number;
        blogs: number;
        services: number;
        orders: number;
    };
    recentActivities: {
        type: string;
        user: string;
        email: string;
        avatar: string | null;
        action: string;
        time: string;
    }[];
}

export default function AdminDashboard() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/admin/stats');
                if (!response.ok) throw new Error('Failed to fetch data');
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
                toast.error('Failed to load dashboard data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    const cards = [
        {
            title: "Total Users",
            value: data?.stats.users || 0,
            icon: Users,
            gradient: "from-blue-600 to-indigo-600",
            lightColor: "bg-blue-50",
            iconColor: "text-blue-600",
        },
        {
            title: "Total Blogs",
            value: data?.stats.blogs || 0,
            icon: FileText,
            gradient: "from-emerald-500 to-teal-600",
            lightColor: "bg-emerald-50",
            iconColor: "text-emerald-600",
        },
        {
            title: "Total Services",
            value: data?.stats.services || 0,
            icon: LayoutGrid,
            gradient: "from-violet-500 to-purple-600",
            lightColor: "bg-violet-50",
            iconColor: "text-violet-600",
        },
        {
            title: "Total Orders",
            value: data?.stats.orders || 0,
            icon: ShoppingCart,
            gradient: "from-orange-400 to-pink-500",
            lightColor: "bg-orange-50",
            iconColor: "text-orange-600",
        },
    ];

    // Helper to format time like "2 hours ago"
    const timeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + "y";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + "mo";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + "d";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + "h";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + "m";
        return "now";
    };

    return (
        <div className="space-y-10 pb-10">
            <div className="flex flex-col gap-1">
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">Dashboard</h2>
                <p className="text-gray-500 font-medium">Platform performance & management overview.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {cards.map((card, index) => (
                    <Card key={index} className="relative overflow-hidden border-none shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white group">
                        <div className={`absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full bg-gradient-to-br ${card.gradient} opacity-[0.03] group-hover:opacity-[0.08] transition-opacity`} />
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-[13px] font-bold text-gray-400 uppercase tracking-widest">
                                {card.title}
                            </CardTitle>
                            <div className={`p-2.5 rounded-xl ${card.lightColor} ${card.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                                <card.icon className="h-5 w-5" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black text-gray-900 tracking-tight">{card.value}</div>
                            <div className="mt-3 flex items-center gap-2">
                                <span className={`flex h-1.5 w-1.5 rounded-full bg-gradient-to-r ${card.gradient}`} />
                                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Live Stat</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Content Section */}
            <div className="grid gap-8 md:grid-cols-12">
                <Card className="md:col-span-8 border-none shadow-sm bg-white rounded-2xl overflow-hidden">
                    <CardHeader className="border-b border-gray-50 px-8 py-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-xl font-bold text-gray-900 tracking-tight">Recent Activity</CardTitle>
                                <CardDescription className="text-gray-400 font-medium mt-1">Latest updates across the platform</CardDescription>
                            </div>
                            <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50 font-bold text-xs uppercase tracking-wider">View All</Button>
                        </div>
                    </CardHeader>
                    <CardContent className="px-8 py-6">
                        <div className="space-y-6">
                            {data?.recentActivities.length === 0 ? (
                                <div className="text-center py-10">
                                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Users className="w-6 h-6 text-gray-200" />
                                    </div>
                                    <p className="text-sm text-gray-400 font-medium">No activity to show</p>
                                </div>
                            ) : (
                                data?.recentActivities.map((activity, index) => (
                                    <div key={index} className="flex items-center group cursor-pointer hover:bg-gray-50/50 p-2 -m-2 rounded-xl transition-colors">
                                        <div className="relative">
                                            <Avatar className="h-11 w-11 border-2 border-white shadow-sm transition-transform group-hover:scale-105">
                                                <AvatarImage src={activity.avatar || ''} alt="Avatar" />
                                                <AvatarFallback className="bg-blue-50 text-blue-600 font-black text-xs uppercase">{activity.user.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
                                        </div>
                                        <div className="ml-4 flex-1 space-y-0.5">
                                            <div className="flex items-center gap-2">
                                                <p className="text-sm font-bold text-gray-900 leading-none">{activity.user}</p>
                                                <span className="text-[10px] font-bold text-gray-300 uppercase tracking-tighter">•</span>
                                                <span className="text-[11px] font-bold text-gray-400">{timeAgo(activity.time)}</span>
                                            </div>
                                            <p className="text-sm text-gray-500 font-medium leading-relaxed">
                                                {activity.action}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="md:col-span-4 border-none shadow-sm bg-white rounded-2xl overflow-hidden">
                    <CardHeader className="border-b border-gray-50 px-8 py-6">
                        <CardTitle className="text-xl font-bold text-gray-900 tracking-tight">Quick Actions</CardTitle>
                        <CardDescription className="text-gray-400 font-medium mt-1">Management shortcuts</CardDescription>
                    </CardHeader>
                    <CardContent className="px-8 py-8 space-y-4">
                        <Link href="/admin/blogs/new" className="group flex items-center gap-4 p-4 rounded-2xl bg-gray-50/50 border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-300">
                            <div className="p-3 bg-white rounded-xl shadow-sm text-blue-600 group-hover:scale-110 transition-transform">
                                <FileText className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="font-bold text-sm text-gray-900 tracking-tight">Create Blog</p>
                                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">Publish Article</p>
                            </div>
                        </Link>
                        <Link href="/admin/services" className="group flex items-center gap-4 p-4 rounded-2xl bg-gray-50/50 border border-gray-100 hover:border-purple-200 hover:bg-purple-50/30 transition-all duration-300">
                            <div className="p-3 bg-white rounded-xl shadow-sm text-purple-600 group-hover:scale-110 transition-transform">
                                <LayoutGrid className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="font-bold text-sm text-gray-900 tracking-tight">Services</p>
                                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">Update Portfolio</p>
                            </div>
                        </Link>
                        <Link href="/admin/users" className="group flex items-center gap-4 p-4 rounded-2xl bg-gray-50/50 border border-gray-100 hover:border-orange-200 hover:bg-orange-50/30 transition-all duration-300">
                            <div className="p-3 bg-white rounded-xl shadow-sm text-orange-600 group-hover:scale-110 transition-transform">
                                <Users className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="font-bold text-sm text-gray-900 tracking-tight">User List</p>
                                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">Edit Accounts</p>
                            </div>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
