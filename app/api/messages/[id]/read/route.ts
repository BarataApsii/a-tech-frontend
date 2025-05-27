import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"

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
    console.error("[MESSAGE_READ]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
} 