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
import { BookOpen, Calendar, Trash2, PlusCircle, AlertCircle } from 'lucide-react';
import { lessons } from '../data/lessons';

interface LogEntry {
    id: string;
    date: string;
    lessonId: string;
    whatLearned: string;
    codebaseConnection: string;
    mistakesAndLessons: string;
    reusablePrompts: string;
}

export const LearningLog: React.FC = () => {
    const [logs, setLogs] = useState<LogEntry[]>(() => {
        const saved = localStorage.getItem('ai_learning_logs');
        return saved ? JSON.parse(saved) : [];
    });

    const [date, setDate] = useState(() => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    });
    const [lessonId, setLessonId] = useState('');
    const [whatLearned, setWhatLearned] = useState('');
    const [codebaseConnection, setCodebaseConnection] = useState('');
    const [mistakesAndLessons, setMistakesAndLessons] = useState('');
    const [reusablePrompts, setReusablePrompts] = useState('');

    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        localStorage.setItem('ai_learning_logs', JSON.stringify(logs));
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
        };

        setLogs((prev) => [newLog, ...prev]);

        // Reset Form
        setLessonId('');
        setWhatLearned('');
        setCodebaseConnection('');
        setMistakesAndLessons('');
        setReusablePrompts('');
        setShowForm(false);
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
            <Box
                sx={{
                    mb: 4,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    gap: 2,
                }}
            >
                <Box>
                    <Typography
                        variant="h3"
                        sx={{
                            fontFamily: 'var(--font-heading)',
                            fontWeight: 800,
                            color: '#0f172a',
                            mb: 1.5,
                            fontSize: { xs: '2rem', md: '2.5rem' },
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                        }}
                    >
                        <BookOpen className="w-8 h-8 text-blue-600" />
                        Nhật ký học tập
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#475569', fontSize: '1.05rem' }}>
                        Lưu giữ và hệ thống hóa kiến thức thực tế thu được trong quá trình code cùng AI.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    onClick={() => setShowForm(!showForm)}
                    startIcon={<PlusCircle className="w-4 h-4" />}
                    sx={{
                        textTransform: 'none',
                        fontWeight: 700,
                        borderRadius: '10px',
                        backgroundColor: '#2563eb',
                        py: 1.25,
                        px: 2.5,
                        '&:hover': {
                            backgroundColor: '#1d4ed8',
                        },
                    }}
                >
                    {showForm ? 'Đóng Form' : 'Viết nhật ký mới'}
                </Button>
            </Box>

            {/* Form viết nhật ký */}
            {showForm && (
                <Paper
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        p: 4,
                        borderRadius: '16px',
                        border: '1px solid #e2e8f0',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                        mb: 4,
                        backgroundColor: '#ffffff',
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{ fontFamily: 'var(--font-heading)', fontWeight: 800, color: '#0f172a', mb: 3 }}
                    >
                        Ghi chép hôm nay
                    </Typography>

                    <Grid container spacing={3}>
                        {/* Ngày học */}
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                type="date"
                                label="Ngày ghi chép"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                slotProps={{ inputLabel: { shrink: true } }}
                                required
                            />
                        </Grid>

                        {/* Bài học liên quan */}
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                select
                                label="Bài học liên quan"
                                value={lessonId}
                                onChange={(e) => setLessonId(e.target.value)}
                                required
                            >
                                {lessons.map((lesson) => (
                                    <MenuItem key={lesson.id} value={lesson.id}>
                                        Bài {lesson.lessonNumber}: {lesson.title}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        {/* Đã học được gì */}
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                label="Hôm nay tôi hiểu gì / Học được gì?"
                                placeholder="Tóm tắt ngắn gọn kiến thức cốt lõi hôm nay..."
                                value={whatLearned}
                                onChange={(e) => setWhatLearned(e.target.value)}
                                required
                            />
                        </Grid>

                        {/* Liên hệ codebase */}
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                multiline
                                rows={2}
                                label="Liên hệ thực tế codebase / workflow?"
                                placeholder="Áp dụng kiến thức này vào codebase hiện tại của bạn như thế nào?"
                                value={codebaseConnection}
                                onChange={(e) => setCodebaseConnection(e.target.value)}
                            />
                        </Grid>

                        {/* Sai lầm rút ra */}
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                multiline
                                rows={2}
                                label="Sai lầm cũ / Kinh nghiệm rút ra?"
                                placeholder="Có lỗi gì xảy ra hoặc bài học kinh nghiệm xương máu nào không?"
                                value={mistakesAndLessons}
                                onChange={(e) => setMistakesAndLessons(e.target.value)}
                            />
                        </Grid>

                        {/* Prompt hữu dụng */}
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                multiline
                                rows={2}
                                label="Prompt hữu dụng dùng lại được?"
                                placeholder="Dán câu prompt bạn đã viết thành công hôm nay..."
                                value={reusablePrompts}
                                onChange={(e) => setReusablePrompts(e.target.value)}
                                slotProps={{
                                    htmlInput: { style: { fontFamily: 'var(--font-mono)', fontSize: '0.875rem' } },
                                }}
                            />
                        </Grid>

                        {/* Nút bấm */}
                        <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 1 }}>
                            <Button
                                variant="outlined"
                                onClick={() => setShowForm(false)}
                                sx={{ textTransform: 'none', fontWeight: 700, borderRadius: '8px', px: 3, py: 1 }}
                            >
                                Hủy bỏ
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    textTransform: 'none',
                                    fontWeight: 700,
                                    borderRadius: '8px',
                                    backgroundColor: '#2563eb',
                                    px: 4,
                                    py: 1,
                                    '&:hover': { backgroundColor: '#1d4ed8' },
                                }}
                            >
                                Lưu Nhật Ký
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            )}

            {/* Hiển thị danh sách nhật ký đã lưu */}
            <Box>
                {logs.length === 0 ? (
                    <Paper
                        sx={{
                            p: 6,
                            textAlign: 'center',
                            borderRadius: '16px',
                            border: '1px solid #e2e8f0',
                            backgroundColor: '#ffffff',
                        }}
                    >
                        <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#475569', mb: 1 }}>
                            Chưa có nhật ký học tập nào
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#64748b', mb: 3 }}>
                            Hãy ghi lại những đúc kết của bạn sau mỗi bài học để hệ thống hóa kiến thức tốt hơn.
                        </Typography>
                        <Button
                            variant="outlined"
                            onClick={() => setShowForm(true)}
                            startIcon={<PlusCircle className="w-4 h-4" />}
                            sx={{ textTransform: 'none', fontWeight: 700, borderRadius: '8px' }}
                        >
                            Tạo ghi chép đầu tiên
                        </Button>
                    </Paper>
                ) : (
                    <Stack spacing={3}>
                        {logs.map((log) => (
                            <Card
                                key={log.id}
                                sx={{
                                    border: '1px solid #e2e8f0',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.01)',
                                    borderRadius: '14px',
                                    overflow: 'hidden',
                                    backgroundColor: '#ffffff',
                                }}
                            >
                                <Box
                                    sx={{
                                        px: 3,
                                        py: 2,
                                        backgroundColor: '#f8fafc',
                                        borderBottom: '1px solid #e2e8f0',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        flexWrap: 'wrap',
                                        gap: 2,
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                                        <Calendar className="w-4 h-4 text-slate-500" />
                                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#475569' }}>
                                            {log.date}
                                        </Typography>
                                        <Divider
                                            orientation="vertical"
                                            flexItem
                                            sx={{ mx: 0.5, display: { xs: 'none', sm: 'block' } }}
                                        />
                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                fontWeight: 800,
                                                color: '#2563eb',
                                                fontFamily: 'var(--font-heading)',
                                            }}
                                        >
                                            {getLessonTitle(log.lessonId)}
                                        </Typography>
                                    </Box>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleDelete(log.id)}
                                        sx={{
                                            color: '#94a3b8',
                                            '&:hover': {
                                                color: '#ef4444',
                                                backgroundColor: '#fef2f2',
                                            },
                                        }}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </IconButton>
                                </Box>
                                <CardContent sx={{ p: 3 }}>
                                    <Stack spacing={2.5}>
                                        {/* Học được gì */}
                                        <Box>
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    fontWeight: 800,
                                                    color: '#64748b',
                                                    display: 'block',
                                                    mb: 0.75,
                                                    letterSpacing: '0.5px',
                                                }}
                                            >
                                                HÔM NAY TÔI HIỂU GÌ / HỌC ĐƯỢC GÌ
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{ color: '#0f172a', lineHeight: 1.6, fontSize: '0.925rem' }}
                                            >
                                                {log.whatLearned}
                                            </Typography>
                                        </Box>

                                        {/* Liên hệ codebase */}
                                        {log.codebaseConnection && (
                                            <Box>
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        fontWeight: 800,
                                                        color: '#64748b',
                                                        display: 'block',
                                                        mb: 0.75,
                                                        letterSpacing: '0.5px',
                                                    }}
                                                >
                                                    LIÊN HỆ THỰC TẾ CODEBASE / WORKFLOW
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{ color: '#334155', lineHeight: 1.6, fontSize: '0.925rem' }}
                                                >
                                                    {log.codebaseConnection}
                                                </Typography>
                                            </Box>
                                        )}

                                        {/* Sai lầm / Bài học */}
                                        {log.mistakesAndLessons && (
                                            <Box>
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        fontWeight: 800,
                                                        color: '#64748b',
                                                        display: 'block',
                                                        mb: 0.75,
                                                        letterSpacing: '0.5px',
                                                    }}
                                                >
                                                    SAI LẦM CŨ / KINH NGHIỆM RÚT RA
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{ color: '#b45309', lineHeight: 1.6, fontSize: '0.925rem' }}
                                                >
                                                    {log.mistakesAndLessons}
                                                </Typography>
                                            </Box>
                                        )}

                                        {/* Prompt hữu dụng */}
                                        {log.reusablePrompts && (
                                            <Box>
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        fontWeight: 800,
                                                        color: '#64748b',
                                                        display: 'block',
                                                        mb: 0.75,
                                                        letterSpacing: '0.5px',
                                                    }}
                                                >
                                                    PROMPT HỮU DỤNG DÙNG LẠI ĐƯỢC
                                                </Typography>
                                                <Box
                                                    sx={{
                                                        backgroundColor: '#f8fafc',
                                                        border: '1px solid #e2e8f0',
                                                        borderRadius: '6px',
                                                        p: 1.5,
                                                        fontFamily: 'var(--font-mono)',
                                                        fontSize: '0.825rem',
                                                        color: '#0f172a',
                                                        whiteSpace: 'pre-wrap',
                                                    }}
                                                >
                                                    {log.reusablePrompts}
                                                </Box>
                                            </Box>
                                        )}
                                    </Stack>
                                </CardContent>
                            </Card>
                        ))}
                    </Stack>
                )}
            </Box>
        </Box>
    );
};
