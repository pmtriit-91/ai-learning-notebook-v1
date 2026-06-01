export interface PromptAnalysisResult {
    score: number;
    foundComponents: string[];
    missingComponents: string[];
    feedback: string;
}

/**
 * Phân tích chất lượng prompt offline bằng phương pháp heuristic từ khóa (Regex)
 * Kiểm tra 5 thành phần cốt lõi: Context, Task, Constraint, Output Format, Verify.
 */
export const analyzePromptQuality = (input: string): PromptAnalysisResult => {
    const text = input.trim();
    
    // Trường hợp prompt quá ngắn
    if (text.length < 20) {
        return {
            score: Math.min(30, Math.max(10, text.length)),
            foundComponents: [],
            missingComponents: ["Context", "Task", "Constraint", "Output Format", "Verify"],
            feedback: "Prompt của bạn quá ngắn (dưới 20 ký tự). Hãy bổ sung thêm bối cảnh chi tiết, nhiệm vụ rõ ràng và các ràng buộc cụ thể để AI có thể hỗ trợ bạn tốt nhất."
        };
    }

    const components = [
        {
            name: "Context",
            label: "Bối cảnh (Context)",
            regex: /bối cảnh|context|tình huống|dự án|file|code|chức năng|lỗi|sự cố|triệu chứng|hành vi|tệp|đang làm|dữ liệu/i,
            example: "Ví dụ: 'Dự án đang dùng Vite, gặp lỗi render đúp ở component X...'"
        },
        {
            name: "Task",
            label: "Nhiệm vụ (Task)",
            regex: /hãy|giúp|sửa|viết|tạo|lập trình|fix|implement|debug|giải thích|xây dựng|tối ưu|tìm nguyên nhân/i,
            example: "Ví dụ: 'Hãy sửa lỗi render đúp này...'"
        },
        {
            name: "Constraint",
            label: "Ràng buộc (Constraint)",
            regex: /yêu cầu|ràng buộc|chỉ|không được|không|bắt buộc|constraint|yêu cầu:|chú ý|lưu ý|giới hạn/i,
            example: "Ví dụ: 'Không được refactor lan man, chỉ tập trung sửa lỗi trực tiếp...'"
        },
        {
            name: "Output Format",
            label: "Định dạng đầu ra (Output Format)",
            regex: /báo cáo|report|định dạng|output|kết quả|trả về|hiển thị|format|dưới dạng|mẫu:|cấu trúc:/i,
            example: "Ví dụ: 'Báo cáo sau khi sửa gồm: 1. File đã sửa, 2. Nguyên nhân...'"
        },
        {
            name: "Verify",
            label: "Xác minh (Verify)",
            regex: /xác minh|verify|kiểm tra|test|chạy|chạy thử|xem xét lại|kiểm chứng/i,
            example: "Ví dụ: 'Đưa ra kịch bản chạy thử để kiểm chứng...'"
        }
    ];

    const foundComponents: string[] = [];
    const missingComponents: string[] = [];
    let baseScore = 0;

    components.forEach((comp) => {
        if (comp.regex.test(text)) {
            foundComponents.push(comp.label);
            baseScore += 18; // 5 thành phần * 18 = 90 điểm tối đa cho phần cơ bản
        } else {
            missingComponents.push(comp.label);
        }
    });

    // Cộng điểm thưởng dựa trên độ dài để khuyến khích prompt chi tiết
    let lengthBonus = 0;
    if (text.length >= 150) {
        lengthBonus = 10;
    } else if (text.length >= 50) {
        lengthBonus = 5;
    }

    const score = Math.min(100, baseScore + lengthBonus);

    // Xây dựng feedback gợi ý học tập
    let feedback: string;
    if (score >= 90) {
        feedback = `Prompt xuất sắc (${score}/100)! Bạn đã bao quát toàn bộ các thành phần cốt lõi của một prompt kỹ thuật chất lượng cao (Context, Task, Constraint, Output Format, Verify). Prompt này giúp AI hoạt động có kiểm soát và chính xác nhất.`;
    } else if (score >= 70) {
        feedback = `Prompt tốt (${score}/100). Bạn đã xác định được: ${foundComponents.join(", ")}. `;
        if (missingComponents.length > 0) {
            feedback += `Để nâng cấp hơn, hãy bổ sung thêm thành phần: ${missingComponents.join(", ")}. `;
            
            // Lấy ví dụ gợi ý cho thành phần thiếu đầu tiên
            const firstMissing = components.find(c => missingComponents[0].includes(c.name));
            if (firstMissing) {
                feedback += `\n${firstMissing.example}`;
            }
        }
    } else {
        feedback = `Prompt cơ bản (${score}/100). Bạn đã có: ${foundComponents.length > 0 ? foundComponents.join(", ") : "chưa phát hiện rõ thành phần nào"}. Prompt kỹ thuật hiệu quả cần cung cấp đủ bối cảnh (Context) và các giới hạn (Constraint). `;
        if (missingComponents.length > 0) {
            feedback += `Hãy thử bổ sung thêm: ${missingComponents.join(", ")} để tăng tính thực tế.`;
        }
    }

    return {
        score,
        foundComponents,
        missingComponents,
        feedback
    };
};
