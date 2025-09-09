import { cookies } from 'next/headers';

const COOKIE = 'spektr_admin';

export function isAdminAuthed() {
  const c = cookies().get(COOKIE)?.value;
  if (!c) return false;
  return c === 'ok';
}

export function adminLoginResponse() {
  const headers = new Headers();
  headers.append('Set-Cookie', `${COOKIE}=ok; Path=/; HttpOnly; SameSite=Lax`);
  return new Response(JSON.stringify({ ok: true }), { headers, status: 200 });
}

export function adminLogoutResponse() {
  const headers = new Headers();
  headers.append('Set-Cookie', `${COOKIE}=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax`);
  return new Response(JSON.stringify({ ok: true }), { headers, status: 200 });
}
