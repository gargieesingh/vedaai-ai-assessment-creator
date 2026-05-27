import { GoogleGenerativeAI } from '@google/generative-ai';

interface QuestionType {
  type: string;
  numQuestions: number;
  marks: number;
}

interface AssignmentData {
  instructions?: string;
  questionTypes: QuestionType[];
}

interface Question {
  text: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard' | 'Challenging';
  marks: number;
  type: string;
  answerKey?: string;
}

interface Section {
  title: string;
  questionType: string;
  instruction: string;
  questions: Question[];
}

interface ResultMetadata {
  subject?: string;
  className?: string;
  timeAllowed?: string;
  totalMarks: number;
}

interface GenerateQuestionsResult {
  sections: Section[];
  metadata: ResultMetadata;
}

const sectionLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function buildPrompt(assignmentData: AssignmentData): string {
  const sectionLines = assignmentData.questionTypes
    .map(
      (qt, i) =>
        `Section ${sectionLetters[i]}: ${qt.numQuestions} ${qt.type}, ${qt.marks} mark${qt.marks > 1 ? 's' : ''} each`
    )
    .join('\n');

  return `
You are an expert teacher creating a formal exam paper.

Create an exam paper with the following sections:
${sectionLines}

Additional instructions from teacher: ${assignmentData.instructions || 'None'}

Difficulty distribution per section: 40% Easy, 40% Moderate, 20% Challenging.

Return ONLY a raw JSON object with NO markdown, NO backticks, and NO extra text. The JSON must follow this exact shape:

{
  "sections": [
    {
      "title": "Section A",
      "questionType": "Multiple Choice Questions",
      "instruction": "Attempt all questions. Each question carries 1 mark.",
      "questions": [
        {
          "text": "question text here",
          "difficulty": "Easy",
          "marks": 1,
          "type": "Multiple Choice Questions",
          "answerKey": "answer here"
        }
      ]
    }
  ],
  "metadata": {
    "subject": "extract from instructions or write General",
    "className": "extract from instructions or leave empty string",
    "timeAllowed": "calculate based on total questions",
    "totalMarks": 0
  }
}
`.trim();
}

export async function generateQuestions(
  assignmentData: AssignmentData
): Promise<GenerateQuestionsResult> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not defined in the environment variables');
  }

  const prompt = buildPrompt(assignmentData);

  console.log('Calling Gemini API...');

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  const result = await model.generateContent(prompt);
  const responseText = result.response.text();

  // Strip markdown backticks if present
  const cleaned = responseText
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();

  let parsed: GenerateQuestionsResult;

  try {
    parsed = JSON.parse(cleaned) as GenerateQuestionsResult;
  } catch {
    throw new Error('Gemini returned invalid JSON');
  }

  if (!parsed.sections || !Array.isArray(parsed.sections) || parsed.sections.length === 0) {
    throw new Error('Invalid response structure from Gemini');
  }

  // Calculate totalMarks from input data
  const totalMarks = assignmentData.questionTypes.reduce(
    (sum, qt) => sum + qt.numQuestions * qt.marks,
    0
  );
  parsed.metadata.totalMarks = totalMarks;

  console.log('Gemini response parsed successfully');

  return {
    sections: parsed.sections,
    metadata: parsed.metadata,
  };
}