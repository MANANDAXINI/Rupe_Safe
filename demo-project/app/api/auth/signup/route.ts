import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, generateUserToken } from '@/lib/auth';
import { signupSchema } from '@/lib/validators';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = signupSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid input', details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { name, email, password } = parsed.data;

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 });
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        name: name ?? null,
        passwordHash: hashedPassword,
        provider: 'EMAIL',
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    const jwt = generateUserToken({ id: user.id, email: user.email });
    const response = NextResponse.json({ user });

    response.cookies.set('token', jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}