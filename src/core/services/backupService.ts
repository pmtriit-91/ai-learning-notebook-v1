import { progressStorage } from "../../features/roadmap/services/progressStorage";
import { logStorage } from "../../features/learning-log/services/logStorage";

/**
 * Service tích hợp hỗ trợ Sao lưu (Export) và Khôi phục (Import) 
 * toàn bộ dữ liệu ứng dụng (Tiến độ bài học, checklists, nhật ký học tập).
 */
export const backupService = {
  /**
   * Tạo tệp JSON chứa toàn bộ dữ liệu và kích hoạt trình duyệt tải xuống.
   */
  exportBackup(): void {
    try {
      const data = {
        version: 1,
        backupTime: new Date().toISOString(),
        lessonStatuses: progressStorage.getLessonStatuses(),
        checklists: progressStorage.getChecklists(),
        logs: logStorage.getLogs(),
      };

      const jsonString = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonString], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      const dateStr = new Date().toISOString().split("T")[0];
      link.href = url;
      link.download = `ai_learning_notebook_backup_${dateStr}.json`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to export backup data:", error);
      alert("Đã xảy ra lỗi khi xuất file dữ liệu!");
    }
  },

  /**
   * Đọc nội dung file JSON được tải lên và khôi phục vào LocalStorage.
   */
  importBackup(file: File): Promise<boolean> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          const result = event.target?.result;
          if (typeof result !== "string") {
            resolve(false);
            return;
          }

          const data = JSON.parse(result);
          if (data && typeof data === "object") {
            // Validate sơ bộ dữ liệu
            if (data.lessonStatuses && typeof data.lessonStatuses === "object") {
              progressStorage.saveLessonStatuses(data.lessonStatuses);
            }
            if (data.checklists && typeof data.checklists === "object") {
              progressStorage.saveChecklists(data.checklists);
            }
            if (data.logs && Array.isArray(data.logs)) {
              logStorage.saveLogs(data.logs);
            }
            
            resolve(true);
          } else {
            resolve(false);
          }
        } catch (error) {
          console.error("Failed to parse backup file:", error);
          resolve(false);
        }
      };

      reader.onerror = () => {
        resolve(false);
      };

      reader.readAsText(file);
    });
  }
};
