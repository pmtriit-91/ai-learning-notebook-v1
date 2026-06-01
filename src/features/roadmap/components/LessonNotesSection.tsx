import React, { useState, useEffect, useRef } from 'react';
import { Paper, Typography, TextField, Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { CheckCircleOutlined, Autorenew } from '@mui/icons-material';
import { useLessonProgress } from '../hooks/useLessonProgress';

interface LessonNotesSectionProps {
    lessonId: string;
    onMobileClose?: () => void;
}

export const LessonNotesSection: React.FC<LessonNotesSectionProps> = ({ lessonId, onMobileClose }) => {
    const { getLessonNote, updateLessonNote } = useLessonProgress();
    const [localNote, setLocalNote] = useState(() => getLessonNote(lessonId));
    const [saveStatus, setSaveStatus] = useState<'idle' | 'typing' | 'saving' | 'saved'>('idle');
    const [lastSaved, setLastSaved] = useState<string>('');
    const isInitialMount = useRef(true);

    // Cơ chế Debounce tự động lưu sau 1.5 giây
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        setSaveStatus('typing');
        const delayDebounceFn = setTimeout(() => {
            setSaveStatus('saving');
            try {
                updateLessonNote(lessonId, localNote);
                setSaveStatus('saved');
                const now = new Date();
                const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                setLastSaved(timeStr);
            } catch (err) {
                console.error('Failed to auto-save note:', err);
                setSaveStatus('idle');
            }
        }, 1500);

        return () => clearTimeout(delayDebounceFn);
    }, [localNote, lessonId, updateLessonNote]);

    return (
        <Paper
            sx={{
                p: { xs: 2.5, md: 3 },
                borderRadius: '16px',
                border: '1px solid',
                borderColor: 'divider',
                backgroundColor: 'background.paper',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                boxSizing: 'border-box',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 1.5,
                    pb: 1,
                    borderBottom: '2px solid',
                    borderBottomColor: 'divider',
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 800,
                        color: 'text.primary',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        fontSize: { xs: '1rem', md: '1.05rem' },
                    }}
                >
                    <EditIcon sx={{ color: 'primary.main', fontSize: '1.2rem' }} />
                    Sổ tay bài học
                </Typography>

                {/* Trạng thái lưu trữ trực quan & Nút Close */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        {saveStatus === 'typing' && (
                            <Typography variant="caption" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                                Đang soạn...
                            </Typography>
                        )}
                        {saveStatus === 'saving' && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <Autorenew className="animate-spin" sx={{ fontSize: '0.9rem', color: 'warning.main' }} />
                                <Typography variant="caption" sx={{ color: 'warning.main', fontWeight: 600 }}>
                                    Đang lưu...
                                </Typography>
                            </Box>
                        )}
                        {saveStatus === 'saved' && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <CheckCircleOutlined sx={{ fontSize: '0.9rem', color: 'success.main' }} />
                                <Typography variant="caption" sx={{ color: 'success.main', fontWeight: 600 }}>
                                    {lastSaved ? `Đã lưu cục bộ lúc ${lastSaved}` : 'Đã lưu cục bộ'}
                                </Typography>
                            </Box>
                        )}
                    </Box>
                    {onMobileClose && (
                        <IconButton
                            size="small"
                            aria-label="close-notes"
                            onClick={onMobileClose}
                            sx={{
                                color: 'text.secondary',
                                '&:hover': { color: 'text.primary', backgroundColor: 'action.hover' },
                            }}
                        >
                            <CloseIcon sx={{ fontSize: '1.1rem' }} />
                        </IconButton>
                    )}
                </Box>
            </Box>

            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, fontSize: '0.8rem', lineHeight: 1.4 }}>
                Ghi chép lại đúc kết của riêng bạn, dữ liệu sẽ tự động lưu trữ ngoại tuyến tại trình duyệt.
            </Typography>

            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minHeight: 220 }}>
                <TextField
                    fullWidth
                    multiline
                    value={localNote}
                    onChange={(e) => setLocalNote(e.target.value)}
                    placeholder="Gõ ghi chú bài học tại đây (Hỗ trợ định dạng văn bản thô)..."
                    slotProps={{
                        input: {
                            sx: {
                                height: '100%',
                                alignItems: 'flex-start',
                                '& textarea': {
                                    height: '100% !important',
                                    overflowY: 'auto !important',
                                }
                            }
                        }
                    }}
                    sx={{
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: 'background.default',
                            fontFamily: 'inherit',
                            fontSize: '0.9rem',
                            borderRadius: '10px',
                            lineHeight: 1.6,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                        },
                        '& .MuiInputBase-root': {
                            flexGrow: 1,
                        }
                    }}
                />
            </Box>
        </Paper>
    );
};

