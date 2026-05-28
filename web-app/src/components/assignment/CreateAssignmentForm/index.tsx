"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAssignmentStore } from "@/store/assignmentStore";
import StepIndicator from "@/components/assignment/CreateAssignmentForm/StepIndicator";
import Step1Details from "@/components/assignment/CreateAssignmentForm/Step1Details";

// ── Main form — scrollable content only, no footer ────────────────────────────

interface FieldError {
  dueDate?: string;
  questionTypes?: string;
}

function CreateFormFooter() {
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
      const isValid = await new Promise<boolean>((resolve) => {
        window.dispatchEvent(
          new CustomEvent("veda:validate-form", { detail: { resolve } })
        );
        setTimeout(() => resolve(false), 200);
      });
      if (!isValid) return;
      setFormStep(2);
    } else {
      submitForm();
      router.push("/assignments/output");
    }
  };

  return (
    <div
      style={{
        paddingTop: 14,
        paddingBottom: 18,
        flexShrink: 0,
      }}
    >
      <div
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
            alignItems: "center",
            height: 42,
            padding: "0 22px",
            background: "white",
            color: "#1A1A1A",
            border: "1px solid #D8D8D8",
            borderRadius: 999,
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
            fontFamily: "inherit",
            transition: "border-color 0.15s",
            gap: 8,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "#1A1A1A";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "#D8D8D8";
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Previous
        </button>

        <button
          id="form-next-btn"
          onClick={handleNext}
          disabled={isGenerating}
          style={{
            display: "inline-flex",
            alignItems: "center",
            height: 42,
            padding: "0 26px",
            background: isGenerating ? "#888" : "#1A1A1A",
            color: "white",
            border: "none",
            borderRadius: 999,
            fontSize: 13,
            fontWeight: 500,
            cursor: isGenerating ? "not-allowed" : "pointer",
            fontFamily: "inherit",
            transition: "all 0.18s",
            boxShadow: "0 4px 14px rgba(0,0,0,0.18)",
            gap: 8,
          }}
          onMouseEnter={(e) => {
            if (!isGenerating) {
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 6px 20px rgba(0,0,0,0.22)";
            }
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              "0 4px 14px rgba(0,0,0,0.18)";
          }}
        >
          {isGenerating ? "Generating..." : "Next"}
          {!isGenerating && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>}
        </button>
      </div>
    </div>
  );
}

export default function CreateAssignmentForm() {
  const { formStep, formData, updateFormData, addQuestionType } = useAssignmentStore();

  const [dragOver, setDragOver] = useState(false);
  const [errors, setErrors] = useState<FieldError>({});
  const fileInputRef = React.useRef<HTMLInputElement>(null);

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
    <div style={{ paddingTop: 20, paddingBottom: 20 }}>

      {/* ── Page title — left-aligned, matching /assignments layout ── */}
      <div style={{ marginBottom: 14, paddingLeft: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#22C55E",
              display: "inline-block",
              flexShrink: 0,
              boxShadow: "0 0 0 3px rgba(34,197,94,0.18)",
            }}
          />
          <h1
            style={{
              fontSize: 19,
              fontWeight: 700,
              color: "#1A1A1A",
              letterSpacing: "-0.2px",
            }}
          >
            Create Assignment
          </h1>
        </div>
        <p style={{ fontSize: 12.5, color: "#8C8C8C", marginLeft: 18 }}>
          Set up a new assignment for your students
        </p>
      </div>

      {/* ── Form card + step indicator — same width ── */}
      <div style={{ maxWidth: 810, width: "100%", margin: "0 auto", paddingLeft: 22, paddingRight: 22, boxSizing: "border-box" }}>
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
        <CreateFormFooter />
      </div>
    </div>
  );
}
