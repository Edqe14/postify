import { NextResponse } from 'next/server';

export const errorResponse = <T>(error: T, status: number) =>
  NextResponse.json({ error }, { status });

export const successResponse = <T>(message: string, data?: T, status = 200) =>
  NextResponse.json({ message, data, error: null }, { status });
