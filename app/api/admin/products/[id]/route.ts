import { prisma } from '@/lib/db';
import { isAdminAuthed } from '@/lib/admin';

export async function POST(req: Request, { params }: { params: { id: string }}) {
  if (!isAdminAuthed()) return new Response('unauthorized', { status: 401 });
  const url = new URL(req.url);
  const method = url.searchParams.get('_method')?.toUpperCase();

  if (method === 'PUT') {
    const form = await req.formData();
    const title = String(form.get('title') || '');
    const sku = String(form.get('sku') || '');
    const slug = String(form.get('slug') || '');
    const priceRub = Number(form.get('price') || '0');
    const stock = Number(form.get('stock') || '0');
    const imagesRaw = String(form.get('images') || '').trim();
    const attrsRaw = String(form.get('attributes') || '').trim();
    const images = imagesRaw ? imagesRaw.split(',').map(s => s.trim()).filter(Boolean) : [];
    let attributes: any = {};
    try { attributes = attrsRaw ? JSON.parse(attrsRaw) : {}; } catch {}

    await prisma.product.update({
      where: { id: params.id },
      data: { title, sku, slug, price: Math.round(priceRub * 100), stock, images, attributes }
    });
    return new Response(null, { status: 302, headers: { Location: '/admin/products' }});
  }

  if (method === 'DELETE') {
    await prisma.product.delete({ where: { id: params.id } });
    return new Response(null, { status: 302, headers: { Location: '/admin/products' }});
  }

  return new Response('unsupported', { status: 400 });
}
