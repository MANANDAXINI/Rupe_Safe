import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPassword, generateUserToken } from '@/lib/auth';
import { signinSchema } from '@/lib/validators';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = signinSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid input', details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { email, password } = parsed.data;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !user.passwordHash) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const jwt = generateUserToken({ id: user.id, email: user.email });
    const response = NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });

    response.cookies.set('token', jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    console.error('Signin error:', error);
    return NextResponse.json({ error: 'Sign in failed' }, { status: 500 });
  }
}