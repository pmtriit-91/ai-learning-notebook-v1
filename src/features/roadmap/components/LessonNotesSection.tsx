import React, { useState, useEffect, useRef } from "react";
import { Paper, Typography, TextField, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { CheckCircleOutlined, Autorenew } from "@mui/icons-material";
import { useLessonProgress } from "../hooks/useLessonProgress";

interface LessonNotesSectionProps {
  lessonId: string;
}

export const LessonNotesSection: React.FC<LessonNotesSectionProps> = ({ lessonId }) => {
  const { getLessonNote, updateLessonNote } = useLessonProgress();
  const [localNote, setLocalNote] = useState(() => getLessonNote(lessonId));
  const [saveStatus, setSaveStatus] = useState<"idle" | "typing" | "saving" | "saved">("idle");
  const [lastSaved, setLastSaved] = useState<string>("");
  const isInitialMount = useRef(true);

  // Cơ chế Debounce tự động lưu sau 1.5 giây
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    setSaveStatus("typing");
    const delayDebounceFn = setTimeout(() => {
      setSaveStatus("saving");
      try {
        updateLessonNote(lessonId, localNote);
        setSaveStatus("saved");
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        setLastSaved(timeStr);
      } catch (err) {
        console.error("Failed to auto-save note:", err);
        setSaveStatus("idle");
      }
    }, 1500);

    return () => clearTimeout(delayDebounceFn);
  }, [localNote, lessonId, updateLessonNote]);

  return (
    <Paper
      sx={{
        p: 4,
        borderRadius: "16px",
        border: "1px solid",
        borderColor: "divider",
        mb: 4,
        backgroundColor: "background.paper",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, pb: 1, borderBottom: "2px solid", borderBottomColor: "divider" }}>
        <Typography
          variant="h6"
          sx={{
            fontFamily: "var(--font-heading)",
            fontWeight: 800,
            color: "text.primary",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <EditIcon sx={{ color: "primary.main" }} />
          Sổ tay bài học (Lesson Notes)
        </Typography>

        {/* Trạng thái lưu trữ trực quan */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          {saveStatus === "typing" && (
            <Typography variant="caption" sx={{ color: "text.secondary", fontStyle: "italic" }}>
              Đang soạn thảo...
            </Typography>
          )}
          {saveStatus === "saving" && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Autorenew className="animate-spin" sx={{ fontSize: "0.95rem", color: "warning.main" }} />
              <Typography variant="caption" sx={{ color: "warning.main", fontWeight: 600 }}>
                Đang lưu...
              </Typography>
            </Box>
          )}
          {saveStatus === "saved" && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <CheckCircleOutlined sx={{ fontSize: "0.95rem", color: "success.main" }} />
              <Typography variant="caption" sx={{ color: "success.main", fontWeight: 600 }}>
                Đã tự động lưu {lastSaved && `lúc ${lastSaved}`}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
        Ghi chép lại đúc kết của riêng bạn, các prompt đã thử, lỗi thường gặp hoặc bài học tự thực hành. Dữ liệu sẽ tự động được lưu trữ ngoại tuyến tại trình duyệt và gộp vào file sao lưu của bạn.
      </Typography>

      <TextField
        fullWidth
        multiline
        rows={6}
        value={localNote}
        onChange={(e) => setLocalNote(e.target.value)}
        placeholder="Gõ ghi chú bài học tại đây (Hỗ trợ định dạng văn bản thô)..."
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: "background.default",
            fontFamily: "inherit",
            fontSize: "0.95rem",
            borderRadius: "10px",
            lineHeight: 1.6,
          },
        }}
      />
    </Paper>
  );
};
