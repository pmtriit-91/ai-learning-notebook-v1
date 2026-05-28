import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Card, CardContent, Button, Paper, Grid } from '@mui/material';
import { Play, ArrowRight, BookOpen } from 'lucide-react';
import type { UseLessonProgressType } from '../hooks/useLessonProgress';
import { lessons } from '../data/lessons';
import { phases } from '../data/roadmap';
import { LessonCard } from '../components/LessonCard';
import { ProgressBar } from '../components/ProgressBar';

interface DashboardProps {
    progress: UseLessonProgressType;
}

export const Dashboard: React.FC<DashboardProps> = ({ progress }) => {
    const navigate = useNavigate();
    const { getLessonStatus, completedLessonsCount, learningLessonsCount, overallProgress } = progress;

    // Tìm bài học tiếp theo cần học: đang học -> chưa bắt đầu -> bài cuối cùng
    const currentLesson =
        lessons.find((l) => getLessonStatus(l.id) === 'learning') ||
        lessons.find((l) => getLessonStatus(l.id) === 'not-started') ||
        lessons[lessons.length - 1];

    // Tìm Phase hiện tại tương ứng với bài học tiếp theo
    const currentPhase = phases.find((p) => p.id === currentLesson.phaseId) || phases[0];

    // Lấy danh sách bài học đang học
    const activeLessons = lessons.filter((l) => getLessonStatus(l.id) === 'learning');

    // Nếu không có bài nào đang học dở, gợi ý 3 bài tiếp theo chưa học
    const recommendedLessons =
        activeLessons.length > 0
            ? activeLessons
            : lessons.filter((l) => getLessonStatus(l.id) === 'not-started').slice(0, 3);

    const handleContinue = () => {
        navigate(`/lesson/${currentLesson.id}`);
    };

    return (
        <Box>
            {/* Title & Introduction */}
            <Box sx={{ mb: 4 }}>
                <Typography
                    variant="h3"
                    sx={{
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 800,
                        color: '#0f172a',
                        mb: 1.5,
                        fontSize: { xs: '2rem', md: '2.5rem' },
                    }}
                >
                    AI Learning Notebook
                </Typography>
                <Typography variant="body1" sx={{ color: '#475569', fontSize: '1.05rem' }}>
                    Hệ thống hóa lộ trình học AI, lưu trữ ghi chú, prompt mẫu và theo dõi tiến độ học tập cá nhân.
                </Typography>
            </Box>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {/* Progress Card */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper
                        sx={{
                            p: 3,
                            borderRadius: '16px',
                            border: '1px solid #e2e8f0',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.01)',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            backgroundColor: '#ffffff',
                        }}
                    >
                        <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 800, color: '#64748b', mb: 2, letterSpacing: '0.5px' }}
                        >
                            TIẾN ĐỘ LỘ TRÌNH HỌC
                        </Typography>
                        <ProgressBar value={overallProgress} height={12} />
                    </Paper>
                </Grid>

                {/* Quick Stats Number */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper
                        sx={{
                            p: 3,
                            borderRadius: '16px',
                            border: '1px solid #e2e8f0',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.01)',
                            height: '100%',
                            backgroundColor: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Grid container spacing={2} sx={{ width: '100%' }}>
                            <Grid size={{ xs: 4 }}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a' }}>
                                        {lessons.length}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        sx={{ color: '#64748b', fontWeight: 700, display: 'block', mt: 0.5 }}
                                    >
                                        TỔNG BÀI
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 4 }}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="h4" sx={{ fontWeight: 800, color: '#b45309' }}>
                                        {learningLessonsCount}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        sx={{ color: '#b45309', fontWeight: 700, display: 'block', mt: 0.5 }}
                                    >
                                        ĐANG HỌC
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 4 }}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="h4" sx={{ fontWeight: 800, color: '#047857' }}>
                                        {completedLessonsCount}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        sx={{ color: '#047857', fontWeight: 700, display: 'block', mt: 0.5 }}
                                    >
                                        HOÀN THÀNH
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>

            {/* Current Lesson Hero */}
            <Card
                sx={{
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                    borderRadius: '16px',
                    mb: 5,
                    overflow: 'hidden',
                    background: 'linear-gradient(135deg, #ffffff 0%, #f0f7ff 100%)',
                }}
            >
                <CardContent sx={{ p: 4 }}>
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 8 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        fontWeight: 800,
                                        color: '#2563eb',
                                        backgroundColor: '#dbeafe',
                                        px: 1.5,
                                        py: 0.5,
                                        borderRadius: '6px',
                                        letterSpacing: '0.5px',
                                    }}
                                >
                                    BÀI HỌC HIỆN TẠI
                                </Typography>
                                <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b' }}>
                                    {currentPhase.title}
                                </Typography>
                            </Box>

                            <Typography
                                variant="h5"
                                sx={{
                                    fontFamily: 'var(--font-heading)',
                                    fontWeight: 800,
                                    color: '#0f172a',
                                    mb: 1.5,
                                    fontSize: '1.4rem',
                                }}
                            >
                                Bài {currentLesson.lessonNumber}: {currentLesson.title}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ color: '#475569', mb: 0, lineHeight: 1.6, fontSize: '0.95rem' }}
                            >
                                {currentLesson.description}
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }} sx={{ display: 'flex', justifyContent: { md: 'flex-end' } }}>
                            <Button
                                variant="contained"
                                onClick={handleContinue}
                                startIcon={<Play className="w-4 h-4 fill-current" />}
                                endIcon={<ArrowRight className="w-4 h-4" />}
                                sx={{
                                    backgroundColor: '#2563eb',
                                    color: '#ffffff',
                                    fontWeight: 700,
                                    px: 3.5,
                                    py: 1.5,
                                    borderRadius: '10px',
                                    boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)',
                                    textTransform: 'none',
                                    fontSize: '0.95rem',
                                    '&:hover': {
                                        backgroundColor: '#1d4ed8',
                                        boxShadow: '0 6px 12px -2px rgba(37, 99, 235, 0.3)',
                                    },
                                }}
                            >
                                Tiếp tục học
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* Suggested/Active Lessons Section */}
            <Box sx={{ mb: 4 }}>
                <Typography
                    variant="h5"
                    sx={{
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 800,
                        color: '#0f172a',
                        mb: 3,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.25,
                    }}
                >
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    {activeLessons.length > 0 ? 'Bài học đang học' : 'Bài học gợi ý tiếp theo'}
                </Typography>

                <Grid container spacing={3}>
                    {recommendedLessons.map((lesson) => (
                        <Grid key={lesson.id} size={{ xs: 12, sm: 6, md: 4 }}>
                            <LessonCard lesson={lesson} status={getLessonStatus(lesson.id)} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};
