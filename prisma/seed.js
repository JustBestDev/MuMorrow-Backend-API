import { PrismaClient } from "../generated/prisma/client.js";
// import { prisma } from "../src/lib/prisma.js";

const prisma = new PrismaClient()

const temples = [
  {
    name: 'วัดพระแก้ว',
    province: 'กรุงเทพมหานคร',
    description: 'วัดสำคัญภายในพระบรมมหาราชวัง',
    latitude: 13.7516,
    longitude: 100.4927
  },
  {
    name: 'วัดอรุณราชวราราม',
    province: 'กรุงเทพมหานคร',
    description: 'วัดริมแม่น้ำเจ้าพระยา มีพระปรางค์เป็นจุดเด่น',
    latitude: 13.7437,
    longitude: 100.4889
  },
  {
    name: 'วัดพระธาตุดอยสุเทพ',
    province: 'เชียงใหม่',
    description: 'วัดสำคัญและสถานที่ท่องเที่ยวชื่อดังของเชียงใหม่',
    latitude: 18.8048,
    longitude: 98.9216
  },
  {
    name: 'วัดใหญ่ชัยมงคล',
    province: 'พระนครศรีอยุธยา',
    description: 'วัดเก่าแก่ที่มีเจดีย์ชัยมงคลขนาดใหญ่',
    latitude: 14.3454,
    longitude: 100.5923
  }
]

async function main() {
  await prisma.temple.createMany({
    data: temples
  })

  console.log('Seed temples successfully')
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })