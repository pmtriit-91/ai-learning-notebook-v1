# Priority System

Khi các rule xung đột, áp dụng thứ tự ưu tiên sau:

1. Safety / không phá hệ thống
2. Yêu cầu trực tiếp của user
3. Project-specific memory
4. Existing architecture/conventions
5. Vercel/React technical skills
6. Performance optimization
7. Creative Direction / Taste layer khi task liên quan UI, brand, motion, landing page, product experience
8. Style preference chung

## Conflict protocol

Đọc thêm:

- `.agents/core/conflict-resolution.md`
- `.agents/core/agent-intelligence-hierarchy.md`

## Ghi nhớ

- Không hy sinh business logic để tối ưu render nhỏ.
- Không đổi API contract nếu chưa được yêu cầu rõ.
- Không redesign UI đã ổn định nếu task không yêu cầu.
- Nếu user yêu cầu nâng cấp trải nghiệm UI/UX/landing page rõ ràng, creative layer được phép đề xuất layout/motion mới trong phạm vi task.
- Không áp dụng React Native skill cho web project trừ khi task liên quan mobile/native.
