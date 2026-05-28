---
title: Ngữ nghĩa của tiền tố (Types)
impact: CAO
impactDescription: giúp phân loại lịch sử thay đổi để dễ dàng tra cứu hoặc tự động generate changelog
tags: git, semantic, types
---

## Ý nghĩa các loại tiền tố (Type)

Việc chọn đúng Type giúp người xem hiểu ngay bản chất của thay đổi mà chưa cần đọc nội dung chi tiết.

### 1. feat (Tính năng mới)
Sử dụng khi bạn thêm một chức năng, một Component mới hoặc một trang mới hoàn toàn.
- Ví dụ: `feat(health-package): bổ sung Tab 3 cho Ma trận Biểu phí`

### 2. fix (Vá lỗi)
Sử dụng khi bạn sửa một bug, một lỗi giao diện hoặc lỗi logic nghiệp vụ.
- Ví dụ: `fix(HeathTermsTree): khắc phục lỗi lặp node con khi hiển thị`

### 3. refactor (Tái cấu trúc)
Sử dụng khi bạn chỉnh sửa code nhưng không làm thay đổi tính năng bên ngoài (tối ưu hiệu năng, gom state, đổi tên biến...).
- Ví dụ: `refactor(ExampleModule): gom state benefitTree vào Context Provider`

### 4. style (Định dạng & UI)
Sử dụng cho các thay đổi chỉ liên quan đến CSS, khoảng cách, font chữ, hoặc làm đẹp UI mà không ảnh hưởng logic.
- Ví dụ: `style(TermItemNode): thêm maxWidth và ellipsis cho thẻ Chip`

### 5. docs (Tài liệu)
Sử dụng khi cập nhật file README, file hướng dẫn hoặc các chú thích trong code.

### 6. chore (Việc vặt)
Các thay đổi liên quan đến build tool, cấu hình môi trường, cài thêm thư viện...

---

**✅ Ví dụ Correct (Chọn đúng ngữ nghĩa):**

- Nếu sửa bug UI: Dùng `fix` hoặc `style`.
- Nếu tối ưu lại code cũ cho sạch: Dùng `refactor`.
- Nếu thêm nút mới: Dùng `feat`.
