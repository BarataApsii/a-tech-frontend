"use client"

import { signOut } from "next-auth/react"
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

/**
 * LogoutButton Component
 * A button component that handles user logout functionality in the admin interface
 * 
 * Features:
 * - Integrates with NextAuth.js for secure logout
 * - Ghost variant button with icon-only design
 * - Redirects to admin login page after logout
 * - Accessible with title attribute for screen readers
 * 
 * @component
 * @example
 * ```tsx
 * // Basic usage in admin layout
 * <LogoutButton />
 * ```
 */
export function LogoutButton() {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      title="Logout"
    >
      <LogOut className="h-4 w-4" />
    </Button>
  )
} 