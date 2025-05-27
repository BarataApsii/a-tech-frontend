"use client"

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="A-Tech Logo"
              width={40}
              height={40}
              className="h-10 w-auto"
              priority
            />
            <span className="text-xl font-bold">A-Tech</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/services" className="transition-colors hover:text-foreground/80">Services</Link>
            <Link href="/portfolio" className="transition-colors hover:text-foreground/80">Portfolio</Link>
            <Link href="/blog" className="transition-colors hover:text-foreground/80">Blog</Link>
            <Link href="/news" className="transition-colors hover:text-foreground/80">News</Link>
            <Link href="/contact" className="transition-colors hover:text-foreground/80">Contact</Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <ThemeToggle />
          <Button asChild variant="outline">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </header>
  )
} 