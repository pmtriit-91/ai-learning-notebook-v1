# Conflict Resolution Protocol

Mục tiêu: giúp agent xử lý xung đột giữa Vercel skills, Claude Code AI OS optional pack, project memory, và yêu cầu user.

## Thứ tự nguồn sự thật

1. Yêu cầu trực tiếp của user trong task hiện tại.
2. File thật trong repository hiện tại.
3. Project-specific memory trong `.agents/project/` hoặc `skills/project-memory`.
4. Existing architecture/conventions của project.
5. Vercel React / Composition skills cho frontend React/Vite/Next.
6. Claude Code AI OS optional pack cho planning, review, security, debugging, testing, research.
7. Creative Direction layer cho các task UI/brand/motion/experience.
8. General taste / preference nếu không mâu thuẫn với các tầng trên.

## Quy tắc frontend

Nếu có xung đột về React/frontend implementation:

- Ưu tiên Vercel React Best Practices.
- Dùng Claude Code AI OS như nguồn tham khảo workflow/review, không override pattern frontend.
- Dùng project code hiện tại làm chuẩn cuối cùng.

## Quy tắc creative/UI

Nếu user yêu cầu nâng cấp trải nghiệm thị giác, cinematic, motion, 3D, landing page, brand experience:

- Kích hoạt Creative Direction layer.
- Không được để safety/engineering rules làm UI trở nên quá máy móc.
- Safety vẫn chặn phá hệ thống, nhưng creative layer được phép đề xuất bố cục mới nếu task yêu cầu redesign/upgrade rõ ràng.

## Khi không chắc

Agent phải nói rõ assumption và đề xuất phạm vi thay đổi nhỏ trước khi sửa lớn.
