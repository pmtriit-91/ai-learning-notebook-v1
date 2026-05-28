import React, { createContext, useContext, useState, useMemo, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { getDesignTokens } from "./theme";

// Context để điều khiển chế độ Light/Dark Mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
  mode: "light" as "light" | "dark",
});

// Custom hook để sử dụng trong các component
export const useColorMode = () => useContext(ColorModeContext);

interface ColorModeProviderProps {
  children: React.ReactNode;
}

export const ColorModeProvider: React.FC<ColorModeProviderProps> = ({ children }) => {
  // Đọc theme từ localStorage, mặc định là light mode
  const [mode, setMode] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("ai_learning_theme_mode");
    return (saved as "light" | "dark") || "light";
  });

  useEffect(() => {
    localStorage.setItem("ai_learning_theme_mode", mode);
  }, [mode]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
      mode,
    }),
    [mode]
  );

  // Tạo theme dựa trên chế độ hiện tại và design tokens từ theme.tsx
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
