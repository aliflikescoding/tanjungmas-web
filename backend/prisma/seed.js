import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // await prisma.page.create({
  //   data: {
  //     logo: "",
  //     heroImage: "",
  //   },
  // });
  await prisma.navbarImages.create({
    data: {
      image: "",
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
