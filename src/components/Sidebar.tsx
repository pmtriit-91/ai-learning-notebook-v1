import React from "react";
import { NavLink } from "react-router-dom";
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Divider, IconButton } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import TerminalIcon from "@mui/icons-material/Terminal";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { ProgressBar } from "./ProgressBar";
import { useColorMode } from "../theme/ColorModeContext";

interface SidebarProps {
  overallProgress: number;
  completedLessonsCount: number;
  totalLessons: number;
  onClose?: () => void; // Dùng cho đóng drawer trên mobile
}

export const Sidebar: React.FC<SidebarProps> = ({
  overallProgress,
  completedLessonsCount,
  totalLessons,
  onClose,
}) => {
  const { mode, toggleColorMode } = useColorMode();
  
  const menuItems = [
    { text: "Dashboard", path: "/", icon: <DashboardIcon /> },
    { text: "Roadmap học tập", path: "/roadmap", icon: <AltRouteIcon /> },
    { text: "Prompt Playbook", path: "/playbook", icon: <TerminalIcon /> },
    { text: "Nhật ký học tập", path: "/log", icon: <HistoryEduIcon /> },
  ];

  return (
    <Box
      sx={{
        width: 280,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#1e293b", // Slate 800
        color: "#f8fafc",
        borderRight: "1px solid",
        borderColor: "#334155",
      }}
    >
      {/* Brand Logo, Name & Theme Switcher */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <AutoAwesomeIcon sx={{ color: "#10b981", fontSize: "2rem" }} />
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "var(--font-heading)",
                fontWeight: 800,
                fontSize: "1.15rem",
                lineHeight: 1.2,
                color: "#f8fafc",
              }}
            >
              AI Learning
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 500,
                color: "#94a3b8",
                display: "block",
              }}
            >
              Personal Notebook
            </Typography>
          </Box>
        </Box>

        {/* Toggle Theme Button */}
        <IconButton
          onClick={toggleColorMode}
          color="inherit"
          size="small"
          sx={{
            border: "1px solid",
            borderColor: "#334155",
            borderRadius: "8px",
            p: "6px",
            backgroundColor: "#0f172a",
            color: "#cbd5e1",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              color: "#f8fafc",
            }
          }}
        >
          {mode === "light" ? (
            <DarkMode sx={{ fontSize: "1.1rem", color: "#94a3b8" }} />
          ) : (
            <LightMode sx={{ fontSize: "1.1rem", color: "warning.main" }} />
          )}
        </IconButton>
      </Box>

      <Divider sx={{ backgroundColor: "#334155" }} />

      {/* Menu List */}
      <List sx={{ flexGrow: 1, px: 2, py: 3 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              component={NavLink}
              to={item.path}
              onClick={onClose}
              sx={{
                borderRadius: "8px",
                px: 2.5,
                py: 1.5,
                color: "#cbd5e1",
                transition: "all 0.2s",
                borderLeft: "4px solid transparent",
                "&.active": {
                  backgroundColor: "rgba(16, 185, 129, 0.15)",
                  color: "#10b981",
                  fontWeight: 700,
                  borderLeft: "4px solid #10b981",
                  "& .MuiListItemIcon-root": {
                    color: "#10b981",
                  },
                },
                "&:hover:not(.active)": {
                  backgroundColor: "rgba(255, 255, 255, 0.04)",
                  color: "#f8fafc",
                  "& .MuiListItemIcon-root": {
                    color: "#f8fafc",
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color: "#94a3b8",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography sx={{ fontSize: "0.95rem", fontWeight: "inherit" }}>
                    {item.text}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Progress Footer */}
      <Box sx={{ p: 3, backgroundColor: "#0f172a", borderTop: "1px solid #334155" }}>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 600,
            color: "#94a3b8",
            mb: 1,
          }}
        >
          Tổng tiến độ học tập
        </Typography>
        <ProgressBar
          value={overallProgress}
          completedCount={completedLessonsCount}
          totalCount={totalLessons}
        />
        <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
          <Typography
            variant="caption"
            sx={{
              color: "#64748b",
              fontWeight: 500,
              textAlign: "center",
            }}
          >
            V1 Static personal notebook
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
