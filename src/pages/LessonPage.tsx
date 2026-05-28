import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Button,
    Checkbox,
    FormControlLabel,
    Paper,
    Stack,
    Breadcrumbs,
    Link,
    Chip,
    Divider,
    Grid,
} from '@mui/material';
import { ArrowLeft, ArrowRight, CheckCircle2, Play, Circle, ExternalLink, Clock } from 'lucide-react';
import type { UseLessonProgressType } from '../hooks/useLessonProgress';
import { lessons } from '../data/lessons';
import { phases } from '../data/roadmap';
import { PromptBlock } from '../components/PromptBlock';

interface LessonPageProps {
    progress: UseLessonProgressType;
}

export const LessonPage: React.FC<LessonPageProps> = ({ progress }) => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { getLessonStatus, updateLessonStatus, getLessonChecklist, toggleChecklistItem } = progress;

    // Tìm bài học hiện tại
    const lessonIndex = lessons.findIndex((l) => l.id === id);
    if (lessonIndex === -1) {
        return (
            <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h5" color="error">
                    Bài học không tồn tại
                </Typography>
                <Button onClick={() => navigate('/roadmap')} sx={{ mt: 2 }} variant="contained">
                    Quay lại Lộ trình
                </Button>
            </Box>
        );
    }

    const lesson = lessons[lessonIndex];
    const phase = phases.find((p) => p.id === lesson.phaseId) || phases[0];
    const status = getLessonStatus(lesson.id);

    // Thiết lập checklist mặc định cho bài học
    const checklistItems = [
        'Đọc và hiểu các khái niệm lý thuyết cốt lõi.',
        'Thực hành ứng dụng câu lệnh mẫu (Example Prompt) vào thực tế.',
        'Tự làm và trả lời các câu hỏi luyện tập cuối bài.',
    ];

    const checklistState = getLessonChecklist(lesson.id, checklistItems.length);

    const handleStatusChange = (newStatus: 'not-started' | 'learning' | 'completed') => {
        updateLessonStatus(lesson.id, newStatus);
    };

    const prevLesson = lessonIndex > 0 ? lessons[lessonIndex - 1] : null;
    const nextLesson = lessonIndex < lessons.length - 1 ? lessons[lessonIndex + 1] : null;

    return (
        <Box>
            {/* Breadcrumbs & Navigation */}
            <Box sx={{ mb: 3 }}>
                <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
                    <Link
                        underline="hover"
                        color="inherit"
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate('/');
                        }}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                            fontSize: '0.875rem',
                            cursor: 'pointer',
                        }}
                    >
                        Dashboard
                    </Link>
                    <Link
                        underline="hover"
                        color="inherit"
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate('/roadmap');
                        }}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                            fontSize: '0.875rem',
                            cursor: 'pointer',
                        }}
                    >
                        Roadmap
                    </Link>
                    <Typography color="text.primary" sx={{ fontSize: '0.875rem', fontWeight: 600 }}>
                        Bài {lesson.lessonNumber}
                    </Typography>
                </Breadcrumbs>

                <Button
                    startIcon={<ArrowLeft className="w-4 h-4" />}
                    onClick={() => navigate('/roadmap')}
                    sx={{
                        textTransform: 'none',
                        color: '#64748b',
                        fontWeight: 600,
                        p: 0,
                        minWidth: 'auto',
                        '&:hover': { color: '#0f172a' },
                    }}
                >
                    Quay lại Lộ trình
                </Button>
            </Box>

            {/* Lesson Header Card */}
            <Card
                sx={{
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.01)',
                    borderRadius: '16px',
                    mb: 4,
                    backgroundColor: '#ffffff',
                }}
            >
                <CardContent sx={{ p: 4 }}>
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 8 }}>
                            <Typography
                                variant="caption"
                                sx={{
                                    fontWeight: 800,
                                    color: '#2563eb',
                                    backgroundColor: '#eff6ff',
                                    px: 1.5,
                                    py: 0.5,
                                    borderRadius: '6px',
                                    mb: 1.5,
                                    display: 'inline-block',
                                    letterSpacing: '0.5px',
                                }}
                            >
                                {phase.title}
                            </Typography>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontFamily: 'var(--font-heading)',
                                    fontWeight: 800,
                                    color: '#0f172a',
                                    mb: 2,
                                    fontSize: { xs: '1.75rem', md: '2.25rem' },
                                    lineHeight: 1.2,
                                }}
                            >
                                Bài {lesson.lessonNumber}: {lesson.title}
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ color: '#475569', mb: 2, lineHeight: 1.7, fontSize: '1.025rem' }}
                            >
                                {lesson.description}
                            </Typography>

                            {/* Concepts Tags */}
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                                {lesson.concepts.map((concept) => (
                                    <Chip
                                        key={concept}
                                        label={concept}
                                        sx={{
                                            backgroundColor: '#f8fafc',
                                            border: '1px solid #e2e8f0',
                                            color: '#334155',
                                            fontWeight: 600,
                                            fontSize: '0.775rem',
                                            height: 26,
                                        }}
                                    />
                                ))}
                            </Box>
                        </Grid>

                        {/* Trạng thái học tập Panel */}
                        <Grid size={{ xs: 12, md: 4 }} sx={{ display: 'flex', justifyContent: { md: 'flex-end' } }}>
                            <Paper
                                sx={{
                                    p: 2.5,
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '12px',
                                    width: '100%',
                                    maxWidth: 300,
                                    backgroundColor: '#ffffff',
                                }}
                            >
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        fontWeight: 800,
                                        color: '#0f172a',
                                        mb: 2,
                                        textAlign: 'center',
                                        letterSpacing: '0.5px',
                                    }}
                                >
                                    TRẠNG THÁI HỌC TẬP
                                </Typography>
                                <Stack spacing={1.5}>
                                    <Button
                                        fullWidth
                                        variant={status === 'completed' ? 'contained' : 'outlined'}
                                        color="success"
                                        onClick={() => handleStatusChange('completed')}
                                        startIcon={<CheckCircle2 className="w-4 h-4" />}
                                        sx={{
                                            textTransform: 'none',
                                            fontWeight: 700,
                                            borderRadius: '8px',
                                            py: 1,
                                            backgroundColor: status === 'completed' ? '#047857' : 'transparent',
                                            color: status === 'completed' ? '#ffffff' : '#047857',
                                            borderColor: '#10b981',
                                            '&:hover': {
                                                backgroundColor: status === 'completed' ? '#065f46' : '#ecfdf5',
                                                borderColor: '#059669',
                                            },
                                        }}
                                    >
                                        Hoàn thành
                                    </Button>
                                    <Button
                                        fullWidth
                                        variant={status === 'learning' ? 'contained' : 'outlined'}
                                        color="warning"
                                        onClick={() => handleStatusChange('learning')}
                                        startIcon={<Play className="w-4 h-4 fill-current" />}
                                        sx={{
                                            textTransform: 'none',
                                            fontWeight: 700,
                                            borderRadius: '8px',
                                            py: 1,
                                            backgroundColor: status === 'learning' ? '#d97706' : 'transparent',
                                            color: status === 'learning' ? '#ffffff' : '#b45309',
                                            borderColor: '#f59e0b',
                                            '&:hover': {
                                                backgroundColor: status === 'learning' ? '#b45309' : '#fffbeb',
                                                borderColor: '#d97706',
                                            },
                                        }}
                                    >
                                        Đang học
                                    </Button>
                                    <Button
                                        fullWidth
                                        variant={status === 'not-started' ? 'contained' : 'outlined'}
                                        color="inherit"
                                        onClick={() => handleStatusChange('not-started')}
                                        startIcon={<Circle className="w-4 h-4" />}
                                        sx={{
                                            textTransform: 'none',
                                            fontWeight: 700,
                                            borderRadius: '8px',
                                            py: 1,
                                            backgroundColor: status === 'not-started' ? '#64748b' : 'transparent',
                                            color: status === 'not-started' ? '#ffffff' : '#475569',
                                            borderColor: '#cbd5e1',
                                            '&:hover': {
                                                backgroundColor: status === 'not-started' ? '#475569' : '#f8fafc',
                                                borderColor: '#94a3b8',
                                            },
                                        }}
                                    >
                                        Chưa bắt đầu
                                    </Button>
                                </Stack>
                                {lesson.estimatedMinutes && (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: 1,
                                            color: '#64748b',
                                            mt: 2,
                                        }}
                                    >
                                        <Clock className="w-4 h-4" />
                                        <Typography variant="caption" sx={{ fontWeight: 600 }}>
                                            Thời gian dự kiến: {lesson.estimatedMinutes} phút
                                        </Typography>
                                    </Box>
                                )}
                            </Paper>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* Main Content Grid */}
            <Grid container spacing={4}>
                {/* Left column: Lesson details */}
                <Grid size={{ xs: 12, md: 8 }}>
                    {/* Summary / Đúc kết */}
                    <Paper
                        sx={{
                            p: 4,
                            borderRadius: '16px',
                            border: '1px solid #e2e8f0',
                            mb: 4,
                            backgroundColor: '#ffffff',
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                fontFamily: 'var(--font-heading)',
                                fontWeight: 800,
                                color: '#0f172a',
                                mb: 2,
                                pb: 1,
                                borderBottom: '2px solid #f1f5f9',
                            }}
                        >
                            Đúc kết bài học
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#334155', lineHeight: 1.8, fontSize: '1rem' }}>
                            {lesson.summary}
                        </Typography>
                    </Paper>

                    {/* Key Takeaways */}
                    <Paper
                        sx={{
                            p: 4,
                            borderRadius: '16px',
                            border: '1px solid #e2e8f0',
                            mb: 4,
                            backgroundColor: '#ffffff',
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                fontFamily: 'var(--font-heading)',
                                fontWeight: 800,
                                color: '#0f172a',
                                mb: 2.5,
                                pb: 1,
                                borderBottom: '2px solid #f1f5f9',
                            }}
                        >
                            Điểm cốt lõi cần nhớ (Key Takeaways)
                        </Typography>
                        <Stack spacing={2}>
                            {lesson.keyTakeaways.map((takeaway, index) => (
                                <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                                    <Box sx={{ mt: 0.5, color: '#10b981', flexShrink: 0 }}>
                                        <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-50" />
                                    </Box>
                                    <Typography variant="body1" sx={{ color: '#334155', lineHeight: 1.6 }}>
                                        {takeaway}
                                    </Typography>
                                </Box>
                            ))}
                        </Stack>
                    </Paper>

                    {/* Example Prompts */}
                    {lesson.examplePrompts && lesson.examplePrompts.length > 0 && (
                        <Paper
                            sx={{
                                p: 4,
                                borderRadius: '16px',
                                border: '1px solid #e2e8f0',
                                mb: 4,
                                backgroundColor: '#ffffff',
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    fontFamily: 'var(--font-heading)',
                                    fontWeight: 800,
                                    color: '#0f172a',
                                    mb: 2.5,
                                    pb: 1,
                                    borderBottom: '2px solid #f1f5f9',
                                }}
                            >
                                Prompt mẫu thực hành
                            </Typography>
                            {lesson.examplePrompts.map((prompt, index) => (
                                <PromptBlock key={index} prompt={prompt} />
                            ))}
                        </Paper>
                    )}

                    {/* Exercises */}
                    {lesson.exercises && lesson.exercises.length > 0 && (
                        <Paper
                            sx={{
                                p: 4,
                                borderRadius: '16px',
                                border: '1px solid #e2e8f0',
                                mb: 4,
                                backgroundColor: '#ffffff',
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    fontFamily: 'var(--font-heading)',
                                    fontWeight: 800,
                                    color: '#0f172a',
                                    mb: 2.5,
                                    pb: 1,
                                    borderBottom: '2px solid #f1f5f9',
                                }}
                            >
                                Bài tập thực hành (Exercises)
                            </Typography>
                            <Stack spacing={2} component="ul" sx={{ pl: 2, m: 0 }}>
                                {lesson.exercises.map((exercise, index) => (
                                    <Typography
                                        key={index}
                                        component="li"
                                        variant="body1"
                                        sx={{ color: '#334155', lineHeight: 1.7, listStyleType: 'disc' }}
                                    >
                                        {exercise}
                                    </Typography>
                                ))}
                            </Stack>
                        </Paper>
                    )}
                </Grid>

                {/* Right column: Checklist & References */}
                <Grid size={{ xs: 12, md: 4 }}>
                    {/* Checklist hoàn thành */}
                    <Paper
                        sx={{
                            p: 3,
                            borderRadius: '16px',
                            border: '1px solid #e2e8f0',
                            mb: 4,
                            backgroundColor: '#ffffff',
                        }}
                    >
                        <Typography
                            variant="subtitle1"
                            sx={{ fontFamily: 'var(--font-heading)', fontWeight: 800, color: '#0f172a', mb: 2 }}
                        >
                            Checklist hoàn thành
                        </Typography>
                        <Stack spacing={1.5}>
                            {checklistItems.map((item, index) => (
                                <FormControlLabel
                                    key={index}
                                    control={
                                        <Checkbox
                                            checked={checklistState[index] || false}
                                            onChange={() =>
                                                toggleChecklistItem(lesson.id, index, checklistItems.length)
                                            }
                                            color="primary"
                                        />
                                    }
                                    label={
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: checklistState[index] ? '#94a3b8' : '#334155',
                                                textDecoration: checklistState[index] ? 'line-through' : 'none',
                                                lineHeight: 1.5,
                                                fontWeight: 600,
                                            }}
                                        >
                                            {item}
                                        </Typography>
                                    }
                                    sx={{
                                        alignItems: 'flex-start',
                                        m: 0,
                                        '& .MuiCheckbox-root': {
                                            p: 0,
                                            mr: 1.5,
                                            mt: 0.25,
                                        },
                                    }}
                                />
                            ))}
                        </Stack>
                    </Paper>

                    {/* References */}
                    {lesson.references && lesson.references.length > 0 && (
                        <Paper
                            sx={{ p: 3, borderRadius: '16px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff' }}
                        >
                            <Typography
                                variant="subtitle1"
                                sx={{ fontFamily: 'var(--font-heading)', fontWeight: 800, color: '#0f172a', mb: 2 }}
                            >
                                Tài liệu tham khảo
                            </Typography>
                            <Stack spacing={2}>
                                {lesson.references.map((ref, index) => (
                                    <Box key={index}>
                                        <Link
                                            href={ref.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 0.75,
                                                fontSize: '0.875rem',
                                                color: '#2563eb',
                                                fontWeight: 600,
                                                textDecoration: 'none',
                                                '&:hover': {
                                                    textDecoration: 'underline',
                                                },
                                            }}
                                        >
                                            <span style={{ wordBreak: 'break-all' }}>{ref.title}</span>
                                            <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                                        </Link>
                                    </Box>
                                ))}
                            </Stack>
                        </Paper>
                    )}
                </Grid>
            </Grid>

            {/* Navigation Footer (Prev & Next Lesson) */}
            <Divider sx={{ my: 5 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 5 }}>
                {prevLesson ? (
                    <Button
                        variant="outlined"
                        onClick={() => navigate(`/lesson/${prevLesson.id}`)}
                        startIcon={<ArrowLeft className="w-4 h-4" />}
                        sx={{
                            textTransform: 'none',
                            fontWeight: 700,
                            borderRadius: '10px',
                            borderColor: '#cbd5e1',
                            color: '#334155',
                            px: 3,
                            py: 1.25,
                            '&:hover': {
                                borderColor: '#94a3b8',
                                backgroundColor: '#f8fafc',
                            },
                        }}
                    >
                        <Box sx={{ textAlign: 'left' }}>
                            <Typography variant="caption" sx={{ display: 'block', color: '#64748b', fontWeight: 600 }}>
                                BÀI TRƯỚC
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 700, display: { xs: 'none', sm: 'block' } }}>
                                {prevLesson.title}
                            </Typography>
                        </Box>
                    </Button>
                ) : (
                    <Box />
                )}

                {nextLesson ? (
                    <Button
                        variant="contained"
                        onClick={() => navigate(`/lesson/${nextLesson.id}`)}
                        endIcon={<ArrowRight className="w-4 h-4" />}
                        sx={{
                            textTransform: 'none',
                            fontWeight: 700,
                            borderRadius: '10px',
                            backgroundColor: '#2563eb',
                            color: '#ffffff',
                            px: 3,
                            py: 1.25,
                            '&:hover': {
                                backgroundColor: '#1d4ed8',
                            },
                        }}
                    >
                        <Box sx={{ textAlign: 'right' }}>
                            <Typography
                                variant="caption"
                                sx={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}
                            >
                                BÀI TIẾP THEO
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 700, display: { xs: 'none', sm: 'block' } }}>
                                {nextLesson.title}
                            </Typography>
                        </Box>
                    </Button>
                ) : (
                    <Box />
                )}
            </Box>
        </Box>
    );
};
