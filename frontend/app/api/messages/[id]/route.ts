import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const message = await prisma.message.delete({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json(message)
  } catch (error) {
    console.error("[MESSAGE_DELETE]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const message = await prisma.message.update({
      where: {
        id: params.id,
      },
      data: {
        read: true,
      },
    })

    return NextResponse.json(message)
  } catch (error) {
    console.error("[MESSAGE_UPDATE]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()
    const { status } = body

    const message = await prisma.contactMessage.update({
      where: { id },
      data: { status },
    })

    return NextResponse.json(message)
  } catch (error) {
    console.error('Error updating message:', error)
    return NextResponse.json(
      { error: 'Failed to update message' },
      { status: 500 }
    )
  }
} 