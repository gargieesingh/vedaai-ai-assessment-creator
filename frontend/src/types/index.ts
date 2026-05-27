export interface IQuestionType {
  type: string;
  numQuestions: number;
  marks: number;
}

export interface IAssignment {
  _id: string;
  title: string;
  fileUrl?: string;
  dueDate: string;
  questionTypes: IQuestionType[];
  instructions?: string;
  status: 'pending' | 'processing' | 'complete' | 'error';
  jobId?: string;
  createdAt: string;
}

export interface IQuestion {
  _id: string;
  text: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard' | 'Challenging';
  marks: number;
  type: string;
  answerKey?: string;
}

export interface ISection {
  title: string;
  questionType: string;
  instruction: string;
  questions: IQuestion[];
}

export interface IResultMetadata {
  schoolName?: string;
  subject?: string;
  className?: string;
  timeAllowed?: string;
  totalMarks: number;
}

export interface IResult {
  _id: string;
  assignmentId: string;
  sections: ISection[];
  metadata: IResultMetadata;
  createdAt: string;
}