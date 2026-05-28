import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  Assignment,
  AssignmentFormData,
  GeneratedPaper,
  QuestionTypeRow,
} from "@/types/assignment";
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
        const topics = formData.questionTypes.map((qt) => qt.type);

        set({ isGenerating: true, generatedOutput: null });

        fetch(`${apiBase}/api/assignments`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: `${formData.subject} Assignment`,
            dueDate: formData.dueDate || new Date().toISOString().split('T')[0],
            questionTypes: formData.questionTypes.map((qt) => ({
              type: qt.type,
              numQuestions: qt.count,
              marks: qt.marks
            })),
            instructions: formData.additionalInfo || `${formData.subject} for class ${formData.class}`,
            fileUrl: formData.fileUrl
          }),
        })
          .then(async (res) => {
            if (!res.ok) {
              const error = await res.json().catch(() => ({}));
              throw new Error(error.error || "Failed to create assignment");
            }
            return res.json();
          })
          .then((data) => {
            const assignmentId = String(data.assignmentId ?? "");
            if (!assignmentId) throw new Error("Missing assignment id");

            const newAssignment: Assignment = {
              id: assignmentId,
              title: `${formData.subject} Assignment`,
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
              const data = await res.json();

              console.log('[Poll] assignment status:', data.status, data);

              if (data.status === "complete" && data.result) {
                const result = data.result;

                const paper: GeneratedPaper = {
                  school: formData.school,
                  subject: result.metadata?.subject || formData.subject,
                  class: result.metadata?.className || formData.class,
                  timeAllowed: result.metadata?.timeAllowed || formData.timeAllowed,
                  maxMarks: result.metadata?.totalMarks || totalMarks,
                  sections: (result.sections || []).map((sec: any) => ({
                    title: sec.title,
                    instruction: sec.instruction,
                    questions: (sec.questions || []).map((q: any, idx: number) => ({
                      id: idx + 1,
                      text: q.text,
                      difficulty: q.difficulty,
                      marks: q.marks,
                      options: q.options,
                      answerKey: q.answerKey,
                    })),
                  })),
                  answerKey: (result.sections || []).flatMap((sec: any) =>
                    (sec.questions || []).map((q: any, idx: number) => ({
                      id: idx + 1,
                      text: q.answerKey || "N/A",
                    }))
                  ),
                };

                set({ isGenerating: false, generatedOutput: paper });
                return;
              }

              if (data.status === "error") {
                console.error('[Poll] generation failed');
                set({ isGenerating: false, generatedOutput: null });
                return;
              }

              // Still pending or processing — keep polling
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
