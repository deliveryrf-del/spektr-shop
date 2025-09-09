import { isAdminAuthed } from '@/lib/admin';
import Link from 'next/link';

export default function AdminHome() {
  const authed = isAdminAuthed();
  if (!authed) {
    return (
      <div style={{maxWidth:480, margin:'60px auto'}}>
        <h1>Вход в админку</h1>
        <form method="post" action="/api/admin/login" className="card">
          <label>Email</label>
          <input type="email" name="email" required style={{width:'100%', padding:8, margin:'6px 0 12px', border:'1px solid #ddd', borderRadius:8}}/>
          <label>Пароль</label>
          <input type="password" name="password" required style={{width:'100%', padding:8, margin:'6px 0 12px', border:'1px solid #ddd', borderRadius:8}}/>
          <button className="btn" type="submit">Войти</button>
        </form>
      </div>
    );
  }
  return (
    <div>
      <h1>Панель управления</h1>
      <ul>
        <li><Link href="/admin/products">Товары</Link></li>
        <li><Link href="/admin/categories">Категории</Link></li>
      </ul>
    </div>
  )
}
