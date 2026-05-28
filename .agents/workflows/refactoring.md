# Refactoring Workflow

Refactor chỉ được làm khi:

- User yêu cầu rõ, hoặc
- Cần thiết để hoàn thành task, và phạm vi được giới hạn.

Trước khi refactor:

- Xác định behavior hiện tại.
- Xác định public API/type/schema liên quan.
- Xác định test hoặc cách kiểm chứng.

Trong khi refactor:

- Không đổi business behavior.
- Không rename field/API không cần thiết.
- Không gộp module khác domain.
- Không phá UI/UX hiện có.
