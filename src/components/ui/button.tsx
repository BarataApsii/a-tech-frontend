import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Button Component
 * A versatile button component with multiple variants and sizes
 * 
 * Features:
 * - Multiple visual variants (default, destructive, outline, etc.)
 * - Different size options (default, sm, lg, icon)
 * - Support for icons with automatic sizing
 * - Accessible focus states and disabled styles
 * - Optional slot rendering for composition
 * 
 * @component
 */

/**
 * Button variant styles using class-variance-authority
 * Defines the visual appearance and behavior of the button
 * 
 * Variants:
 * - default: Primary action button
 * - destructive: For dangerous or destructive actions
 * - outline: Bordered button with transparent background
 * - secondary: Less prominent alternative to default
 * - ghost: No background until hover
 * - link: Appears as an underlined text link
 * 
 * Sizes:
 * - default: Standard size (h-9)
 * - sm: Compact size (h-8)
 * - lg: Large size (h-10)
 * - icon: Square button for icons (size-9)
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

/**
 * Button Component Implementation
 * 
 * @param props.className - Additional CSS classes
 * @param props.variant - Visual style variant
 * @param props.size - Size variant
 * @param props.asChild - Whether to render as a slot
 * 
 * @example
 * ```tsx
 * // Default button
 * <Button>Click me</Button>
 * 
 * // Destructive button with icon
 * <Button variant="destructive">
 *   <TrashIcon />
 *   Delete
 * </Button>
 * 
 * // Icon-only button
 * <Button variant="ghost" size="icon">
 *   <MenuIcon />
 * </Button>
 * ```
 */
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
