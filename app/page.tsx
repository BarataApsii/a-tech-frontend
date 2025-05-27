import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Slideshow } from "@/components/slideshow"

export default function HomePage() {
  return (
    <div>
      <Slideshow />
      {/* Hero Section */}
      <div className="relative min-h-[400px] sm:min-h-[600px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/banners/hero-banner.jpg"
            alt="A-Tech Hero Banner"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[hsl(187,100%,80%)] mb-4 sm:mb-6">
              Building Digital Excellence Through Innovation
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8">
              We create stunning websites and powerful web applications that help businesses thrive in the digital age.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button asChild size="lg" className="text-base sm:text-lg">
                <Link href="/contact">Get Started</Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="text-base sm:text-lg">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Services Overview */}
      <div className="container py-12 sm:py-24">
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Our Services</h2>
          <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive digital solutions tailored to your business needs
          </p>
        </div>

        <div className="grid gap-4 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Web Design */}
          <div className="relative group">
            <div className="relative h-48 sm:h-64 overflow-hidden rounded-lg">
              <Image
                src="/images/services/web-design.jpg"
                alt="Web Design"
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 transition-opacity group-hover:opacity-75" />
              <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end">
                <h3 className="text-lg sm:text-xl font-bold text-white">Web Design</h3>
                <p className="text-sm sm:text-base text-white/90 mt-2">Beautiful, responsive websites that engage your audience</p>
              </div>
            </div>
          </div>

          {/* Web Development */}
          <div className="relative group">
            <div className="relative h-48 sm:h-64 overflow-hidden rounded-lg">
              <Image
                src="/images/services/web-development.jpg"
                alt="Web Development"
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 transition-opacity group-hover:opacity-75" />
              <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end">
                <h3 className="text-lg sm:text-xl font-bold text-white">Web Development</h3>
                <p className="text-sm sm:text-base text-white/90 mt-2">Custom web applications built with modern technologies</p>
              </div>
            </div>
          </div>

          {/* E-commerce */}
          <div className="relative group">
            <div className="relative h-48 sm:h-64 overflow-hidden rounded-lg">
              <Image
                src="/images/services/ecommerce.jpg"
                alt="E-commerce Solutions"
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 transition-opacity group-hover:opacity-75" />
              <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end">
                <h3 className="text-lg sm:text-xl font-bold text-white">E-commerce Solutions</h3>
                <p className="text-sm sm:text-base text-white/90 mt-2">Secure, scalable online stores for your business</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <Button asChild size="lg" className="text-base sm:text-lg">
            <Link href="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
