import React from 'react';
import { Box, Typography } from '@mui/material';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import { phases } from '../../../data/roadmap';
import { lessons } from '../../../data/lessons';
import { RoadmapCard } from '../components/RoadmapCard';

import { useLessonProgress } from '../hooks/useLessonProgress';

export const Roadmap: React.FC = () => {
    const progress = useLessonProgress();
    const { getLessonStatus, getPhaseProgress, getPhaseCompletedCount } = progress;

    // Tìm bài học tiếp theo cần học để xác định Phase hiện tại
    const currentLesson =
        lessons.find((l) => getLessonStatus(l.id) === 'learning') ||
        lessons.find((l) => getLessonStatus(l.id) === 'not-started') ||
        lessons[lessons.length - 1];
    const currentPhaseId = currentLesson?.phaseId;

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
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                    }}
                >
                    <Box sx={{ color: 'primary.main', display: 'flex' }}>
                        <AltRouteIcon sx={{ fontSize: '2.5rem' }} />
                    </Box>
                    Lộ trình học AI
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.05rem' }}>
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
                    const isCurrent = phase.id === currentPhaseId;

                    return (
                        <RoadmapCard
                            key={phase.id}
                            phase={phase}
                            phaseLessons={phaseLessons}
                            getLessonStatus={getLessonStatus}
                            progressPercent={progressPercent}
                            completedCount={completedCount}
                            isCurrent={isCurrent}
                        />
                    );
                })}
            </Box>
        </Box>
    );
};
