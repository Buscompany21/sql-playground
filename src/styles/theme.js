/**
 * Application theme based on a refined, modern color palette
 * This ensures consistent colors and styling throughout the application
 */

export const theme = {
  colors: {
    // Main brand color - Deep Teal
    teal: {
      DEFAULT: "#2A6B70", // Slightly darker and more sophisticated
      hover: "#235458",   // Even darker for hover states
      foreground: "#FFFFFF",
      medium: "#68A4A1",  // More muted teal
      light: "#E6F2F2",
      veryLight: "#F5FAFA",
      dark: "#1D4A4D",
    },
    
    // Accent color - Complementary Blue (replacing amber/gold)
    accent: {
      DEFAULT: "#5B8A9D", // Complementary blue
      hover: "#4A7688",   // Darker for hover states
      foreground: "#FFFFFF",
      light: "#E9F1F5",
      bright: "#6FA3B8",
    },
    
    // Secondary accent - Extra blue tones
    blue: {
      DEFAULT: "#5B8A9D",
      hover: "#4A7688",
      light: "#E9F1F5",
      dark: "#3A5E69"
    },
    
    // Neutrals
    gray: {
      DEFAULT: "#6E7780",
      dark: "#2E3A45",
      medium: "#4E5964",
      light: "#F0F2F4",
      lighter: "#F8F9FA",
      darkest: "#1A2229",
    },
    
    // UI States
    success: "#3D9D7C", // Softer green
    warning: "#E6B05E", // Amber
    error: "#D56262",   // Softer red
    info: "#5B8A9D",    // Using our blue
    
    // Common color combinations for UI elements
    ui: {
      background: "#FFFFFF",
      foreground: "#2E3A45",
      headerBg: "#2A6B70",
      headerText: "#FFFFFF",
      cardBg: "#FFFFFF",
      cardBorder: "#E5E7EB",
      inputBorder: "#D1D5DB",
      inputFocus: "rgba(42, 107, 112, 0.2)",
      disabledBg: "#F0F2F4",
      disabledText: "#9CA3AF",
      footerBg: "#2E3A45",
      footerText: "#FFFFFF"
    },
  },
  
  // Typography
  typography: {
    fontFamily: {
      sans: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      heading: 'Raleway, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
    },
    sizes: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem',// 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem',    // 48px
    }
  },
  
  // Spacing (matches Tailwind config)
  spacing: {
    0: '0',
    1: '0.25rem',     // 4px
    2: '0.5rem',      // 8px
    3: '0.75rem',     // 12px
    4: '1rem',        // 16px
    5: '1.25rem',     // 20px
    6: '1.5rem',      // 24px
    8: '2rem',        // 32px
    10: '2.5rem',     // 40px
    12: '3rem',       // 48px
    16: '4rem',       // 64px
    20: '5rem',       // 80px
    24: '6rem',       // 96px
  },
  
  // Layout variables
  layout: {
    headerHeightMobile: '3.5rem', // 56px
    headerHeight: '4rem',         // 64px
    headerOffsetMobile: '4.5rem', // Mobile header + safety margin
    headerOffset: '5rem',         // Header + safety margin
    sectionPaddingYSm: '3rem',    // 48px
    sectionPaddingY: '4rem',      // 64px
    sectionPaddingYLg: '5rem',    // 80px
  },
  
  // Border radius
  borderRadius: {
    none: '0',
    sm: '0.125rem',   // 2px
    DEFAULT: '0.5rem',// 8px - default radius
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    '3xl': '1.5rem',  // 24px
    full: '9999px',   // Circle
  },
  
  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    soft: '0 2px 10px rgba(0, 0, 0, 0.06)',
    hover: '0 10px 20px rgba(0, 0, 0, 0.08)',
    glow: '0 0 20px rgba(42, 107, 112, 0.15)', // Using our deep teal color
  }
} 