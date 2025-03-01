import { type Dispatch, type SetStateAction, useMemo } from "react";

import { useTheme } from "next-themes";

type Theme = "light" | "dark";
type SetTheme = Dispatch<SetStateAction<Theme>>;

export interface ThemeProps {
  theme: Theme;
  setTheme: SetTheme;
}

export default function useSystemTheme(): ThemeProps {
  const { theme, setTheme, systemTheme } = useTheme();
  return useMemo(() => {
    return {
      theme: theme === "system" ? systemTheme : theme,
      setTheme,
    } as ThemeProps;
  }, [theme, setTheme, systemTheme]);
}
