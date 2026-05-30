import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  Assignment,
  AssignmentFormData,
  GeneratedPaper,
  QuestionTypeRow,
} from "@/features/assignments/types/assignment";
import { v4 as uuid } from "uuid";

const defaultFormData: AssignmentFormData = {
  dueDate: "",
  questionTypes: [],
  additionalInfo: "",
  subject: "Science",
  class: "8th",
  school: "Delhi Public School, Sector-4, Bokaro",
  timeAllowed: "45 minutes",
};

interface AssignmentStore {
  // List
  assignments: Assignment[];
  currentAssignmentId: string | null;
  // Create form
  formStep: number;
  formData: AssignmentFormData;
  isGenerating: boolean;
  generatedOutput: GeneratedPaper | null;
  // Actions
  setFormStep: (step: number) => void;
  updateFormData: (data: Partial<AssignmentFormData>) => void;
  addQuestionType: () => void;
  removeQuestionType: (id: string) => void;
  updateQuestionType: (id: string, field: string, value: string | number) => void;
  submitForm: () => void;
  deleteAssignment: (id: string) => void;
  patchAssignment: (id: string, patch: Partial<Assignment>) => void;
  setGeneratedOutput: (paper: GeneratedPaper | null) => void;
  setIsGenerating: (v: boolean) => void;
  resetForm: () => void;
}

export const useAssignmentStore = create<AssignmentStore>()(
  persist(
    (set, get) => ({
      assignments: [
      ],
      currentAssignmentId: null,
      formStep: 1,
      formData: { ...defaultFormData },
      isGenerating: false,
      generatedOutput: null,

      setFormStep: (step) => set({ formStep: step }),

      updateFormData: (data) =>
        set((state) => ({ formData: { ...state.formData, ...data } })),

      addQuestionType: () => {
        const existing = get().formData.questionTypes;
        const allTypes = [
          "Multiple Choice Questions",
          "Short Questions",
          "Long Answer Questions",
          "Fill in the Blanks",
          "True / False",
          "Diagram/Graph-Based Questions",
          "Numerical Problems",
        ];
        const usedTypes = existing.map((q) => q.type);
        const nextType = allTypes.find((t) => !usedTypes.includes(t)) ?? allTypes[0];
        const newRow: QuestionTypeRow = {
          id: uuid(),
          type: nextType,
          count: 1,
          marks: 1,
        };
        set((state) => ({
          formData: {
            ...state.formData,
            questionTypes: [...state.formData.questionTypes, newRow],
          },
        }));
      },

      removeQuestionType: (id) =>
        set((state) => ({
          formData: {
            ...state.formData,
            questionTypes: state.formData.questionTypes.filter((q) => q.id !== id),
          },
        })),

      updateQuestionType: (id, field, value) =>
        set((state) => ({
          formData: {
            ...state.formData,
            questionTypes: state.formData.questionTypes.map((q) =>
              q.id === id ? { ...q, [field]: value } : q
            ),
          },
        })),

      submitForm: () => {
        const { formData } = get();
        const apiBase =
          process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
          "http://localhost:5000";

        const totalMarks = formData.questionTypes.reduce(
          (sum, qt) => sum + qt.count * qt.marks,
          0
        );
        const durationMatch = formData.timeAllowed.match(/\d+/);
        const duration = durationMatch ? Number(durationMatch[0]) : 45;

        set({ isGenerating: true, generatedOutput: null });

        const cleanClassVal = (formData.class || "").replace(/^class\s+/i, "").trim() || "____";
        const cleanSubjectVal = (formData.subject || "").trim() || "General";
        const initialAssignmentTitle = `Class ${cleanClassVal} ${cleanSubjectVal} Assignment`;

        fetch(`${apiBase}/api/assignments`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: initialAssignmentTitle,
            dueDate: formData.dueDate,
            questionTypes: formData.questionTypes.map((qt) => ({
              type: qt.type,
              numQuestions: qt.count,
              marks: qt.marks,
            })),
            instructions: [
              formData.additionalInfo.trim(),
              formData.subject !== "Science" ? `Subject: ${formData.subject}` : "",
              formData.class !== "8th" ? `Grade/Class: ${formData.class}` : "",
            ].filter(Boolean).join(". ") || `Subject: Science. Grade/Class: 8th.`,
          }),
        })
          .then(async (res) => {
            if (!res.ok) {
              const error = await res.json().catch(() => ({}));
              throw new Error(error.message || error.error || "Failed to create assignment");
            }
            return res.json();
          })
          .then((data) => {
            const assignmentId = String(data.assignmentId ?? "");
            if (!assignmentId) throw new Error("Missing assignment id");

            const newAssignment: Assignment = {
              id: assignmentId,
              title: initialAssignmentTitle,
              assignedOn: new Date().toLocaleDateString("en-GB").replace(/\//g, "-"),
              dueDate: formData.dueDate,
              subject: formData.subject,
              class: formData.class,
            };

            set((state) => ({
              currentAssignmentId: assignmentId,
              assignments: [newAssignment, ...state.assignments],
            }));

            const poll = async () => {
              const res = await fetch(`${apiBase}/api/assignments/${assignmentId}`);
              if (!res.ok) throw new Error("Failed to fetch assignment status");
              const response = await res.json();

              if (response.status === "complete" || response.status === "completed") {
                if (!response.result) {
                  // Fallback in case result object is temporarily null
                  setTimeout(poll, 2000);
                  return;
                }

                // Map sections directly from the backend populated result sections
                const sections = response.result.sections.map((sec: any) => ({
                  title: sec.title,
                  questionType: sec.questionType,
                  instruction: sec.instruction,
                  questions: sec.questions.map((q: any, qIdx: number) => ({
                    id: qIdx + 1,
                    text: q.text,
                    difficulty:
                      q.difficulty === "Easy"
                        ? "Easy"
                        : q.difficulty === "Medium" || q.difficulty === "Moderate"
                          ? "Moderate"
                          : "Challenging",
                    marks: q.marks,
                    options: q.options,
                  })),
                }));

                // Collect answer keys from all questions in the sections
                const answerKey: any[] = [];
                let ansIdx = 1;
                response.result.sections.forEach((sec: any) => {
                  const sectionLetter = sec.title.replace("Section ", "").trim();
                  sec.questions.forEach((q: any, qIdx: number) => {
                    answerKey.push({
                      id: ansIdx++,
                      questionSection: sectionLetter,
                      questionNumber: qIdx + 1,
                      text: q.answerKey || q.correctAnswer || "Answer not available.",
                    });
                  });
                });

                const paper: GeneratedPaper = {
                  school: formData.school,
                  subject: response.result.metadata?.subject || formData.subject,
                  class: response.result.metadata?.className || formData.class,
                  timeAllowed: response.result.metadata?.timeAllowed || formData.timeAllowed,
                  maxMarks: response.result.metadata?.totalMarks || totalMarks,
                  sections: sections.filter((s: any) => s.questions.length > 0),
                  answerKey,
                };

                // Dynamically update the assignment list card with AI-extracted subject and grade
                const finalClass = (response.result.metadata?.className || formData.class).replace(/^class\s+/i, "").trim() || "____";
                const finalSubject = (response.result.metadata?.subject || formData.subject).trim() || "General";
                const finalTitle = `Class ${finalClass} ${finalSubject} Assignment`;

                set((state) => ({
                  assignments: state.assignments.map((a) =>
                    a.id === assignmentId
                      ? {
                          ...a,
                          title: finalTitle,
                          class: response.result.metadata?.className || formData.class,
                          subject: response.result.metadata?.subject || formData.subject,
                        }
                      : a
                  ),
                  isGenerating: false,
                  generatedOutput: paper,
                }));
                return;
              }

              if (response.status === "error" || response.status === "failed") {
                set({ isGenerating: false, generatedOutput: null });
                return;
              }

              setTimeout(poll, 2000);
            };

            poll().catch(() => {
              set({ isGenerating: false, generatedOutput: null });
            });
          })
          .catch(() => {
            set({ isGenerating: false, generatedOutput: null });
          });
      },

      deleteAssignment: (id) =>
        set((state) => ({
          assignments: state.assignments.filter((a) => a.id !== id),
        })),

      patchAssignment: (id, patch) =>
        set((state) => ({
          assignments: state.assignments.map((a) =>
            a.id === id ? { ...a, ...patch } : a
          ),
        })),

      setGeneratedOutput: (paper) => set({ generatedOutput: paper }),
      setIsGenerating: (v) => set({ isGenerating: v }),

      resetForm: () =>
        set({
          formStep: 1,
          formData: { ...defaultFormData },
          isGenerating: false,
          generatedOutput: null,
          currentAssignmentId: null,
        }),
    }),
    { name: "veda-assignment-store" }
  )
);
