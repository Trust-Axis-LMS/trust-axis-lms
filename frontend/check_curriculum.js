const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const courses = await prisma.course.findMany({
    include: { curriculum: true }
  });
  
  for (const c of courses) {
    if (c.curriculum.length === 0) {
      console.log(`Missing curriculum: ${c.slug}`);
    }
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
