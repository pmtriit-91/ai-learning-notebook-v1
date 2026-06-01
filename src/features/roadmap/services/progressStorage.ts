import type { LessonStatus } from "../../../types/lesson";

const KEY_LESSON_STATUSES = "ai_learning_lesson_statuses";
const KEY_CHECKLISTS = "ai_learning_checklists";
const KEY_LESSON_NOTES = "ai_learning_lesson_notes";
const KEY_EXERCISE_ANSWERS = "ai_learning_exercise_answers";
const KEY_EXERCISE_STATUS = "ai_learning_exercise_status";

/**
 * Service chịu trách nhiệm xử lý logic lưu trữ vật lý (Persistence Layer) 
 * cho tiến độ bài học và checklist của Roadmap.
 */
export const progressStorage = {
  /**
   * Lấy danh sách trạng thái bài học đã lưu từ LocalStorage.
   */
  getLessonStatuses(): Record<string, LessonStatus> {
    try {
      const saved = localStorage.getItem(KEY_LESSON_STATUSES);
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      console.error("Failed to parse lesson statuses from storage:", error);
      return {};
    }
  },

  /**
   * Lưu danh sách trạng thái bài học vào LocalStorage.
   */
  saveLessonStatuses(statuses: Record<string, LessonStatus>): void {
    try {
      localStorage.setItem(KEY_LESSON_STATUSES, JSON.stringify(statuses));
    } catch (error) {
      console.error("Failed to save lesson statuses to storage:", error);
    }
  },

  /**
   * Lấy danh sách checklists đã lưu từ LocalStorage.
   */
  getChecklists(): Record<string, boolean[]> {
    try {
      const saved = localStorage.getItem(KEY_CHECKLISTS);
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      console.error("Failed to parse checklists from storage:", error);
      return {};
    }
  },

  /**
   * Lưu danh sách checklists vào LocalStorage.
   */
  saveChecklists(checklists: Record<string, boolean[]>): void {
    try {
      localStorage.setItem(KEY_CHECKLISTS, JSON.stringify(checklists));
    } catch (error) {
      console.error("Failed to save checklists to storage:", error);
    }
  },

  /**
   * Lấy danh sách ghi chú bài học đã lưu từ LocalStorage.
   */
  getLessonNotes(): Record<string, { content: string; updatedAt: number }> {
    try {
      const saved = localStorage.getItem(KEY_LESSON_NOTES);
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      console.error("Failed to parse lesson notes from storage:", error);
      return {};
    }
  },

  /**
   * Lưu danh sách ghi chú bài học vào LocalStorage.
   */
  saveLessonNotes(notes: Record<string, { content: string; updatedAt: number }>): void {
    try {
      localStorage.setItem(KEY_LESSON_NOTES, JSON.stringify(notes));
    } catch (error) {
      console.error("Failed to save lesson notes to storage:", error);
    }
  },

  /**
   * Lấy danh sách câu trả lời bài tập thực hành đã lưu.
   */
  getExerciseAnswers(): Record<string, Record<number, string>> {
    try {
      const saved = localStorage.getItem(KEY_EXERCISE_ANSWERS);
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      console.error("Failed to parse exercise answers from storage:", error);
      return {};
    }
  },

  /**
   * Lưu danh sách câu trả lời bài tập thực hành.
   */
  saveExerciseAnswers(answers: Record<string, Record<number, string>>): void {
    try {
      localStorage.setItem(KEY_EXERCISE_ANSWERS, JSON.stringify(answers));
    } catch (error) {
      console.error("Failed to save exercise answers to storage:", error);
    }
  },

  /**
   * Lấy danh sách trạng thái hoàn thành bài tập thực hành.
   */
  getExerciseStatus(): Record<string, boolean[]> {
    try {
      const saved = localStorage.getItem(KEY_EXERCISE_STATUS);
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      console.error("Failed to parse exercise statuses from storage:", error);
      return {};
    }
  },

  /**
   * Lưu danh sách trạng thái hoàn thành bài tập thực hành.
   */
  saveExerciseStatus(status: Record<string, boolean[]>): void {
    try {
      localStorage.setItem(KEY_EXERCISE_STATUS, JSON.stringify(status));
    } catch (error) {
      console.error("Failed to save exercise statuses to storage:", error);
    }
  },

  /**
   * Xuất toàn bộ dữ liệu tiến độ bài học và checklist dưới dạng JSON string.
   */
  exportProgressData(): string {
    const statuses = this.getLessonStatuses();
    const checklists = this.getChecklists();
    const notes = this.getLessonNotes();
    const answers = this.getExerciseAnswers();
    const exerciseStatus = this.getExerciseStatus();
    return JSON.stringify({
      version: 1,
      timestamp: Date.now(),
      lessonStatuses: statuses,
      checklists: checklists,
      lessonNotes: notes,
      exerciseAnswers: answers,
      exerciseStatus: exerciseStatus,
    }, null, 2);
  },

  /**
   * Nhập dữ liệu tiến độ bài học và checklist từ JSON string.
   */
  importProgressData(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData);
      if (data && typeof data === "object") {
        if (data.lessonStatuses) {
          this.saveLessonStatuses(data.lessonStatuses);
        }
        if (data.checklists) {
          this.saveChecklists(data.checklists);
        }
        if (data.lessonNotes) {
          this.saveLessonNotes(data.lessonNotes);
        }
        if (data.exerciseAnswers) {
          this.saveExerciseAnswers(data.exerciseAnswers);
        }
        if (data.exerciseStatus) {
          this.saveExerciseStatus(data.exerciseStatus);
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to import progress data:", error);
      return false;
    }
  }
};
