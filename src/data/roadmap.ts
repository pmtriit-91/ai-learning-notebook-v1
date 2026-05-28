import type { Phase } from "../types/lesson";

export const phases: Phase[] = [
  {
    id: "phase-1",
    title: "Phase 1 — AI Literacy",
    description: "Mục tiêu: Hiểu AI/LLM hoạt động ở mức đủ dùng, xây dựng tư duy nền tảng và kiểm soát hallucination.",
    lessonIds: ["lesson-1", "lesson-2", "lesson-3", "lesson-4", "lesson-5"]
  },
  {
    id: "phase-2",
    title: "Phase 2 — Prompt Engineering",
    description: "Mục tiêu: Biết giao việc cho AI rõ ràng, có cấu trúc, có kiểm soát và xây dựng Prompt Playbook cá nhân.",
    lessonIds: ["lesson-6", "lesson-7", "lesson-8", "lesson-9", "lesson-10", "lesson-11", "lesson-12"]
  },
  {
    id: "phase-3",
    title: "Phase 3 — AI-assisted Coding Workflow",
    description: "Mục tiêu: Sử dụng AI để code nhưng vẫn kiểm soát tốt mã nguồn dự án, git discipline và quy trình kiểm thử.",
    lessonIds: ["lesson-13", "lesson-14", "lesson-15", "lesson-16", "lesson-17", "lesson-18"]
  },
  {
    id: "phase-4",
    title: "Phase 4 — AI Workflow Architect",
    description: "Mục tiêu: Thiết kế quy trình làm việc tự động cho AI agent, phối hợp multi-agent và quản trị rủi ro.",
    lessonIds: ["lesson-19", "lesson-20", "lesson-21", "lesson-22", "lesson-23", "lesson-24", "lesson-25", "lesson-26"]
  },
  {
    id: "phase-5",
    title: "Phase 5 — AI Product Builder",
    description: "Mục tiêu: Xây dựng sản phẩm thực tế có tích hợp tính năng AI (AI-native features) và đưa vào thực tế.",
    lessonIds: ["lesson-27", "lesson-28", "lesson-29", "lesson-30", "lesson-31", "lesson-32", "lesson-33"]
  }
];
