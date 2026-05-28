import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, Drawer, IconButton, AppBar, Toolbar, Typography } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Sidebar } from "./Sidebar";
import type { UseLessonProgressType } from "../hooks/useLessonProgress";

interface LayoutProps {
  progress: UseLessonProgressType;
}

export const Layout: React.FC<LayoutProps> = ({ progress }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const { overallProgress, completedLessonsCount, totalLessons } = progress;

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      {/* Mobile Top Header */}
      <AppBar
        position="fixed"
        sx={{
          display: { md: "none" },
          backgroundColor: "#ffffff",
          color: "#0f172a",
          boxShadow: "none",
          borderBottom: "1px solid #e2e8f0",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.1rem" }}>
              AI Learning Notebook
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="caption" sx={{ fontWeight: 800, color: "#2563eb", backgroundColor: "#eff6ff", px: 1.5, py: 0.5, borderRadius: "4px" }}>
              {overallProgress}%
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Desktop Sidebar (Fixed Left) */}
      <Box
        component="nav"
        sx={{
          width: { md: 280 },
          flexShrink: { md: 0 },
          display: { xs: "none", md: "block" },
          position: "sticky",
          top: 0,
          height: "100vh"
        }}
      >
        <Sidebar
          overallProgress={overallProgress}
          completedLessonsCount={completedLessonsCount}
          totalLessons={totalLessons}
        />
      </Box>

      {/* Mobile Sidebar Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Tối ưu hiệu năng render trên mobile
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 280, border: "none" },
        }}
      >
        <Sidebar
          overallProgress={overallProgress}
          completedLessonsCount={completedLessonsCount}
          totalLessons={totalLessons}
          onClose={handleDrawerToggle}
        />
      </Drawer>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: { xs: "24px 16px", md: "40px" },
          pt: { xs: "88px", md: "40px" }, // Thêm padding-top trên mobile để không bị đè bởi Header
          width: { xs: "100%", md: `calc(100% - 280px)` },
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
