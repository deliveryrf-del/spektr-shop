'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Props {
  id: number;
}

export default function DeleteCategoryButton({ id }: Props) {
  const router = useRouter();
  const [error, setError] = useState('');

  const onClick = async () => {
    if (!confirm('Удалить категорию?')) return;
    setError('');
    const res = await fetch(`/api/admin/categories/${id}`, { method: 'DELETE' });
    if (res.ok) {
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || 'Ошибка');
    }
  };

  return (
    <div className="inline-block">
      <button className="btn" onClick={onClick}>Удалить</button>
      {error && <div className="text-red-600 text-sm">{error}</div>}
    </div>
  );
}

