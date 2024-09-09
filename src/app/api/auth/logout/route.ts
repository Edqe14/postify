import { successResponse } from '@/lib/responses';
import { NextRequest } from 'next/server';

export const GET = async (req: NextRequest) => {
  const response = successResponse('Logged out');

  response.cookies.delete('token');

  return response;
};
