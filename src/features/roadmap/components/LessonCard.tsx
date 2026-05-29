import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Box, Chip } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import type { Lesson, LessonStatus } from "../../../types/lesson";
import { StatusBadge } from "./StatusBadge";
import { useColorMode } from "../../../theme/ColorModeContext";

interface LessonCardProps {
  lesson: Lesson;
  status: LessonStatus;
}

export const LessonCard: React.FC<LessonCardProps> = ({ lesson, status }) => {
  const navigate = useNavigate();
  const { mode } = useColorMode();

  const handleCardClick = () => {
    navigate(`/lesson/${lesson.id}`);
  };

  return (
    <Card
      onClick={handleCardClick}
      sx={{
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.paper",
        boxShadow: "none",
        borderRadius: "12px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: mode === "light" 
            ? "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -4px rgba(0, 0, 0, 0.05)"
            : "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -4px rgba(0, 0, 0, 0.3)",
          borderColor: "primary.main",
        },
      }}
    >
      <CardContent sx={{ p: 3, flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* Card Header (Lesson Number & Status) */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 800,
              color: mode === "light" ? "primary.main" : "primary.light",
              backgroundColor: mode === "light" ? "rgba(29, 78, 216, 0.08)" : "rgba(59, 130, 246, 0.15)",
              px: 1.5,
              py: 0.5,
              borderRadius: "6px",
              letterSpacing: "0.5px"
            }}
          >
            BÀI {lesson.lessonNumber.toString().padStart(2, "0")}
          </Typography>
          <StatusBadge status={status} />
        </Box>

        {/* Title */}
        <Typography
          variant="h6"
          sx={{
            fontFamily: "var(--font-heading)",
            fontWeight: 700,
            fontSize: "1.1rem",
            lineHeight: 1.4,
            color: "text.primary",
            mb: 1.5,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: "3.08rem", // Giúp các card có chiều cao tiêu đề đồng đều
          }}
        >
          {lesson.title}
        </Typography>

        {/* Description */}
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            lineHeight: 1.6,
            mb: 2.5,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: "3rem", // Chiều cao mô tả cố định để layout đều
            flexGrow: 1,
          }}
        >
          {lesson.description}
        </Typography>

        {/* Concepts / Tags */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, mb: 2 }}>
          {lesson.concepts.slice(0, 3).map((concept) => (
            <Chip
              key={concept}
              label={concept}
              size="small"
              sx={{
                fontSize: "0.725rem",
                fontWeight: 600,
                backgroundColor: "background.default",
                color: "text.secondary",
                height: 22,
                border: "1px solid",
                borderColor: "divider"
              }}
            />
          ))}
          {lesson.concepts.length > 3 && (
            <Chip
              label={`+${lesson.concepts.length - 3}`}
              size="small"
              sx={{
                fontSize: "0.725rem",
                fontWeight: 600,
                backgroundColor: "background.default",
                color: "text.secondary",
                height: 22,
                border: "1px solid",
                borderColor: "divider"
              }}
            />
          )}
        </Box>

        {/* Footer (Estimated Time) */}
        {lesson.estimatedMinutes && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, color: "text.secondary", mt: "auto", pt: 1.5, borderTop: "1px solid", borderColor: "divider" }}>
            <AccessTimeIcon sx={{ fontSize: "1rem", color: "text.disabled" }} />
            <Typography variant="caption" sx={{ fontWeight: 600 }}>
              {lesson.estimatedMinutes} phút học
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
