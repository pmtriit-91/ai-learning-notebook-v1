import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    MenuItem,
    Paper,
    Card,
    CardContent,
    Stack,
    Divider,
    IconButton,
    Grid,
} from '@mui/material';
import { Delete, Edit, CalendarToday, AutoStories } from '@mui/icons-material';
import { lessons } from '../../../data/lessons';
import { PromptBlock } from '../../../core/components/PromptBlock';
import { logStorage } from '../services/logStorage';
import type { LogEntry } from '../services/logStorage';

export const LearningLog: React.FC = () => {
    const [logs, setLogs] = useState<LogEntry[]>(() => {
        return logStorage.getLogs();
    });

    const date = new Date().toISOString().split('T')[0];
    const [lessonId, setLessonId] = useState('');
    const [whatLearned, setWhatLearned] = useState('');
    const [codebaseConnection, setCodebaseConnection] = useState('');
    const [mistakesAndLessons, setMistakesAndLessons] = useState('');
    const [reusablePrompts, setReusablePrompts] = useState('');
    const [nextSteps, setNextSteps] = useState(''); // State cho bước đi tiếp theo

    useEffect(() => {
        logStorage.saveLogs(logs);
    }, [logs]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!lessonId || !whatLearned) {
            alert('Vui lòng chọn bài học liên quan và điền những gì bạn đã học được!');
            return;
        }

        const newLog: LogEntry = {
            id: Date.now().toString(),
            date,
            lessonId,
            whatLearned,
            codebaseConnection,
            mistakesAndLessons,
            reusablePrompts,
            nextSteps,
        };

        setLogs((prev) => [newLog, ...prev]);

        // Reset Form
        setLessonId('');
        setWhatLearned('');
        setCodebaseConnection('');
        setMistakesAndLessons('');
        setReusablePrompts('');
        setNextSteps('');
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa ghi chép này không?')) {
            setLogs((prev) => prev.filter((log) => log.id !== id));
        }
    };

    const getLessonTitle = (id: string) => {
        const lesson = lessons.find((l) => l.id === id);
        return lesson ? `Bài ${lesson.lessonNumber}: ${lesson.title}` : 'Chưa chọn bài học';
    };

    return (
        <Box>
            {/* Header Page */}
            <Box sx={{ mb: 4 }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 800,
                        color: 'text.primary',
                        mb: 1.5,
                        fontSize: { xs: '2rem', md: '2.2rem' },
                    }}
                >
                    Nhật ký học tập
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.05rem' }}>
                    Hệ thống hóa bài học rút ra, liên hệ thực tế dự án của bạn và lưu trữ các bài học đắt giá.
                </Typography>
            </Box>

            {/* Layout 2 cột dạng Grid */}
            <Grid container spacing={4}>
                {/* Cột trái: Form viết nhật ký */}
                <Grid size={{ xs: 12, md: 5 }}>
                    <Card
                        sx={{
                            border: '1px solid',
                            borderColor: 'divider',
                            boxShadow: 'none',
                            borderRadius: '16px',
                            backgroundColor: 'background.paper',
                        }}
                    >
                        <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                                <Edit sx={{ color: 'primary.main', fontSize: '1.25rem' }} />
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontFamily: 'var(--font-heading)',
                                        fontWeight: 800,
                                        color: 'text.primary',
                                    }}
                                >
                                    Viết nhật ký hôm nay
                                </Typography>
                            </Box>

                            <Stack component="form" onSubmit={handleSubmit} spacing={2.5}>
                                {/* Bài học liên quan */}
                                <TextField
                                    select
                                    label="Bài học liên quan"
                                    value={lessonId}
                                    onChange={(e) => setLessonId(e.target.value)}
                                    required
                                    fullWidth
                                >
                                    {lessons.map((lesson) => (
                                        <MenuItem key={lesson.id} value={lesson.id}>
                                            Bài {lesson.lessonNumber}: {lesson.title}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                {/* Hôm nay hiểu được gì */}
                                <TextField
                                    multiline
                                    rows={3}
                                    label="Hôm nay hiểu được gì? *"
                                    placeholder="Tóm tắt ngắn gọn kiến thức cốt lõi hôm nay..."
                                    value={whatLearned}
                                    onChange={(e) => setWhatLearned(e.target.value)}
                                    required
                                    fullWidth
                                />

                                {/* Liên hệ thực tế */}
                                <TextField
                                    multiline
                                    rows={2}
                                    label="Liên hệ gì với repo/workflow thực tế?"
                                    placeholder="Áp dụng kiến thức này vào codebase hiện tại của bạn như thế nào?"
                                    value={codebaseConnection}
                                    onChange={(e) => setCodebaseConnection(e.target.value)}
                                    fullWidth
                                />

                                {/* Sai lầm cũ */}
                                <TextField
                                    multiline
                                    rows={2}
                                    label="Sai lầm cũ là gì?"
                                    placeholder="Có lỗi gì xảy ra hoặc bài học kinh nghiệm xương máu nào không?"
                                    value={mistakesAndLessons}
                                    onChange={(e) => setMistakesAndLessons(e.target.value)}
                                    fullWidth
                                />

                                {/* Prompt dùng lại được */}
                                <TextField
                                    multiline
                                    rows={2}
                                    label="Prompt nào dùng lại được?"
                                    placeholder="Dán câu prompt bạn đã viết thành công hôm nay..."
                                    value={reusablePrompts}
                                    onChange={(e) => setReusablePrompts(e.target.value)}
                                    slotProps={{
                                        htmlInput: { style: { fontFamily: 'var(--font-mono)', fontSize: '0.875rem' } },
                                    }}
                                    fullWidth
                                />

                                {/* Hành động tiếp theo */}
                                <TextField
                                    multiline
                                    rows={2}
                                    label="Bài tiếp theo / Hành động tiếp theo là gì?"
                                    placeholder="Bạn định học tiếp bài nào hoặc làm gì tiếp theo?"
                                    value={nextSteps}
                                    onChange={(e) => setNextSteps(e.target.value)}
                                    fullWidth
                                />

                                {/* Nút lưu */}
                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    sx={{
                                        textTransform: 'none',
                                        fontWeight: 700,
                                        borderRadius: '10px',
                                        backgroundColor: 'primary.main',
                                        color: 'primary.contrastText',
                                        py: 1.5,
                                        fontSize: '0.95rem',
                                        '&:hover': { backgroundColor: 'primary.dark' },
                                    }}
                                >
                                    Lưu nhật ký
                                </Button>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Cột phải: Danh sách nhật ký đã ghi chép */}
                <Grid size={{ xs: 12, md: 7 }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontFamily: 'var(--font-heading)',
                            fontWeight: 800,
                            color: 'text.primary',
                            mb: 3,
                        }}
                    >
                        Nhật ký đã ghi chép ({logs.length})
                    </Typography>

                    {logs.length === 0 ? (
                        <Paper
                            elevation={0}
                            sx={{
                                p: 5,
                                textAlign: 'center',
                                border: '1px dashed',
                                borderColor: 'divider',
                                borderRadius: 3,
                                bgcolor: 'grey.50',
                                backgroundColor: 'background.paper',
                            }}
                        >
                            <AutoStories sx={{ fontSize: '3rem', color: 'text.disabled', mb: 2 }} />
                            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 700 }}>
                                Chưa có nhật ký nào được ghi lại
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Viết nhật ký học tập giúp bạn lưu trữ kinh nghiệm thực tế, đúc kết các prompt tốt và
                                tránh lặp lại các lỗi sai cũ khi code với AI.
                            </Typography>
                        </Paper>
                    ) : (
                        <Stack spacing={3}>
                            {logs.map((log) => (
                                <Card
                                    key={log.id}
                                    sx={{
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        boxShadow: 'none',
                                        borderRadius: '16px',
                                        backgroundColor: 'background.paper',
                                    }}
                                >
                                    {/* Header của từng ghi chép */}
                                    <Box
                                        sx={{
                                            px: 3,
                                            py: 2,
                                            borderBottom: '1px solid',
                                            borderColor: 'divider',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Box>
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    fontWeight: 800,
                                                    color: 'primary.main',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.5px',
                                                    display: 'block',
                                                    mb: 0.5,
                                                }}
                                            >
                                                LIÊN QUAN: {getLessonTitle(log.lessonId)}
                                            </Typography>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 0.5,
                                                    color: 'text.secondary',
                                                }}
                                            >
                                                <CalendarToday sx={{ fontSize: '0.85rem' }} />
                                                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                                                    Ngày ghi: {log.date.split('-').reverse().join('/')}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <IconButton
                                            size="small"
                                            onClick={() => handleDelete(log.id)}
                                            sx={{
                                                color: 'error.main',
                                                '&:hover': {
                                                    backgroundColor: 'error.light',
                                                    opacity: 0.15,
                                                },
                                            }}
                                        >
                                            <Delete sx={{ fontSize: '1.25rem' }} />
                                        </IconButton>
                                    </Box>

                                    <CardContent sx={{ p: 3 }}>
                                        <Stack spacing={2.5}>
                                            {/* Nội dung chính: Hôm nay hiểu được gì */}
                                            <Box>
                                                <Typography
                                                    variant="subtitle1"
                                                    sx={{
                                                        fontWeight: 800,
                                                        color: 'text.primary',
                                                        lineHeight: 1.5,
                                                    }}
                                                >
                                                    {log.whatLearned}
                                                </Typography>
                                            </Box>

                                            {(log.codebaseConnection || log.mistakesAndLessons) && (
                                                <>
                                                    <Divider />
                                                    <Grid container spacing={2}>
                                                        {/* Liên hệ thực tế */}
                                                        {log.codebaseConnection && (
                                                            <Grid size={{ xs: 12, sm: 6 }}>
                                                                <Typography
                                                                    variant="caption"
                                                                    sx={{
                                                                        fontWeight: 800,
                                                                        color: 'text.secondary',
                                                                        display: 'block',
                                                                        mb: 0.5,
                                                                    }}
                                                                >
                                                                    Liên hệ thực tế repo:
                                                                </Typography>
                                                                <Typography
                                                                    variant="body2"
                                                                    sx={{ color: 'text.primary', lineHeight: 1.6 }}
                                                                >
                                                                    {log.codebaseConnection}
                                                                </Typography>
                                                            </Grid>
                                                        )}

                                                        {/* Sai lầm cũ */}
                                                        {log.mistakesAndLessons && (
                                                            <Grid size={{ xs: 12, sm: 6 }}>
                                                                <Typography
                                                                    variant="caption"
                                                                    sx={{
                                                                        fontWeight: 800,
                                                                        color: 'text.secondary',
                                                                        display: 'block',
                                                                        mb: 0.5,
                                                                    }}
                                                                >
                                                                    Sai lầm rút kinh nghiệm:
                                                                </Typography>
                                                                <Typography
                                                                    variant="body2"
                                                                    sx={{ color: 'text.primary', lineHeight: 1.6 }}
                                                                >
                                                                    {log.mistakesAndLessons}
                                                                </Typography>
                                                            </Grid>
                                                        )}
                                                    </Grid>
                                                </>
                                            )}

                                            {/* Prompt dùng lại được */}
                                            {log.reusablePrompts && (
                                                <Box sx={{ mt: 1 }}>
                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            fontWeight: 800,
                                                            color: 'text.secondary',
                                                            display: 'block',
                                                            mb: 0.5,
                                                        }}
                                                    >
                                                        Prompt dùng lại được:
                                                    </Typography>
                                                    <PromptBlock prompt={log.reusablePrompts} />
                                                </Box>
                                            )}

                                            {/* Bước đi tiếp theo */}
                                            {log.nextSteps && (
                                                <Box sx={{ mt: 1 }}>
                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            fontWeight: 800,
                                                            color: 'text.secondary',
                                                            display: 'block',
                                                            mb: 0.5,
                                                        }}
                                                    >
                                                        Bước đi / Bài học tiếp theo:
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{ color: 'text.primary', fontWeight: 600 }}
                                                    >
                                                        {log.nextSteps}
                                                    </Typography>
                                                </Box>
                                            )}
                                        </Stack>
                                    </CardContent>
                                </Card>
                            ))}
                        </Stack>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};
