const KEY_LEARNING_LOGS = "ai_learning_logs";

export interface LogEntry {
  id: string;
  date: string;
  lessonId: string;
  whatLearned: string;
  codebaseConnection: string;
  mistakesAndLessons: string;
  reusablePrompts: string;
  nextSteps: string;
}

/**
 * Service quản lý việc lưu trữ vật lý (Persistence Layer) 
 * cho các ghi chép nhật ký học tập (Learning Log).
 */
export const logStorage = {
  /**
   * Lấy danh sách nhật ký học tập đã lưu từ LocalStorage.
   */
  getLogs(): LogEntry[] {
    try {
      const saved = localStorage.getItem(KEY_LEARNING_LOGS);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Failed to parse learning logs from storage:", error);
      return [];
    }
  },

  /**
   * Lưu danh sách nhật ký học tập vào LocalStorage.
   */
  saveLogs(logs: LogEntry[]): void {
    try {
      localStorage.setItem(KEY_LEARNING_LOGS, JSON.stringify(logs));
    } catch (error) {
      console.error("Failed to save learning logs to storage:", error);
    }
  },

  /**
   * Xuất toàn bộ dữ liệu nhật ký học tập dưới dạng JSON string.
   */
  exportLogsData(): string {
    const logs = this.getLogs();
    return JSON.stringify({
      version: 1,
      timestamp: Date.now(),
      logs: logs,
    }, null, 2);
  },

  /**
   * Nhập dữ liệu nhật ký học tập từ JSON string.
   */
  importLogsData(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData);
      if (data && typeof data === "object" && Array.isArray(data.logs)) {
        this.saveLogs(data.logs);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to import logs data:", error);
      return false;
    }
  }
};
