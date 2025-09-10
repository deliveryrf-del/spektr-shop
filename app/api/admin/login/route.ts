import { cookies } from 'next/headers';

export async function POST(req: Request) {
  const { email, password } = await req.json();
  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    cookies().set('spektr_admin', '1', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 8,
    });
    return Response.json({ ok: true });
  }
  return Response.json({ error: 'invalid_credentials' }, { status: 401 });
}
