# Motion Grammar

Dùng cho motion design, scroll storytelling, 3D-like UI, GSAP, Framer Motion, React Three Fiber.

## Motion philosophy

Motion phải có lý do:

- Dẫn mắt.
- Tạo chiều sâu.
- Cho user cảm giác đang khám phá.
- Giải thích quan hệ giữa các phần.
- Tạo nhịp cảm xúc.

## Không dùng motion kiểu rẻ tiền

Tránh:

- Fade-up lặp lại quá nhiều.
- Scale/bounce vô nghĩa.
- Neon flicker quá tay.
- Animation chạy cùng lúc không có thứ tự.
- Hover glow quá mạnh.

## Interaction choreography

Khi click hotspot:

1. Hotspot glow nhẹ.
2. Camera/perspective di chuyển.
3. Background dim hoặc blur nhẹ.
4. Detail/part highlight.
5. Panel xuất hiện sau cùng.
6. Metrics animate theo stagger.

## Scroll storytelling

- Dùng sticky/pinned sections cho cinematic transition.
- Tránh khoảng trống đen vô nghĩa giữa hai scene.
- Scene sau phải phát triển từ scene trước, không hard cut.
- Dùng progressive reveal thay vì show toàn bộ.
