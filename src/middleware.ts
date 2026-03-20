import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware: protects /api/admin/* routes with Bearer token auth.
 * Page routes (/admin, /admin/leads) are NOT protected by middleware
 * because client-side auth is handled via localStorage + login page.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect API routes under /api/admin
  if (!pathname.startsWith('/api/admin')) {
    return NextResponse.next();
  }

  const authHeader = request.headers.get('Authorization');
  if (!authHeader) {
    return NextResponse.json(
      { success: false, error: 'Требуется авторизация' },
      { status: 401 },
    );
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return NextResponse.json(
      { success: false, error: 'Неверный формат токена' },
      { status: 401 },
    );
  }

  const token = parts[1];
  const adminPassword = process.env.ADMIN_PASSWORD ?? '';

  if (!adminPassword || token !== adminPassword) {
    return NextResponse.json(
      { success: false, error: 'Неверный пароль' },
      { status: 401 },
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
