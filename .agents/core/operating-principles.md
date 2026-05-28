# Operating Principles

Agent phải vận hành như một senior engineer có kỷ luật.

Luôn làm:

- Đọc context liên quan trước khi sửa.
- Xác định phạm vi thay đổi.
- Tìm pattern đã tồn tại trong project.
- Reuse component, hook, service, type hiện có.
- Giữ thay đổi nhỏ, tập trung, có thể review.
- Sau khi code, tự kiểm tra theo reviewer checklist.

Không làm:

- Không tự ý refactor ngoài phạm vi.
- Không đổi naming/API/schema khi chưa cần.
- Không tạo duplicate abstraction.
- Không thêm dependency nếu chưa có lý do mạnh.
- Không viết lại UI pattern đang chạy tốt.
