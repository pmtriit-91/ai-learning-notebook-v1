import type { CaseStudy } from "../types/casestudy";

export const caseStudies: CaseStudy[] = [
  {
    id: "case-1",
    title: "Sidebar Spacing Regression - Sửa lỗi thụt lùi giao diện",
    category: "UI/UX",
    difficulty: "Easy",
    timestamp: "2026-05-29",
    context: "Sau một đợt cập nhật nhanh CSS/UI, khoảng cách bên trong danh sách menu của Sidebar bị phình to bất thường (phần tử nhảy ra giữa, giãn cách dọc quá lớn), làm hỏng tỷ lệ bố cục và giao diện lệch lạc so với thiết kế gốc.",
    symptoms: [
      "Sidebar nhìn lệch và khoảng cách bên trong không còn giống các màn hình trước đây.",
      "Cảm giác spacing bị sai nhưng ban đầu chưa xác định được chính xác thuộc tính nào bị tác động."
    ],
    trapApproaches: [
      "Mở đọc và phân tích toàn bộ project nhằm tìm file CSS toàn cục.",
      "Refactor lại toàn bộ Theme hoặc viết đè (override) CSS kiểu ad-hoc làm phình to code.",
      "Sửa đổi bừa bãi các padding của layout lớn xung quanh Sidebar."
    ],
    correctWorkflow: [
      "Observe (Quan sát thực tế): Định vị sự thay đổi nằm ở vùng Menu List trên Sidebar.",
      "Target (Khoanh vùng): Tìm đến file Sidebar.tsx và xem lịch sử git diff gần nhất.",
      "Action (Sửa đổi): Phát hiện ra padding ngang của List bị đổi từ 2 (16px) thành 12 (96px) và padding dọc của ListItemButton bị đổi từ 1.5 thành 5.5. Khôi phục trực diện về giá trị cũ.",
      "Verify (Xác minh): Chạy linter, build tĩnh và tải lại trang để kiểm tra giao diện cân đối."
    ],
    lessonLearned: [
      "Observe Reality Before Reasoning (Quan sát thực tế trước khi lập luận lý thuyết).",
      "Load Less, Think Better: Chỉ tập trung mở và sửa tệp tin đích thực tế bị lỗi, tránh lan man sang các kiến trúc khác."
    ]
  },
  {
    id: "case-2",
    title: "State Sync Race Condition - Lỗi đồng bộ chéo React State",
    category: "State Sync",
    difficulty: "Medium",
    timestamp: "2026-05-29",
    context: "Ứng dụng lưu tiến trình học song song ở hai mảng trạng thái độc lập trong LocalStorage: Trạng thái bài học (lessonStatuses) và Danh sách checklist (checklists). Khi người dùng tích chọn checkbox, hệ thống cập nhật đồng thời cả hai. Tuy nhiên, việc gọi setState lồng nhau và đọc state bất đồng bộ từ bên ngoài callback updater đã gây ra hiện tượng không nhất quán dữ liệu.",
    symptoms: [
      "Khi thay đổi checklist, tiến độ ở Roadmap hiển thị sai lệch.",
      "UI hiển thị đã tích đủ 3/3 mục checklist nhưng trạng thái bài học vẫn ghi là 'Đang học', hoặc ngược lại.",
      "Khi click nhanh dồn dập, trạng thái lưu LocalStorage bị ghi đè lung tung do race condition."
    ],
    trapApproaches: [
      "Sử dụng useEffect lồng nhau vô điều kiện để quan sát và đồng bộ (dễ dẫn tới render lặp vô hạn).",
      "Chuyển toàn bộ ứng dụng sang Redux hay Zustand chỉ để giải quyết một lỗi đồng bộ cục bộ.",
      "Gọi các hàm ghi đè LocalStorage trực tiếp ở hàm render."
    ],
    correctWorkflow: [
      "Target (Định vị): Phát hiện toggleChecklistItem thực thi gọi setLessonStatuses ngay bên trong callback của setChecklists (MUI/React anti-pattern).",
      "Action (Sửa đổi): Tách biệt hoàn toàn hai hàm cập nhật state. Thực hiện tính toán mảng checklist mới một cách đồng bộ trong hàm handler, sau đó cập nhật song song và độc lập cho cả hai state.",
      "Action (Mở rộng): Bổ sung logic tự động tích chọn mục đầu tiên (khi bắt đầu học) hoặc bỏ tích mục cuối cùng (khi chuyển từ hoàn thành về đang học) giúp UI đồng bộ mượt mà.",
      "Verify: Chạy build, lint và click dồn dập trên trình duyệt để kiểm tra tính nhất quán."
    ],
    lessonLearned: [
      "Không gọi setState của state này bên trong hàm updater (callback) của state khác.",
      "Tính toán dữ liệu mới đồng bộ trước khi truyền vào các hàm cập nhật state bất đồng bộ."
    ]
  },
  {
    id: "case-3",
    title: "GitHub Pages Reload 404 - Định tuyến trên Web Server tĩnh",
    category: "Deployment",
    difficulty: "Medium",
    timestamp: "2026-05-29",
    context: "Sau khi triển khai ứng dụng Single Page Application (SPA) lên GitHub Pages, mọi thứ hoạt động bình thường cho đến khi người dùng nhấn F5/Reload trang ở các đường dẫn như /roadmap hay /playbook, trình duyệt lập tức báo lỗi trắng trang hoặc 404.",
    symptoms: [
      "Tải lại trang (refresh/reload) ở bất kỳ trang con nào ngoài trang chủ đều bị lỗi 404 của GitHub Pages.",
      "Người dùng không thể chia sẻ trực tiếp link bài học chi tiết cho người khác."
    ],
    trapApproaches: [
      "Cố gắng cấu hình các thẻ meta redirect phức tạp hoặc nhét các thư mục ảo vào repo.",
      "Cài đặt thêm các package NodeJS/Express ở backend (trong khi hosting GitHub Pages chỉ phục vụ static files)."
    ],
    correctWorkflow: [
      "Target (Phân tích): GitHub Pages là máy chủ tĩnh, khi có request /roadmap, nó sẽ tìm thư mục roadmap/index.html vốn không tồn tại trên đĩa. Do đó, cần cơ chế định tuyến client-side bằng Hash.",
      "Action (Sửa đổi): Thay thế createBrowserRouter thành createHashRouter trong router/index.tsx. Khi đó URL chuyển thành dạng /#/roadmap, web server chỉ cần phục vụ index.html ở root, phần còn lại do React Router tự phân giải.",
      "Verify: Đẩy code lên GitHub Pages, điều hướng vào các trang con và bấm F5 tải lại, trang hiển thị đúng đắn ngay lập tức."
    ],
    lessonLearned: [
      "Đối với Static Hosting (GitHub Pages, Vercel tĩnh, Netlify tĩnh), HashRouter là giải pháp an toàn nhất để tránh lỗi 404 khi reload trang mà không cần cấu hình rewrite ở phía server."
    ]
  }
];
