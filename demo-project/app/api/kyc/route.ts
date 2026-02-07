import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromCookie } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
    try {
        const user = await getUserFromCookie();
        const body = await request.json();
        const {
            fullName,
            companyName,
            contact,
            websiteLink,
            industryType,
            businessNature,
            panNumber,
            acceptOn
        } = body;

        if (!fullName || !contact || !industryType || !businessNature || !panNumber) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const id = `cl${Math.random().toString(36).substring(2, 23)}`;
        const targetUserId = user?.id || null;
        const targetAcceptOn = acceptOn || 'Website';

        let kycRequest;
        const prismaAny = prisma as any;

        // Try Standard Prisma Client first
        try {
            const model = prismaAny.kYCRequest || prismaAny.kycRequest;
            if (model) {
                kycRequest = await model.create({
                    data: {
                        userId: targetUserId,
                        fullName,
                        companyName,
                        contact,
                        websiteLink,
                        industryType,
                        businessNature,
                        panNumber,
                        acceptOn: targetAcceptOn
                    }
                });
                return NextResponse.json(kycRequest, { status: 201 });
            }
        } catch (prismaErr) {
            console.error('Standard Prisma Create Failed:', prismaErr);
        }

        // Fallback to Raw SQL if the model is missing or creation fails
        console.log('Attempting Raw SQL fallback for KYCRequest...');
        try {
            await prisma.$executeRaw`
                INSERT INTO "KYCRequest" (
                    "id", "userId", "fullName", "companyName", "contact", 
                    "websiteLink", "industryType", "businessNature", 
                    "panNumber", "acceptOn", "status", "createdAt", "updatedAt"
                ) VALUES (
                    ${id}, ${targetUserId}, ${fullName}, ${companyName}, ${contact}, 
                    ${websiteLink}, ${industryType}, ${businessNature}, 
                    ${panNumber}, ${targetAcceptOn}, 'PENDING', NOW(), NOW()
                )
            `;
            return NextResponse.json({ id, status: 'PENDING', message: 'Submitted via fallback' }, { status: 201 });
        } catch (rawErr: any) {
            console.error('Raw SQL Fallback Failed:', rawErr);
            throw rawErr;
        }

    } catch (error: any) {
        console.error('CRITICAL KYC SUBMISSION ERROR:', error);
        return NextResponse.json({
            error: 'Internal Server Error',
            details: error.message
        }, { status: 500 });
    }
}
