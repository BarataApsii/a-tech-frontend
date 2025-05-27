import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges Tailwind CSS classes with proper precedence and handles conditional classes
 * 
 * This utility function combines the power of clsx and tailwind-merge to:
 * 1. Handle conditional class names
 * 2. Merge Tailwind CSS classes properly
 * 3. Resolve conflicts between classes with proper precedence
 * 
 * @param inputs - Array of class values, objects, or conditional classes
 * @returns Merged and cleaned className string
 * 
 * @example
 * ```tsx
 * // Basic usage
 * cn("px-2 py-1", "bg-blue-500")
 * 
 * // With conditions
 * cn("base-class", {
 *   "active-class": isActive,
 *   "disabled-class": isDisabled
 * })
 * 
 * // With dynamic values
 * cn("text-sm", size === "lg" && "text-lg")
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
