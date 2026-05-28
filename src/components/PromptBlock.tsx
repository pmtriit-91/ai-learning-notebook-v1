import React, { useState } from "react";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { ContentCopy, Check } from "@mui/icons-material";

interface PromptBlockProps {
  prompt: string;
}

export const PromptBlock: React.FC<PromptBlockProps> = ({ prompt }) => {
  const [copied, setCopied] = useState(false);

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
        backgroundColor: "#f8fafc",
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        padding: "16px",
        pt: "16px",
        pb: "16px",
        fontFamily: "var(--font-mono)",
        fontSize: "0.875rem",
        lineHeight: 1.6,
        color: "#0f172a",
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
              backgroundColor: copied ? "#d1fae5" : "#ffffff",
              color: copied ? "#059669" : "#64748b",
              border: "1px solid",
              borderColor: copied ? "#a7f3d0" : "#e2e8f0",
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
              "&:hover": {
                backgroundColor: copied ? "#a7f3d0" : "#f8fafc",
                borderColor: copied ? "#34d399" : "#cbd5e1",
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
