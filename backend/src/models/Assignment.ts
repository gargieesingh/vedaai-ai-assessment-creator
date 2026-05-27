import mongoose, { Schema, Document } from 'mongoose';

export interface IQuestionType {
  type: string;
  numQuestions: number;
  marks: number;
}

export interface IAssignment extends Document {
  title: string;
  fileUrl?: string;
  dueDate: Date;
  questionTypes: IQuestionType[];
  instructions?: string;
  status: 'pending' | 'processing' | 'complete' | 'error';
  jobId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const QuestionTypeSchema = new Schema<IQuestionType>({
  type: { type: String, required: true },
  numQuestions: { type: Number, required: true },
  marks: { type: Number, required: true }
}, { _id: false });

const AssignmentSchema = new Schema<IAssignment>({
  title: { type: String, required: true },
  fileUrl: { type: String, required: false },
  dueDate: { type: Date, required: true },
  questionTypes: { type: [QuestionTypeSchema], required: true },
  instructions: { type: String, required: false },
  status: { 
    type: String, 
    enum: ['pending', 'processing', 'complete', 'error'], 
    default: 'pending',
    required: true
  },
  jobId: { type: String, required: false }
}, { timestamps: true });

export const Assignment = mongoose.model<IAssignment>('Assignment', AssignmentSchema);
