"use client"

import Image from "next/image"
import { getOptimizedImagePath } from "@/utils/image-utils"

/**
 * PageBanner Component
 * A versatile banner component for page headers with optional background image support
 * 
 * Features:
 * - Responsive design with minimum height
 * - Optional background image with overlay
 * - Centered content layout
 * - Support for title and optional description
 * 
 * @component
 * @example
 * ```tsx
 * <PageBanner 
 *   title="About Us"
 *   description="Learn more about our company"
 *   backgroundImage="/images/banner.jpg"
 *   className="min-h-[400px]"
 * />
 * ```
 */

interface PageBannerProps {
  /** The main heading text displayed in the banner */
  title: string
  /** Optional subtext displayed below the title */
  description?: string
  /** Additional CSS classes to apply to the banner container */
  className?: string
  /** Path to the optional background image */
  backgroundImage?: string
  /** Alt text for the background image (for accessibility) */
  imageAlt?: string
}

export function PageBanner({ 
  title, 
  description, 
  className = "",
  backgroundImage,
  imageAlt = "Banner background"
}: PageBannerProps) {
  return (
    <div className={`relative min-h-[300px] flex items-center ${className}`}>
      {backgroundImage && (
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={getOptimizedImagePath(backgroundImage)}
            alt={imageAlt}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}
      
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className={`text-4xl font-bold tracking-tight ${backgroundImage ? 'text-white' : ''}`}>
            {title}
          </h1>
          {description && (
            <p className={`mt-4 text-xl text-[hsl(187,100%,80%)]`}>
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  )
} 