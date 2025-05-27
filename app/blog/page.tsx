import { PageBanner } from "@/components/page-banner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

const posts = [
  {
    title: "The Future of Web Development",
    category: "Technology",
    date: "2024-03-15",
    image: "/images/services/web-development.jpg",
    excerpt: "Exploring the latest trends and technologies shaping the future of web development."
  },
  {
    title: "Designing for Accessibility",
    category: "Design",
    date: "2024-03-12",
    image: "/images/services/web-design.jpg",
    excerpt: "Best practices for creating inclusive and accessible web experiences."
  },
  {
    title: "E-commerce Trends in 2024",
    category: "E-commerce",
    date: "2024-03-10",
    image: "/images/services/ecommerce.jpg",
    excerpt: "The latest trends and innovations in online retail and e-commerce platforms."
  },
  {
    title: "Digital Marketing Strategies",
    category: "Marketing",
    date: "2024-03-08",
    image: "/images/services/digital-marketing.jpg",
    excerpt: "Effective digital marketing strategies for business growth in 2024."
  },
  {
    title: "SEO Best Practices",
    category: "SEO",
    date: "2024-03-05",
    image: "/images/services/seo.jpg",
    excerpt: "Current SEO best practices to improve your website's search rankings."
  },
  {
    title: "Mobile App Development Guide",
    category: "Development",
    date: "2024-03-03",
    image: "/images/services/mobile-development.jpg",
    excerpt: "A comprehensive guide to modern mobile app development."
  }
];

export default function BlogPage() {
  return (
    <div>
      <PageBanner 
        title="Our Blog" 
        description="Insights, tutorials, and updates from our team"
        backgroundImage="/images/banners/blog-banner.jpg"
        className="min-h-[200px] sm:min-h-[300px]"
      />
      
      <div className="container py-8 sm:py-16">
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <Card key={index} className="overflow-hidden group">
              <div className="relative h-40 sm:h-48">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/50 transition-opacity group-hover:opacity-75" />
              </div>
              <CardHeader className="p-4 sm:p-6">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-2">
                  <span>{post.category}</span>
                  <span>•</span>
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <CardTitle className="text-lg sm:text-xl">{post.title}</CardTitle>
                <p className="text-sm sm:text-base text-muted-foreground mt-2">
                  {post.excerpt}
                </p>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
} 