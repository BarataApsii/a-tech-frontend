"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from './ui/button'
import Link from 'next/link'

const slides = [
  {
    src: '/images/banners/slider5.jpg',
    alt: 'Web Development Solutions',
    title: 'Building Digital Excellence',
    description: 'Creating powerful web solutions for modern businesses',
    cta: { text: 'Get Started', href: '/contact' }
  },
  {
    src: '/images/banners/banner-2.jpg',
    alt: 'Modern Workspace',
    title: 'Modern Technology Solutions',
    description: 'Leveraging cutting-edge tech for your success',
    cta: { text: 'Our Services', href: '/services' }
  },
  {
    src: '/images/banners/slider4.jpg',
    alt: 'Personal Service',
    title: 'Personalized Development',
    description: 'Dedicated one-on-one attention for your web projects',
    cta: { text: 'About Me', href: '/about' }
  },
  {
    src: '/images/banners/banner-4.jpg',
    alt: 'Digital Innovation',
    title: 'Innovative Solutions',
    description: 'Transforming ideas into digital reality',
    cta: { text: 'Learn More', href: '/services' }
  }
]

export function Slideshow() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
    }, 8000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
          
          {/* Content Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="container max-w-4xl mx-auto text-center px-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[hsl(187,100%,80%)] mb-4 sm:mb-6 transition-all duration-300 transform">
                {slide.title}
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 sm:mb-8 transition-all duration-300 transform">
                {slide.description}
              </p>
              <Button asChild size="lg" className="text-base sm:text-lg">
                <Link href={slide.cta.href}>{slide.cta.text}</Link>
              </Button>
            </div>
          </div>
        </div>
      ))}
      
      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex 
                ? 'bg-[hsl(187,100%,80%)] w-4' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}