import React from "react";
import { Chip } from "@mui/material";
import type { LessonStatus } from "../types/lesson";
import { CheckCircle2, PlayCircle, HelpCircle } from "lucide-react";

interface StatusBadgeProps {
  status: LessonStatus;
  size?: "small" | "medium";
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = "small" }) => {
  switch (status) {
    case "completed":
      return (
        <Chip
          icon={<CheckCircle2 className="w-4 h-4" />}
          label="Completed"
          size={size}
          sx={{
            backgroundColor: (theme) => theme.palette.mode === "light" ? "#ecfdf5" : "rgba(16, 185, 129, 0.15)",
            color: (theme) => theme.palette.mode === "light" ? "#047857" : "#34d399",
            fontWeight: 700,
            border: "1px solid",
            borderColor: (theme) => theme.palette.mode === "light" ? "#a7f3d0" : "rgba(16, 185, 129, 0.3)",
            fontSize: size === "small" ? "0.75rem" : "0.875rem",
            "& .MuiChip-icon": { color: "inherit" },
          }}
        />
      );
    case "learning":
      return (
        <Chip
          icon={<PlayCircle className="w-4 h-4" />}
          label="Learning"
          size={size}
          sx={{
            backgroundColor: (theme) => theme.palette.mode === "light" ? "#fffbeb" : "rgba(245, 158, 11, 0.15)",
            color: (theme) => theme.palette.mode === "light" ? "#b45309" : "#fbbf24",
            fontWeight: 700,
            border: "1px solid",
            borderColor: (theme) => theme.palette.mode === "light" ? "#fde68a" : "rgba(245, 158, 11, 0.3)",
            fontSize: size === "small" ? "0.75rem" : "0.875rem",
            "& .MuiChip-icon": { color: "inherit" },
          }}
        />
      );
    default:
      return (
        <Chip
          icon={<HelpCircle className="w-4 h-4" />}
          label="Not Started"
          size={size}
          sx={{
            backgroundColor: (theme) => theme.palette.mode === "light" ? "#f8fafc" : "rgba(100, 116, 139, 0.12)",
            color: (theme) => theme.palette.mode === "light" ? "#64748b" : "#94a3b8",
            fontWeight: 600,
            border: "1px solid",
            borderColor: (theme) => theme.palette.mode === "light" ? "#e2e8f0" : "rgba(100, 116, 139, 0.25)",
            fontSize: size === "small" ? "0.75rem" : "0.875rem",
            "& .MuiChip-icon": { color: "inherit" },
          }}
        />
      );
  }
};
