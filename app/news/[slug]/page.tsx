import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { prisma } from "@/lib/prisma"

export const revalidate = 3600 // Revalidate every hour

async function getNewsItem(slug: string) {
  const post = await prisma.post.findFirst({
    where: {
      slug,
      type: "NEWS",
      published: true,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  })

  return post
}

export default async function NewsArticle({ params }: { params: { slug: string } }) {
  const article = await getNewsItem(params.slug)

  if (!article) {
    notFound()
  }

  return (
    <article className="container py-20">
      <div className="max-w-3xl mx-auto">
        <Button asChild variant="ghost" className="mb-8">
          <Link href="/news">← Back to News</Link>
        </Button>
        
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-sm px-2 py-1 bg-primary/10 text-primary rounded-full">
              {article.category}
            </span>
            <span className="text-sm text-muted-foreground">
              {new Date(article.createdAt).toLocaleDateString()}
            </span>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tighter">{article.title}</h1>
          <p className="text-xl text-muted-foreground">{article.description}</p>
          
          <div 
            className="mt-8 prose prose-gray dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {article.author.name && (
            <p className="text-sm text-muted-foreground mt-8">
              Written by {article.author.name}
            </p>
          )}
        </div>
      </div>
    </article>
  )
} 