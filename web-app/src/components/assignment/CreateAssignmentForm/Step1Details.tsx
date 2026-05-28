"use client";

import React from "react";
import { X, ChevronDown, Mic, Upload } from "lucide-react";
import { useAssignmentStore } from "@/store/assignmentStore";
import { QuestionTypeRow } from "@/types/assignment";
import Stepper from "@/components/ui/Stepper";

const QUESTION_TYPES = [
  "Multiple Choice Questions",
  "Short Questions",
  "Long Answer Questions",
  "Fill in the Blanks",
  "True / False",
  "Diagram/Graph-Based Questions",
  "Numerical Problems",
];

interface FieldError {
  dueDate?: string;
  questionTypes?: string;
}

interface Step1DetailsProps {
  formData: {
    dueDate: string;
    fileName?: string | null;
    additionalInfo: string;
    questionTypes: QuestionTypeRow[];
  };
  errors: FieldError;
  setErrors: React.Dispatch<React.SetStateAction<FieldError>>;
  dragOver: boolean;
  setDragOver: (value: boolean) => void;
  handleFileChange: (file: File) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  addQuestionType: () => void;
  updateFormData: (data: Partial<Step1DetailsProps["formData"]>) => void;
  totalQuestions: number;
  totalMarks: number;
}

function QuestionTypeRowComponent({ row }: { row: QuestionTypeRow }) {
  const updateQuestionType = useAssignmentStore((s) => s.updateQuestionType);
  const removeQuestionType = useAssignmentStore((s) => s.removeQuestionType);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 8,
      }}
    >
      <div style={{ position: "relative", flex: 1, minWidth: 0 }}>
        <select
          id={`qt-type-${row.id}`}
          value={row.type}
          onChange={(e) => updateQuestionType(row.id, "type", e.target.value)}
          style={{
            width: "100%",
            height: 36,
            padding: "0 36px 0 12px",
            border: "1px solid #E2E2E2",
            borderRadius: 10,
            fontSize: 13,
            color: "#1A1A1A",
            background: "#ffffff",
            outline: "none",
            appearance: "none",
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          {QUESTION_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <ChevronDown
          size={14}
          color="#888"
          style={{
            position: "absolute",
            right: 10,
            top: "50%",
            transform: "translateY(-50%)",
            pointerEvents: "none",
          }}
        />
      </div>

      <button
        id={`qt-remove-${row.id}`}
        onClick={() => removeQuestionType(row.id)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#BBBBBB",
          display: "flex",
          padding: 4,
          borderRadius: 4,
          fontFamily: "inherit",
          flexShrink: 0,
          transition: "color 0.12s",
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.color = "#E53935")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.color = "#BBBBBB")
        }
      >
        <X size={15} />
      </button>

      <Stepper
        id={`qt-count-${row.id}`}
        value={row.count}
        onChange={(v) => updateQuestionType(row.id, "count", v)}
        min={1}
        max={50}
      />

      <Stepper
        id={`qt-marks-${row.id}`}
        value={row.marks}
        onChange={(v) => updateQuestionType(row.id, "marks", v)}
        min={1}
        max={100}
      />
    </div>
  );
}

export default function Step1Details({
  formData,
  errors,
  setErrors,
  dragOver,
  setDragOver,
  handleFileChange,
  fileInputRef,
  addQuestionType,
  updateFormData,
  totalQuestions,
  totalMarks,
}: Step1DetailsProps) {
  return (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.50)",
        backdropFilter: "blur(40px) saturate(180%)",
        WebkitBackdropFilter: "blur(40px) saturate(180%)",
        borderRadius: 18,
        padding: 32,
        display: "flex",
        flexDirection: "column",
        gap: 32,
        boxShadow: "0 8px 20px -4px rgba(0,0,0,0.14)",
        border: "1.5px solid rgba(255, 255, 255, 1)",
      }}
    >
      {/* Section title */}
      <div>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: "#1A1A1A", marginBottom: 4 }}>
          Assignment Details
        </h2>
        <p style={{ fontSize: 12.5, color: "#9A9A9A" }}>
          Basic information about your assignment
        </p>
      </div>

      <div
        id="file-upload-zone"
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          const file = e.dataTransfer.files[0];
          if (file) handleFileChange(file);
        }}
        onClick={() => fileInputRef.current?.click()}
        style={{
          border: `2px dashed ${dragOver ? "#E8490F" : "#D8D8D8"}`,
          borderRadius: 12,
          padding: "22px 20px",
          textAlign: "center",
          background: dragOver ? "rgba(232,73,15,0.03)" : "#FAFAFA",
          transition: "all 0.15s",
          cursor: "pointer",
          marginBottom: 0,
        }}
      >
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: "50%",
            border: "1.5px solid #D0D0D0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 10px",
            background: "#fff",
          }}
        >
          <Upload size={18} color="#888888" />
        </div>
        <p style={{ fontSize: 14, fontWeight: 600, color: "#1A1A1A", marginBottom: 3 }}>
          {formData.fileName ?? "Choose a file or drag & drop it here"}
        </p>
        <p style={{ fontSize: 12, color: "#AAAAAA", marginBottom: 12 }}>
          JPEG, PNG, upto 10MB
        </p>
        <button
          id="browse-files-btn"
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current?.click();
          }}
          style={{
            padding: "6px 20px",
            border: "1px solid #D8D8D8",
            borderRadius: 8,
            background: "white",
            fontSize: 12.5,
            fontWeight: 500,
            cursor: "pointer",
            fontFamily: "inherit",
            color: "#1A1A1A",
            transition: "border-color 0.15s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "#888";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "#D8D8D8";
          }}
        >
          Browse Files
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png"
          style={{ display: "none" }}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileChange(file);
          }}
        />
      </div>
      <p style={{ fontSize: 11.5, color: "#AAAAAA", textAlign: "center" }}>
        Upload images of your preferred document/image
      </p>

      <div style={{ marginBottom: 22 }}>
        <label
          style={{ display: "block", fontSize: 13.5, fontWeight: 600, color: "#1A1A1A", marginBottom: 8 }}
        >
          Due Date
        </label>
        <div style={{ position: "relative" }}>
          <input
            id="due-date-input"
            type="text"
            placeholder="DD-MM-YYYY"
            value={formData.dueDate}
            onChange={(e) => {
              updateFormData({ dueDate: e.target.value });
              if (errors.dueDate) setErrors((p) => ({ ...p, dueDate: undefined }));
            }}
            style={{
              width: "100%",
              height: 42,
              padding: "0 44px 0 14px",
              border: `1px solid ${errors.dueDate ? "#E53935" : "#E0E0E0"}`,
              borderRadius: 10,
              fontSize: 13.5,
              color: "#1A1A1A",
              outline: "none",
              fontFamily: "inherit",
              background: "#fff",
              transition: "border-color 0.15s",
            }}
            onFocus={(e) => {
              if (!errors.dueDate) (e.target as HTMLInputElement).style.borderColor = "#E8490F";
            }}
            onBlur={(e) => {
              if (!errors.dueDate) (e.target as HTMLInputElement).style.borderColor = "#E0E0E0";
            }}
          />
          <svg
            width="17" height="17" viewBox="0 0 24 24" fill="none"
            stroke="#AAAAAA" strokeWidth="2"
            style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
        </div>
        {errors.dueDate && (
          <p style={{ fontSize: 12, color: "#E53935", marginTop: 5 }}>{errors.dueDate}</p>
        )}
      </div>

      <div style={{ marginBottom: 22 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <span style={{ flex: 1, fontSize: 12.5, color: "#9A9A9A", fontWeight: 500 }}>
            Question Type
          </span>
          <span style={{ width: 23, flexShrink: 0 }} />
          <span style={{ width: 110, fontSize: 12.5, color: "#9A9A9A", fontWeight: 500, textAlign: "center", flexShrink: 0 }}>
            No. of Questions
          </span>
          <span style={{ width: 110, fontSize: 12.5, color: "#9A9A9A", fontWeight: 500, textAlign: "center", flexShrink: 0 }}>
            Marks
          </span>
        </div>

        {formData.questionTypes.map((row) => (
          <QuestionTypeRowComponent key={row.id} row={row} />
        ))}

        {errors.questionTypes && (
          <p style={{ fontSize: 12, color: "#E53935", marginBottom: 8 }}>{errors.questionTypes}</p>
        )}

        <button
          id="add-question-type-btn"
          onClick={() => {
            addQuestionType();
            if (errors.questionTypes) setErrors((p) => ({ ...p, questionTypes: undefined }));
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 500,
            color: "#1A1A1A",
            marginTop: 6,
            fontFamily: "inherit",
            padding: 0,
          }}
        >
          <span
            style={{
              width: 26,
              height: 26,
              borderRadius: "50%",
              background: "#1A1A1A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span style={{ color: "white", fontSize: 13, lineHeight: 0 }}>+</span>
          </span>
          Add Question Type
        </button>

        {formData.questionTypes.length > 0 && (
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 24, marginTop: 14 }}>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: "#4B4B4B" }}>
              Total Questions : {totalQuestions}
            </span>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: "#4B4B4B" }}>
              Total Marks : {totalMarks}
            </span>
          </div>
        )}
      </div>

      <div>
        <label style={{ display: "block", fontSize: 13.5, fontWeight: 600, color: "#1A1A1A", marginBottom: 8 }}>
          Additional Information{" "}
          <span style={{ fontWeight: 400, color: "#AAAAAA" }}>(For better output)</span>
        </label>
        <div style={{ position: "relative" }}>
          <textarea
            id="additional-info-textarea"
            value={formData.additionalInfo}
            onChange={(e) => updateFormData({ additionalInfo: e.target.value })}
            placeholder="e.g Generate a question paper for 3 hour exam duration..."
            rows={3}
            style={{
              width: "100%",
              minHeight: 80,
              padding: "12px 42px 12px 14px",
              border: "1px solid #E2E2E2",
              borderRadius: 12,
              fontSize: 13,
              color: "#1A1A1A",
              fontStyle: "italic",
              resize: "vertical",
              outline: "none",
              fontFamily: "inherit",
              background: "#fff",
              lineHeight: 1.6,
              transition: "border-color 0.15s",
            }}
            onFocus={(e) => ((e.target as HTMLTextAreaElement).style.borderColor = "#E8490F")}
            onBlur={(e) => ((e.target as HTMLTextAreaElement).style.borderColor = "#E0E0E0")}
          />
          <Mic
            size={16}
            color="#BBBBBB"
            style={{ position: "absolute", right: 12, bottom: 13, cursor: "pointer" }}
          />
        </div>
      </div>
    </div>
  );
}
