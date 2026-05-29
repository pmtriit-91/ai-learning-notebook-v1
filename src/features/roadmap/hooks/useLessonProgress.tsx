import React, { createContext, useContext, useState, useEffect } from "react";
import type { LessonStatus } from "../../../types/lesson";
import { lessons } from "../../../data/lessons";

import { progressStorage } from "../services/progressStorage";

const useLessonProgressInternal = () => {
  // Trạng thái bài học: { [lessonId]: LessonStatus }
  const [lessonStatuses, setLessonStatuses] = useState<Record<string, LessonStatus>>(() => {
    return progressStorage.getLessonStatuses();
  });

  // Trạng thái checklist từng bài học: { [lessonId]: boolean[] }
  const [checklists, setChecklists] = useState<Record<string, boolean[]>>(() => {
    return progressStorage.getChecklists();
  });

  useEffect(() => {
    progressStorage.saveLessonStatuses(lessonStatuses);
  }, [lessonStatuses]);

  useEffect(() => {
    progressStorage.saveChecklists(checklists);
  }, [checklists]);

  const getLessonStatus = (lessonId: string): LessonStatus => {
    return lessonStatuses[lessonId] || "not-started";
  };

  const updateLessonStatus = (lessonId: string, status: LessonStatus, totalItems: number = 3) => {
    setLessonStatuses((prev) => ({
      ...prev,
      [lessonId]: status,
    }));

    // Đồng bộ sang checklist
    setChecklists((prev) => {
      if (status === "completed") {
        return {
          ...prev,
          [lessonId]: new Array(totalItems).fill(true),
        };
      } else if (status === "not-started") {
        return {
          ...prev,
          [lessonId]: new Array(totalItems).fill(false),
        };
      }
      return prev;
    });
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

      // Đồng bộ sang lesson status
      const checkedCount = current.filter(Boolean).length;
      setLessonStatuses((prevStatuses) => {
        const currentStatus = prevStatuses[lessonId] || "not-started";
        let newStatus = currentStatus;

        if (checkedCount === totalItems) {
          newStatus = "completed";
        } else if (checkedCount > 0) {
          if (currentStatus === "completed" || currentStatus === "not-started") {
            newStatus = "learning";
          }
        } else if (checkedCount === 0) {
          if (currentStatus === "learning" || currentStatus === "completed") {
            newStatus = "not-started";
          }
        }

        if (newStatus !== currentStatus) {
          return {
            ...prevStatuses,
            [lessonId]: newStatus,
          };
        }
        return prevStatuses;
      });

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

export type UseLessonProgressType = ReturnType<typeof useLessonProgressInternal>;

export const LessonProgressContext = createContext<UseLessonProgressType | null>(null);

export const LessonProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const value = useLessonProgressInternal();
  return (
    <LessonProgressContext.Provider value={value}>
      {children}
    </LessonProgressContext.Provider>
  );
};

export const useLessonProgress = () => {
  const context = useContext(LessonProgressContext);
  if (!context) {
    throw new Error("useLessonProgress must be used within a LessonProgressProvider");
  }
  return context;
};
