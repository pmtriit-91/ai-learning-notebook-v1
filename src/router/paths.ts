/**
 * Định nghĩa tất cả các hằng số đường dẫn (paths) trong ứng dụng.
 * Tránh sử dụng chuỗi thô (hardcoded string) trực tiếp trong dự án.
 */
export const PATH_DASHBOARD = "/";
export const PATH_ROADMAP = "/roadmap";
export const PATH_LESSON = "/lesson/:id";
export const PATH_PLAYBOOK = "/playbook";
export const PATH_LOG = "/log";

// Hàm helper để render route động (như trang bài học chi tiết)
export const getLessonPath = (id: string) => `/lesson/${id}`;
