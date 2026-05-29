import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes";

// Khởi tạo router sử dụng createBrowserRouter thay thế cơ chế Routes lồng nhau cũ
const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
});

/**
 * Component AppRouter chịu trách nhiệm cung cấp cấu hình định tuyến cho toàn ứng dụng.
 */
export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
export default AppRouter;
