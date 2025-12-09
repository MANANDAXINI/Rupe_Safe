'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, FileText, ShoppingCart, LayoutGrid, Loader2 } from "lucide-react";
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
            color: "text-blue-600",
            bgColor: "bg-blue-100",
        },
        {
            title: "Total Blogs",
            value: data?.stats.blogs || 0,
            icon: FileText,
            color: "text-green-600",
            bgColor: "bg-green-100",
        },
        {
            title: "Total Services",
            value: data?.stats.services || 0,
            icon: LayoutGrid,
            color: "text-purple-600",
            bgColor: "bg-purple-100",
        },
        {
            title: "Total Orders",
            value: data?.stats.orders || 0,
            icon: ShoppingCart,
            color: "text-orange-600",
            bgColor: "bg-orange-100",
        },
    ];

    // Helper to format time like "2 hours ago"
    const timeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
        
        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + " years ago";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + " months ago";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + " days ago";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + " hours ago";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + " minutes ago";
        return Math.floor(seconds) + " seconds ago";
    };

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h2>
                <p className="text-slate-500 mt-2">Overview of your platform's performance.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {cards.map((card, index) => (
                    <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow duration-200">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-slate-600">
                                {card.title}
                            </CardTitle>
                            <div className={`p-2 rounded-full ${card.bgColor}`}>
                                <card.icon className={`h-4 w-4 ${card.color}`} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-slate-900">{card.value}</div>
                            <p className="text-xs text-slate-500 mt-1">
                                Real-time data
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Recent Activity Section */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 border-none shadow-md">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>
                            Latest actions across your platform.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {data?.recentActivities.length === 0 ? (
                                <p className="text-sm text-slate-500 text-center py-4">No recent activity found.</p>
                            ) : (
                                data?.recentActivities.map((activity, index) => (
                                    <div key={index} className="flex items-center">
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage src={activity.avatar || ''} alt="Avatar" />
                                            <AvatarFallback>{activity.user.charAt(0).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        <div className="ml-4 space-y-1">
                                            <p className="text-sm font-medium leading-none">{activity.user}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {activity.action}
                                            </p>
                                        </div>
                                        <div className="ml-auto font-medium text-xs text-muted-foreground">
                                            {timeAgo(activity.time)}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>
                
                {/* Quick Actions */}
                <Card className="col-span-3 border-none shadow-md">
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>
                            Manage your platform efficiently.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                         <Link href="/admin/blogs/new" className="flex items-center gap-4 p-4 rounded-lg border bg-slate-50 hover:bg-slate-100 cursor-pointer transition-colors">
                            <div className="p-2 bg-blue-100 rounded-full">
                                <FileText className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="font-medium text-sm">Create New Blog</p>
                                <p className="text-xs text-slate-500">Write and publish a new article</p>
                            </div>
                         </Link>
                         <Link href="/admin/services" className="flex items-center gap-4 p-4 rounded-lg border bg-slate-50 hover:bg-slate-100 cursor-pointer transition-colors">
                            <div className="p-2 bg-purple-100 rounded-full">
                                <LayoutGrid className="h-5 w-5 text-purple-600" />
                            </div>
                            <div>
                                <p className="font-medium text-sm">Manage Services</p>
                                <p className="text-xs text-slate-500">Update service offerings</p>
                            </div>
                         </Link>
                         <Link href="/admin/users" className="flex items-center gap-4 p-4 rounded-lg border bg-slate-50 hover:bg-slate-100 cursor-pointer transition-colors">
                            <div className="p-2 bg-orange-100 rounded-full">
                                <Users className="h-5 w-5 text-orange-600" />
                            </div>
                            <div>
                                <p className="font-medium text-sm">Manage Users</p>
                                <p className="text-xs text-slate-500">View and edit user accounts</p>
                            </div>
                         </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
