# Intelligence Preservation Contract — V6

V6 không được là bản “ngu hơn nhưng rẻ hơn”.
V6 phải là bản “thông minh đúng lúc, tiết kiệm đúng chỗ”.

## 1. Token saving is not intelligence reduction

Được tiết kiệm token bằng cách:
- không đọc file không liên quan,
- không load optional/vendor pack khi base skills đủ,
- không bật reviewer không cần thiết,
- không summarize dài dòng,
- không chạy full creative/security/research pipeline cho task nhỏ.

Không được tiết kiệm token bằng cách:
- bỏ qua phân tích cần thiết,
- bỏ qua rủi ro kiến trúc,
- bỏ qua quality gate,
- đưa giải pháp nông cho task phức tạp,
- né creative direction khi user yêu cầu “xịn hơn/cinematic/premium”,
- né security/debugging sâu khi task có rủi ro.

## 2. Quality floor

Mọi mode đều có quality floor.

### FAST
Nhanh nhưng không cẩu thả.
Phải giữ:
- đúng yêu cầu,
- không phá file khác,
- không làm vỡ TypeScript/build,
- không làm UI xấu đi.

### STANDARD
Cân bằng tốc độ và chất lượng.
Phải giữ:
- plan ngắn,
- đọc đúng skill liên quan,
- review-lite,
- safety phù hợp.

### DEEP
Dùng đầy đủ năng lực cần thiết.
Không được né:
- architecture reviewer,
- creative/motion reviewer,
- security/debugging workflow,
- optional skill nếu base skills không đủ và config cho phép.

## 3. Escalation is mandatory

Nếu đang ở FAST/STANDARD nhưng phát hiện task phức tạp hơn dự đoán, phải escalate.

Không được cố hoàn thành task phức tạp bằng mode thấp chỉ để tiết kiệm token.

## 4. De-escalation after deep work

Sau khi xử lý phần khó xong, follow-up nhỏ phải quay lại mode nhẹ hơn.
