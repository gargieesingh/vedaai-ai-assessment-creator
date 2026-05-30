"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAssignmentStore } from "@/features/assignments/hooks/assignmentStore";
import StepIndicator from "@/features/assignments/components/CreateAssignmentForm/StepIndicator";
import Step1Details from "@/features/assignments/components/CreateAssignmentForm/Step1Details";

// ── Main form — scrollable content only, no footer ────────────────────────────

interface FieldError {
  dueDate?: string;
  questionTypes?: string;
}

function CreateFormFooter({ validateForm }: { validateForm: () => boolean }) {
  const router = useRouter();
  const { formStep, isGenerating, resetForm, submitForm, setFormStep } =
    useAssignmentStore();

  const handlePrev = () => {
    if (formStep > 1) {
      setFormStep(formStep - 1);
    } else {
      resetForm();
      router.push("/assignments/list");
    }
  };

  const handleNext = async () => {
    if (formStep === 1) {
      const isValid = validateForm();
      if (!isValid) return;
      submitForm();
      router.push("/assignments/output");
    } else {
      submitForm();
      router.push("/assignments/output");
    }
  };

  return (
    <div
      className="create-footer"
      style={{
        paddingTop: 28,
        paddingBottom: 18,
        flexShrink: 0,
      }}
    >
      <div
        className="create-footer__row"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          height: 46,
        }}
      >
        <button
          id="form-prev-btn"
          onClick={handlePrev}
          style={{
            display: "inline-flex",
            flexDirection: "row",
            alignItems: "center",
            padding: "12px 24px",
            gap: 4,
            height: 46,
            background: "#FFFFFF",
            color: "#303030",
            border: "none",
            borderRadius: 48,
            fontSize: 16,
            fontWeight: 500,
            lineHeight: "140%",
            letterSpacing: "-0.04em",
            cursor: "pointer",
            fontFamily: "'Bricolage Grotesque', inherit",
            transition: "opacity 0.15s",
            boxSizing: "border-box",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.opacity = "0.85";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.opacity = "1";
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M8.92243 3.57745C9.24786 3.90289 9.24786 4.43053 8.92243 4.75596L4.51168 9.16671H17.4998C17.9601 9.16671 18.3332 9.5398 18.3332 10C18.3332 10.4603 17.9601 10.8334 17.4998 10.8334H4.51168L8.92243 15.2441C9.24786 15.5696 9.24786 16.0972 8.92243 16.4226C8.59699 16.7481 8.06935 16.7481 7.74391 16.4226L1.91058 10.5893C1.58514 10.2639 1.58514 9.73622 1.91058 9.41079L7.74391 3.57745C8.06935 3.25201 8.59699 3.25201 8.92243 3.57745Z" fill="#303030"/>
          </svg>
          Previous
        </button>

        <button
          id="form-next-btn"
          onClick={handleNext}
          disabled={isGenerating}
          style={{
            display: "inline-flex",
            flexDirection: "row",
            alignItems: "center",
            padding: "12px 24px",
            gap: 4,
            height: 46,
            background: isGenerating ? "#888" : "#181818",
            color: "#FFFFFF",
            border: "none",
            borderRadius: 48,
            fontSize: 16,
            fontWeight: 500,
            lineHeight: "140%",
            letterSpacing: "-0.04em",
            cursor: isGenerating ? "not-allowed" : "pointer",
            fontFamily: "'Bricolage Grotesque', inherit",
            transition: "all 0.18s",
            boxSizing: "border-box",
          }}
          onMouseEnter={(e) => {
            if (!isGenerating) {
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
            }
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
          }}
        >
          {isGenerating ? "Generating..." : "Next"}
          {!isGenerating && (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M11.0772 3.57745C11.4027 3.25201 11.9303 3.25201 12.2558 3.57745L18.0891 9.41079C18.4145 9.73622 18.4145 10.2639 18.0891 10.5893L12.2558 16.4226C11.9303 16.7481 11.4027 16.7481 11.0772 16.4226C10.7518 16.0972 10.7518 15.5696 11.0772 15.2441L15.488 10.8334H2.49984C2.0396 10.8334 1.6665 10.4603 1.6665 10C1.6665 9.5398 2.0396 9.16671 2.49984 9.16671H15.488L11.0772 4.75596C10.7518 4.43053 10.7518 3.90289 11.0772 3.57745Z" fill="white"/>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

export default function CreateAssignmentForm() {
  const { formStep, formData, updateFormData, addQuestionType, resetForm } = useAssignmentStore();

  const [dragOver, setDragOver] = useState(false);
  const [errors, setErrors] = useState<FieldError>({});
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Reset the form when entering the create page to ensure we start clean at step 1
  React.useEffect(() => {
    resetForm();
  }, [resetForm]);

  const totalQuestions = formData.questionTypes.reduce((s, q) => s + q.count, 0);
  const totalMarks = formData.questionTypes.reduce((s, q) => s + q.count * q.marks, 0);


  // Validate and expose result — CreateFormFooter triggers this via custom event
  const validate = useCallback((): boolean => {
    const newErrors: FieldError = {};

    if (!formData.dueDate) {
      newErrors.dueDate = "Due date is required";
    } else {
      const parts = formData.dueDate.split("-");
      if (parts.length === 3) {
        const [dd, mm, yyyy] = parts;
        const date = new Date(`${yyyy}-${mm}-${dd}`);
        if (isNaN(date.getTime()) || date <= new Date()) {
          newErrors.dueDate = "Due date must be a future date";
        }
      } else {
        newErrors.dueDate = "Use DD-MM-YYYY format";
      }
    }

    if (formData.questionTypes.length === 0) {
      newErrors.questionTypes = "Add at least one question type";
    }
    const types = formData.questionTypes.map((q) => q.type);
    if (new Set(types).size !== types.length) {
      newErrors.questionTypes = "Duplicate question types are not allowed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Listen for validation request from footer
  useEffect(() => {
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<{ resolve: (ok: boolean) => void }>;
      const ok = validate();
      customEvent.detail?.resolve(ok);
    };
    window.addEventListener("veda:validate-form", handler);
    return () => window.removeEventListener("veda:validate-form", handler);
  }, [validate]);

  const handleFileChange = (file: File) => {
    updateFormData({ fileName: file.name, fileUrl: URL.createObjectURL(file) });
  };

  return (
    <div className="create-assignment" style={{ paddingTop: 20, paddingBottom: 20 }}>

      {/* ── Page title — left-aligned, matching /assignments layout ── */}
      <div
        className="create-assignment__title"
        style={{
          marginBottom: 14,
          paddingLeft: 8,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: "#4BC26D",
            display: "inline-block",
            flexShrink: 0,
            boxShadow: "0 0 0 4px rgba(75, 194, 109, 0.4)",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <h1
            style={{
              fontSize: 21,
              fontWeight: 700,
              color: "#1A1A1A",
              letterSpacing: "-0.2px",
              lineHeight: 1.2,
            }}
          >
            Create Assignment
          </h1>
          <p style={{ fontSize: 14, color: "#8C8C8C", margin: 0, lineHeight: 1.2 }}>
            Set up a new assignment for your students
          </p>
        </div>
      </div>


      {/* ── Form card + step indicator — same width ── */}
      <div
        className="create-assignment__body"
        style={{ maxWidth: 810, width: "100%", margin: "0 auto", paddingLeft: 22, paddingRight: 22, boxSizing: "border-box" }}
      >
        <StepIndicator formStep={formStep} />
        <Step1Details
          formData={formData}
          errors={errors}
          setErrors={setErrors}
          dragOver={dragOver}
          setDragOver={setDragOver}
          handleFileChange={handleFileChange}
          fileInputRef={fileInputRef}
          addQuestionType={addQuestionType}
          updateFormData={updateFormData}
          totalQuestions={totalQuestions}
          totalMarks={totalMarks}
        />
        <CreateFormFooter validateForm={validate} />
      </div>
    </div>
  );
}
