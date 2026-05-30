// ── types/assignment.ts ─────────────────────────────────────────────────────

export interface Assignment {
  id: string;
  title: string;
  assignedOn: string; // "DD-MM-YYYY"
  dueDate: string;    // "DD-MM-YYYY"
  subject?: string;
  class?: string;
}

export interface QuestionTypeRow {
  id: string;
  type: string;
  count: number;
  marks: number;
}

export interface AssignmentFormData {
  fileUrl?: string;
  fileName?: string;
  dueDate: string;
  questionTypes: QuestionTypeRow[];
  additionalInfo: string;
  subject: string;
  class: string;
  school: string;
  timeAllowed: string;
}

export interface Question {
  id: number;
  text: string;
  difficulty: "Easy" | "Moderate" | "Challenging";
  marks: number;
  options?: string[];
}

export interface Section {
  title: string;
  questionType?: string;
  instruction: string;
  questions: Question[];
}

export interface Answer {
  id: number;
  text: string;
  questionSection?: string;
  questionNumber?: number;
}

export interface GeneratedPaper {
  school: string;
  subject: string;
  class: string;
  timeAllowed: string;
  maxMarks: number;
  sections: Section[];
  answerKey: Answer[];
}
