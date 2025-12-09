import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateUserToken } from '@/lib/auth';
import { getFirebaseAdmin } from '@/lib/firebaseAdmin';
import { getAuth } from 'firebase-admin/auth';
import { googleTokenSchema } from '@/lib/validators';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = googleTokenSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid request payload', details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { idToken } = parsed.data;

  try {
    // Initialize the Firebase Admin app
    const app = getFirebaseAdmin();
    // Get the Auth service for the app
    const auth = getAuth(app);
    
    // Verify the ID token
    const decoded = await auth.verifyIdToken(idToken);
    const { email, name, picture } = decoded;

    if (!email) {
      return NextResponse.json({ error: 'Email not present in Google token' }, { status: 400 });
    }

    const user = await prisma.user.upsert({
      where: { email },
      update: {
        name: name ?? undefined,
        image: picture ?? undefined,
        provider: 'GOOGLE',
      },
      create: {
        email,
        name: name ?? 'Google User',
        image: picture ?? null,
        provider: 'GOOGLE',
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
      },
    });

    const jwt = generateUserToken({ id: user.id, email: user.email });
    const response = NextResponse.json({ user });

    response.cookies.set('token', jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;
  } catch (error) {
    console.error('Google auth error:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 401 });
  }
}