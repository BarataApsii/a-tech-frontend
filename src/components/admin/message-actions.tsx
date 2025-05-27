"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Mail, MoreVertical, Trash2, Eye } from "lucide-react"

interface MessageActionsProps {
  message: {
    id: string
    name: string
    email: string
    subject: string
    content: string
    read: boolean
    createdAt: Date
  }
}

export function MessageActions({ message }: MessageActionsProps) {
  const router = useRouter()
  const [showMessage, setShowMessage] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  async function markAsRead() {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/messages/${message.id}/read`, {
        method: "PUT",
      })

      if (!response.ok) {
        throw new Error("Failed to mark message as read")
      }

      router.refresh()
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  async function deleteMessage() {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/messages/${message.id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete message")
      }

      router.refresh()
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setShowMessage(true)}>
            <Eye className="mr-2 h-4 w-4" />
            View Message
          </DropdownMenuItem>
          {!message.read && (
            <DropdownMenuItem onClick={markAsRead}>
              <Mail className="mr-2 h-4 w-4" />
              Mark as Read
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={deleteMessage} className="text-red-600">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showMessage} onOpenChange={setShowMessage}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{message.subject}</DialogTitle>
            <DialogDescription>
              From: {message.name} ({message.email})
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <div className="text-sm text-muted-foreground">
              Received on {new Date(message.createdAt).toLocaleString()}
            </div>
            <div className="whitespace-pre-wrap">{message.content}</div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
} 