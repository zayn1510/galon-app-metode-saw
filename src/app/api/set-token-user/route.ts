import { NextRequest, NextResponse } from 'next/server';
export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Token is required' },
        { status: 400 }
      );
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set({
      name: 'user_token',
      value: token,
      httpOnly: true,
      path: '/', // Pastikan path=/ agar tersedia di semua route
      maxAge: 60 * 60 * 24, // 1 hari
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Internal server error'+error },
      { status: 500 }
    );
  }
}