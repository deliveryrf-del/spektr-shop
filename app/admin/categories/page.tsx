import { prisma } from '../../../lib/db';
import { requireAdmin } from '../../../lib/admin';
import CategoryForm from './_components/CategoryForm';
import DeleteCategoryButton from './_components/DeleteCategoryButton';

export const dynamic = 'force-dynamic';

export default async function CategoriesPage() {
  requireAdmin();
  const categories = await prisma.category.findMany({
    select: { id: true, title: true, slug: true, createdAt: true },
    orderBy: { createdAt: 'desc' }
  });
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Категории</h1>
      <div className="mb-4">
        <CategoryForm />
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="border p-2">ID</th>
            <th className="border p-2">Название</th>
            <th className="border p-2">Slug</th>
            <th className="border p-2">Дата</th>
            <th className="border p-2">Действия</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(c => (
            <tr key={c.id}>
              <td className="border p-2">{c.id}</td>
              <td className="border p-2">{c.title}</td>
              <td className="border p-2">{c.slug}</td>
              <td className="border p-2">{c.createdAt.toISOString().split('T')[0]}</td>
              <td className="border p-2">
                <div className="flex gap-2">
                  <CategoryForm initialData={c} />
                  <DeleteCategoryButton id={c.id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

