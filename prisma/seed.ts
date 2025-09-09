import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Categories
  const cat = await prisma.category.upsert({
    where: { slug: 'moyki-samoobsluzhivaniya' },
    update: {},
    create: { title: 'Мойки самообслуживания', slug: 'moyki-samoobsluzhivaniya' }
  });

  // Products
  await prisma.product.upsert({
    where: { sku: 'HAWK-1520' },
    update: {},
    create: {
      sku: 'HAWK-1520',
      title: 'Насос HAWK 15.20',
      slug: 'nasos-hawk-1520',
      price: 12500000,
      stock: 10,
      categoryId: cat.id,
      attributes: { pressure_bar: 150, flow_l_min: 20, brand: 'HAWK' },
      images: ['https://via.placeholder.com/800x600?text=HAWK+15.20']
    }
  });

  await prisma.product.upsert({
    where: { sku: 'PROFI-2POST' },
    update: {},
    create: {
      sku: 'PROFI-2POST',
      title: 'Комплект МСО — 2 поста (PROFI)',
      slug: 'komplekt-mso-2-post-profi',
      price: 350000000,
      stock: 2,
      categoryId: cat.id,
      attributes: { posts: 2, heater: true, foam: true },
      images: ['https://via.placeholder.com/800x600?text=MSO+2+POST']
    }
  });

  // Warehouse + stock items
  const wh = await prisma.warehouse.upsert({
    where: { code: 'KZN' },
    update: {},
    create: { code: 'KZN', name: 'Склад Казань', region: 'Tatarstan' }
  });

  const products = await prisma.product.findMany();
  for (const p of products) {
    await prisma.stockItem.upsert({
      where: { productId_warehouseId: { productId: p.id, warehouseId: wh.id } },
      update: { qty: p.stock },
      create: { productId: p.id, warehouseId: wh.id, qty: p.stock }
    });
  }

  console.log('Seed done');
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
