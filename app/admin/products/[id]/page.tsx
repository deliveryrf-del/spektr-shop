import { prisma } from '@/lib/db';
import { isAdminAuthed } from '@/lib/admin';

export default async function EditProduct({ params }: { params: { id: string } }) {
  if (!isAdminAuthed()) return <div>Не авторизованы. <a href="/admin">Войти</a></div>;
  const p = await prisma.product.findUnique({ where: { id: params.id } });
  if (!p) return <div>Товар не найден</div>;

  return (
    <div>
      <h1>Редактирование: {p.title}</h1>
      <form method="post" action={`/api/admin/products/${p.id}?_method=PUT`} style={{display:'grid', gap:8, maxWidth:640}}>
        <label>Название<input name="title" defaultValue={p.title} required style={{padding:8, border:'1px solid #ddd', borderRadius:8}}/></label>
        <label>SKU<input name="sku" defaultValue={p.sku} required style={{padding:8, border:'1px solid #ddd', borderRadius:8}}/></label>
        <label>Slug<input name="slug" defaultValue={p.slug} required style={{padding:8, border:'1px solid #ddd', borderRadius:8}}/></label>
        <label>Цена (руб)<input name="price" type="number" defaultValue={(p.price/100).toString()} required style={{padding:8, border:'1px solid #ddd', borderRadius:8}}/></label>
        <label>Остаток<input name="stock" type="number" defaultValue={p.stock} required style={{padding:8, border:'1px solid #ddd', borderRadius:8}}/></label>
        <label>Картинки (через запятую)<textarea name="images" rows={2} defaultValue={(p.images as any)?.join(', ') || ''} style={{padding:8, border:'1px solid #ddd', borderRadius:8}}/></label>
        <label>Характеристики (JSON)<textarea name="attributes" rows={4} defaultValue={JSON.stringify(p.attributes || {}, null, 2)} style={{padding:8, border:'1px solid #ddd', borderRadius:8}}/></label>
        <button className="btn" type="submit">Сохранить</button>
      </form>
    </div>
  )
}
