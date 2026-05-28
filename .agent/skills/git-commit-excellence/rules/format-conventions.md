---
title: Định dạng Commit Message
impact: CAO
impactDescription: giúp GitHub và VSCode hiển thị nội dung tối ưu, dễ đọc
tags: git, format, conventions
---

## Quy chuẩn cấu trúc định dạng

Một Commit Message chuyên nghiệp không được viết "dồn cục" vào một dòng. Nó cần có sự phân tách rõ ràng giữa "Tiêu đề" (Subject) và "Nội dung chi tiết" (Body).

### 1. Subject Line (Dòng tiêu đề)
- Giới hạn độ dài: Lý tưởng là dưới 50 ký tự, tối đa 72 ký tự.
- Viết in thường, bắt đầu bằng một Type (prefix).
- Không kết thúc bằng dấu chấm.

### 2. Blank Line (Dòng trống)
- Bắt buộc phải có 1 dòng trống giữa Subject và Body. Đây là chìa khóa để Git hiểu đâu là tiêu đề.

### 3. Body (Nội dung chi tiết)
- Sử dụng các gạch đầu dòng để liệt kê thay đổi.
- Mỗi dòng nội dung nên rõ ràng, súc tích.

---

**❌ Incorrect (Viết dồn cục, khó đọc):**

```text
refactor(ExampleModule): tối ưu hiệu năng và tái cấu trúc trang check bug tinh chỉnh UI/UX Context call API benefitTree ngay bên trong Context Provider để tái sử dụng
```

**✅ Correct (Phân tách rõ ràng, chuyên nghiệp):**

```text
refactor(ExampleModule): tối ưu kiến trúc & UI/UX Tab 1-2 (100%)

- Context: Gom benefitTree & rootHealthTerm xử lý tập trung
- Performance: Hoisting state RenderField lên ContentModal
- SelectionModal: Tái cấu trúc chọn biểu phí, thêm Search Clear
```

---

## Lợi ích khi tuân thủ
- Khi xem danh sách Commit trên GitHub, bạn chỉ thấy tiêu đề gọn gàng.
- Khi cần xem chi tiết, bạn mới nhấn vào để bung phần nội dung liệt kê ra.
