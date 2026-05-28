# Executor Workflow

Khi thực thi:

- Sửa đúng phạm vi đã xác định.
- Follow pattern hiện có trước khi tạo pattern mới.
- Không đổi cấu trúc lớn nếu task không yêu cầu.
- Không tự ý cleanup unrelated code.
- Không thêm abstraction chỉ vì “đẹp hơn”.
- Ưu tiên code rõ ràng hơn clever code.

Sau khi sửa:

- Kiểm tra import/export.
- Kiểm tra type safety.
- Kiểm tra UI không lệch pattern.
- Kiểm tra logic không đổi ngoài yêu cầu.
