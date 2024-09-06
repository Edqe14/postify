import { db, schema } from '@/db';
import { generateUserToken } from '@/lib/generateJwt';
import { verify } from 'argon2';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const bodyValidator = z.object({
  username: z.string().max(255),
  password: z.string(),
});

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const validated = await bodyValidator.safeParseAsync(body);

    if (validated.error) {
      return NextResponse.json(
        { error: validated.error.flatten() },
        { status: 422 }
      );
    }

    const existing = await db.query.users.findFirst({
      where: (user, { eq }) => eq(user.username, validated.data.username),
    });

    if (!existing) {
      return NextResponse.json(
        { error: "User doesn't exists" },
        { status: 404 }
      );
    }

    if (!(await verify(existing.password, validated.data.password))) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const token = await generateUserToken(existing);

    const response = NextResponse.json({
      error: null,
      message: `Welcome, ${existing.username}`,
    });

    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
};
