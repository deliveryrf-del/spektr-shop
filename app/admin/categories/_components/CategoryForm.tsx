'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  initialData?: { id: number; title: string; slug: string };
  onDone?: () => void;
}

export default function CategoryForm({ initialData, onDone }: Props) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [error, setError] = useState('');
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const url = initialData ? `/api/admin/categories/${initialData.id}` : '/api/admin/categories';
    const method = initialData ? 'PUT' : 'POST';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, slug })
    });
    if (res.ok) {
      setOpen(false);
      onDone?.();
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || 'Ошибка');
    }
  };

  if (!open) {
    return (
      <button className="btn" onClick={() => setOpen(true)}>
        {initialData ? 'Редактировать' : 'Добавить категорию'}
      </button>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-2">
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Название"
        className="w-full p-2 border border-gray-300 rounded"
        required
      />
      <input
        value={slug}
        onChange={e => setSlug(e.target.value)}
        placeholder="slug"
        className="w-full p-2 border border-gray-300 rounded"
        required
      />
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <div className="flex gap-2">
        <button type="submit" className="btn">Сохранить</button>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setOpen(false);
            setError('');
            onDone?.();
          }}
        >
          Отмена
        </button>
      </div>
    </form>
  );
}

