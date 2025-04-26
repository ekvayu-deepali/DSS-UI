import { lightThemeOptions } from "@/theme/lightThemeOptions";
import { darkThemeOptions } from "@/theme/darkThemeOptions";

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
