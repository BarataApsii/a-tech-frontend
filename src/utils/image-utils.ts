/**
 * Supported image file extensions
 * Used for type checking and validation
 */
const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'svg'] as const
type ImageExtension = typeof IMAGE_EXTENSIONS[number]

/**
 * Get the optimized version of an image path
 * Converts standard image formats to WebP for better performance
 * 
 * @param src The original image path
 * @returns The optimized image path (WebP if available)
 * @example
 * getOptimizedImagePath('/images/photo.jpg') // returns '/images/photo.webp'
 * getOptimizedImagePath('/images/icon.svg') // returns '/images/icon.svg'
 */
export function getOptimizedImagePath(src: string): string {
  // SVGs are already optimized vector graphics
  if (src.endsWith('.svg')) {
    return src;
  }
  
  // Convert to WebP format for better compression
  return src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
}

/**
 * Extract and validate the file extension from a path
 * 
 * @param path The file path to check
 * @returns The validated file extension or null if invalid/not found
 * @example
 * getFileExtension('image.jpg') // returns 'jpg'
 * getFileExtension('file.txt') // returns null
 */
export function getFileExtension(path: string): ImageExtension | null {
  const match = path.match(/\.([^.]+)$/)
  if (!match) return null

  const ext = match[1].toLowerCase()
  return IMAGE_EXTENSIONS.includes(ext as ImageExtension) 
    ? ext as ImageExtension 
    : null
}

/**
 * Check if a file is a supported image format
 * 
 * @param path The file path to check
 * @returns Boolean indicating if the file is a supported image
 * @example
 * isImage('photo.jpg') // returns true
 * isImage('document.pdf') // returns false
 */
export function isImage(path: string): boolean {
  const ext = getFileExtension(path)
  return ext !== null
}

/**
 * Generate a responsive image srcset for different viewport sizes
 * Creates a list of image sources with different widths for responsive loading
 * 
 * @param src The base image path
 * @param sizes Array of image widths to generate
 * @returns The srcset attribute string
 * @example
 * generateSrcSet('/image.jpg')
 * // returns '/image.webp?w=640 640w, /image.webp?w=750 750w, ...'
 */
export function generateSrcSet(src: string, sizes: number[] = [640, 750, 828, 1080, 1200, 1920]): string {
  const ext = getFileExtension(src)
  if (!ext || ext === 'svg') return src

  const optimizedSrc = getOptimizedImagePath(src)
  return sizes
    .map(size => `${optimizedSrc}?w=${size} ${size}w`)
    .join(', ')
}

/**
 * Generate the sizes attribute for responsive images
 * Defines how image width relates to viewport width
 * 
 * @param sizes Array of media query and size pairs
 * @returns The sizes attribute string
 * @example
 * generateSizes()
 * // returns '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
 */
export function generateSizes(sizes: Array<{ media: string; size: string }> = [
  { media: '(max-width: 640px)', size: '100vw' },
  { media: '(max-width: 1024px)', size: '50vw' },
  { media: '(min-width: 1024px)', size: '33vw' }
]): string {
  return sizes
    .map(({ media, size }) => `${media} ${size}`)
    .join(', ')
} 