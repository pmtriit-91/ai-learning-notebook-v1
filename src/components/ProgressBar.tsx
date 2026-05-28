import React from "react";
import { Box, LinearProgress, Typography } from "@mui/material";

interface ProgressBarProps {
  value: number;
  label?: string;
  height?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ value, label, height = 8 }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
        {label && (
          <Typography variant="body2" sx={{ fontWeight: 600, color: "#334155" }}>
            {label}
          </Typography>
        )}
        <Typography variant="body2" sx={{ fontWeight: 700, color: "#2563eb" }}>
          {value}%
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          height: height,
          borderRadius: height / 2,
          backgroundColor: "#e2e8f0",
          "& .MuiLinearProgress-bar": {
            borderRadius: height / 2,
            backgroundColor: "#2563eb",
          },
        }}
      />
    </Box>
  );
};
