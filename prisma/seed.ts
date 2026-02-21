import { PrismaClient } from '@prisma/client'

import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Seeding database...')

  // Clear existing inventory
  await prisma.inventoryItem.deleteMany()

  // Create example inventory items
  const items = await prisma.inventoryItem.createMany({
    data: [
      { sku: 'MED-001', name: 'First Aid Kit', category: 'Medical', quantity: 50, warehouseId: 'WH-1' },
      { sku: 'FOOD-001', name: 'MRE Rations', category: 'Food', quantity: 200, warehouseId: 'WH-1' },
      { sku: 'SHEL-001', name: 'Emergency Tent', category: 'Shelter', quantity: 20, warehouseId: 'WH-2' },
    ],
  })

  console.log(`✅ Created ${items.count} inventory items`)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
