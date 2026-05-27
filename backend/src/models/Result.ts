import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IQuestion {
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

export interface IResult extends Document {
  assignmentId: Types.ObjectId;
  sections: ISection[];
  metadata: IResultMetadata;
  createdAt: Date;
  updatedAt: Date;
}

const QuestionSchema = new Schema<IQuestion>({
  text: { type: String, required: true },
  difficulty: { 
    type: String, 
    enum: ['Easy', 'Moderate', 'Hard', 'Challenging'], 
    required: true 
  },
  marks: { type: Number, required: true },
  type: { type: String, required: true },
  answerKey: { type: String, required: false }
}); // Note: No _id: false here, questions inside sections get their own id

const SectionSchema = new Schema<ISection>({
  title: { type: String, required: true },
  questionType: { type: String, required: true },
  instruction: { type: String, required: true },
  questions: { type: [QuestionSchema], required: true }
}, { _id: false });

const ResultMetadataSchema = new Schema<IResultMetadata>({
  schoolName: { type: String, required: false },
  subject: { type: String, required: false },
  className: { type: String, required: false },
  timeAllowed: { type: String, required: false },
  totalMarks: { type: Number, required: true }
}, { _id: false });

const ResultSchema = new Schema<IResult>({
  assignmentId: { type: Schema.Types.ObjectId, ref: 'Assignment', required: true },
  sections: { type: [SectionSchema], required: true },
  metadata: { type: ResultMetadataSchema, required: true }
}, { timestamps: true });

export const Result = mongoose.model<IResult>('Result', ResultSchema);
