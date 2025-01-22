import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // await prisma.page.create({
  //   data: {
  //     logo: "",
  //     heroImage: "",
  //   },
  // });
  // await prisma.navbarImages.create({
  //   data: {
  //     image: "",
  //   },
  // })
  // await prisma.tentang.update({
  //   where: {
  //     id: 1,
  //   },
  //   data: {
  //     visi: "",
  //   },
  // });
  await prisma.tentang.update({
    where: {
      id: 1,
    },
    data: {
      strukturPemerintahImage: "",
    },
  });
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
