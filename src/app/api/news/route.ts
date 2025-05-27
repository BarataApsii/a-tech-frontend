import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const newsSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  categoryId: z.string().min(1, "Category is required"),
  published: z.boolean().default(false),
})

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await req.json()
    const validation = newsSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      )
    }

    const { title, content, categoryId, published } = validation.data

    // Create description from content
    const description = content.slice(0, 200) + (content.length > 200 ? "..." : "")

    // Create slug from title
    const slug = title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')

    const post = await prisma.post.create({
      data: {
        title,
        description,
        content,
        slug,
        published,
        type: "NEWS",
        author: {
          connect: { id: session.user.id }
        },
        category: {
          connect: { id: categoryId }
        }
      },
      include: {
        category: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    })

    return NextResponse.json(post)
  } catch (error: any) {
    console.error("[NEWS_POST]", error)
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Error creating news" },
      { status: 500 }
    )
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { id, ...updateData } = body

    const validation = newsSchema.safeParse(updateData)

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      )
    }

    const { title, content, categoryId, published } = validation.data

    // Create slug from title
    const slug = title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')

    const post = await prisma.post.update({
      where: { id },
      data: {
        title,
        content,
        slug,
        published,
        category: {
          connect: { id: categoryId }
        }
      },
      include: {
        category: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    })

    return NextResponse.json(post)
  } catch (error: any) {
    console.error("[NEWS_PUT]", error)
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: "News item or category not found" },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Error updating news" },
      { status: 500 }
    )
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { error: "News ID is required" },
        { status: 400 }
      )
    }

    const post = await prisma.post.delete({
      where: { id },
    })

    return NextResponse.json(post)
  } catch (error) {
    console.error("[NEWS_DELETE]", error)
    return NextResponse.json(
      { error: "Error deleting news" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      where: {
        type: "NEWS",
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        category: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    })

    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching news" },
      { status: 500 }
    )
  }
} 