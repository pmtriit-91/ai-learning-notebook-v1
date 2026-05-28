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
          icon={<CheckCircle2 className="w-4 h-4 text-emerald-600" />}
          label="Completed"
          size={size}
          sx={{
            backgroundColor: "#ecfdf5",
            color: "#047857",
            fontWeight: 600,
            border: "1px solid #a7f3d0",
            fontSize: size === "small" ? "0.75rem" : "0.875rem",
            "& .MuiChip-icon": { color: "inherit" },
          }}
        />
      );
    case "learning":
      return (
        <Chip
          icon={<PlayCircle className="w-4 h-4 text-amber-600" />}
          label="Learning"
          size={size}
          sx={{
            backgroundColor: "#fffbeb",
            color: "#b45309",
            fontWeight: 600,
            border: "1px solid #fde68a",
            fontSize: size === "small" ? "0.75rem" : "0.875rem",
            "& .MuiChip-icon": { color: "inherit" },
          }}
        />
      );
    default:
      return (
        <Chip
          icon={<HelpCircle className="w-4 h-4 text-slate-500" />}
          label="Not Started"
          size={size}
          sx={{
            backgroundColor: "#f8fafc",
            color: "#64748b",
            fontWeight: 500,
            border: "1px solid #e2e8f0",
            fontSize: size === "small" ? "0.75rem" : "0.875rem",
            "& .MuiChip-icon": { color: "inherit" },
          }}
        />
      );
  }
};
