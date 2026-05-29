import { createHashRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes";

// Khởi tạo router sử dụng createHashRouter để hỗ trợ reload trang trên GitHub Pages (tránh lỗi 404 tĩnh)
const router = createHashRouter(routes, {
  basename: import.meta.env.BASE_URL,
});

/**
 * Component AppRouter chịu trách nhiệm cung cấp cấu hình định tuyến cho toàn ứng dụng.
 */
export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
export default AppRouter;
