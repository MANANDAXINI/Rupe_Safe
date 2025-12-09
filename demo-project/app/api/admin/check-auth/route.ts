import { NextResponse } from 'next/server';
import { getAdminFromCookie } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export function GET() {
  try {
    const admin = getAdminFromCookie();
    
    if (!admin) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        email: admin.email,
      }
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { authenticated: false },
      { status: 401 }
    );
  }
}