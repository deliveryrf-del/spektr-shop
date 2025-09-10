import { cookies } from 'next/headers';

export async function POST() {
  cookies().set('spektr_admin', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
  return Response.json({ ok: true });
}
