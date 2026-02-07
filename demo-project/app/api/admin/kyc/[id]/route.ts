import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminFromCookie } from '@/lib/auth';

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const admin = getAdminFromCookie();
        if (!admin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { status, adminNotes } = body;

        const prismaAny = prisma as any;
        try {
            const model = prismaAny.kYCRequest || prismaAny.kycRequest;
            if (model) {
                const updated = await model.update({
                    where: { id: params.id },
                    data: {
                        status,
                        adminNotes
                    }
                });
                return NextResponse.json(updated);
            }
        } catch (prismaErr) {
            console.error('Standard Prisma Update Failed:', prismaErr);
        }

        // Fallback to Raw SQL
        console.log(`Attempting Raw SQL fallback for updating KYCRequest ${params.id}...`);
        try {
            await prisma.$executeRawUnsafe(
                `UPDATE "KYCRequest" SET status = $1, "adminNotes" = $2, "updatedAt" = NOW() WHERE id = $3`,
                status, adminNotes || null, params.id
            );
            return NextResponse.json({ id: params.id, status, adminNotes });
        } catch (rawErr: any) {
            console.error('Raw SQL Update Failed:', rawErr);
            throw rawErr;
        }

    } catch (error) {
        console.error('Update KYC request error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const admin = getAdminFromCookie();
        if (!admin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const prismaAny = prisma as any;
        try {
            const model = prismaAny.kYCRequest || prismaAny.kycRequest;
            if (model) {
                await model.delete({
                    where: { id: params.id }
                });
                return NextResponse.json({ message: 'Deleted' });
            }
        } catch (prismaErr) {
            console.error('Standard Prisma Delete Failed:', prismaErr);
        }

        // Fallback to Raw SQL
        console.log(`Attempting Raw SQL fallback for deleting KYCRequest ${params.id}...`);
        try {
            await prisma.$executeRawUnsafe(`DELETE FROM "KYCRequest" WHERE id = $1`, params.id);
            return NextResponse.json({ message: 'Deleted (via raw)' });
        } catch (rawErr: any) {
            console.error('Raw SQL Delete Failed:', rawErr);
            throw rawErr;
        }

    } catch (error) {
        console.error('Delete KYC request error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
