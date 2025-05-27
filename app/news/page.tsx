import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { prisma } from "@/lib/prisma"
import Image from "next/image"

export const revalidate = 3600 // Revalidate every hour

interface NewsItem {
  id: string
  title: string
  description: string | null
  content: string
  categoryId: string | null
  category?: {
    name: string
  } | null
  createdAt: Date
  slug: string
  published: boolean
  authorId: string
  type: string
  updatedAt: Date
}

// Helper function to get image based on category
function getNewsImage(categoryName: string | null, index: number): string {
  // Define all available images
  const images = {
    services: [
      '/images/services/web-development.jpg',
      '/images/services/web-design.jpg',
      '/images/services/mobile-development.jpg',
      '/images/services/ecommerce.jpg',
      '/images/services/cms.jpg',
      '/images/services/maintenance.jpg'
    ],
    values: [
      '/images/values/innovation.jpg',
      '/images/values/quality.jpg',
      '/images/values/support.jpg'
    ],
    banners: [
      '/images/banners/hero-banner.jpg',
      '/images/banners/about-banner.jpg',
      '/images/banners/services-banner.jpg',
      '/images/banners/blog-banner.jpg',
      '/images/banners/contact-banner.jpg'
    ]
  }

  // If we have a category name, try to match it to a specific image
  if (categoryName) {
    switch(categoryName.toLowerCase()) {
      case 'web development':
      case 'development':
        return images.services[0]
      case 'design':
      case 'web design':
        return images.services[1]
      case 'mobile':
      case 'mobile development':
        return images.services[2]
      case 'ecommerce':
        return images.services[3]
      case 'innovation':
        return images.values[0]
      case 'quality':
        return images.values[1]
      case 'support':
        return images.values[2]
    }
  }

  // If no category match or no category name, rotate through available images based on index
  const allImages = [...images.services, ...images.values, ...images.banners]
  return allImages[index % allImages.length]
}

async function getNewsItems() {
  const posts = await prisma.post.findMany({
    where: {
      type: "NEWS",
      published: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: {
        select: {
          name: true
        }
      }
    }
  })

  return posts
}

export default async function NewsPage() {
  const newsItems = await getNewsItems()

  return (
    <div className="container py-20">
      <h1 className="text-4xl font-bold tracking-tighter text-center mb-8">Latest News</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {newsItems.map((item, index) => (
          <Link key={item.id} href={`/news/${item.slug}`}>
            <Card className="h-full group overflow-hidden">
              <div className="relative">
                <div className="relative h-48">
                  <Image
                    src={getNewsImage(item.category?.name || null, index)}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors" />
                </div>
                <CardHeader className="relative">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm px-2 py-1 bg-primary/10 text-primary rounded-full">
                      {item.category?.name || 'General'}
                    </span>
                  </div>
                  <CardTitle className="text-white line-clamp-2">{item.title}</CardTitle>
                  <CardDescription className="text-white/80">
                    Posted on {new Date(item.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </CardDescription>
                </CardHeader>
              </div>
              <CardContent className="pt-4">
                <p className="text-muted-foreground line-clamp-3">{item.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
} 