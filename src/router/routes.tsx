import type { RouteObject } from "react-router-dom";
import { Layout } from "../core/layouts/AppLayout";
import { Dashboard } from "../features/dashboard/pages/DashboardPage";
import { Roadmap } from "../features/roadmap/pages/RoadmapPage";
import { LessonPage } from "../features/roadmap/pages/LessonDetailPage";
import { PromptPlaybook } from "../features/prompt-playbook/pages/PromptPlaybookPage";
import { LearningLog } from "../features/learning-log/pages/LearningLogPage";
import {
  PATH_DASHBOARD,
  PATH_ROADMAP,
  PATH_LESSON,
  PATH_PLAYBOOK,
  PATH_LOG,
} from "./paths";

/**
 * Cấu hình mảng RouteObject tập trung của hệ thống.
 * Các Route con được lồng ghép bên dưới phần Layout chung.
 */
export const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      {
        path: PATH_DASHBOARD,
        element: <Dashboard />,
      },
      {
        path: PATH_ROADMAP,
        element: <Roadmap />,
      },
      {
        path: PATH_LESSON,
        element: <LessonPage />,
      },
      {
        path: PATH_PLAYBOOK,
        element: <PromptPlaybook />,
      },
      {
        path: PATH_LOG,
        element: <LearningLog />,
      },
    ],
  },
];
