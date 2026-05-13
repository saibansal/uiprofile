import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { password } = await request.json();

    const correctPassword = process.env.ADMIN_PASSWORD;
    const adminToken = process.env.ADMIN_TOKEN;

    if (!correctPassword || !adminToken) {
      return NextResponse.json({ error: 'Server configuration missing.' }, { status: 500 });
    }

    if (password === correctPassword) {
      const response = NextResponse.json({ success: true });
      
      // Set an HttpOnly cookie
      response.cookies.set({
        name: 'admin_session',
        value: adminToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 1 week
      });

      return response;
    } else {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
