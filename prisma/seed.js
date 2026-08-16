import { prisma } from "../src/lib/prisma.js";

const categories = [
  "โชคลาภ",
  "การงาน",
  "การเงิน",
  "ความรัก",
  "การเรียน",
  "สุขภาพ",
];

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

const templeCategoryData = [
  {
    templeName: "วัดพระศรีรัตนศาสดาราม (วัดพระแก้ว)",
    categories: ["โชคลาภ", "การงาน"],
  },
  {
    templeName: "วัดอรุณราชวรารามราชวรมหาวิหาร",
    categories: ["ความรัก", "การเงิน"],
  },
  {
    templeName: "วัดพระธาตุดอยสุเทพราชวรวิหาร",
    categories: ["การเรียน", "สุขภาพ"],
  },
  {
    templeName: "วัดใหญ่ชัยมงคล",
    categories: ["โชคลาภ", "การงาน", "สุขภาพ"],
  },
];

const fortuneStickData = {
  "วัดพระศรีรัตนศาสดาราม (วัดพระแก้ว)": [
    { stickNumber: 1, title: "ใบที่ 1 โชคเปิดทาง", prediction: "การงานที่ติดขัดจะเริ่มคลี่คลาย มีผู้ใหญ่สนับสนุน ควรรับโอกาสใหม่ด้วยความรอบคอบ" },
    { stickNumber: 2, title: "ใบที่ 2 ทรัพย์ค่อยพูน", prediction: "การเงินมีแนวโน้มมั่นคงขึ้นจากความขยัน ระวังรายจ่ายเล็กน้อยที่รวมกันเป็นก้อนใหญ่" },
    { stickNumber: 3, title: "ใบที่ 3 รักด้วยความเข้าใจ", prediction: "ความสัมพันธ์จะดีขึ้นเมื่อพูดกันตรงไปตรงมา คนโสดอาจพบคนถูกใจผ่านงานหรือเพื่อน" },
    { stickNumber: 4, title: "ใบที่ 4 กายใจสมดุล", prediction: "สุขภาพโดยรวมดี แต่ควรพักผ่อนให้เพียงพอและลดความเครียดจากการคิดแทนผู้อื่น" },
    { stickNumber: 5, title: "ใบที่ 5 ลาภจากน้ำใจ", prediction: "มีเกณฑ์ได้โชคหรือของฝากจากคนใกล้ตัว การแบ่งปันจะนำโอกาสดีกลับมา" },
    { stickNumber: 6, title: "ใบที่ 6 ช้าแต่สำเร็จ", prediction: "สิ่งที่หวังยังต้องใช้เวลา อย่าเร่งตัดสินใจ ตรวจรายละเอียดให้ครบแล้วผลลัพธ์จะเป็นคุณ" },
  ],
  "วัดอรุณราชวรารามราชวรมหาวิหาร": [
    { stickNumber: 1, title: "ใบที่ 1 แสงใหม่ยามเช้า", prediction: "โอกาสใหม่กำลังเข้ามา เหมาะกับการเริ่มโครงการหรือปรับวิธีทำงานให้ทันสมัยขึ้น" },
    { stickNumber: 2, title: "ใบที่ 2 เงินหมุนคล่อง", prediction: "รายรับมีทางเพิ่มจากงานเสริม แต่ควรแยกเงินออมก่อนใช้และหลีกเลี่ยงการค้ำประกัน" },
    { stickNumber: 3, title: "ใบที่ 3 คู่ครองเกื้อหนุน", prediction: "ความรักอบอุ่นและช่วยกันแก้ปัญหา คนโสดมีโอกาสพบคนจริงใจในสถานที่คุ้นเคย" },
    { stickNumber: 4, title: "ใบที่ 4 เดินทางราบรื่น", prediction: "การเดินทางให้ผลดีและอาจนำข่าวสำคัญมาให้ ควรตรวจเวลาและเอกสารก่อนออกเดินทาง" },
    { stickNumber: 5, title: "ใบที่ 5 ระวังคำพูด", prediction: "ช่วงนี้คำพูดอาจถูกตีความผิด ควรใจเย็นและยืนยันข้อตกลงสำคัญเป็นลายลักษณ์อักษร" },
    { stickNumber: 6, title: "ใบที่ 6 บุญหนุนนำ", prediction: "ความช่วยเหลือที่เคยมอบให้ผู้อื่นจะย้อนกลับมา จงทำสิ่งถูกต้องโดยไม่หวังผลเร่งด่วน" },
  ],
  "วัดพระธาตุดอยสุเทพราชวรวิหาร": [
    { stickNumber: 1, title: "ใบที่ 1 ปัญญาแจ่มใส", prediction: "การเรียนและการสอบมีเกณฑ์ก้าวหน้า หากจัดตารางให้สม่ำเสมอจะเห็นผลชัดเจน" },
    { stickNumber: 2, title: "ใบที่ 2 ก้าวสูงด้วยเพียร", prediction: "งานยากจะสำเร็จจากความอดทน อย่าเปรียบเทียบจังหวะของตนกับผู้อื่น" },
    { stickNumber: 3, title: "ใบที่ 3 ลมหนาวพาข่าวดี", prediction: "มีเกณฑ์ได้รับข่าวจากแดนไกลหรือคนที่ไม่ได้พบกันนาน เป็นจังหวะดีของการเดินทาง" },
    { stickNumber: 4, title: "ใบที่ 4 ใจสงบกายแข็งแรง", prediction: "ควรดูแลการนอนและการหายใจ พักจากหน้าจอบ้างแล้วพลังใจจะกลับคืน" },
    { stickNumber: 5, title: "ใบที่ 5 พบครูดี", prediction: "จะได้คำแนะนำสำคัญจากผู้มีประสบการณ์ เปิดใจรับฟังแล้วทางเลือกจะชัดขึ้น" },
    { stickNumber: 6, title: "ใบที่ 6 อย่าหลงทางลัด", prediction: "ผลสำเร็จอยู่ไม่ไกล แต่ข้อเสนอที่ง่ายเกินจริงควรตรวจสอบให้ดี ยึดความสุจริตเป็นหลัก" },
  ],
  "วัดใหญ่ชัยมงคล": [
    { stickNumber: 1, title: "ใบที่ 1 ชัยชนะใกล้ถึง", prediction: "การแข่งขันหรือการสมัครงานมีเกณฑ์สมหวัง เตรียมตัวให้พร้อมและแสดงความสามารถอย่างมั่นใจ" },
    { stickNumber: 2, title: "ใบที่ 2 ได้ลาภจากงาน", prediction: "โชคลาภมาจากฝีมือมากกว่าการเสี่ยง งานที่ทำต่อเนื่องจะเริ่มสร้างผลตอบแทน" },
    { stickNumber: 3, title: "ใบที่ 3 รักเก่าคลี่คลาย", prediction: "เรื่องค้างคาในความสัมพันธ์มีโอกาสได้ข้อสรุป ให้อภัยโดยไม่ละเลยขอบเขตของตน" },
    { stickNumber: 4, title: "ใบที่ 4 บ้านเรือนเป็นสุข", prediction: "ครอบครัวจะมีข่าวน่ายินดี เหมาะกับการจัดบ้านและใช้เวลาร่วมกับคนสำคัญ" },
    { stickNumber: 5, title: "ใบที่ 5 รักษากำลัง", prediction: "อย่ารับภาระทุกอย่างไว้คนเดียว ระวังอาการล้าจากการทำงานและแบ่งเวลาพักให้ชัดเจน" },
    { stickNumber: 6, title: "ใบที่ 6 มงคลจากความกล้า", prediction: "การตัดสินใจที่ผ่านการไตร่ตรองจะเปิดประตูบานใหม่ จงกล้าก้าวแต่ไม่ประมาท" },
  ],
};

async function seedCategories() {
  for (const name of categories) {
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log(`Seeded ${categories.length} categories successfully`);
}

async function seedTemples() {
  for (const temple of temples) {
    await prisma.temple.upsert({
      where: { name: temple.name },
      update: temple,
      create: temple,
    });
  }

  console.log(`Seeded ${temples.length} temples successfully`);
}

async function seedTempleCategories() {
  let relationCount = 0;

  for (const { templeName, categories: categoryNames } of templeCategoryData) {
    const temple = await prisma.temple.findUnique({
      where: { name: templeName },
    });

    if (!temple) {
      throw new Error(
        `Cannot seed TempleCategory: temple "${templeName}" not found`,
      );
    }

    for (const categoryName of categoryNames) {
      const category = await prisma.category.findUnique({
        where: { name: categoryName },
      });

      if (!category) {
        throw new Error(
          `Cannot seed TempleCategory: category "${categoryName}" not found for temple "${templeName}"`,
        );
      }

      await prisma.templeCategory.upsert({
        where: {
          templeId_categoryId: {
            templeId: temple.id,
            categoryId: category.id,
          },
        },
        update: {},
        create: {
          templeId: temple.id,
          categoryId: category.id,
        },
      });

      relationCount += 1;
    }
  }

  console.log(`Seeded ${relationCount} temple categories successfully`);
}

async function seedFortuneSticks() {
  let fortuneStickCount = 0;

  for (const [templeName, fortuneSticks] of Object.entries(fortuneStickData)) {
    const temple = await prisma.temple.findUnique({
      where: { name: templeName },
    });

    if (!temple) {
      throw new Error(
        `Cannot seed FortuneStick: temple "${templeName}" not found`,
      );
    }

    for (const stick of fortuneSticks) {
      await prisma.fortuneStick.upsert({
        where: {
          templeId_stickNumber: {
            templeId: temple.id,
            stickNumber: stick.stickNumber,
          },
        },
        update: {
          title: stick.title,
          prediction: stick.prediction,
        },
        create: {
          templeId: temple.id,
          ...stick,
        },
      });

      fortuneStickCount += 1;
    }
  }

  console.log(`Seeded ${fortuneStickCount} fortune sticks successfully`);
}

async function main() {
  await seedCategories();
  await seedTemples();
  await seedTempleCategories();
  await seedFortuneSticks();
}

main()
  .catch((error) => {
    console.error("Failed to seed database:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
