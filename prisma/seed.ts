import { PrismaClient } from "@prisma/client"
import { hash } from "bcrypt"

const prisma = new PrismaClient()

async function main() {
  try {
    // Create admin user if it doesn't exist
    const admin = await prisma.user.upsert({
      where: { email: "admin@atech.com" },
      update: {},
      create: {
        name: "Admin",
        email: "admin@atech.com",
        password: await hash("admin123", 12),
        role: "ADMIN",
      },
    })

    console.log({ admin })

    // Create categories with their posts
    await prisma.category.upsert({
      where: { name: "Technology" },
      update: {},
      create: {
        name: "Technology",
        slug: "technology",
        description: "Latest technology news and updates",
        posts: {
          create: {
            title: "New AI Breakthrough",
            description: "Researchers discover new AI capabilities",
            content: "Detailed content about AI breakthrough...",
            slug: "new-ai-breakthrough",
            published: true,
            type: "NEWS",
            author: {
              connect: { id: admin.id }
            }
          }
        }
      },
    })

    await prisma.category.upsert({
      where: { name: "Business" },
      update: {},
      create: {
        name: "Business",
        slug: "business",
        description: "Business and finance news",
        posts: {
          create: {
            title: "Market Update 2024",
            description: "Latest market trends and analysis",
            content: "Detailed market analysis content...",
            slug: "market-update-2024",
            published: true,
            type: "NEWS",
            author: {
              connect: { id: admin.id }
            }
          }
        }
      },
    })

    await prisma.category.upsert({
      where: { name: "Science" },
      update: {},
      create: {
        name: "Science",
        slug: "science",
        description: "Scientific discoveries and research",
        posts: {
          create: {
            title: "Space Exploration News",
            description: "Recent discoveries in space exploration",
            content: "Detailed space exploration content...",
            slug: "space-exploration-news",
            published: true,
            type: "NEWS",
            author: {
              connect: { id: admin.id }
            }
          }
        }
      },
    })
  } catch (error) {
    console.error('Error in seed:', error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 