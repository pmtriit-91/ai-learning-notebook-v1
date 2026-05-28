---
title: Kỹ thuật trình bày Body
impact: TRUNG
impactDescription: giúp truyền đạt thông tin chi tiết một cách ngăn nắp và chuyên nghiệp
tags: git, style, bullet-points
---

## Cách liệt kê nội dung hiệu quả

Khi một Commit bao gồm nhiều thay đổi nhỏ, việc liệt kê bằng dấu gạch ngang giúp người đọc nhanh chóng nắm bắt các ý chính.

### 1. Sử dụng dấu gạch ngang `-`
- Luôn bắt đầu mỗi ý bằng dấu `-` và một khoảng trắng.
- Mỗi ý nên tập trung vào một thay đổi cụ thể.

### 2. Nhóm nội dung theo Module (Scoping)
- Nếu thay đổi liên quan đến một Component hoặc Module cụ thể, hãy viết tên Module đó ngay đầu dòng.
- Ví dụ: `- SelectionModal: thêm nút Clear tìm kiếm`

### 3. Ưu tiên động từ mạnh
- Bắt đầu ý bằng các động từ như: `Gom`, `Tối ưu`, `Thêm`, `Sửa`, `Xóa`, `Nâng cấp`.

---

**✅ Ví dụ Trình bày chuẩn (Body):**

```text
- Context: Gom benefitTree & rootHealthTerm xử lý tập trung
- Performance: Hoisting state RenderField lên ContentModal, tối ưu re-render
- Diagram: Sửa lỗi hiển thị trùng lặp, nâng cấp Responsive cho Quyền lợi
```

### Tại sao lại làm vậy?
Khi bạn dùng format này, GitHub sẽ tự động thụt lề và hiển thị danh sách rất chuyên nghiệp. Nó giúp người quản lý dự án (bác) có thể "scan" nhanh qua các thay đổi mà không tốn công đọc từng đoạn văn dài.
