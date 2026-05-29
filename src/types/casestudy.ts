export interface CaseStudy {
  id: string;
  title: string;
  category: 'UI/UX' | 'State Sync' | 'Deployment' | 'Performance';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timestamp: string;
  context: string;
  symptoms: string[];
  trapApproaches: string[];
  correctWorkflow: string[];
  lessonLearned: string[];
}
