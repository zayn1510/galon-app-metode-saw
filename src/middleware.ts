import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  // Proteksi route dashboard
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!token) {
      console.log('Redirecting to login - no token found');
      return NextResponse.redirect(new URL('../admin/login', request.url));
    }

    try {
      // Verifikasi token sederhana (pada production, gunakan library JWT)
      const tokenParts = token.split('.');
      if (tokenParts.length !== 3) {
        throw new Error('Invalid token format');
      }
      
      // Cek expired (contoh sederhana)
      const payload = JSON.parse(Buffer.from(tokenParts[1], 'base64').toString());
      if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
        throw new Error('Token expired');
      }
    } catch (err) {
      console.log('Invalid token:', err);
      const response = NextResponse.redirect(new URL('../admin/login', request.url));
      // Hapus cookie yang invalid
      response.cookies.delete('token');
      return response;
    }
  }

  return NextResponse.next();
}