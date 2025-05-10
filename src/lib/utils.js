import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

/**
 * Combines multiple class names using clsx and then merges Tailwind classes intelligently
 * to avoid conflicts using tailwind-merge
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
