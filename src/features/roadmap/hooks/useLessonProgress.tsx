/* eslint-disable react-refresh/only-export-components */
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

  // Trạng thái ghi chú bài học: { [lessonId]: { content: string; updatedAt: number } }
  const [lessonNotes, setLessonNotes] = useState<Record<string, { content: string; updatedAt: number }>>(() => {
    return progressStorage.getLessonNotes();
  });

  // Trạng thái câu trả lời bài tập: { [lessonId]: { [exerciseIndex]: string } }
  const [exerciseAnswers, setExerciseAnswers] = useState<Record<string, Record<number, string>>>(() => {
    return progressStorage.getExerciseAnswers();
  });

  // Trạng thái hoàn thành bài tập: { [lessonId]: boolean[] }
  const [exerciseStatuses, setExerciseStatuses] = useState<Record<string, boolean[]>>(() => {
    return progressStorage.getExerciseStatus();
  });

  useEffect(() => {
    progressStorage.saveLessonStatuses(lessonStatuses);
  }, [lessonStatuses]);

  useEffect(() => {
    progressStorage.saveChecklists(checklists);
  }, [checklists]);

  useEffect(() => {
    progressStorage.saveLessonNotes(lessonNotes);
  }, [lessonNotes]);

  useEffect(() => {
    progressStorage.saveExerciseAnswers(exerciseAnswers);
  }, [exerciseAnswers]);

  useEffect(() => {
    progressStorage.saveExerciseStatus(exerciseStatuses);
  }, [exerciseStatuses]);

  const getLessonStatus = (lessonId: string): LessonStatus => {
    return lessonStatuses[lessonId] || "not-started";
  };

  const updateLessonStatus = React.useCallback((lessonId: string, status: LessonStatus, totalItems: number = 3) => {
    setLessonStatuses((prev) => ({
      ...prev,
      [lessonId]: status,
    }));

    // Đồng bộ sang checklist
    setChecklists((prev) => {
      const current = prev[lessonId] || [];
      const isAllChecked = current.length === totalItems && current.every(Boolean);
      const isAllUnchecked = current.length === 0 || current.every(x => !x);

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
      } else if (status === "learning") {
        if (isAllChecked) {
          // Nếu đã hoàn thành nhưng chuyển về learning, bỏ chọn mục cuối
          const next = new Array(totalItems).fill(true);
          next[totalItems - 1] = false;
          return {
            ...prev,
            [lessonId]: next,
          };
        } else if (isAllUnchecked) {
          // Nếu chưa học nhưng chuyển sang learning, tích chọn mục đầu
          const next = new Array(totalItems).fill(false);
          next[0] = true;
          return {
            ...prev,
            [lessonId]: next,
          };
        }
      }
      return prev;
    });
  }, []);

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

  const toggleChecklistItem = React.useCallback((lessonId: string, index: number, totalItems: number) => {
    const current = checklists[lessonId] ? [...checklists[lessonId]] : new Array(totalItems).fill(false);
    while (current.length < totalItems) {
      current.push(false);
    }
    current[index] = !current[index];

    // Đồng bộ sang lesson status dựa trên checklist mới
    const checkedCount = current.filter(Boolean).length;
    let newStatus: LessonStatus = "not-started";

    if (checkedCount === totalItems) {
      newStatus = "completed";
    } else if (checkedCount > 0) {
      newStatus = "learning";
    }

    setChecklists((prev) => ({
      ...prev,
      [lessonId]: current,
    }));

    setLessonStatuses((prev) => ({
      ...prev,
      [lessonId]: newStatus,
    }));
  }, [checklists]);

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

  const getLessonNote = (lessonId: string): string => {
    return lessonNotes[lessonId]?.content || "";
  };

  const updateLessonNote = React.useCallback((lessonId: string, content: string) => {
    setLessonNotes((prev) => ({
      ...prev,
      [lessonId]: {
        content,
        updatedAt: Date.now(),
      },
    }));
  }, []);

  const getExerciseAnswer = (lessonId: string, exerciseIndex: number): string => {
    return exerciseAnswers[lessonId]?.[exerciseIndex] || "";
  };

  const updateExerciseAnswer = React.useCallback((lessonId: string, exerciseIndex: number, answer: string) => {
    setExerciseAnswers((prev) => {
      const lessonPrev = prev[lessonId] || {};
      return {
        ...prev,
        [lessonId]: {
          ...lessonPrev,
          [exerciseIndex]: answer,
        },
      };
    });
  }, []);

  const getExerciseCompleted = (lessonId: string, exerciseIndex: number): boolean => {
    return exerciseStatuses[lessonId]?.[exerciseIndex] || false;
  };

  const toggleExerciseCompleted = React.useCallback((
    lessonId: string, 
    exerciseIndex: number, 
    totalExercises: number,
    checklistItems?: string[]
  ) => {
    setExerciseStatuses((prev) => {
      const current = prev[lessonId] ? [...prev[lessonId]] : new Array(totalExercises).fill(false);
      while (current.length < totalExercises) {
        current.push(false);
      }
      current[exerciseIndex] = !current[exerciseIndex];
      
      const nextStatuses = {
        ...prev,
        [lessonId]: current,
      };

      // Tự động đồng bộ sang checklist nếu có checklistItems
      if (checklistItems && checklistItems.length > 0) {
        const targetIndex = checklistItems.findIndex(item => 
          /bài tập|luyện tập|tự làm/i.test(item)
        );
        if (targetIndex !== -1) {
          const allCompleted = current.every(Boolean);
          
          setChecklists((prevChecklists) => {
            const currentChecklist = prevChecklists[lessonId] 
              ? [...prevChecklists[lessonId]] 
              : new Array(checklistItems.length).fill(false);
            
            while (currentChecklist.length < checklistItems.length) {
              currentChecklist.push(false);
            }
            
            if (currentChecklist[targetIndex] !== allCompleted) {
              currentChecklist[targetIndex] = allCompleted;

              const checkedCount = currentChecklist.filter(Boolean).length;
              let newStatus: LessonStatus = "not-started";

              if (checkedCount === checklistItems.length) {
                newStatus = "completed";
              } else if (checkedCount > 0) {
                newStatus = "learning";
              }

              setLessonStatuses((prevStatuses) => ({
                ...prevStatuses,
                [lessonId]: newStatus,
              }));

              return {
                ...prevChecklists,
                [lessonId]: currentChecklist,
              };
            }
            
            return prevChecklists;
          });
        }
      }

      return nextStatuses;
    });
  }, []);

  return {
    getLessonStatus,
    updateLessonStatus,
    getLessonChecklist,
    toggleChecklistItem,
    getLessonNote,
    updateLessonNote,
    getExerciseAnswer,
    updateExerciseAnswer,
    getExerciseCompleted,
    toggleExerciseCompleted,
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
