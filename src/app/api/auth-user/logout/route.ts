import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST() {
  try {
    // Create serialized empty token
    const serializedToken = serialize('user_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: -1,
      path: '/',
    });

    const response = NextResponse.json(
      { success: true, message: 'Logged out successfully' },
      { status: 200 }
    );

    // Set the expired cookie
    response.headers.set('Set-Cookie', serializedToken);

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Logout failed :'+error },
      { status: 500 }
    );
  }
}