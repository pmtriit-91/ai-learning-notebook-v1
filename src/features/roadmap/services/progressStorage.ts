import type { LessonStatus } from "../../../types/lesson";

const KEY_LESSON_STATUSES = "ai_learning_lesson_statuses";
const KEY_CHECKLISTS = "ai_learning_checklists";

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
   * Xuất toàn bộ dữ liệu tiến độ bài học và checklist dưới dạng JSON string.
   */
  exportProgressData(): string {
    const statuses = this.getLessonStatuses();
    const checklists = this.getChecklists();
    return JSON.stringify({
      version: 1,
      timestamp: Date.now(),
      lessonStatuses: statuses,
      checklists: checklists,
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
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to import progress data:", error);
      return false;
    }
  }
};
