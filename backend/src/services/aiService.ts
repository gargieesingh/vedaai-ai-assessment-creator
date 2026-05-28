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
        `Section ${sectionLetters[i]}: EXACTLY ${qt.numQuestions} ${qt.type} question${qt.numQuestions > 1 ? 's' : ''}, ${qt.marks} mark${qt.marks > 1 ? 's' : ''} each (DO NOT generate more or fewer)`
    )
    .join('\n');

  const totalQuestions = assignmentData.questionTypes.reduce(
    (sum, qt) => sum + qt.numQuestions,
    0
  );

  return `
You are an expert teacher creating a formal exam paper.

STRICT RULES — follow exactly:
1. Generate EXACTLY ${totalQuestions} questions total across all sections.
2. Each section must have the EXACT number of questions specified below. Do not add extras.
3. Return ONLY raw JSON. No markdown, no backticks, no explanation text.
4. For "Multiple Choice Questions" sections, ALWAYS include an "options" array with EXACTLY 4 answer choices (e.g. ["A) ...", "B) ...", "C) ...", "D) ..."]).
5. For all other question types (Short Questions, Long Answer, etc.), set "options" to null.

Sections to generate:
${sectionLines}

Additional context from teacher: ${assignmentData.instructions || 'None'}

Difficulty distribution per section: 40% Easy, 40% Moderate, 20% Challenging.

The JSON must follow this EXACT shape:
{
  "sections": [
    {
      "title": "Section A",
      "questionType": "Multiple Choice Questions",
      "instruction": "Attempt all questions. Each question carries X mark(s).",
      "questions": [
        {
          "text": "question text here",
          "difficulty": "Easy",
          "marks": 1,
          "type": "Multiple Choice Questions",
          "options": ["A) option one", "B) option two", "C) option three", "D) option four"],
          "answerKey": "A) option one"
        }
      ]
    },
    {
      "title": "Section B",
      "questionType": "Short Questions",
      "instruction": "Attempt all questions. Each question carries X mark(s).",
      "questions": [
        {
          "text": "question text here",
          "difficulty": "Moderate",
          "marks": 2,
          "type": "Short Questions",
          "options": null,
          "answerKey": "brief answer here"
        }
      ]
    }
  ],
  "metadata": {
    "subject": "extract from instructions or write General",
    "className": "extract from instructions or leave empty string",
    "timeAllowed": "calculate based on total questions (roughly 2 minutes per mark)",
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
  console.log('Requested question counts:', assignmentData.questionTypes.map(qt => `${qt.type}: ${qt.numQuestions}`).join(', '));

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

  // ── ENFORCE exact question counts ────────────────────────────────────────
  // Gemini often generates more questions than asked. Trim each section to
  // exactly the requested numQuestions, regardless of what Gemini returned.
  parsed.sections = parsed.sections.map((section, i) => {
    const requested = assignmentData.questionTypes[i];
    if (!requested) return section;

    const trimmed = section.questions.slice(0, requested.numQuestions);
    if (section.questions.length !== requested.numQuestions) {
      console.warn(
        `[aiService] Section ${sectionLetters[i]} (${requested.type}): Gemini returned ${section.questions.length} questions, expected ${requested.numQuestions}. Trimming to ${trimmed.length}.`
      );
    }
    return { ...section, questions: trimmed };
  });

  // Calculate totalMarks from the ACTUAL trimmed data
  const totalMarks = assignmentData.questionTypes.reduce(
    (sum, qt) => sum + qt.numQuestions * qt.marks,
    0
  );
  parsed.metadata.totalMarks = totalMarks;

  console.log('Gemini response parsed and enforced successfully');
  console.log('Final question counts:', parsed.sections.map((s, i) => `${sectionLetters[i]}: ${s.questions.length}`).join(', '));

  return {
    sections: parsed.sections,
    metadata: parsed.metadata,
  };
}