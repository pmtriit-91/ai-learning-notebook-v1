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
    Fab,
    Drawer,
    Tooltip,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import LaunchIcon from '@mui/icons-material/Launch';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EditIcon from '@mui/icons-material/Edit';
import { lessons } from '../../../data/lessons';
import { phases } from '../../../data/roadmap';
import { PromptBlock } from '../../../core/components/PromptBlock';

import { useLessonProgress } from '../hooks/useLessonProgress';
import { LessonNotesSection } from '../components/LessonNotesSection';

export const LessonPage: React.FC = () => {
    const progress = useLessonProgress();
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [isNotesOpen, setIsNotesOpen] = React.useState(false);

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
        updateLessonStatus(lesson.id, newStatus, checklistItems.length);
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
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/roadmap')}
                    sx={{
                        textTransform: 'none',
                        color: 'text.secondary',
                        fontWeight: 600,
                        p: 0,
                        minWidth: 'auto',
                        '&:hover': { color: 'text.primary' },
                    }}
                >
                    Quay lại Lộ trình
                </Button>
            </Box>

            {/* Lesson Header Card */}
            <Card
                sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.01)',
                    borderRadius: '16px',
                    mb: 4,
                    backgroundColor: 'background.paper',
                }}
            >
                <CardContent sx={{ p: 4 }}>
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 8 }}>
                            <Typography
                                variant="caption"
                                sx={{
                                    fontWeight: 800,
                                    color: (theme) =>
                                        theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
                                    backgroundColor: (theme) =>
                                        theme.palette.mode === 'light'
                                            ? 'rgba(29, 78, 216, 0.08)'
                                            : 'rgba(59, 130, 246, 0.15)',
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
                                    color: 'text.primary',
                                    mb: 2,
                                    fontSize: { xs: '1.75rem', md: '2.25rem' },
                                    lineHeight: 1.2,
                                }}
                            >
                                Bài {lesson.lessonNumber}: {lesson.title}
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.7, fontSize: '1.025rem' }}
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
                                            backgroundColor: 'background.default',
                                            border: '1px solid',
                                            borderColor: 'divider',
                                            color: 'text.secondary',
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
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    borderRadius: '12px',
                                    width: '100%',
                                    maxWidth: 300,
                                    backgroundColor: 'background.paper',
                                }}
                            >
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        fontWeight: 800,
                                        color: 'text.primary',
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
                                        startIcon={<CheckCircleIcon />}
                                        sx={{
                                            textTransform: 'none',
                                            fontWeight: 700,
                                            borderRadius: '8px',
                                            py: 1,
                                            backgroundColor: status === 'completed' ? 'success.main' : 'transparent',
                                            color: status === 'completed' ? 'success.contrastText' : 'success.main',
                                            borderColor: 'success.main',
                                            '&:hover': {
                                                backgroundColor:
                                                    status === 'completed' ? 'success.dark' : 'rgba(46, 125, 50, 0.08)',
                                                borderColor: 'success.dark',
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
                                        startIcon={<PlayArrowIcon />}
                                        sx={{
                                            textTransform: 'none',
                                            fontWeight: 700,
                                            borderRadius: '8px',
                                            py: 1,
                                            backgroundColor: status === 'learning' ? 'warning.main' : 'transparent',
                                            color: status === 'learning' ? 'warning.contrastText' : 'warning.main',
                                            borderColor: 'warning.main',
                                            '&:hover': {
                                                backgroundColor:
                                                    status === 'learning' ? 'warning.dark' : 'rgba(237, 108, 2, 0.08)',
                                                borderColor: 'warning.dark',
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
                                        startIcon={<RadioButtonUncheckedIcon />}
                                        sx={{
                                            textTransform: 'none',
                                            fontWeight: 700,
                                            borderRadius: '8px',
                                            py: 1,
                                            backgroundColor:
                                                status === 'not-started' ? 'text.secondary' : 'transparent',
                                            color: status === 'not-started' ? 'background.paper' : 'text.secondary',
                                            borderColor: 'divider',
                                            '&:hover': {
                                                backgroundColor:
                                                    status === 'not-started' ? 'text.primary' : 'action.hover',
                                                borderColor: 'divider',
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
                                            color: 'text.secondary',
                                            mt: 2,
                                        }}
                                    >
                                        <AccessTimeIcon sx={{ fontSize: '1.1rem', color: 'text.disabled' }} />
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
                            border: '1px solid',
                            borderColor: 'divider',
                            mb: 4,
                            backgroundColor: 'background.paper',
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                fontFamily: 'var(--font-heading)',
                                fontWeight: 800,
                                color: 'text.primary',
                                mb: 2,
                                pb: 1,
                                borderBottom: '2px solid',
                                borderBottomColor: 'divider',
                            }}
                        >
                            Đúc kết bài học
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8, fontSize: '1rem' }}>
                            {lesson.summary}
                        </Typography>
                    </Paper>

                    {/* Key Takeaways */}
                    <Paper
                        sx={{
                            p: 4,
                            borderRadius: '16px',
                            border: '1px solid',
                            borderColor: 'divider',
                            mb: 4,
                            backgroundColor: 'background.paper',
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                fontFamily: 'var(--font-heading)',
                                fontWeight: 800,
                                color: 'text.primary',
                                mb: 2.5,
                                pb: 1,
                                borderBottom: '2px solid',
                                borderBottomColor: 'divider',
                            }}
                        >
                            Điểm cốt lõi cần nhớ (Key Takeaways)
                        </Typography>
                        <Stack spacing={2}>
                            {lesson.keyTakeaways.map((takeaway, index) => (
                                <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                                    <Box sx={{ mt: 0.5, color: 'success.main', flexShrink: 0, display: 'flex' }}>
                                        <CheckCircleIcon sx={{ fontSize: '1.25rem' }} />
                                    </Box>
                                    <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
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
                                border: '1px solid',
                                borderColor: 'divider',
                                mb: 4,
                                backgroundColor: 'background.paper',
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    fontFamily: 'var(--font-heading)',
                                    fontWeight: 800,
                                    color: 'text.primary',
                                    mb: 2.5,
                                    pb: 1,
                                    borderBottom: '2px solid',
                                    borderBottomColor: 'divider',
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
                                border: '1px solid',
                                borderColor: 'divider',
                                mb: 4,
                                backgroundColor: 'background.paper',
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    fontFamily: 'var(--font-heading)',
                                    fontWeight: 800,
                                    color: 'text.primary',
                                    mb: 2.5,
                                    pb: 1,
                                    borderBottom: '2px solid',
                                    borderBottomColor: 'divider',
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
                                        sx={{ color: 'text.secondary', lineHeight: 1.7, listStyleType: 'disc' }}
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
                            border: '1px solid',
                            borderColor: 'divider',
                            mb: 3,
                            backgroundColor: 'background.paper',
                        }}
                    >
                        <Typography
                            variant="subtitle1"
                            sx={{ fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'text.primary', mb: 2 }}
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
                                                color: checklistState[index] ? 'text.disabled' : 'text.secondary',
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
                            sx={{
                                p: 3,
                                borderRadius: '16px',
                                border: '1px solid',
                                borderColor: 'divider',
                                backgroundColor: 'background.paper',
                            }}
                        >
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    fontFamily: 'var(--font-heading)',
                                    fontWeight: 800,
                                    color: 'text.primary',
                                    mb: 2,
                                }}
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
                                                color: 'primary.main',
                                                fontWeight: 600,
                                                textDecoration: 'none',
                                                '&:hover': {
                                                    textDecoration: 'underline',
                                                },
                                            }}
                                        >
                                            <span style={{ wordBreak: 'break-all' }}>{ref.title}</span>
                                            <LaunchIcon sx={{ fontSize: '0.9rem', flexShrink: 0 }} />
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
                        startIcon={<ArrowBackIcon />}
                        sx={{
                            textTransform: 'none',
                            fontWeight: 700,
                            borderRadius: '10px',
                            borderColor: 'divider',
                            color: 'text.secondary',
                            px: 3,
                            py: 1.25,
                            '&:hover': {
                                borderColor: 'divider',
                                backgroundColor: 'action.hover',
                            },
                        }}
                    >
                        <Box sx={{ textAlign: 'left' }}>
                            <Typography
                                variant="caption"
                                sx={{ display: 'block', color: 'text.secondary', fontWeight: 600 }}
                            >
                                BÀI TRƯỚC: BÀI {prevLesson.lessonNumber.toString().padStart(2, '0')}
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
                        endIcon={<ArrowForwardIcon />}
                        sx={{
                            textTransform: 'none',
                            fontWeight: 700,
                            borderRadius: '10px',
                            backgroundColor: 'primary.main',
                            color: 'primary.contrastText',
                            px: 3,
                            py: 1.25,
                            '&:hover': {
                                backgroundColor: 'primary.dark',
                            },
                        }}
                    >
                        <Box sx={{ textAlign: 'right' }}>
                            <Typography
                                variant="caption"
                                sx={{ display: 'block', color: 'primary.contrastText', opacity: 0.8, fontWeight: 600 }}
                            >
                                BÀI TIẾP THEO: BÀI {nextLesson.lessonNumber.toString().padStart(2, '0')}
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

            {/* FAB & Drawer ghi chú cho mọi kích thước màn hình */}
            <>
                <Tooltip title="Sổ tay bài học" placement="left">
                    <Fab
                        color="primary"
                        aria-label="open-notes"
                        onClick={() => setIsNotesOpen(true)}
                        sx={{
                            position: 'fixed',
                            bottom: 24,
                            right: 24,
                            zIndex: 1200,
                            boxShadow: 4,
                            backgroundColor: 'primary.main',
                            color: 'primary.contrastText',
                            '&:hover': {
                                backgroundColor: 'primary.dark',
                            },
                        }}
                    >
                        <EditIcon />
                    </Fab>
                </Tooltip>
                <Drawer
                    anchor="right"
                    open={isNotesOpen}
                    onClose={() => setIsNotesOpen(false)}
                    slotProps={{
                        paper: {
                            sx: {
                                width: { xs: '100%', sm: 500 },
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                                boxSizing: 'border-box',
                                backgroundColor: 'background.paper',
                            },
                        },
                    }}
                >
                    <LessonNotesSection
                        key={lesson.id}
                        lessonId={lesson.id}
                        onMobileClose={() => setIsNotesOpen(false)}
                    />
                </Drawer>
            </>
        </Box>
    );
};
