import React from "react";
import { NavLink } from "react-router-dom";
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Divider, IconButton } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";
import { LayoutDashboard, Milestone, Terminal, BookOpen, GraduationCap } from "lucide-react";
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
    { text: "Dashboard", path: "/", icon: <LayoutDashboard className="w-5 h-5" /> },
    { text: "Roadmap", path: "/roadmap", icon: <Milestone className="w-5 h-5" /> },
    { text: "Prompt Playbook", path: "/playbook", icon: <Terminal className="w-5 h-5" /> },
    { text: "Learning Log", path: "/log", icon: <BookOpen className="w-5 h-5" /> },
  ];

  return (
    <Box
      sx={{
        width: 280,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "background.paper",
        borderRight: "1px solid",
        borderColor: "divider",
        padding: "24px 16px",
      }}
    >
      {/* Brand Logo, Name & Theme Switcher */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 4, px: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              borderRadius: "10px",
              backgroundColor: "primary.main",
              color: "#ffffff",
            }}
          >
            <GraduationCap className="w-6 h-6" />
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "var(--font-heading)",
                fontWeight: 800,
                fontSize: "1.15rem",
                lineHeight: 1.2,
                color: "text.primary",
              }}
            >
              AI Learning
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 700,
                color: "text.secondary",
                letterSpacing: "0.5px",
                display: "block",
              }}
            >
              NOTEBOOK
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
            borderColor: "divider",
            borderRadius: "8px",
            p: "6px",
            backgroundColor: "background.default",
            "&:hover": {
              backgroundColor: "action.hover",
            }
          }}
        >
          {mode === "light" ? <DarkMode sx={{ fontSize: "1.1rem", color: "text.secondary" }} /> : <LightMode sx={{ fontSize: "1.1rem", color: "warning.main" }} />}
        </IconButton>
      </Box>

      {/* Menu List */}
      <List sx={{ flexGrow: 1, padding: 0 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              component={NavLink}
              to={item.path}
              onClick={onClose}
              sx={{
                borderRadius: "8px",
                padding: "10px 12px",
                color: "text.secondary",
                transition: "all 0.2s",
                "&.active": {
                  backgroundColor: mode === "light" ? "rgba(29, 78, 216, 0.08)" : "rgba(59, 130, 246, 0.15)",
                  color: mode === "light" ? "primary.main" : "primary.light",
                  fontWeight: 700,
                  "& .MuiListItemIcon-root": {
                    color: mode === "light" ? "primary.main" : "primary.light",
                  },
                },
                "&:hover:not(.active)": {
                  backgroundColor: "action.hover",
                  color: "text.primary",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color: "inherit",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={<Typography sx={{ fontSize: "0.95rem", fontWeight: "inherit" }}>{item.text}</Typography>}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 3 }} />

      {/* Progress Footer */}
      <Box sx={{ px: 1 }}>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 700,
            color: "text.primary",
            mb: 0.5,
          }}
        >
          Tiến Độ Lộ Trình
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: "text.secondary",
            display: "block",
            mb: 2,
          }}
        >
          Hoàn thành {completedLessonsCount} / {totalLessons} bài học
        </Typography>
        <ProgressBar value={overallProgress} />
      </Box>
    </Box>
  );
};
