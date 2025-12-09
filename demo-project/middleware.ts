import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ADMIN_TOKEN_NAME = 'admin-token';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // --- Admin Route Protection ---
    if (pathname.startsWith('/admin')) {
        const adminToken = request.cookies.get(ADMIN_TOKEN_NAME)?.value;
        const adminSigninUrl = new URL('/admin/signin', request.url);
        const adminDashboardUrl = new URL('/admin', request.url);

        // 1. If user is on the sign-in page...
        if (pathname === '/admin/signin') {
            // ...and they HAVE a token, assume they are logged in and redirect to dashboard.
            // We trust the presence of the cookie here for speed; the dashboard will verify it.
            if (adminToken) {
                return NextResponse.redirect(adminDashboardUrl);
            }
            // Otherwise, let them see the sign-in page
            return NextResponse.next();
        }

        // 2. For all other admin pages, require a token cookie to be present.
        if (!adminToken) {
            return NextResponse.redirect(adminSigninUrl);
        }

        // If token exists, proceed. The Server Components will verify its validity.
        return NextResponse.next();
    }

    // --- API Route Protection for Admin ---
    if (pathname.startsWith('/api/admin')) {
        if (pathname === '/api/admin/auth/signin') {
            return NextResponse.next();
        }

        const adminToken = request.cookies.get(ADMIN_TOKEN_NAME)?.value;
        if (!adminToken) {
            return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
        }
        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/admin/:path*',
        '/api/admin/:path*',
    ],
};
