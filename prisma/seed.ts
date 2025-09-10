import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const cat1 = await prisma.category.create({
    data: { title: 'Мойки самообслуживания', slug: 'moyki-samoobsluzhivaniya' },
  })
  const cat2 = await prisma.category.create({
    data: { title: 'Пылесосы', slug: 'pylesosy' },
  })
  const cat3 = await prisma.category.create({
    data: { title: 'Автохимия', slug: 'avtohimiya' },
  })

  await prisma.product.createMany({
    data: [
      {
        title: 'Насос HAWK 15.20',
        sku: 'HAWK-1520',
        slug: 'nasos-hawk-1520',
        price: 12500000,
        stock: 10,
        categoryId: cat1.id,
      },
      {
        title: 'Комплект МСО — 2 поста (PROFI)',
        sku: 'PROFI-2POST',
        slug: 'komplekt-mso-2-post-profi',
        price: 350000000,
        stock: 2,
        categoryId: cat1.id,
      },
      {
        title: 'Пылесос VAC-100',
        sku: 'VAC-100',
        slug: 'pylesos-vac-100',
        price: 5000000,
        stock: 5,
        categoryId: cat2.id,
      },
      {
        title: 'Шампунь для бесконтактной мойки',
        sku: 'CHEM-1',
        slug: 'shampun-beskontaktnaya',
        price: 250000,
        stock: 20,
        categoryId: cat3.id,
      },
      {
        title: 'Защитный воск',
        sku: 'CHEM-2',
        slug: 'zashchitnyj-vosk',
        price: 300000,
        stock: 15,
        categoryId: cat3.id,
      },
    ],
  })

  console.log('Seed completed')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
