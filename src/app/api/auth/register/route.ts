import { db, schema } from '@/db';
import { hash } from 'argon2';
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
      columns: {
        id: true,
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      );
    }

    const passwordHash = await hash(validated.data.password);

    await db.insert(schema.users).values({
      username: validated.data.username,
      password: passwordHash,
    });

    return NextResponse.json({ error: null, message: 'User registered' });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
};
