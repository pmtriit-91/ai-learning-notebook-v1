import React from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';

interface ProgressBarProps {
    value: number;
    label?: string;
    completedCount?: number;
    totalCount?: number;
    height?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ value, label, completedCount, totalCount, height = 10 }) => {
    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                {completedCount !== undefined && totalCount !== undefined ? (
                    <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                        Hoàn thành: <span style={{ fontWeight: 700, color: '#10b981' }}>{completedCount}</span>/
                        {totalCount} bài học
                    </Typography>
                ) : (
                    label && (
                        <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.secondary' }}>
                            {label}
                        </Typography>
                    )
                )}
                <Typography variant="body2" sx={{ fontWeight: 800, color: 'primary.main' }}>
                    {value}%
                </Typography>
            </Box>
            <LinearProgress
                variant="determinate"
                value={value}
                sx={{
                    height: height,
                    borderRadius: height / 2,
                    backgroundColor: 'divider',
                    '& .MuiLinearProgress-bar': {
                        borderRadius: height / 2,
                        background: 'linear-gradient(90deg, #3b82f6 0%, #10b981 100%)',
                    },
                }}
            />
        </Box>
    );
};
