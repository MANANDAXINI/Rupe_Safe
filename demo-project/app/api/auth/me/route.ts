import { NextResponse } from 'next/server';
import { getUserFromCookie } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const user = await getUserFromCookie();

    if (!user) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Current user lookup failed:', error);
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}