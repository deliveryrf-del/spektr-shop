import { adminLoginResponse } from '@/lib/admin';

export async function POST(req: Request) {
  const form = await req.formData();
  const email = String(form.get('email') || '');
  const password = String(form.get('password') || '');
  if (email === (process.env.ADMIN_EMAIL || '') && password === (process.env.ADMIN_PASSWORD || '')) {
    return adminLoginResponse();
  }
  return new Response(JSON.stringify({ error: 'invalid_credentials' }), { status: 401 });
}
