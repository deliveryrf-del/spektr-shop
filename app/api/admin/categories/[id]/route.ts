import { isAdminAuthed } from '../../../../../lib/admin';
import { prisma } from '../../../../../lib/db';

interface Params {
  params: { id: string };
}

export async function PUT(req: Request, { params }: Params) {
  if (!isAdminAuthed()) return new Response('unauthorized', { status: 401 });
  const id = Number(params.id);
  if (!id) return Response.json({ error: 'not_found' }, { status: 404 });
  try {
    const { title = '', slug = '' } = await req.json();
    if (typeof title !== 'string' || title.length < 2 || title.length > 100) {
      return Response.json({ error: 'invalid_title' }, { status: 400 });
    }
    if (typeof slug !== 'string' || !/^[a-z0-9-]+$/.test(slug)) {
      return Response.json({ error: 'invalid_slug' }, { status: 400 });
    }
    const exists = await prisma.category.findUnique({ where: { id } });
    if (!exists) return Response.json({ error: 'not_found' }, { status: 404 });
    const slugExists = await prisma.category.findFirst({ where: { slug, NOT: { id } } });
    if (slugExists) return Response.json({ error: 'slug_exists' }, { status: 400 });
    await prisma.category.update({ where: { id }, data: { title, slug } });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: 'bad_request' }, { status: 400 });
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  if (!isAdminAuthed()) return new Response('unauthorized', { status: 401 });
  const id = Number(params.id);
  if (!id) return Response.json({ error: 'not_found' }, { status: 404 });
  try {
    const exists = await prisma.category.findUnique({ where: { id } });
    if (!exists) return Response.json({ error: 'not_found' }, { status: 404 });
    const count = await prisma.product.count({ where: { categoryId: id } });
    if (count > 0) return Response.json({ error: 'category_has_products' }, { status: 400 });
    await prisma.category.delete({ where: { id } });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: 'server_error' }, { status: 500 });
  }
}

