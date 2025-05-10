import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "../../lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#2A6B70] focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#2A6B70] text-white",
        secondary:
          "border-transparent bg-[#EAAF56] text-white",
        outline: "text-[#2A6B70] border-[#68A4A1]",
        success: "border-transparent bg-[#68A4A1] text-white",
        info: "border-transparent bg-[#E6F2F2] text-[#2A6B70]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  ...props
}) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants } 