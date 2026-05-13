import { NextResponse } from 'next/server';

export function middleware(request) {
  const session = request.cookies.get('admin_session');
  const validToken = process.env.ADMIN_TOKEN;

  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  const isPortfolioApi = request.nextUrl.pathname.startsWith('/api/portfolio') && request.method === 'POST';
  const isUploadApi = request.nextUrl.pathname.startsWith('/api/upload') && request.method === 'POST';

  // Check if trying to access a protected route
  if (isAdminRoute || isPortfolioApi || isUploadApi) {
    if (!session || session.value !== validToken) {
      
      // If it's an API request, return 401 Unauthorized
      if (isPortfolioApi || isUploadApi) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      
      // If it's a page request, redirect to login
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // If trying to access login page while already logged in, redirect to admin
  if (request.nextUrl.pathname.startsWith('/login')) {
    if (session && session.value === validToken) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/login', '/api/portfolio', '/api/upload'],
};
