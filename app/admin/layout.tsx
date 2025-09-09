
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <header style={{padding:'12px 20px', borderBottom:'1px solid #eee', display:'flex', gap:16}}>
          <a href="/admin" style={{fontWeight:700}}>Админка</a>
          <nav style={{display:'flex', gap:12}}>
            <a href="/admin/products">Товары</a>
            <a href="/admin/categories">Категории</a>
            <form method="post" action="/api/admin/logout" style={{display:'inline'}}>
              <button className="btn" style={{padding:'6px 10px'}}>Выйти</button>
            </form>
          </nav>
        </header>
        <main style={{maxWidth:1000, margin:'20px auto', padding:'0 16px'}}>{children}</main>
      </body>
    </html>
  );
}
