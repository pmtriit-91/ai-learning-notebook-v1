import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab, Paper, Stack } from '@mui/material';
import { Terminal, BugPlay, RefreshCw, Eye, ShieldAlert, FileText } from 'lucide-react';
import { PromptBlock } from '../components/PromptBlock';

interface PlaybookPrompt {
    title: string;
    description: string;
    prompt: string;
}

export const PromptPlaybook: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleTabChange = (_: any, newValue: number) => {
        setActiveTab(newValue);
    };

    const categories = [
        { label: 'Debug', icon: <BugPlay className="w-4 h-4" /> },
        { label: 'Refactor', icon: <RefreshCw className="w-4 h-4" /> },
        { label: 'Review', icon: <Eye className="w-4 h-4" /> },
        { label: 'Anti-hallucination', icon: <ShieldAlert className="w-4 h-4" /> },
        { label: 'Agent Report', icon: <FileText className="w-4 h-4" /> },
    ];

    const playbookData: Record<number, PlaybookPrompt[]> = {
        0: [
            {
                title: 'Prompt Sửa Lỗi Giao Diện / Logic Có Scope',
                description:
                    'Dùng khi gặp lỗi cụ thể trong file code. Giới hạn AI chỉ sửa đúng nguyên nhân gây bug, không lan man.',
                prompt: `Tôi đang gặp lỗi sau trong ứng dụng: [mô tả lỗi hoặc dán log lỗi ở đây]

Đây là mã nguồn của file liên quan:
\`\`\`[ngôn ngữ]
[dán code file liên quan vào đây]
\`\`\`

Yêu cầu:
1. Tìm nguyên nhân gốc rễ và giải thích ngắn gọn bằng 2 dòng.
2. Chỉ sửa đúng nguyên nhân trực tiếp gây lỗi. Không tự ý refactor phần code khác xung quanh.
3. Giữ nguyên cấu trúc API, props và data flow hiện tại.
4. Trả về phần code đã sửa kèm hướng dẫn cách kiểm tra lại.`,
            },
            {
                title: 'Prompt Debug Lỗi Stack Trace Phức Tạp',
                description: 'Dùng khi có log lỗi stack trace dài dằng dặc từ server hoặc browser console.',
                prompt: `Hệ thống gặp crash với lỗi stack trace như sau:
\`\`\`
[Dán stack trace lỗi ở đây]
\`\`\`

Dưới đây là mã nguồn của module nghi ngờ gây lỗi:
\`\`\`[ngôn ngữ]
[Dán code của module]
\`\`\`

Hãy phân tích stack trace để tìm ra đường đi của lỗi (error path), chỉ ra chính xác dòng code gây crash và đề xuất giải pháp vá lỗi an toàn.`,
            },
        ],
        1: [
            {
                title: 'Prompt Tách Component / Module',
                description: 'Dùng để hướng dẫn AI chia nhỏ một component khổng lồ thành các sub-components sạch sẽ.',
                prompt: `Tôi muốn refactor component sau để tăng độ đọc hiểu và bảo trì.
\`\`\`tsx
[Dán code component lớn ở đây]
\`\`\`

Yêu cầu:
1. Hãy phân tích và đề xuất phương án tách component này thành các component con nhỏ hơn.
2. Viết mã nguồn cho các component mới.
3. Đảm bảo truyền props chính xác và sử dụng TypeScript types đầy đủ.
4. Giữ nguyên hành vi nghiệp vụ (business logic) và các sự kiện (event handlers) hiện có.`,
            },
            {
                title: 'Prompt Tối Ưu Hiệu Năng (Performance Optimization)',
                description: 'Yêu cầu AI phân tích và áp dụng các kỹ thuật memoization hoặc tối ưu thuật toán.',
                prompt: `Đoạn code sau đang gặp vấn đề về hiệu năng (bị re-render nhiều lần hoặc xử lý mảng quá chậm):
\`\`\`[ngôn ngữ]
[Dán code cần tối ưu]
\`\`\`

Hãy áp dụng các kỹ thuật tối ưu (ví dụ trong React: useMemo, useCallback, React.memo, hoặc tối ưu vòng lặp). Giải thích rõ bạn đã cải thiện thuật toán ở điểm nào và độ phức tạp thời gian (time complexity) thay đổi ra sao.`,
            },
        ],
        2: [
            {
                title: 'Prompt Review Code Toàn Diện Trước PR',
                description: 'Đóng vai trò Tech Lead khó tính rà soát code smells, bảo mật và logic biên.',
                prompt: `Hãy đóng vai trò là Senior Code Reviewer / Tech Lead. Hãy review kỹ đoạn code tôi sắp pull request dưới đây:
\`\`\`[ngôn ngữ]
[Dán code cần review]
\`\`\`

Hãy đánh giá và chỉ ra:
1. Các bug tiềm ẩn (hidden bugs) hoặc nguy cơ crash ứng dụng.
2. Các lỗ hổng bảo mật (ví dụ: XSS, SQL Injection, lộ API key).
3. Đánh giá độ sạch của code (code smells, đặt tên biến, cấu trúc hàm).
4. Các edge cases (trường hợp biên) chưa được xử lý.
Trình bày dưới dạng danh mục gạch đầu dòng rõ ràng.`,
            },
        ],
        3: [
            {
                title: 'Prompt Ràng Buộc Thép - Chống Đoán Mò (Anti-hallucination)',
                description: 'Dùng để kiểm soát AI Agent khi tương tác với codebase lạ. Ép AI không được bịa hàm/API.',
                prompt: `Nhiệm vụ của bạn là: [mô tả nhiệm vụ ở đây]

YÊU CẦU BẮT BUỘC ĐỂ TRÁNH HALLUCINATION:
1. Không được đoán bừa tên hàm, tên component, hoặc API endpoints nếu chưa thấy chúng xuất hiện trong ngữ cảnh codebase được cung cấp.
2. Nếu thiếu thông tin hoặc codebase thiếu file liên quan, hãy dừng lại và báo rõ cho tôi biết bạn cần đọc thêm file nào hoặc cần thông tin gì.
3. Không tự ý viết thêm các hàm mock-up giả lập trừ khi tôi yêu cầu rõ.
4. Trả lời 'Tôi không rõ nguyên nhân' nếu dữ liệu hiện có không đủ để lập luận logic.`,
            },
        ],
        4: [
            {
                title: 'Prompt Yêu Cầu Agent Báo Cáo Thay Đổi (Git Report)',
                description:
                    'Bắt Agent viết báo cáo chi tiết sau khi hoàn thành task để con người dễ kiểm tra và viết commit.',
                prompt: `Sau khi thực hiện các thay đổi code thành công, hãy viết một báo cáo tóm tắt theo cấu trúc sau:

### BÁO CÁO THAY ĐỔI
1. **Nguyên nhân gây lỗi**: (Mô tả ngắn gọn lý do xảy ra bug)
2. **Danh sách file đã chỉnh sửa**:
   - \`tên_file_1.ts\`: Giải thích ngắn gọn đã thay đổi logic gì
   - \`tên_file_2.tsx\`: Giải thích ngắn gọn
3. **Cách thức verify**: (Các bước cụ thể để lập trình viên kiểm tra lại code trên giao diện hoặc terminal)
4. **Gợi ý Git Commit Message**: (Viết theo chuẩn Semantic Commits, ví dụ: 'fix(sidebar): resolve double input rendering issue')`,
            },
        ],
    };

    return (
        <Box>
            {/* Header Page */}
            <Box sx={{ mb: 4 }}>
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
                    <Terminal className="w-8 h-8 text-blue-600" />
                    Prompt Playbook
                </Typography>
                <Typography variant="body1" sx={{ color: '#475569', fontSize: '1.05rem' }}>
                    Bộ sưu tập các câu lệnh Prompt chất lượng cao được thiết kế sẵn để làm việc với AI một cách có kiểm
                    soát và đạt hiệu suất tối ưu.
                </Typography>
            </Box>

            {/* Tabs Filter */}
            <Paper
                sx={{
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.01)',
                    borderRadius: '12px',
                    mb: 4,
                    overflow: 'hidden',
                    backgroundColor: '#ffffff',
                }}
            >
                <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                        borderBottom: '1px solid #e2e8f0',
                        backgroundColor: '#f8fafc',
                        '& .MuiTabs-indicator': {
                            backgroundColor: '#2563eb',
                            height: 3,
                        },
                        '& .MuiTab-root': {
                            textTransform: 'none',
                            fontWeight: 700,
                            fontSize: '0.95rem',
                            color: '#64748b',
                            py: 2,
                            px: 3,
                            minHeight: 52,
                            '&.Mui-selected': {
                                color: '#2563eb',
                            },
                        },
                    }}
                >
                    {categories.map((cat, idx) => (
                        <Tab
                            key={cat.label}
                            icon={cat.icon}
                            iconPosition="start"
                            label={cat.label}
                            id={`playbook-tab-${idx}`}
                        />
                    ))}
                </Tabs>

                {/* Tab Panel Content */}
                <Box sx={{ p: { xs: 2, md: 4 } }}>
                    <Stack spacing={4}>
                        {playbookData[activeTab]?.map((item, idx) => (
                            <Box
                                key={idx}
                                sx={{
                                    p: 3,
                                    border: '1px solid #f1f5f9',
                                    borderRadius: '10px',
                                    backgroundColor: '#ffffff',
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontFamily: 'var(--font-heading)',
                                        fontWeight: 800,
                                        color: '#0f172a',
                                        mb: 1,
                                        fontSize: '1.1rem',
                                    }}
                                >
                                    {item.title}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#475569', mb: 2, lineHeight: 1.5 }}>
                                    {item.description}
                                </Typography>
                                <PromptBlock prompt={item.prompt} />
                            </Box>
                        ))}
                    </Stack>
                </Box>
            </Paper>
        </Box>
    );
};
