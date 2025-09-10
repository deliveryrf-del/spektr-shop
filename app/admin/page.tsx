import { isAdminAuthed } from '@/lib/admin';
import Link from 'next/link';
import LoginForm from './login/_components/LoginForm';
import LogoutButton from './_components/LogoutButton';

export default function AdminHome() {
  const authed = isAdminAuthed();
  if (!authed) {
    return (
      <div className="max-w-sm mx-auto mt-16">
        <h1 className="text-xl mb-4">Вход в админку</h1>
        <LoginForm />
      </div>
    );
  }
  return (
    <div className="max-w-sm mx-auto mt-16 space-y-4">
      <h1 className="text-xl">Панель управления</h1>
      <ul className="list-disc pl-4 space-y-2">
        <li><Link href="/admin/categories">Категории</Link></li>
        <li><Link href="/admin/products">Товары</Link></li>
      </ul>
      <LogoutButton />
    </div>
  );
}
