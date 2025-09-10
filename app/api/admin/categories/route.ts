import { isAdminAuthed } from '../../../../lib/admin';
import { prisma } from '../../../../lib/db';

export async function GET() {
  if (!isAdminAuthed()) return new Response('unauthorized', { status: 401 });
  const categories = await prisma.category.findMany({
    select: { id: true, title: true, slug: true, createdAt: true },
    orderBy: { createdAt: 'desc' }
  });
  return Response.json(categories);
}

export async function POST(req: Request) {
  if (!isAdminAuthed()) return new Response('unauthorized', { status: 401 });
  try {
    const { title = '', slug = '' } = await req.json();
    if (typeof title !== 'string' || title.length < 2 || title.length > 100) {
      return Response.json({ error: 'invalid_title' }, { status: 400 });
    }
    if (typeof slug !== 'string' || !/^[a-z0-9-]+$/.test(slug)) {
      return Response.json({ error: 'invalid_slug' }, { status: 400 });
    }
    const exists = await prisma.category.findUnique({ where: { slug } });
    if (exists) return Response.json({ error: 'slug_exists' }, { status: 400 });
    const category = await prisma.category.create({ data: { title, slug } });
    return Response.json({ ok: true, category });
  } catch {
    return Response.json({ error: 'bad_request' }, { status: 400 });
  }
}

