import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Card, CardContent, Grid, Chip, Button } from "@mui/material";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { caseStudies } from "../../../data/casestudies";
import { getCaseStudyPath } from "../../../router/paths";

export const CaseStudyListPage: React.FC = () => {
  const navigate = useNavigate();

  const getDifficultyColor = (difficulty: 'Easy' | 'Medium' | 'Hard') => {
    switch (difficulty) {
      case "Easy": return "success";
      case "Medium": return "warning";
      case "Hard": return "error";
      default: return "default";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "UI/UX": return "secondary";
      case "State Sync": return "primary";
      case "Deployment": return "info";
      case "Performance": return "error";
      default: return "default";
    }
  };

  return (
    <Box>
      {/* Header Page */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{
            fontFamily: "var(--font-heading)",
            fontWeight: 800,
            color: "text.primary",
            mb: 1.5,
            fontSize: { xs: "2rem", md: "2.2rem" },
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Box sx={{ color: "primary.main", display: "flex" }}>
            <FolderSpecialIcon sx={{ fontSize: "2.5rem" }} />
          </Box>
          Thư viện Case Study
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary", fontSize: "1.05rem" }}>
          Phân tích lỗi thực tế, bẫy tư duy thường gặp và bài học đúc kết từ các phiên debug thực chiến trong dự án.
        </Typography>
      </Box>

      {/* Grid List */}
      <Grid container spacing={3}>
        {caseStudies.map((study) => (
          <Grid size={{ xs: 12, md: 6 }} key={study.id}>
            <Card
              sx={{
                border: "1px solid",
                borderColor: "divider",
                boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                borderRadius: "16px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "background.paper",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  borderColor: "primary.main",
                },
              }}
            >
              <CardContent sx={{ p: 3, flexGrow: 1, display: "flex", flexDirection: "column" }}>
                {/* Badges */}
                <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                  <Chip
                    label={study.category}
                    color={getCategoryColor(study.category)}
                    size="small"
                    sx={{ fontWeight: 700, borderRadius: "6px" }}
                  />
                  <Chip
                    label={`Độ khó: ${study.difficulty}`}
                    color={getDifficultyColor(study.difficulty)}
                    size="small"
                    variant="outlined"
                    sx={{ fontWeight: 700, borderRadius: "6px" }}
                  />
                </Box>

                {/* Title */}
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 800,
                    color: "text.primary",
                    mb: 1.5,
                    fontSize: "1.2rem",
                    lineHeight: 1.3,
                  }}
                >
                  {study.title}
                </Typography>

                {/* Context */}
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    mb: 3,
                    lineHeight: 1.6,
                    flexGrow: 1,
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {study.context}
                </Typography>

                {/* Footer Action */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: "auto", pt: 2, borderTop: "1px solid", borderColor: "divider" }}>
                  <Typography variant="caption" sx={{ color: "text.disabled", fontWeight: 600 }}>
                    Đăng ngày: {study.timestamp}
                  </Typography>
                  <Button
                    variant="text"
                    color="primary"
                    onClick={() => navigate(getCaseStudyPath(study.id))}
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      fontWeight: 700,
                      textTransform: "none",
                      p: 0,
                      "&:hover": { backgroundColor: "transparent" },
                    }}
                  >
                    Đọc phân tích
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default CaseStudyListPage;
