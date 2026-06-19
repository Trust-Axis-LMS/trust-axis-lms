import prisma from './src/lib/prisma';
async function main() {
  const courses = await prisma.course.findMany({ include: { curriculum: true }});
  for (let c of courses) {
    if (c.curriculum.length === 0) {
      console.log(`Missing curriculum: ${c.slug}`);
    }
  }
}
main();
