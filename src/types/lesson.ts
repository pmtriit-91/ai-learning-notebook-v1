export type LessonStatus = "not-started" | "learning" | "completed";

export interface LessonReference {
  title: string;
  url: string;
}

export interface Lesson {
  id: string;
  phaseId: string;
  lessonNumber: number;
  title: string;
  description: string;
  status?: LessonStatus;
  estimatedMinutes?: number;
  concepts: string[];
  summary: string;
  keyTakeaways: string[];
  examplePrompts: string[];
  exercises: string[];
  references: LessonReference[];
}

export interface Phase {
  id: string;
  title: string;
  description: string;
  lessonIds: string[];
}
