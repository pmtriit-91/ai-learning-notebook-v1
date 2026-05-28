# API Contract Safety

Không tự ý thay đổi:

- response field name
- request payload shape
- enum values
- route path
- query params
- validation schema
- database field semantics

Nếu cần thay đổi contract:

- Nêu rõ breaking change.
- Kiểm tra nơi đang consume.
- Đề xuất migration/backward compatibility.
