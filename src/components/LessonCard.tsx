import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Box, Chip } from "@mui/material";
import { Clock } from "lucide-react";
import type { Lesson, LessonStatus } from "../types/lesson";
import { StatusBadge } from "./StatusBadge";

interface LessonCardProps {
  lesson: Lesson;
  status: LessonStatus;
}

export const LessonCard: React.FC<LessonCardProps> = ({ lesson, status }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/lesson/${lesson.id}`);
  };

  return (
    <Card
      onClick={handleCardClick}
      sx={{
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
        border: "1px solid #e2e8f0",
        boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
        borderRadius: "12px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -4px rgba(0, 0, 0, 0.05)",
          borderColor: "#cbd5e1",
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
              color: "#2563eb",
              letterSpacing: "1px",
              backgroundColor: "#eff6ff",
              px: 1.5,
              py: 0.5,
              borderRadius: "6px",
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
            color: "#0f172a",
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
            color: "#475569",
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
                backgroundColor: "#f1f5f9",
                color: "#475569",
                height: 22,
                border: "1px solid #e2e8f0"
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
                backgroundColor: "#f1f5f9",
                color: "#64748b",
                height: 22,
                border: "1px solid #e2e8f0"
              }}
            />
          )}
        </Box>

        {/* Footer (Estimated Time) */}
        {lesson.estimatedMinutes && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, color: "#64748b", mt: "auto", pt: 1.5, borderTop: "1px solid #f1f5f9" }}>
            <Clock className="w-4 h-4 text-slate-400" />
            <Typography variant="caption" sx={{ fontWeight: 600 }}>
              {lesson.estimatedMinutes} phút học
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
