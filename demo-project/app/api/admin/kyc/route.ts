import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminFromCookie } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    try {
        const admin = getAdminFromCookie();
        if (!admin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const statusFilter = searchParams.get('status');
        const industryFilter = searchParams.get('industry');

        let kycRequests: any[] = [];
        const prismaAny = prisma as any;

        try {
            const model = prismaAny.kYCRequest || prismaAny.kycRequest;
            if (model) {
                const where: any = {};
                if (statusFilter) where.status = statusFilter;
                if (industryFilter) where.industryType = industryFilter;

                kycRequests = await model.findMany({
                    where,
                    include: {
                        user: {
                            select: {
                                name: true,
                                email: true
                            }
                        }
                    },
                    orderBy: { createdAt: 'desc' }
                });
                return NextResponse.json(kycRequests);
            }
        } catch (prismaErr) {
            console.error('Standard Prisma Fetch Failed:', prismaErr);
        }

        // Fallback to Raw SQL if the model is missing
        console.log('Attempting Raw SQL fallback for fetching KYCRequests...');
        try {
            let query = `
                SELECT k.*, u.name as "userName", u.email as "userEmail" 
                FROM "KYCRequest" k 
                LEFT JOIN "User" u ON k."userId" = u.id
            `;

            const conditions = [];
            if (statusFilter) conditions.push(`k.status = '${statusFilter}'`);
            if (industryFilter) conditions.push(`k."industryType" = '${industryFilter}'`);

            if (conditions.length > 0) {
                query += ' WHERE ' + conditions.join(' AND ');
            }

            query += ' ORDER BY k."createdAt" DESC';

            const rawData: any[] = await prisma.$queryRawUnsafe(query);

            const formattedData = rawData.map(item => ({
                ...item,
                user: item.userName ? { name: item.userName, email: item.userEmail } : null
            }));

            return NextResponse.json(formattedData);
        } catch (rawErr: any) {
            console.error('Raw SQL Fetch Failed:', rawErr);
            throw rawErr;
        }

    } catch (error) {
        console.error('Fetch KYC requests error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
