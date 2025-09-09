import { prisma } from '@/lib/db';
import { isAdminAuthed } from '@/lib/admin';

export async function POST(req: Request) {
  if (!isAdminAuthed()) return new Response('unauthorized', { status: 401 });
  const form = await req.formData();
  const title = String(form.get('title') || '');
  const slug = String(form.get('slug') || '');
  await prisma.category.create({ data: { title, slug } });
  return new Response(null, { status: 302, headers: { Location: '/admin/categories' }});
}
