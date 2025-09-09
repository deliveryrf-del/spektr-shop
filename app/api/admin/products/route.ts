import { prisma } from '@/lib/db';
import { isAdminAuthed } from '@/lib/admin';

export async function GET() {
  if (!isAdminAuthed()) return new Response('unauthorized', { status: 401 });
  const items = await prisma.product.findMany({ orderBy:{ createdAt:'desc' } });
  return new Response(JSON.stringify(items), { headers:{ 'Content-Type':'application/json' }});
}

export async function POST(req: Request) {
  if (!isAdminAuthed()) return new Response('unauthorized', { status: 401 });
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

  await prisma.product.create({
    data: { title, sku, slug, price: Math.round(priceRub * 100), stock, images, attributes, currency:'RUB', isActive:true }
  });
  return new Response(null, { status: 302, headers: { Location: '/admin/products' }});
}
