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
          <Typography variant="body2" sx={{ fontWeight: 700, color: "text.secondary" }}>
            {label}
          </Typography>
        )}
        <Typography variant="body2" sx={{ fontWeight: 800, color: "primary.main" }}>
          {value}%
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          height: height,
          borderRadius: height / 2,
          backgroundColor: "divider",
          "& .MuiLinearProgress-bar": {
            borderRadius: height / 2,
            backgroundColor: "primary.main",
          },
        }}
      />
    </Box>
  );
};
