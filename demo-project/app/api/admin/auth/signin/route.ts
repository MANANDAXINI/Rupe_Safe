import { NextRequest, NextResponse } from 'next/server';
import { generateAdminToken } from '@/lib/auth';
import { getFirebaseAdmin } from '@/lib/firebaseAdmin';
import { getAuth } from 'firebase-admin/auth';

const ALLOWED_ADMIN_EMAILS = [
    'ayushyadavv4@gmail.com',
    'lhp01691@gmail.com',
    'daxini.manan@gmail.com',
    'daxinimanan@gmail.com'  // Added correct email variant
];

export async function POST(req: NextRequest) {
    try {
        const { idToken } = await req.json();

        if (!idToken) {
            return NextResponse.json({ message: 'ID token is required.' }, { status: 400 });
        }

        const firebaseAdmin = getFirebaseAdmin();
        const auth = getAuth(firebaseAdmin);
        const decodedToken = await auth.verifyIdToken(idToken);
        const email = decodedToken.email;

        if (!email) {
            return NextResponse.json({ message: 'Email not found in token.' }, { status: 400 });
        }

        // Check if the user is in the allowed list
        if (!ALLOWED_ADMIN_EMAILS.includes(email)) {
            return NextResponse.json({ message: 'Unauthorized. You are not an admin.' }, { status: 403 });
        }

        // User is an authorized admin, generate admin JWT
        const adminJwt = generateAdminToken({ email });

        const response = NextResponse.json({ success: true, message: 'Admin sign-in successful.' });

        // Set the admin-token in an HTTP-only cookie
        response.cookies.set('admin-token', adminJwt, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Only secure in production
            path: '/',
            maxAge: 60 * 60 * 18, // 18 hours
        });

        return response;

    } catch (error) {
        console.error('Admin sign-in error:', error);
        return NextResponse.json({ message: 'Authentication failed.' }, { status: 401 });
    }
}