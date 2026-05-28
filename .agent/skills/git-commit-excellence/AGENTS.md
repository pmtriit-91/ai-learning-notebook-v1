# Professional Git Commit Excellence - Agent Guide

Bản tổng hợp các quy tắc để Agent viết Commit Message chuẩn 10đ cho dự án (Agent KHÔNG tự động commit trừ khi được người dùng yêu cầu trực tiếp).

## 1. Cấu trúc bắt buộc (Format)

Mọi commit phải tuân thủ cấu trúc 3 phần:

```text
<type>(<scope>): <subject>

- <bullet point 1>
- <bullet point 2>
```

- **Subject**: Dưới 72 ký tự, không bắt đầu bằng chữ viết hoa, không kết thúc bằng dấu chấm.
- **Blank Line**: Luôn có 1 dòng trống sau Subject.
- **Body**: Liệt kê chi tiết các thay đổi bằng dấu gạch ngang `-`.

## 2. Ngữ nghĩa của các loại tiền tố (Types)

- **feat**: Tính năng mới.
- **fix**: Vá lỗi.
- **refactor**: Tái cấu trúc (không đổi tính năng).
- **style**: Chỉnh sửa UI, CSS, format code.
- **docs**: Cập nhật tài liệu.
- **chore**: Cấu hình hệ thống, cài đặt library.

## 3. Phong cách trình bày (Style)

- Nhóm nội dung theo Module để người đọc dễ theo dõi.
- Sử dụng các động từ mạnh ở đầu dòng: Tối ưu, Gom, Sửa, Thêm, Nâng cấp...

## 4. Ví dụ mẫu chuẩn mực

```text
refactor(ExampleModule): tối ưu kiến trúc & UI/UX Tab 1-2 (100%)

- Context: Gom benefitTree & rootHealthTerm xử lý tập trung, loại bỏ call API thủ công
- Performance: Hoisting state RenderField lên ContentModal, tối ưu re-render
- SelectionModal: Tái cấu trúc chọn biểu phí, thêm Search Clear & chỉ báo Quyền lợi
- Diagram: Sửa lỗi hiển thị trùng lặp, nâng cấp Responsive cho Quyền lợi
```

---

_Agent: Luôn đọc file này trước khi thực thi lệnh commit khi được người dùng yêu cầu._
