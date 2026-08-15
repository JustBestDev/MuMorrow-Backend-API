import { prisma } from "../src/lib/prisma.js";

const temples = [
  {
    name: "วัดพระศรีรัตนศาสดาราม (วัดพระแก้ว)",
    province: "กรุงเทพมหานคร",
    address: "ถนนหน้าพระลาน แขวงพระบรมมหาราชวัง เขตพระนคร กรุงเทพมหานคร 10200",
    description: "พระอารามหลวงภายในพระบรมมหาราชวัง เป็นที่ประดิษฐานพระพุทธมหามณีรัตนปฏิมากร",
    latitude: 13.7516,
    longitude: 100.4927,
    imageUrl: null,
  },
  {
    name: "วัดอรุณราชวรารามราชวรมหาวิหาร",
    province: "กรุงเทพมหานคร",
    address: "158 ถนนวังเดิม แขวงวัดอรุณ เขตบางกอกใหญ่ กรุงเทพมหานคร 10600",
    description: "พระอารามหลวงริมแม่น้ำเจ้าพระยา มีพระปรางค์วัดอรุณเป็นสัญลักษณ์สำคัญ",
    latitude: 13.7437,
    longitude: 100.4889,
    imageUrl: null,
  },
  {
    name: "วัดพระธาตุดอยสุเทพราชวรวิหาร",
    province: "เชียงใหม่",
    address: "9 หมู่ 9 ตำบลสุเทพ อำเภอเมืองเชียงใหม่ จังหวัดเชียงใหม่ 50200",
    description: "พระอารามหลวงบนดอยสุเทพและสถานที่สำคัญคู่เมืองเชียงใหม่ เป็นที่ประดิษฐานพระบรมสารีริกธาตุ",
    latitude: 18.8048,
    longitude: 98.9216,
    imageUrl: null,
  },
  {
    name: "วัดใหญ่ชัยมงคล",
    province: "พระนครศรีอยุธยา",
    address: "40/3 หมู่ 3 ตำบลคลองสวนพลู อำเภอพระนครศรีอยุธยา จังหวัดพระนครศรีอยุธยา 13000",
    description: "วัดโบราณสำคัญของกรุงศรีอยุธยา โดดเด่นด้วยเจดีย์ชัยมงคลขนาดใหญ่",
    latitude: 14.3454,
    longitude: 100.5923,
    imageUrl: null,
  },
];

async function main() {
  for (const temple of temples) {
    await prisma.temple.upsert({
      where: { name: temple.name },
      update: temple,
      create: temple,
    });
  }

  console.log(`Seeded ${temples.length} temples successfully`);
}

main()
  .catch((error) => {
    console.error("Failed to seed database:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });