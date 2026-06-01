import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Box, Divider, List, ListItem, ListItemButton, Grid, Chip } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import type { Phase, Lesson, LessonStatus } from '../../../types/lesson';
import { ProgressBar } from '../../../core/components/ProgressBar';
import { StatusBadge } from './StatusBadge';

interface RoadmapCardProps {
    phase: Phase;
    phaseLessons: Lesson[];
    getLessonStatus: (id: string) => LessonStatus;
    progressPercent: number;
    completedCount: number;
    isCurrent?: boolean;
}

export const RoadmapCard: React.FC<RoadmapCardProps> = ({
    phase,
    phaseLessons,
    getLessonStatus,
    progressPercent,
    completedCount,
    isCurrent = false,
}) => {
    const navigate = useNavigate();

    return (
        <Card
            sx={{
                border: isCurrent ? '2px solid' : '1px solid',
                borderColor: isCurrent ? 'primary.main' : 'divider',
                boxShadow: isCurrent ? '0 4px 20px rgba(59, 130, 246, 0.08)' : '0 1px 3px rgba(0,0,0,0.02)',
                borderRadius: '16px',
                mb: 4,
                overflow: 'hidden',
                backgroundColor: 'background.paper',
            }}
        >
            <Box
                sx={{
                    p: 3,
                    backgroundColor: isCurrent
                        ? (theme) => theme.palette.mode === 'light' ? 'rgba(29, 78, 216, 0.04)' : 'rgba(59, 130, 246, 0.08)'
                        : 'background.default',
                    borderBottom: '1px solid',
                    borderBottomColor: 'divider'
                }}
            >
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap', mb: 1 }}>
                            <Typography
                                variant="h5"
                                sx={{
                                    fontFamily: 'var(--font-heading)',
                                    fontWeight: 800,
                                    color: 'text.primary',
                                }}
                            >
                                {phase.title}
                            </Typography>
                            {isCurrent && (
                                <Chip
                                    label="Giai đoạn hiện tại"
                                    color="primary"
                                    size="small"
                                    sx={{ fontWeight: 800, borderRadius: '6px', height: 22, fontSize: '0.7rem' }}
                                />
                            )}
                        </Box>
                        <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                            {phase.description}
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Box
                            sx={{ backgroundColor: 'background.paper', p: 2, borderRadius: '10px', border: '1px solid', borderColor: 'divider' }}
                        >
                            <ProgressBar
                                value={progressPercent}
                                label={`Đã học: ${completedCount}/${phaseLessons.length} bài`}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            {/* Lesson List */}
            <CardContent sx={{ p: 0 }}>
                <List disablePadding>
                    {phaseLessons.map((lesson, idx) => {
                        const status = getLessonStatus(lesson.id);
                        return (
                            <React.Fragment key={lesson.id}>
                                {idx > 0 && <Divider />}
                                <ListItem disablePadding>
                                    <ListItemButton
                                        onClick={() => navigate(`/lesson/${lesson.id}`)}
                                        sx={{
                                            p: '16px 24px',
                                            transition: 'background-color 0.2s',
                                            backgroundColor: (theme) => {
                                                if (status === 'completed') {
                                                    return theme.palette.mode === 'light' ? 'rgba(16, 185, 129, 0.02)' : 'rgba(16, 185, 129, 0.04)';
                                                }
                                                if (status === 'learning') {
                                                    return theme.palette.mode === 'light' ? 'rgba(59, 130, 246, 0.03)' : 'rgba(59, 130, 246, 0.06)';
                                                }
                                                return 'transparent';
                                            },
                                            '&:hover': {
                                                backgroundColor: 'action.hover',
                                            },
                                        }}
                                    >
                                        <Grid container spacing={2} sx={{ width: '100%' }}>
                                            {/* Lesson Number */}
                                            <Grid size={{ xs: 12, sm: 2, md: 1.5 }}>
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        fontWeight: 800,
                                                        color: status === 'learning' ? 'primary.main' : 'text.secondary',
                                                        backgroundColor: status === 'learning' 
                                                            ? (theme) => theme.palette.mode === 'light' ? 'rgba(29, 78, 216, 0.08)' : 'rgba(59, 130, 246, 0.15)'
                                                            : 'action.selected',
                                                        px: 1.5,
                                                        py: 0.5,
                                                        borderRadius: '4px',
                                                        display: 'inline-block',
                                                    }}
                                                >
                                                    BÀI {lesson.lessonNumber.toString().padStart(2, '0')}
                                                </Typography>
                                            </Grid>

                                            {/* Lesson Title & Desc */}
                                            <Grid size={{ xs: 12, sm: 7, md: 8 }}>
                                                <Typography
                                                    variant="subtitle1"
                                                    sx={{
                                                        fontFamily: 'var(--font-heading)',
                                                        fontWeight: status === 'learning' ? 800 : status === 'completed' ? 600 : 700,
                                                        color: status === 'learning' ? 'primary.main' : 'text.primary',
                                                        mb: 0.5,
                                                    }}
                                                >
                                                    {lesson.title}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: status === 'completed' ? 'text.disabled' : 'text.secondary',
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 1,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden',
                                                    }}
                                                >
                                                    {lesson.description}
                                                </Typography>
                                            </Grid>

                                            {/* Status & Navigate Icon */}
                                            <Grid
                                                size={{ xs: 12, sm: 3, md: 2.5 }}
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: { xs: 'flex-start', sm: 'flex-end' },
                                                    alignItems: 'center',
                                                    gap: 2,
                                                }}
                                            >
                                                <StatusBadge status={status} />
                                                <ChevronRightIcon sx={{ color: 'text.disabled', display: { xs: 'none', sm: 'block' } }} />
                                            </Grid>
                                        </Grid>
                                    </ListItemButton>
                                </ListItem>
                            </React.Fragment>
                        );
                    })}
                </List>
            </CardContent>
        </Card>
    );
};
