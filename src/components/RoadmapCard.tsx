import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Box, Divider, List, ListItem, ListItemButton, Grid } from '@mui/material';
import { ChevronRight } from 'lucide-react';
import type { Phase, Lesson, LessonStatus } from '../types/lesson';
import { ProgressBar } from './ProgressBar';
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
                border: '1px solid #e2e8f0',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                borderRadius: '16px',
                mb: 4,
                overflow: 'hidden',
                backgroundColor: '#ffffff',
            }}
        >
            {/* Header Phase */}
            <Box sx={{ p: 3, backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Typography
                            variant="h5"
                            sx={{
                                fontFamily: 'var(--font-heading)',
                                fontWeight: 800,
                                color: '#0f172a',
                                mb: 1,
                            }}
                        >
                            {phase.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.6 }}>
                            {phase.description}
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Box
                            sx={{ backgroundColor: '#ffffff', p: 2, borderRadius: '10px', border: '1px solid #e2e8f0' }}
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
                                                backgroundColor: '#f8fafc',
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
                                                        color: '#475569',
                                                        backgroundColor: '#f1f5f9',
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
                                                        color: '#0f172a',
                                                        mb: 0.5,
                                                    }}
                                                >
                                                    {lesson.title}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: '#64748b',
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
                                                <ChevronRight className="w-5 h-5 text-slate-400 hidden sm:block" />
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
