import React from "react";
import { Chip } from "@mui/material";
import type { LessonStatus } from "../../../types/lesson";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

interface StatusBadgeProps {
  status: LessonStatus;
  size?: "small" | "medium";
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = "small" }) => {
  switch (status) {
    case "completed":
      return (
        <Chip
          icon={<CheckCircleIcon />}
          label="Đã hoàn thành"
          color="success"
          size={size}
          variant="filled"
          sx={{
            fontWeight: 700,
            fontSize: size === "small" ? "0.75rem" : "0.875rem",
            "& .MuiChip-icon": { color: "inherit" },
          }}
        />
      );
    case "learning":
      return (
        <Chip
          icon={<AutorenewIcon sx={{ animation: "spin 3s linear infinite" }} />}
          label="Đang học"
          color="primary"
          size={size}
          variant="filled"
          sx={{
            fontWeight: 700,
            fontSize: size === "small" ? "0.75rem" : "0.875rem",
            "& .MuiChip-icon": { color: "inherit" },
            "@keyframes spin": {
              "0%": { transform: "rotate(0deg)" },
              "100%": { transform: "rotate(360deg)" },
            },
          }}
        />
      );
    default:
      return (
        <Chip
          icon={<RadioButtonUncheckedIcon />}
          label="Chưa học"
          variant="outlined"
          size={size}
          sx={{
            color: "text.secondary",
            borderColor: "divider",
            fontWeight: 600,
            fontSize: size === "small" ? "0.75rem" : "0.875rem",
            "& .MuiChip-icon": { color: "inherit" },
          }}
        />
      );
  }
};
