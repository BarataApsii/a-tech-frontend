import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { LogoutButton } from "@/components/admin/logout-button"
import Link from "next/link"
import { Newspaper, FolderKanban, MessageSquare } from "lucide-react"

/**
 * Navigation items for the admin dashboard
 * Each item defines:
 * - href: The target route
 * - label: Display text
 * - icon: Lucide icon component
 */
const navigationItems = [
  {
    href: "/admin/news",
    label: "News Management",
    icon: Newspaper,
  },
  {
    href: "/admin/categories",
    label: "Categories",
    icon: FolderKanban,
  },
  {
    href: "/admin/messages",
    label: "Messages",
    icon: MessageSquare,
  },
]

interface AdminLayoutProps {
  children: React.ReactNode
}

/**
 * Admin Layout Component
 * - Handles authentication and authorization
 * - Provides navigation sidebar
 * - Responsive layout with mobile support
 */
export default async function AdminLayout({ children }: AdminLayoutProps) {
  // Check authentication status
  const session = await getServerSession(authOptions)
  
  // Redirect to login if not authenticated
  if (!session?.user) {
    redirect("/admin/login")
  }

  // Redirect to home if not an admin
  if (session.user.role !== "ADMIN") {
    redirect("/")
  }

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar - Hidden on mobile */}
      <aside className="w-64 bg-card border-r hidden md:block">
        <div className="p-6 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Admin Dashboard</h2>
          <LogoutButton />
        </div>
        <nav className="px-4 pb-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <Link 
                  href={item.href}
                  className="flex items-center gap-2 px-4 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Mobile Header - Visible only on mobile */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-background border-b z-50">
        <div className="container h-full flex items-center justify-between">
          <h2 className="text-lg font-semibold">Admin Dashboard</h2>
          <LogoutButton />
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 md:pt-8 pt-20">
        <div className="container max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
} 