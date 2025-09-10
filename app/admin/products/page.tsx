import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/admin';

export const dynamic = 'force-dynamic';

export default async function ProductsAdmin() {
  await requireAdmin();
  const products = await prisma.product.findMany({ orderBy:{ createdAt:'desc' } });

  return (
    <div>
      <h1>Товары</h1>
      <details open className="card">
        <summary><strong>Добавить товар</strong></summary>
        <form method="post" action="/api/admin/products" style={{marginTop:12, display:'grid', gap:8}}>
          <input name="title" placeholder="Название" required style={{padding:8, border:'1px solid #ddd', borderRadius:8}}/>
          <input name="sku" placeholder="SKU" required style={{padding:8, border:'1px solid #ddd', borderRadius:8}}/>
          <input name="slug" placeholder="slug (латиницей)" required style={{padding:8, border:'1px solid #ddd', borderRadius:8}}/>
          <input name="price" type="number" placeholder="Цена в рублях" required style={{padding:8, border:'1px solid #ddd', borderRadius:8}}/>
          <input name="stock" type="number" placeholder="Остаток" required style={{padding:8, border:'1px solid #ddd', borderRadius:8}}/>
          <textarea name="images" placeholder="Ссылки на изображения через запятую" rows={2} style={{padding:8, border:'1px solid #ddd', borderRadius:8}}/>
          <textarea name="attributes" placeholder='Характеристики в JSON (например {"brand":"HAWK","pressure_bar":150})' rows={3} style={{padding:8, border:'1px solid #ddd', borderRadius:8}}/>
          <button className="btn" type="submit">Создать</button>
        </form>
      </details>
      <div className="grid" style={{marginTop:16}}>
        {products.map(p => (
          <div className="card" key={p.id}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <h3>{p.title}</h3>
              <form method="post" action={`/api/admin/products/${p.id}?_method=DELETE`} onSubmit={(e)=>{ if(!confirm('Удалить?')) e.preventDefault(); }}>
                <button className="btn" type="submit">Удалить</button>
              </form>
            </div>
            <div>SKU: {p.sku}</div>
            <div>Цена: {(p.price/100).toLocaleString('ru-RU')} ₽</div>
            <div>Остаток: {p.stock}</div>
            <a className="btn" href={`/admin/products/${p.id}`} style={{marginTop:8, display:'inline-block'}}>Редактировать</a>
          </div>
        ))}
      </div>
    </div>
  )
}
