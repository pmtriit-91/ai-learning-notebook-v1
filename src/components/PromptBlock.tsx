import React, { useState } from "react";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { ContentCopy, Check } from "@mui/icons-material";
import { useColorMode } from "../theme/theme";

interface PromptBlockProps {
  prompt: string;
}

export const PromptBlock: React.FC<PromptBlockProps> = ({ prompt }) => {
  const [copied, setCopied] = useState(false);
  const { mode } = useColorMode();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        backgroundColor: "background.default",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: "8px",
        padding: "16px",
        pt: "16px",
        pb: "16px",
        fontFamily: "var(--font-mono)",
        fontSize: "0.875rem",
        lineHeight: 1.6,
        color: "text.primary",
        whiteSpace: "pre-wrap",
        overflowX: "auto",
        my: 2,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "8px",
          right: "8px",
          zIndex: 10,
        }}
      >
        <Tooltip title={copied ? "Copied!" : "Copy Prompt"} placement="top" arrow>
          <IconButton
            onClick={handleCopy}
            size="small"
            sx={{
              backgroundColor: copied
                ? (mode === "light" ? "#d1fae5" : "rgba(16, 185, 129, 0.2)")
                : "background.paper",
              color: copied
                ? (mode === "light" ? "#059669" : "#34d399")
                : "text.secondary",
              border: "1px solid",
              borderColor: copied
                ? (mode === "light" ? "#a7f3d0" : "rgba(16, 185, 129, 0.4)")
                : "divider",
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
              "&:hover": {
                backgroundColor: copied
                  ? (mode === "light" ? "#a7f3d0" : "rgba(16, 185, 129, 0.3)")
                  : "action.hover",
                borderColor: copied
                  ? (mode === "light" ? "#34d399" : "#34d399")
                  : "text.primary",
              },
            }}
          >
            {copied ? <Check fontSize="small" /> : <ContentCopy fontSize="small" />}
          </IconButton>
        </Tooltip>
      </Box>
      <Typography
        component="pre"
        sx={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.875rem",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          margin: 0,
          pr: "40px", // Chừa khoảng trống cho nút copy
        }}
      >
        {prompt}
      </Typography>
    </Box>
  );
};
