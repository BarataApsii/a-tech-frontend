import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"

// GET /api/categories
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: {
            posts: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    })
    return NextResponse.json(categories)
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json(
      { error: "Error fetching categories" },
      { status: 500 }
    )
  }
}

// POST /api/categories
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const json = await request.json()
    const { name, description } = json

    if (!name) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      )
    }

    // Create slug from name
    const slug = name.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')

    const category = await prisma.category.create({
      data: {
        name,
        slug,
        description,
      },
    })

    return NextResponse.json(category)
  } catch (error: any) {
    console.error("Error creating category:", error)
    
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: "A category with this name already exists" },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Error creating category" },
      { status: 500 }
    )
  }
}

// PUT /api/categories/[id]
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const json = await request.json()
    const { name, description } = json

    if (!name) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      )
    }

    // Create slug from name
    const slug = name.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')

    const category = await prisma.category.update({
      where: { id: params.id },
      data: {
        name,
        slug,
        description,
      },
    })

    return NextResponse.json(category)
  } catch (error: any) {
    console.error("Error updating category:", error)
    
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: "A category with this name already exists" },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Error updating category" },
      { status: 500 }
    )
  }
}

// DELETE /api/categories/[id]
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Check if category has posts
    const category = await prisma.category.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: {
            posts: true,
          },
        },
      },
    })

    if (category?._count.posts > 0) {
      return NextResponse.json(
        { error: "Cannot delete category with existing posts" },
        { status: 400 }
      )
    }

    await prisma.category.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting category:", error)
    return NextResponse.json(
      { error: "Error deleting category" },
      { status: 500 }
    )
  }
} 