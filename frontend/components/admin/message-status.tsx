"use client"

import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"

interface MessageStatusProps {
  id: string
  currentStatus: string
}

export function MessageStatus({ id, currentStatus }: MessageStatusProps) {
  const [status, setStatus] = useState(currentStatus)
  const [isLoading, setIsLoading] = useState(false)

  async function updateStatus(newStatus: string) {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/messages/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) {
        throw new Error('Failed to update status')
      }

      setStatus(newStatus)
      toast.success('Status updated successfully')
    } catch (error) {
      toast.error('Failed to update status')
      setStatus(currentStatus)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Select
      value={status}
      onValueChange={updateStatus}
      disabled={isLoading}
    >
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="Select status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="UNREAD">Unread</SelectItem>
        <SelectItem value="READ">Read</SelectItem>
        <SelectItem value="REPLIED">Replied</SelectItem>
      </SelectContent>
    </Select>
  )
} 