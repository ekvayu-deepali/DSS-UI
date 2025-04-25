import { createTheme, Theme } from "@mui/material";
import { lightThemeOptions } from "./lightThemeOptions";
import { darkThemeOptions } from "./darkThemeOptions";
import { commonThemeOptions } from "./commonThemeOption";

// Declare custom typography variants
declare module "@mui/material/styles" {
  interface TypographyVariants {
    caption1: React.CSSProperties;
    caption2: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    caption1?: React.CSSProperties;
    caption2?: React.CSSProperties;
  }
}

// Update Typography component props
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    caption1: true;
    caption2: true;
  }
}

export const lightTheme = createTheme({
  ...commonThemeOptions,
  ...lightThemeOptions,
});

export const darkTheme = createTheme({
  ...commonThemeOptions,
  ...darkThemeOptions,
});

export type AppTheme = Theme;
