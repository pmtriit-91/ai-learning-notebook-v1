import React, { useState } from 'react';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { ContentCopy, Check } from '@mui/icons-material';
import { useColorMode } from '../../theme/ColorModeContext';

interface PromptBlockProps {
    prompt: string;
}

export const PromptBlock: React.FC<PromptBlockProps> = ({ prompt }) => {
    const [copied, setCopied] = useState(false);
    const { mode } = useColorMode();

    const handleCopy = async () => {
        let success = false;
        try {
            if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
                await navigator.clipboard.writeText(prompt);
                success = true;
            }
        } catch (err) {
            console.warn('navigator.clipboard.writeText failed, trying fallback:', err);
        }

        if (!success) {
            try {
                const textArea = document.createElement('textarea');
                textArea.value = prompt;
                // Đặt các thuộc tính để textarea hoàn toàn vô hình và không gây giật scroll
                textArea.style.position = 'fixed';
                textArea.style.top = '0';
                textArea.style.left = '0';
                textArea.style.width = '2em';
                textArea.style.height = '2em';
                textArea.style.padding = '0';
                textArea.style.border = 'none';
                textArea.style.outline = 'none';
                textArea.style.boxShadow = 'none';
                textArea.style.background = 'transparent';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                success = document.execCommand('copy');
                document.body.removeChild(textArea);
            } catch (err) {
                console.error('Fallback copy method failed:', err);
            }
        }

        if (success) {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <Box
            sx={{
                position: 'relative',
                backgroundColor: 'background.default',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: '8px',
                padding: '16px',
                pt: '16px',
                pb: '16px',
                my: 2,
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    zIndex: 10,
                }}
            >
                <Tooltip title={copied ? 'Copied!' : 'Copy Prompt'} placement="top" arrow>
                    <IconButton
                        onClick={handleCopy}
                        size="small"
                        sx={{
                            backgroundColor: copied
                                ? mode === 'light'
                                    ? '#d1fae5'
                                    : 'rgba(16, 185, 129, 0.2)'
                                : 'background.paper',
                            color: copied ? (mode === 'light' ? '#059669' : '#34d399') : 'text.secondary',
                            border: '1px solid',
                            borderColor: copied
                                ? mode === 'light'
                                    ? '#a7f3d0'
                                    : 'rgba(16, 185, 129, 0.4)'
                                : 'divider',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                            '&:hover': {
                                backgroundColor: copied
                                    ? mode === 'light'
                                        ? '#a7f3d0'
                                        : 'rgba(16, 185, 129, 0.3)'
                                    : 'action.hover',
                                borderColor: copied ? (mode === 'light' ? '#34d399' : '#34d399') : 'text.primary',
                            },
                        }}
                    >
                        {copied ? <Check fontSize="small" /> : <ContentCopy fontSize="small" />}
                    </IconButton>
                </Tooltip>
            </Box>
            <Typography
                component="pre"
                sx={{
                    fontFamily:
                        "'JetBrains Mono', 'Fira Code', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    lineHeight: 1.6,
                    color: 'text.primary',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    margin: 0,
                    pr: '48px', // Chừa khoảng trống an toàn cho nút copy
                    maxHeight: '320px',
                    overflowY: 'auto',
                }}
            >
                <code>{prompt}</code>
            </Typography>
        </Box>
    );
};
