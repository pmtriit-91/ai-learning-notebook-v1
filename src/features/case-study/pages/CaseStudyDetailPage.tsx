import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Paper, Stack, Breadcrumbs, Link, Chip, Grid, Divider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { CheckCircleOutlined } from "@mui/icons-material";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import InfoIcon from "@mui/icons-material/Info";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { caseStudies } from "../../../data/casestudies";

export const CaseStudyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const study = caseStudies.find((s) => s.id === id);

  if (!study) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Typography variant="h5" color="error">
          Case Study không tồn tại
        </Typography>
        <Button onClick={() => navigate("/cases")} sx={{ mt: 2 }} variant="contained">
          Quay lại Thư viện
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ pb: 6 }}>
      {/* Breadcrumbs & Navigation */}
      <Box sx={{ mb: 3 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <Link
            underline="hover"
            color="inherit"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
            sx={{ fontSize: "0.875rem", cursor: "pointer" }}
          >
            Dashboard
          </Link>
          <Link
            underline="hover"
            color="inherit"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("/cases");
            }}
            sx={{ fontSize: "0.875rem", cursor: "pointer" }}
          >
            Thư viện Case Study
          </Link>
          <Typography color="text.primary" sx={{ fontSize: "0.875rem", fontWeight: 600 }}>
            Chi tiết
          </Typography>
        </Breadcrumbs>

        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/cases")}
          sx={{
            textTransform: "none",
            color: "text.secondary",
            fontWeight: 600,
            p: 0,
            minWidth: "auto",
            "&:hover": { color: "text.primary" },
          }}
        >
          Quay lại Thư viện
        </Button>
      </Box>

      {/* Title Header */}
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
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
          <Chip label={study.category} color="primary" size="small" sx={{ fontWeight: 700, borderRadius: "6px" }} />
          <Chip label={`Độ khó: ${study.difficulty}`} color="info" variant="outlined" size="small" sx={{ fontWeight: 700, borderRadius: "6px" }} />
          <Typography variant="caption" sx={{ color: "text.disabled", display: "inline-flex", alignItems: "center", ml: "auto", fontWeight: 600 }}>
            Đăng ngày: {study.timestamp}
          </Typography>
        </Box>

        <Typography
          variant="h4"
          sx={{
            fontFamily: "var(--font-heading)",
            fontWeight: 800,
            color: "text.primary",
            mb: 2,
            fontSize: { xs: "1.75rem", md: "2.25rem" },
            lineHeight: 1.25,
          }}
        >
          {study.title}
        </Typography>

        <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.7, fontSize: "1.05rem" }}>
          {study.context}
        </Typography>
      </Paper>

      {/* Content Blocks */}
      <Grid container spacing={4}>
        {/* Left Column: Symptoms, Trap, Correct Workflow */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={4}>
            {/* Symptoms Alert Box */}
            <Paper
              sx={{
                p: 3.5,
                borderRadius: "16px",
                border: "1px solid",
                borderColor: "error.light",
                backgroundColor: (theme) =>
                  theme.palette.mode === "light" ? "rgba(211, 47, 47, 0.04)" : "rgba(211, 47, 47, 0.08)",
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 800,
                  color: "error.main",
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <PriorityHighIcon />
                Triệu chứng & Biểu hiện lỗi (Symptoms)
              </Typography>
              <Stack spacing={1.5} component="ul" sx={{ pl: 2, m: 0 }}>
                {study.symptoms.map((symptom, idx) => (
                  <Typography key={idx} component="li" variant="body1" sx={{ color: "text.primary", lineHeight: 1.6, listStyleType: "disc" }}>
                    {symptom}
                  </Typography>
                ))}
              </Stack>
            </Paper>

            {/* Trap Approaches Alert Box */}
            <Paper
              sx={{
                p: 3.5,
                borderRadius: "16px",
                border: "1px solid",
                borderColor: "warning.light",
                backgroundColor: (theme) =>
                  theme.palette.mode === "light" ? "rgba(237, 108, 2, 0.04)" : "rgba(237, 108, 2, 0.08)",
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 800,
                  color: "warning.main",
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <WarningAmberIcon />
                Bẫy tư duy / Hướng đi sai lầm dễ mắc (Traps)
              </Typography>
              <Stack spacing={1.5} component="ul" sx={{ pl: 2, m: 0 }}>
                {study.trapApproaches.map((trap, idx) => (
                  <Typography key={idx} component="li" variant="body1" sx={{ color: "text.primary", lineHeight: 1.6, listStyleType: "disc" }}>
                    {trap}
                  </Typography>
                ))}
              </Stack>
            </Paper>

            {/* Correct Workflow Box */}
            <Paper
              sx={{
                p: 3.5,
                borderRadius: "16px",
                border: "1px solid",
                borderColor: "success.light",
                backgroundColor: (theme) =>
                  theme.palette.mode === "light" ? "rgba(46, 125, 50, 0.04)" : "rgba(46, 125, 50, 0.08)",
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 800,
                  color: "success.main",
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <CheckCircleOutlined />
                Quy trình xử lý tối ưu (Correct Workflow)
              </Typography>
              <Stack spacing={2}>
                {study.correctWorkflow.map((step, idx) => (
                  <Box key={idx} sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 800,
                        backgroundColor: "success.main",
                        color: "success.contrastText",
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        mt: 0.25,
                      }}
                    >
                      {idx + 1}
                    </Typography>
                    <Typography variant="body1" sx={{ color: "text.primary", lineHeight: 1.6 }}>
                      {step}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Stack>
        </Grid>

        {/* Right Column: Lessons Learned & General Info */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={4}>
            {/* Lessons Learned Card */}
            <Paper
              sx={{
                p: 3.5,
                borderRadius: "16px",
                border: "2px solid",
                borderColor: "primary.main",
                background: (theme) =>
                  theme.palette.mode === "light"
                    ? "linear-gradient(135deg, #ffffff 0%, #f0f7ff 100%)"
                    : "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 800,
                  color: "primary.main",
                  mb: 2.5,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <AutoAwesomeIcon />
                Hiến pháp kỹ thuật (Lessons Learned)
              </Typography>
              <Stack spacing={2.5}>
                {study.lessonLearned.map((lesson, idx) => (
                  <Box key={idx}>
                    {idx > 0 && <Divider sx={{ my: 2 }} />}
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: "var(--font-heading)",
                        fontWeight: 800,
                        color: "text.primary",
                        fontSize: "1rem",
                        mb: 1,
                      }}
                    >
                      Nguyên lý #{idx + 1}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.6, fontWeight: 500 }}>
                      {lesson}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Paper>

            {/* Quick Tips */}
            <Paper
              sx={{
                p: 3.5,
                borderRadius: "16px",
                border: "1px solid",
                borderColor: "divider",
                backgroundColor: "background.paper",
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 800,
                  color: "text.primary",
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <InfoIcon sx={{ color: "text.secondary" }} />
                Gợi ý học tập
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.6 }}>
                Khi gặp sự cố tương tự, hãy áp dụng quy trình kiểm tra thực tế (QA) sử dụng các nguyên lý trên để cô lập lỗi nhanh nhất, tránh sửa đổi lan man phá vỡ cấu trúc có sẵn của dự án.
              </Typography>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};
export default CaseStudyDetailPage;
