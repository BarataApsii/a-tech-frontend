"use client"

import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { useState } from "react"

const services = [
  { name: 'Web Design', href: '/services#web-design' },
  { name: 'Web Development', href: '/services#web-development' },
  { name: 'E-commerce Solutions', href: '/services#ecommerce' },
  { name: 'Mobile Development', href: '/services#mobile' },
  { name: 'Content Management', href: '/services#cms' },
  { name: 'Website Maintenance', href: '/services#maintenance' },
]

const navigation = [
  { name: 'Services', href: '/services' },
  { name: 'About Us', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'News', href: '/news' },
  { name: 'Contact', href: '/contact' },
]

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="border-b">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="font-medium flex items-center text-white hover:text-[hsl(187,100%,80%)] transition-colors pl-8">
          <Image src="/images/icons/LOGS.PNG" alt="Atech Systems Logo" width={400} height={100} className="h-20 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 items-center">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-white hover:text-[hsl(187,100%,80%)] transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-white hover:text-[hsl(187,100%,80%)]">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4 mt-8">
              {/* Services Section in Mobile Menu */}
              <div className="flex flex-col gap-2">
                <span className="text-lg font-medium text-white">Services</span>
                <div className="flex flex-col gap-2 pl-4">
                  {services.map((service) => (
                    <Link
                      key={service.name}
                      href={service.href}
                      className="text-white hover:text-[hsl(187,100%,80%)] transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>
              {navigation.filter(item => item.name !== 'Services').map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-lg font-medium text-white hover:text-[hsl(187,100%,80%)] transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
} 