'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(false);
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      router.refresh();
    } else if (res.status === 401) {
      setError(true);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block mb-1">Email</label>
        <input name="email" type="email" required className="w-full border rounded p-2" />
      </div>
      <div>
        <label className="block mb-1">Пароль</label>
        <input name="password" type="password" required className="w-full border rounded p-2" />
      </div>
      {error && <div className="text-red-600">Неверные данные</div>}
      <button type="submit" className="btn">Войти</button>
    </form>
  );
}
