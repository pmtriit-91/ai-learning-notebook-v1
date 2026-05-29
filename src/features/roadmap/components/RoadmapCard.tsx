import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Box, Divider, List, ListItem, ListItemButton, Grid } from '@mui/material';
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
}

export const RoadmapCard: React.FC<RoadmapCardProps> = ({
    phase,
    phaseLessons,
    getLessonStatus,
    progressPercent,
    completedCount,
}) => {
    const navigate = useNavigate();

    return (
        <Card
            sx={{
                border: '1px solid',
                borderColor: 'divider',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                borderRadius: '16px',
                mb: 4,
                overflow: 'hidden',
                backgroundColor: 'background.paper',
            }}
        >
            {/* Header Phase */}
            <Box sx={{ p: 3, backgroundColor: 'background.default', borderBottom: '1px solid', borderBottomColor: 'divider' }}>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Typography
                            variant="h5"
                            sx={{
                                fontFamily: 'var(--font-heading)',
                                fontWeight: 800,
                                color: 'text.primary',
                                mb: 1,
                            }}
                        >
                            {phase.title}
                        </Typography>
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
                                                        color: 'text.secondary',
                                                        backgroundColor: 'action.selected',
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
                                                        fontWeight: 700,
                                                        color: 'text.primary',
                                                        mb: 0.5,
                                                    }}
                                                >
                                                    {lesson.title}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: 'text.secondary',
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
