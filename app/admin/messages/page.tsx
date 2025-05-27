import { prisma } from "@/lib/prisma"
import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Mail } from "lucide-react"
import { MessageStatus } from "@/components/admin/message-status"

export const revalidate = 0 // Disable cache for this page

async function getMessages() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })
  return messages
}

export default async function MessagesPage() {
  const messages = await getMessages()

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Contact Messages</h1>
      </div>

      <div className="grid gap-4">
        {messages.map((message) => (
          <Card key={message.id}>
            <CardHeader className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold">
                    {message.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {message.email}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <MessageStatus id={message.id} currentStatus={message.status} />
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`mailto:${message.email}`}>
                      <Mail className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-sm whitespace-pre-wrap">{message.message}</p>
              <p className="text-xs text-muted-foreground mt-2">
                Received on {format(new Date(message.createdAt), 'PPpp')}
              </p>
            </CardContent>
          </Card>
        ))}

        {messages.length === 0 && (
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              No messages received yet.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
} 