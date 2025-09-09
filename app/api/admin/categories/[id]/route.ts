import { prisma } from '@/lib/db';
import { isAdminAuthed } from '@/lib/admin';

export async function POST(req: Request, { params }: { params: { id: string }}) {
  if (!isAdminAuthed()) return new Response('unauthorized', { status: 401 });
  const url = new URL(req.url);
  const method = url.searchParams.get('_method')?.toUpperCase();
  if (method === 'DELETE') {
    await prisma.category.delete({ where: { id: params.id } });
    return new Response(null, { status: 302, headers: { Location: '/admin/categories' }});
  }
  return new Response('unsupported', { status: 400 });
}
