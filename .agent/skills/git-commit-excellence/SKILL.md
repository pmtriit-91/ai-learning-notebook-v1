---
name: git-commit-excellence
description:
  Quy chuẩn viết Git Commit Message chuyên nghiệp, chuẩn ngữ nghĩa (Semantic Commits). 
  Sử dụng khi cần bàn giao code, báo cáo tiến độ thay đổi, hoặc duy trì lịch sử dự án 
  sạch đẹp, dễ tra cứu. Giúp GitHub và VSCode hiển thị nội dung tối ưu nhất.
license: MIT
metadata:
  author: ExampleProject-Agent
  version: '1.0.0'
---

# Professional Git Commit Excellence

Bộ quy chuẩn giúp xây dựng lịch sử dự án "sạch bóng quân thù", chuyên nghiệp và dễ hiểu cho cả con người và AI Agent. Chúng ta ưu tiên sự rõ ràng, tính nhất quán và khả năng hiển thị tối ưu trên các công cụ Git (GitHub, VSCode, GitLens).

## Khi nào áp dụng

Tham chiếu các quy tắc này trước mỗi khi thực hiện lệnh `git commit` hoặc khi được yêu cầu báo cáo thay đổi:

- Trước khi kết thúc một đầu việc (Task)
- Khi thực hiện Refactor mã nguồn
- Khi bàn giao tính năng mới hoặc vá lỗi
- Khi dọn dẹp code hoặc cập nhật tài liệu

## Danh mục quy tắc theo ưu tiên

| Ưu tiên | Danh mục                | Tác động | Prefix          |
| -------- | ----------------------- | ------ | --------------- |
| 1        | Cấu trúc định dạng      | CAO    | `format-`       |
| 2        | Ngữ nghĩa loại thay đổi | CAO    | `type-`         |
| 3        | Trình bày nôi dung      | TRUNG  | `style-`        |

## Tra cứu nhanh

### 1. Cấu trúc định dạng (CAO)

- `format-conventions` - Chia Subject và Body bằng dòng trống, giới hạn độ dài dòng đầu.

### 2. Ngữ nghĩa (CAO)

- `type-semantics` - Sử dụng đúng các loại tiền tố: `feat`, `fix`, `refactor`, `style`, `chore`, `docs`.

### 3. Trình bày nội dung (TRUNG)

- `bullet-point-logic` - Sử dụng dấu gạch ngang và nhóm nội dung logic để GitHub render đẹp nhất.

## Hướng dẫn sử dụng

Đọc chi tiết từng file quy tắc để nắm vững ví dụ Đúng/Sai:

```text
rules/format-conventions.md
rules/type-semantics.md
rules/bullet-point-logic.md
```

Tất cả các quy tắc được tổng hợp đầy đủ tại: `AGENTS.md`
