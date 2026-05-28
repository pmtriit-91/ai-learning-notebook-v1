import React from 'react';
import { Box, Typography } from '@mui/material';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import type { UseLessonProgressType } from '../hooks/useLessonProgress';
import { phases } from '../data/roadmap';
import { lessons } from '../data/lessons';
import { RoadmapCard } from '../components/RoadmapCard';

interface RoadmapProps {
    progress: UseLessonProgressType;
}

export const Roadmap: React.FC<RoadmapProps> = ({ progress }) => {
    const { getLessonStatus, getPhaseProgress, getPhaseCompletedCount } = progress;

    return (
        <Box>
            {/* Header Page */}
            <Box sx={{ mb: 4 }}>
                <Typography
                    variant="h3"
                    sx={{
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 800,
                        color: 'text.primary',
                        mb: 1.5,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.25,
                    }}
                >
                    <Box sx={{ color: 'primary.main', display: 'flex' }}>
                        <AltRouteIcon sx={{ fontSize: '2.5rem' }} />
                    </Box>
                    Lộ trình học AI
                </Typography>
                <Typography variant="body1" sx={{ color: '#475569', fontSize: '1.05rem' }}>
                    Lộ trình bài bản gồm 5 Phase với 33 bài học được thiết kế để dẫn dắt bạn trở thành AI Product
                    Builder.
                </Typography>
            </Box>

            {/* List of Phase Cards */}
            <Box>
                {phases.map((phase) => {
                    // Lọc ra các bài học thuộc Phase này
                    const phaseLessons = lessons.filter((l) => phase.lessonIds.includes(l.id));
                    const progressPercent = getPhaseProgress(phase.lessonIds);
                    const completedCount = getPhaseCompletedCount(phase.lessonIds);

                    return (
                        <RoadmapCard
                            key={phase.id}
                            phase={phase}
                            phaseLessons={phaseLessons}
                            getLessonStatus={getLessonStatus}
                            progressPercent={progressPercent}
                            completedCount={completedCount}
                        />
                    );
                })}
            </Box>
        </Box>
    );
};
