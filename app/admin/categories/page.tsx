import { prisma } from '@/lib/db';
import { isAdminAuthed } from '@/lib/admin';

export const dynamic = 'force-dynamic';

export default async function CategoriesAdmin() {
  if (!isAdminAuthed()) return <div>Не авторизованы. <a href="/admin">Войти</a></div>;
  const cats = await prisma.category.findMany({ orderBy:{ title:'asc' } });

  return (
    <div>
      <h1>Категории</h1>
      <details open className="card">
        <summary><strong>Добавить категорию</strong></summary>
        <form method="post" action="/api/admin/categories" style={{marginTop:12, display:'grid', gap:8}}>
          <input name="title" placeholder="Название" required style={{padding:8, border:'1px solid #ddd', borderRadius:8}}/>
          <input name="slug" placeholder="slug" required style={{padding:8, border:'1px solid #ddd', borderRadius:8}}/>
          <button className="btn" type="submit">Создать</button>
        </form>
      </details>

      <div className="grid" style={{marginTop:16}}>
        {cats.map(c => (
          <div className="card" key={c.id}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <div><strong>{c.title}</strong> · /katalog/{c.slug}</div>
              <form method="post" action={`/api/admin/categories/${c.id}?_method=DELETE`} onSubmit={(e)=>{ if(!confirm('Удалить категорию?')) e.preventDefault(); }}>
                <button className="btn" type="submit">Удалить</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
