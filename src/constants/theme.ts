import { darkThemeOptions, lightThemeOptions } from "@/theme";

export const DEFAULT_THEME_LIST = [
  {
    id: "lightheme",
    label: "Light",
    value: "light",
    themeOption: lightThemeOptions,
  },
  {
    id: "darktheme",
    label: "Dark",
    value: "dark",
    themeOption: darkThemeOptions,
  },
];
