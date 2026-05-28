import React from "react";
import { NavLink } from "react-router-dom";
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Divider } from "@mui/material";
import { LayoutDashboard, Milestone, Terminal, BookOpen, GraduationCap } from "lucide-react";
import { ProgressBar } from "./ProgressBar";

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
        backgroundColor: "#ffffff",
        borderRight: "1px solid #e2e8f0",
        padding: "24px 16px",
      }}
    >
      {/* Brand Logo & Name */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 4, px: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40,
            borderRadius: "10px",
            backgroundColor: "#2563eb",
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
              color: "#0f172a",
            }}
          >
            AI Learning
          </Typography>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 700,
              color: "#64748b",
              letterSpacing: "0.5px",
              display: "block",
            }}
          >
            NOTEBOOK
          </Typography>
        </Box>
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
                color: "#64748b",
                transition: "all 0.2s",
                "&.active": {
                  backgroundColor: "#eff6ff",
                  color: "#2563eb",
                  fontWeight: 600,
                  "& .MuiListItemIcon-root": {
                    color: "#2563eb",
                  },
                },
                "&:hover:not(.active)": {
                  backgroundColor: "#f8fafc",
                  color: "#0f172a",
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
            color: "#0f172a",
            mb: 0.5,
          }}
        >
          Tiến Độ Lộ Trình
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: "#64748b",
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
