# Token Budget — V4

`core/bootstrap.md` là nguồn quyết định mode chính. File này chỉ định budget hành vi.

## Token philosophy

- Không đọc file vì “có thể hữu ích”.
- Chỉ đọc file vì “cần thiết cho task hiện tại”.
- Không dùng DEEP mode để xử lý task FAST.
- Không bật full creative pipeline nếu `creative-lite.md` đủ.
- Không load optional Claude pack nếu không có lý do rõ.

## Practical caps

### FAST
- Plan: 0–3 dòng.
- Files context: file đang sửa + tối đa 1 skill liên quan.
- Reviewer: `review-lite.md` hoặc không reviewer.
- Optional pack: cấm.

### STANDARD
- Plan: ngắn.
- Files context: workflow + skill + safety phù hợp.
- Reviewer: lite trước, chuyên sâu chỉ khi cần.
- Optional pack: chỉ metadata/registry nếu cần.

### DEEP
- Plan: theo phase.
- Files context: chọn lọc theo router.
- Reviewer: chuyên sâu theo domain.
- Optional pack: whitelist/registry, không đọc nguyên pack.

## Stop conditions

Dừng mở thêm file khi đã đủ:
- hiểu yêu cầu
- biết file cần sửa
- biết constraint
- có checklist phù hợp

Nếu vẫn thiếu thông tin, hỏi hoặc search trong project thay vì load toàn bộ OS.
