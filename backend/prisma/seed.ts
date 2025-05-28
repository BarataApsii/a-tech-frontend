import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@atech.com' },
    update: {},
    create: {
      email: 'admin@atech.com',
      name: 'Admin',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  console.log({ admin });

  // Create initial categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'news' },
      update: {},
      create: {
        name: 'News',
        slug: 'news',
        description: 'Latest company news and updates',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'technology' },
      update: {},
      create: {
        name: 'Technology',
        slug: 'technology',
        description: 'Technology related articles',
      },
    }),
  ]);

  console.log({ categories });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 