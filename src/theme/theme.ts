import React, { createContext, useContext, useState, useMemo, useEffect } from "react";
import { createTheme, ThemeProvider, ThemeOptions } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Context để điều khiển chế độ Light/Dark Mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
  mode: "light" as "light" | "dark",
});

// Custom hook để sử dụng trong các component
export const useColorMode = () => useContext(ColorModeContext);

// Định cấu hình Design Tokens cho Theme
export const getDesignTokens = (mode: "light" | "dark"): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // --- PALETTE LIGHT MODE (HỌC THUẬT, TƯƠNG PHẢN CAO) ---
          primary: {
            main: "#1d4ed8", // Blue 700 - Đậm đà, tương phản tuyệt vời đạt chuẩn WCAG
            light: "#3b82f6",
            dark: "#1e3a8a",
            contrastText: "#ffffff",
          },
          secondary: {
            main: "#475569", // Slate 600 - Xám trầm
            light: "#64748b",
            dark: "#334155",
            contrastText: "#ffffff",
          },
          background: {
            default: "#f8fafc", // Slate 50 - Nền nhã nhặn, dịu mắt
            paper: "#ffffff", // Nền giấy trắng sạch
          },
          text: {
            primary: "#0f172a", // Slate 900 - Đen sâu, cực kỳ rõ nét khi đọc tài liệu
            secondary: "#334155", // Slate 700 - Đảm bảo độ tương phản cao trên nền trắng
            disabled: "#94a3b8",
          },
          divider: "#e2e8f0", // Slate 200
        }
      : {
          // --- PALETTE DARK MODE ---
          primary: {
            main: "#3b82f6", // Blue 500
            light: "#60a5fa",
            dark: "#1d4ed8",
            contrastText: "#ffffff",
          },
          secondary: {
            main: "#94a3b8", // Slate 400
            light: "#cbd5e1",
            dark: "#64748b",
            contrastText: "#0f172a",
          },
          background: {
            default: "#090d16", // Slate 950 cải tiến - Tối sâu, giảm mỏi mắt
            paper: "#151b26", // Slate 900 tinh chỉnh
          },
          text: {
            primary: "#f8fafc", // Slate 50 - Trắng sữa dịu mắt
            secondary: "#cbd5e1", // Slate 300 - Xám sáng dễ đọc
            disabled: "#64748b",
          },
          divider: "#1e293b", // Slate 800
        }),
  },
  typography: {
    fontFamily: "var(--font-sans)",
    h1: {
      fontFamily: "var(--font-heading)",
      fontWeight: 800,
      letterSpacing: "-0.025em",
    },
    h2: {
      fontFamily: "var(--font-heading)",
      fontWeight: 800,
      letterSpacing: "-0.02em",
    },
    h3: {
      fontFamily: "var(--font-heading)",
      fontWeight: 700,
      letterSpacing: "-0.015em",
    },
    h4: {
      fontFamily: "var(--font-heading)",
      fontWeight: 700,
      letterSpacing: "-0.01em",
    },
    h5: {
      fontFamily: "var(--font-heading)",
      fontWeight: 700,
    },
    h6: {
      fontFamily: "var(--font-heading)",
      fontWeight: 700,
    },
    body1: {
      fontFamily: "var(--font-sans)",
      lineHeight: 1.75, // Tăng giãn dòng cho dễ đọc văn bản dài
      fontSize: "1rem",
    },
    body2: {
      fontFamily: "var(--font-sans)",
      lineHeight: 1.65,
      fontSize: "0.875rem",
    },
    button: {
      fontWeight: 700,
      textTransform: "none", // Bỏ viết hoa tất cả nút (vở sạch chữ đẹp)
      letterSpacing: "0.01em",
    },
  },
  shape: {
    borderRadius: 10, // Bo góc tinh tế hiện đại cho tất cả card/button
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          boxShadow: "none",
          fontWeight: 700,
          "&:hover": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "14px",
          boxShadow: "none",
          backgroundImage: "none", // Loại bỏ gradient overlay màu xám mặc định trong dark mode
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: "6px",
        },
      },
    },
  },
});

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

  // Tạo theme dựa trên chế độ hiện tại
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
