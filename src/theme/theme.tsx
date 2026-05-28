import type { ThemeOptions } from "@mui/material/styles";

// Định cấu hình Design Tokens cho Theme
export const getDesignTokens = (mode: "light" | "dark"): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // --- PALETTE LIGHT MODE (HỌC THUẬT, TƯƠNG PHẢN CAO ĐẠT CHUẨN WCAG AAA/AA) ---
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
            disabled: "#64748b", // Slate 500
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
            default: "#0f172a", // Slate 900 - Tối sâu, dịu mắt, giảm mỏi mắt khi đọc lâu
            paper: "#1e293b", // Slate 800
          },
          text: {
            primary: "#f8fafc", // Slate 50 - Trắng sữa dịu mắt, tương phản hoàn hảo trên nền Slate 900/800
            secondary: "#cbd5e1", // Slate 300 - Xám sáng dễ đọc
            disabled: "#64748b", // Slate 500
          },
          divider: "#334155", // Slate 700
        }),
  },
  typography: {
    fontFamily: "var(--font-sans)",
    h1: {
      fontFamily: "var(--font-heading)",
      fontWeight: 800,
      letterSpacing: "-0.025em",
      color: mode === "light" ? "#0f172a" : "#f8fafc",
    },
    h2: {
      fontFamily: "var(--font-heading)",
      fontWeight: 800,
      letterSpacing: "-0.02em",
      color: mode === "light" ? "#0f172a" : "#f8fafc",
    },
    h3: {
      fontFamily: "var(--font-heading)",
      fontWeight: 700,
      letterSpacing: "-0.015em",
      color: mode === "light" ? "#0f172a" : "#f8fafc",
    },
    h4: {
      fontFamily: "var(--font-heading)",
      fontWeight: 700,
      letterSpacing: "-0.01em",
      color: mode === "light" ? "#0f172a" : "#f8fafc",
    },
    h5: {
      fontFamily: "var(--font-heading)",
      fontWeight: 700,
      color: mode === "light" ? "#0f172a" : "#f8fafc",
    },
    h6: {
      fontFamily: "var(--font-heading)",
      fontWeight: 700,
      color: mode === "light" ? "#0f172a" : "#f8fafc",
    },
    body1: {
      fontFamily: "var(--font-sans)",
      lineHeight: 1.75, // Giãn dòng 1.75 giúp đọc văn bản dài không bị mỏi mắt
      fontSize: "1rem",
    },
    body2: {
      fontFamily: "var(--font-sans)",
      lineHeight: 1.65,
      fontSize: "0.875rem",
    },
    button: {
      fontWeight: 700,
      textTransform: "none", // Bỏ viết hoa tất cả nút (vở sạch chữ đẹp, tự nhiên hơn)
      letterSpacing: "0.01em",
    },
  },
  shape: {
    borderRadius: 12, // Bo góc tinh tế hiện đại cho tất cả card/button
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
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
          borderRadius: "16px",
          boxShadow: "none",
          border: "1px solid",
          borderColor: mode === "light" ? "#e2e8f0" : "#334155",
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
          borderRadius: "8px",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: mode === "light" ? "#e2e8f0" : "#334155",
        },
      },
    },
  },
});
