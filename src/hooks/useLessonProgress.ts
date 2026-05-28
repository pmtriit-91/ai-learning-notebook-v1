import { useState, useEffect } from "react";
import type { LessonStatus } from "../types/lesson";
import { lessons } from "../data/lessons";

export const useLessonProgress = () => {
  // Trạng thái bài học: { [lessonId]: LessonStatus }
  const [lessonStatuses, setLessonStatuses] = useState<Record<string, LessonStatus>>(() => {
    const saved = localStorage.getItem("ai_learning_lesson_statuses");
    return saved ? JSON.parse(saved) : {};
  });

  // Trạng thái checklist từng bài học: { [lessonId]: boolean[] }
  const [checklists, setChecklists] = useState<Record<string, boolean[]>>(() => {
    const saved = localStorage.getItem("ai_learning_checklists");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("ai_learning_lesson_statuses", JSON.stringify(lessonStatuses));
  }, [lessonStatuses]);

  useEffect(() => {
    localStorage.setItem("ai_learning_checklists", JSON.stringify(checklists));
  }, [checklists]);

  const getLessonStatus = (lessonId: string): LessonStatus => {
    return lessonStatuses[lessonId] || "not-started";
  };

  const updateLessonStatus = (lessonId: string, status: LessonStatus) => {
    setLessonStatuses((prev) => ({
      ...prev,
      [lessonId]: status,
    }));
  };

  const getLessonChecklist = (lessonId: string, totalItems: number): boolean[] => {
    if (checklists[lessonId]) {
      // Đảm bảo mảng đủ độ dài nếu dữ liệu cũ chưa cập nhật hoặc bị thiếu
      const current = checklists[lessonId];
      if (current.length < totalItems) {
        return [...current, ...new Array(totalItems - current.length).fill(false)];
      }
      return current;
    }
    return new Array(totalItems).fill(false);
  };

  const toggleChecklistItem = (lessonId: string, index: number, totalItems: number) => {
    setChecklists((prev) => {
      const current = prev[lessonId] ? [...prev[lessonId]] : new Array(totalItems).fill(false);
      while (current.length < totalItems) {
        current.push(false);
      }
      current[index] = !current[index];
      return {
        ...prev,
        [lessonId]: current,
      };
    });
  };

  // Tính toán chỉ số thống kê
  const totalLessons = lessons.length;
  const completedLessonsCount = Object.values(lessonStatuses).filter(
    (status) => status === "completed"
  ).length;
  const learningLessonsCount = Object.values(lessonStatuses).filter(
    (status) => status === "learning"
  ).length;

  const overallProgress = totalLessons > 0 ? Math.round((completedLessonsCount / totalLessons) * 100) : 0;

  // Tính tiến độ theo Phase
  const getPhaseProgress = (phaseLessonIds: string[]) => {
    if (phaseLessonIds.length === 0) return 0;
    const completedInPhase = phaseLessonIds.filter(
      (id) => getLessonStatus(id) === "completed"
    ).length;
    return Math.round((completedInPhase / phaseLessonIds.length) * 100);
  };

  const getPhaseCompletedCount = (phaseLessonIds: string[]) => {
    return phaseLessonIds.filter((id) => getLessonStatus(id) === "completed").length;
  };

  return {
    getLessonStatus,
    updateLessonStatus,
    getLessonChecklist,
    toggleChecklistItem,
    totalLessons,
    completedLessonsCount,
    learningLessonsCount,
    overallProgress,
    getPhaseProgress,
    getPhaseCompletedCount,
  };
};
export type UseLessonProgressType = ReturnType<typeof useLessonProgress>;
