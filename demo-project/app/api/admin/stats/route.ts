import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminFromCookie } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
    // Safety check: If DATABASE_URL is missing (e.g. during build), return empty immediately.
    if (!process.env.DATABASE_URL) {
        console.warn('DATABASE_URL is not set. Skipping stats fetch.');
        return NextResponse.json({ 
            stats: { users: 0, blogs: 0, services: 0, orders: 0 },
            recentActivities: []
        });
    }

    try {
        const admin = getAdminFromCookie();
        if (!admin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const [users, blogs, services, orders] = await Promise.all([
            prisma.user.count(),
            prisma.blog.count(),
            prisma.service.count(),
            prisma.order.count(),
        ]);

        return NextResponse.json({
            stats: {
                users,
                blogs,
                services,
                orders,
            },
            recentActivities: [] 
        });
    } catch (error) {
        console.error('Stats fetch error:', error);
        return NextResponse.json({ 
            stats: { users: 0, blogs: 0, services: 0, orders: 0 },
            recentActivities: []
        });
    }
}