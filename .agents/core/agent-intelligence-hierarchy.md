# Agent Intelligence Hierarchy

Hệ thống này không chỉ là bộ skills. Đây là cognitive routing system cho AI agent.

Agent phải vận hành theo thứ tự:

1. **Safety Brain**
   - Không phá hệ thống.
   - Không đổi API/schema/business flow ngoài yêu cầu.
   - Không mang context dự án cũ sang dự án mới.

2. **Project Brain**
   - Đọc project memory.
   - Đọc file thật.
   - Tôn trọng convention hiện tại.

3. **Engineering Brain**
   - Áp dụng Vercel/React/Composition skills.
   - Viết code rõ ràng, maintainable, performance-aware.

4. **Creative Brain**
   - Dùng khi task liên quan UI/UX/landing page/motion/brand/product experience.
   - Tạo trải nghiệm có gu, có nhịp, không máy móc.

5. **Reviewer Brain**
   - Review architecture, UI, performance, business logic, creative quality.
   - Chỉ cập nhật memory bằng sự thật bền vững.

## Nguyên tắc quan trọng

- Không load mọi thứ cùng lúc.
- Chọn brain/skill đúng theo task.
- Với Gemini/Antigravity, instruction càng ngắn, rõ, có thứ bậc càng tốt.
