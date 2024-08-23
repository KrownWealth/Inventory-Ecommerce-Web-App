import { NextRequest, NextResponse } from 'next/server';
import { login } from '@/lib';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    await login(formData);
    return NextResponse.redirect(new URL('/account', request.url));
  } catch (error) {
    return NextResponse.redirect(new URL('/error', request.url));
  }
}
