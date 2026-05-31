"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useAssignmentStore } from "@/features/assignments/hooks/assignmentStore";
import { QuestionTypeRow } from "@/features/assignments/types/assignment";
import Stepper from "@/shared/components/ui/Stepper";

const UploadCloudIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_2_9459)">
      <path d="M7.99996 16L12 12L16 16M12 12V21M20.39 18.39C21.3653 17.8583 22.1358 17.0169 22.5798 15.9986C23.0239 14.9804 23.1162 13.8432 22.8422 12.7667C22.5682 11.6901 21.9434 10.7355 21.0666 10.0534C20.1898 9.37137 19.1108 9.00072 18 8.99998H16.74C16.4373 7.82923 15.8731 6.74232 15.0899 5.82098C14.3067 4.89964 13.3248 4.16783 12.2181 3.68059C11.1113 3.19335 9.90851 2.96334 8.70008 3.00787C7.49164 3.05239 6.30903 3.37028 5.24114 3.93765C4.17325 4.50501 3.24787 5.30709 2.53458 6.28357C1.82129 7.26004 1.33865 8.38552 1.12294 9.57538C0.90723 10.7652 0.964065 11.9885 1.28917 13.1532C1.61428 14.318 2.1992 15.3938 2.99996 16.3" stroke="#1E1E1E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    <defs>
      <clipPath id="clip0_2_9459">
        <rect width="24" height="24" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

const CalendarPlusIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M2 8C2 5.23858 4.23858 3 7 3H17C19.7614 3 22 5.23858 22 8V17C22 19.7614 19.7614 22 17 22H7C4.23858 22 2 19.7614 2 17V8ZM7 5C5.34315 5 4 6.34315 4 8V17C4 18.6569 5.34315 20 7 20H17C18.6569 20 20 18.6569 20 17V8C20 6.34315 18.6569 5 17 5H7Z" fill="#2B2B2B"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M8 2C8.55228 2 9 2.44772 9 3V6C9 6.55228 8.55228 7 8 7C7.44772 7 7 6.55228 7 6V3C7 2.44772 7.44772 2 8 2Z" fill="#2B2B2B"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M16 2C16.5523 2 17 2.44772 17 3V6C17 6.55228 16.5523 7 16 7C15.4477 7 15 6.55228 15 6V3C15 2.44772 15.4477 2 16 2Z" fill="#2B2B2B"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M12 9C12.5523 9 13 9.44772 13 10V12H15C15.5523 12 16 12.4477 16 13C16 13.5523 15.5523 14 15 14H13V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16L11 14H9C8.44772 14 8 13.5523 8 13C8 12.4477 8.44772 12 9 12H11V10C11 9.44772 11.4477 9 12 9Z" fill="#2B2B2B"/>
  </svg>
);

const QuestionTypeCloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4L4 12M4 4L12 12" stroke="#303030" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const QuestionTypeDownIcon = ({ open }: { open: boolean }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      transform: open ? "rotate(180deg)" : "none",
      transition: "transform 0.18s",
    }}
  >
    <path d="M4 6L8 10L12 6" stroke="#303030" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AddQuestionTypeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M2.5 9.99996C2.5 9.53972 2.8731 9.16663 3.33333 9.16663H16.6667C17.1269 9.16663 17.5 9.53972 17.5 9.99996C17.5 10.4602 17.1269 10.8333 16.6667 10.8333H3.33333C2.8731 10.8333 2.5 10.4602 2.5 9.99996Z" fill="white"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M10.0002 2.5C10.4604 2.5 10.8335 2.8731 10.8335 3.33333L10.8335 16.6667C10.8335 17.1269 10.4604 17.5 10.0002 17.5C9.53992 17.5 9.16683 17.1269 9.16683 16.6667L9.16683 3.33333C9.16683 2.8731 9.53993 2.5 10.0002 2.5Z" fill="white"/>
  </svg>
);

const AdditionalInfoMicIcon = () => (
  <svg width="20" height="20" viewBox="0 0 73 63" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_dd_2_9548)">
      <path fillRule="evenodd" clipRule="evenodd" d="M34.7725 24.5455C34.7725 23.0393 35.9935 21.8182 37.4998 21.8182H38.8634C40.3696 21.8182 41.5907 23.0393 41.5907 24.5455V28.6364C41.5907 30.1427 40.3696 31.3637 38.8634 31.3637H37.4998C35.9935 31.3637 34.7725 30.1427 34.7725 28.6364V24.5455ZM33.4089 27.2728C33.7854 27.2728 34.0907 27.578 34.0907 27.9546V28.6364C34.0907 30.5192 35.617 32.0455 37.4998 32.0455H38.1816H38.8634C40.7462 32.0455 42.2725 30.5192 42.2725 28.6364V27.9546C42.2725 27.578 42.5778 27.2728 42.9543 27.2728C43.3309 27.2728 43.6361 27.578 43.6361 27.9546V28.6364C43.6361 31.2723 41.4993 33.4091 38.8634 33.4091V34.7728C38.8634 35.1493 38.5582 35.4546 38.1816 35.4546C37.805 35.4546 37.4998 35.1493 37.4998 34.7728L37.4998 33.4091C34.8639 33.4091 32.7271 31.2723 32.7271 28.6364V27.9546C32.7271 27.578 33.0323 27.2728 33.4089 27.2728Z" fill="#303030"/>
    </g>
    <defs>
      <filter id="filter0_dd_2_9548" x="-2.72727" y="-1.36359" width="81.8183" height="92.7273" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="21.8182"/>
        <feGaussianBlur stdDeviation="16.3636"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_9548"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="10.9091"/>
        <feGaussianBlur stdDeviation="16.3636"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"/>
        <feBlend mode="normal" in2="effect1_dropShadow_2_9548" result="effect2_dropShadow_2_9548"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_2_9548" result="shape"/>
      </filter>
    </defs>
  </svg>
);

// ── Custom dropdown — replaces native <select> to stay within layout ──────────
function QuestionTypeSelect({
  id,
  value,
  onChange,
  options,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={ref} style={{ position: "relative", width: "100%", height: 44 }}>
      {/* Trigger pill */}
      <button
        id={id}
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%",
          height: 44,
          padding: "11px 40px 11px 16px",
          border: "none",
          borderRadius: 100,
          fontSize: 16,
          fontWeight: 500,
          color: "#303030",
          letterSpacing: "-0.04em",
          lineHeight: "140%",
          background: "#FFFFFF",
          outline: "none",
          cursor: "pointer",
          fontFamily: "inherit",
          boxSizing: "border-box",
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis" }}>
          {value}
        </span>
      </button>

      {/* Chevron icon */}
      <div
        style={{
          position: "absolute",
          right: 14,
          top: "50%",
          transform: "translateY(-50%)",
          pointerEvents: "none",
        }}
      >
        <QuestionTypeDownIcon open={open} />
      </div>

      {/* Dropdown list */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            right: 0,
            background: "#FFFFFF",
            borderRadius: 16,
            boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)",
            zIndex: 50,
            overflow: "hidden",
            padding: "6px 0",
          }}
        >
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => { onChange(opt); setOpen(false); }}
              style={{
                display: "block",
                width: "100%",
                padding: "10px 16px",
                background: opt === value ? "#F0F0F0" : "transparent",
                color: "#303030",
                border: "none",
                textAlign: "left",
                fontSize: 15,
                fontWeight: opt === value ? 600 : 400,
                letterSpacing: "-0.03em",
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "background 0.1s",
              }}
              onMouseEnter={(e) => {
                if (opt !== value)
                  (e.currentTarget as HTMLButtonElement).style.background = "#F5F5F5";
              }}
              onMouseLeave={(e) => {
                if (opt !== value)
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

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
    fileName?: string;
    additionalInfo: string;
    questionTypes: QuestionTypeRow[];
  };
  errors: FieldError;
  setErrors: React.Dispatch<React.SetStateAction<FieldError>>;
  dragOver: boolean;
  setDragOver: (value: boolean) => void;
  handleFileChange: (file: File) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
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
        flexDirection: "row",
        alignItems: "center",
        padding: 0,
        gap: 12,
        width: "100%",
        height: 44,
        flexShrink: 0,
      }}
    >
      {/* Custom dropdown — stays inside layout, no native OS popup */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <QuestionTypeSelect
          id={`qt-type-${row.id}`}
          value={row.type}
          onChange={(v) => updateQuestionType(row.id, "type", v)}
          options={QUESTION_TYPES}
        />
      </div>

      {/* X button — 16×16px */}
      <button
        id={`qt-remove-${row.id}`}
        onClick={() => removeQuestionType(row.id)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#303030",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
          width: 16,
          height: 16,
          flexShrink: 0,
          transition: "opacity 0.12s",
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.opacity = "0.4")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.opacity = "1")
        }
      >
        <QuestionTypeCloseIcon />
      </button>
    </div>
  );
}

// ── Mobile-only question type card ─────────────────────────────────────────
function MobileQuestionTypeCard({ row }: { row: QuestionTypeRow }) {
  const updateQuestionType = useAssignmentStore((s) => s.updateQuestionType);
  const removeQuestionType = useAssignmentStore((s) => s.removeQuestionType);
  const [open, setOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div
      ref={cardRef}
      style={{
        background: "#FFFFFF",
        borderRadius: 24,
        padding: 12,
        gap: 12,
        display: "flex",
        flexDirection: "column",
        width: "100%",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      {/* Top row: type name + chevron + X */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
        }}
      >
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 24,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            fontFamily: "inherit",
            flex: 1,
            minWidth: 0,
          }}
        >
          <span
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: "#303030",
              letterSpacing: "-0.04em",
              lineHeight: "140%",
              textAlign: "left",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {row.type}
          </span>
          <QuestionTypeDownIcon open={open} />
        </button>

        <button
          type="button"
          onClick={() => removeQuestionType(row.id)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
            width: 16,
            height: 16,
            flexShrink: 0,
          }}
        >
          <QuestionTypeCloseIcon />
        </button>
      </div>

      {/* Dropdown list */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            right: 0,
            background: "#FFFFFF",
            borderRadius: 16,
            boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)",
            zIndex: 50,
            overflow: "hidden",
            padding: "6px 0",
          }}
        >
          {QUESTION_TYPES.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => { updateQuestionType(row.id, "type", opt); setOpen(false); }}
              style={{
                display: "block",
                width: "100%",
                padding: "10px 16px",
                background: opt === row.type ? "#F0F0F0" : "transparent",
                color: "#303030",
                border: "none",
                textAlign: "left",
                fontSize: 15,
                fontWeight: opt === row.type ? 600 : 400,
                letterSpacing: "-0.03em",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {/* Stepper block */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          padding: 8,
          gap: 12,
          background: "#F0F0F0",
          borderRadius: 24,
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            flex: 1,
          }}
        >
          <span
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: "#303030",
              letterSpacing: "-0.04em",
              lineHeight: "140%",
              textAlign: "center",
            }}
          >
            No. of Questions
          </span>
          <Stepper
            id={`mobile-qt-count-${row.id}`}
            value={row.count}
            onChange={(v) => updateQuestionType(row.id, "count", v)}
            min={1}
            max={50}
            className="mobile-stepper"
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            flex: 1,
          }}
        >
          <span
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: "#303030",
              letterSpacing: "-0.04em",
              lineHeight: "140%",
              textAlign: "center",
            }}
          >
            Marks
          </span>
          <Stepper
            id={`mobile-qt-marks-${row.id}`}
            value={row.marks}
            onChange={(v) => updateQuestionType(row.id, "marks", v)}
            min={1}
            max={100}
            className="mobile-stepper"
          />
        </div>
      </div>
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
  const updateQuestionType = useAssignmentStore((s) => s.updateQuestionType);

  return (
    <div
      className="create-details"
      style={{
        /* Frame 1984077359 */
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: 32,
        gap: 32,
        background: "rgba(255, 255, 255, 0.5)",
        borderRadius: 32,
        boxSizing: "border-box",
        width: "100%",
      }}
    >
      {/* ── Header: Frame 1984077347 ── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: 0,
          gap: 2,
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: 20,
            fontWeight: 700,
            color: "#303030",
            letterSpacing: "-0.04em",
            lineHeight: "140%",
            fontFamily: "inherit",
          }}
        >
          Assignment Details
        </h2>
        <p
          style={{
            margin: 0,
            fontSize: 14,
            fontWeight: 400,
            color: "rgba(94, 94, 94, 0.8)",
            letterSpacing: "-0.04em",
            lineHeight: "140%",
            fontFamily: "inherit",
          }}
        >
          Basic information about your assignment
        </p>
      </div>

      {/* ── Content area: Frame 1984077364 ── */}
      <div
        className="create-details__content"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: 0,
          gap: 16,
          width: "100%",
        }}
      >
        {/* ── File upload section: Frame 1984077301 ── */}
        <div
          className="create-details__upload"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: 0,
            gap: 12,
            width: "100%",
          }}
        >
          {/* Upload box: Frame 1618872469 */}
          <div
            className="create-details__upload-zone"
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
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "24px 32px",
              gap: 16,
              width: "100%",
              height: 202,
              background: dragOver ? "rgba(232,73,15,0.03)" : "#FFFFFF",
              border: "none",
              backgroundImage: dragOver
                ? `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='24' ry='24' stroke='%23E8490F' stroke-width='1.75' stroke-dasharray='10%2c 8' stroke-linecap='round'/%3e%3c/svg%3e")`
                : `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='24' ry='24' stroke='%23000000' stroke-opacity='0.2' stroke-width='1.75' stroke-dasharray='10%2c 8' stroke-linecap='round'/%3e%3c/svg%3e")`,
              borderRadius: 24,
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            {/* Icon box: Frame 1618872514 */}
            <div
              className="create-details__upload-icon"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: 0,
                gap: 10,
                width: 40,
                height: 40,
                background: "#FFFFFF",
                borderRadius: 8,
                flexShrink: 0,
              }}
            >
              <UploadCloudIcon />
            </div>

            {/* Text block: Frame 1618872516 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: 0,
                gap: 4,
                width: "100%",
              }}
            >
              <p
                style={{
                  margin: 0,
                  width: "100%",
                  fontSize: 16,
                  fontWeight: 500,
                  color: "#303030",
                  letterSpacing: "-0.04em",
                  lineHeight: "140%",
                  textAlign: "center",
                  fontFamily: "inherit",
                }}
              >
                {formData.fileName ?? "Choose a file or drag & drop it here"}
              </p>
              <p
                style={{
                  margin: 0,
                  width: "100%",
                  fontSize: 14,
                  fontWeight: 400,
                  color: "#A9A9A9",
                  letterSpacing: "-0.04em",
                  lineHeight: "140%",
                  textAlign: "center",
                  fontFamily: "inherit",
                }}
              >
                JPEG, PNG, upto 10MB
              </p>
            </div>

            {/* Browse Files button */}
            <button
              className="create-details__upload-btn"
              id="browse-files-btn"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: "8px 24px",
                gap: 4,
                height: 36,
                background: "#F6F6F6",
                borderRadius: 48,
                border: "none",
                fontSize: 14,
                fontWeight: 500,
                color: "#303030",
                letterSpacing: "-0.04em",
                lineHeight: "140%",
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "background 0.15s",
                flexShrink: 0,
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background = "#EBEBEB")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background = "#F6F6F6")
              }
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

          {/* "Upload images..." subtitle */}
          <p
            className="create-details__upload-subtitle"
            style={{
              margin: 0,
              width: "100%",
              fontSize: 16,
              fontWeight: 500,
              color: "rgba(48, 48, 48, 0.6)",
              letterSpacing: "-0.04em",
              lineHeight: "140%",
              textAlign: "center",
              fontFamily: "inherit",
            }}
          >
            Upload images of your preferred document/image
          </p>
        </div>

        {/* ── Due Date section: Frame 1618872464 ── */}
        <div
          className="create-details__due"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            padding: 0,
            gap: 24,
            width: "100%",
          }}
        >
          {/* Frame 1618872457 */}
          <div
            className="create-details__due-block"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              padding: 0,
              gap: 8,
              width: "100%",
            }}
          >
            <label
              className="create-details__label"
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                fontSize: 16,
                fontWeight: 700,
                color: "#303030",
                letterSpacing: "-0.04em",
                lineHeight: "140%",
                fontFamily: "inherit",
              }}
            >
              Due Date
            </label>

            {/* Input pill: Frame 1618872169 */}
            <div className="create-details__input-wrap" style={{ position: "relative", width: "100%" }}>
              <input
                className="due-date-input create-details__input"
                id="due-date-input"
                type="text"
                placeholder="DD-MM-YYYY"
                value={formData.dueDate}
                onChange={(e) => {
                  updateFormData({ dueDate: e.target.value });
                  if (errors.dueDate) setErrors((p) => ({ ...p, dueDate: undefined }));
                }}
                style={{
                  boxSizing: "border-box",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "11px 50px 11px 16px",
                  gap: 10,
                  width: "100%",
                  height: 44,
                  border: `1.25px solid ${errors.dueDate ? "#E53935" : "#DADADA"}`,
                  borderRadius: 100,
                  fontSize: 16,
                  fontWeight: 500,
                  color: "#303030",
                  letterSpacing: "-0.04em",
                  lineHeight: "140%",
                  background: "transparent",
                  outline: "none",
                  fontFamily: "inherit",
                  transition: "border-color 0.15s",
                }}
                onFocus={(e) => {
                  if (!errors.dueDate)
                    (e.target as HTMLInputElement).style.borderColor = "#303030";
                }}
                onBlur={(e) => {
                  if (!errors.dueDate)
                    (e.target as HTMLInputElement).style.borderColor = "#DADADA";
                }}
              />
              <div
                style={{
                  position: "absolute",
                  right: 16,
                  top: "50%",
                  transform: "translateY(-50%)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <button
                  type="button"
                  aria-label="Open date picker"
                  onClick={() => {
                    const el = document.getElementById("__due-date-hidden__") as HTMLInputElement | null;
                    if (el) {
                      try { el.showPicker(); } catch { el.click(); }
                    }
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CalendarPlusIcon />
                </button>
                {/* Hidden native date input — triggered by the button above */}
                <input
                  id="__due-date-hidden__"
                  type="date"
                  tabIndex={-1}
                  aria-hidden="true"
                  onChange={(e) => {
                    const raw = e.target.value; // YYYY-MM-DD
                    if (!raw) {
                      updateFormData({ dueDate: "" });
                      return;
                    }
                    const [year, month, day] = raw.split("-");
                    const formatted = `${day}-${month}-${year}`; // DD-MM-YYYY
                    updateFormData({ dueDate: formatted });
                    if (errors.dueDate) setErrors((p) => ({ ...p, dueDate: undefined }));
                  }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    opacity: 0,
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none",
                    cursor: "pointer",
                    accentColor: "#E8490F",
                    colorScheme: "light",
                  }}
                />
              </div>
            </div>
            {errors.dueDate && (
              <p style={{ fontSize: 12, color: "#E53935", margin: 0 }}>{errors.dueDate}</p>
            )}
          </div>
        </div>

        {/* ── Question type section: Frame 1618872171 — desktop only ── */}
        <div
          className="create-details__question desktop-qt"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-end",
            padding: 0,
            gap: 16,
            width: "100%",
          }}
        >
          {/* Frame 1984077498: left (471px) + right (275px) with gap 64px */}
          {/* Frame 1984077498: left (471px) + right (275px) with gap 32px */}
            <div
              className="create-details__question-row"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              padding: 0,
              gap: 32,
              width: "100%",
            }}
          >
            {/* Left column: Frame 1618872458 — Question Type label + rows */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: 0,
                gap: 16,
                flex: 1,
                minWidth: 0,
              }}
            >
              {/* "Question Type" header */}
              <span
                className="create-details__label"
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#303030",
                  letterSpacing: "-0.04em",
                  lineHeight: "140%",
                  fontFamily: "inherit",
                }}
              >
                Question Type
              </span>

              {/* Rows */}
              {formData.questionTypes.map((row) => (
                <QuestionTypeRowComponent key={row.id} row={row} />
              ))}

              {errors.questionTypes && (
                <p style={{ fontSize: 12, color: "#E53935", margin: 0 }}>
                  {errors.questionTypes}
                </p>
              )}

              {/* Add Question Type button: Frame 1984077500 */}
              <button
                className="create-details__add-btn"
                id="add-question-type-btn"
                onClick={() => {
                  addQuestionType();
                  if (errors.questionTypes)
                    setErrors((p) => ({ ...p, questionTypes: undefined }));
                }}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 0,
                  gap: 8,
                  height: 36,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                {/* Dark circle button */}
                <span
                  className="create-details__add-icon"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 8,
                    width: 36,
                    height: 36,
                    background: "#2B2B2B",
                    borderRadius: 48,
                    flexShrink: 0,
                  }}
                >
                  <AddQuestionTypeIcon />
                </span>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#303030",
                    letterSpacing: "-0.04em",
                    lineHeight: "140%",
                    fontFamily: "inherit",
                  }}
                >
                  Add Question Type
                </span>
              </button>
            </div>

            {/* Right column: Frame 1984077499 — No. of Questions + Marks */}
            <div
              className="create-details__metrics"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
                padding: 0,
                gap: 16,
                flex: 1,
              }}
            >
              {/* No. of Questions column: Frame 1618872459 */}
              <div
                className="create-details__metric-col"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: 0,
                  gap: 16,
                  width: 116,
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 116,
                    height: 22,
                    fontSize: 16,
                    fontWeight: 500,
                    color: "#303030",
                    letterSpacing: "-0.04em",
                    lineHeight: "140%",
                    textAlign: "center",
                    fontFamily: "inherit",
                    whiteSpace: "nowrap",
                  }}
                >
                  No. of Questions
                </span>
                {formData.questionTypes.map((row) => (
                  <Stepper
                    key={row.id}
                    id={`qt-count-${row.id}`}
                    value={row.count}
                    onChange={(v) => updateQuestionType(row.id, "count", v)}
                    min={1}
                    max={50}
                  />
                ))}
              </div>

              {/* Marks column: Frame 1618872460 */}
              <div
                className="create-details__metric-col"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: 0,
                  gap: 16,
                  width: 100,
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 100,
                    height: 22,
                    fontSize: 16,
                    fontWeight: 500,
                    color: "#303030",
                    letterSpacing: "-0.04em",
                    lineHeight: "140%",
                    textAlign: "center",
                    fontFamily: "inherit",
                  }}
                >
                  Marks
                </span>
                {formData.questionTypes.map((row) => (
                  <Stepper
                    key={row.id}
                    id={`qt-marks-${row.id}`}
                    value={row.marks}
                    onChange={(v) => updateQuestionType(row.id, "marks", v)}
                    min={1}
                    max={100}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Total Questions / Total Marks: Frame 1984077510 */}
          {formData.questionTypes.length > 0 && (
            <div
              className="create-details__totals"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: 0,
                gap: 8,
                width: 150,
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  width: 150,
                  fontSize: 16,
                  fontWeight: 500,
                  color: "#303030",
                  letterSpacing: "-0.04em",
                  lineHeight: "110%",
                  textAlign: "right",
                  fontFamily: "inherit",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                Total Questions : {totalQuestions}
              </span>
              <span
                style={{
                  width: 150,
                  fontSize: 16,
                  fontWeight: 500,
                  color: "#303030",
                  letterSpacing: "-0.04em",
                  lineHeight: "110%",
                  textAlign: "right",
                  fontFamily: "inherit",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                Total Marks : {totalMarks}
              </span>
            </div>
          )}
        </div>

        {/* ── Mobile question type section ── */}
        <div
          className="mobile-qt"
          style={{
            display: "none",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 16,
            width: "100%",
          }}
        >
          <span
            style={{
              width: "100%",
              fontSize: 16,
              fontWeight: 700,
              color: "#303030",
              letterSpacing: "-0.04em",
              lineHeight: "140%",
              fontFamily: "inherit",
            }}
          >
            Question Type
          </span>

          {formData.questionTypes.map((row) => (
            <MobileQuestionTypeCard key={row.id} row={row} />
          ))}

          {errors.questionTypes && (
            <p style={{ fontSize: 12, color: "#E53935", margin: 0, alignSelf: "flex-start" }}>
              {errors.questionTypes}
            </p>
          )}

          <button
            id="add-question-type-btn-mobile"
            onClick={() => {
              addQuestionType();
              if (errors.questionTypes)
                setErrors((p) => ({ ...p, questionTypes: undefined }));
            }}
            style={{
              alignSelf: "flex-start",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: 0,
              gap: 8,
              height: 36,
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 8,
                width: 36,
                height: 36,
                background: "#2B2B2B",
                borderRadius: 48,
                flexShrink: 0,
              }}
            >
              <AddQuestionTypeIcon />
            </span>
            <span
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#303030",
                letterSpacing: "-0.04em",
                lineHeight: "140%",
                fontFamily: "inherit",
              }}
            >
              Add Question Type
            </span>
          </button>

          {formData.questionTypes.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
              <span style={{ fontSize: 16, fontWeight: 500, color: "#303030", letterSpacing: "-0.04em", lineHeight: "110%", fontFamily: "inherit" }}>
                Total Questions : {totalQuestions}
              </span>
              <span style={{ fontSize: 16, fontWeight: 500, color: "#303030", letterSpacing: "-0.04em", lineHeight: "110%", fontFamily: "inherit" }}>
                Total Marks : {totalMarks}
              </span>
            </div>
          )}
        </div>

        {/* ── Additional Information: Frame 1984077522 ── */}
        <div
          className="create-details__additional"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: 0,
            gap: 8,
            width: "100%",
          }}
        >
          <label
            className="create-details__label"
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 16,
              fontWeight: 700,
              color: "#303030",
              letterSpacing: "-0.04em",
              lineHeight: "140%",
              fontFamily: "inherit",
            }}
          >
            Additional Information&nbsp;
            <span style={{ fontWeight: 400, color: "rgba(48,48,48,0.5)" }}>
              (For better output)
            </span>
          </label>

          {/* Textarea box: Frame 1984077611 */}
          <div
            className="create-details__textarea"
            style={{
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "flex-end",
              padding: 16,
              gap: 10,
              width: "100%",
              height: 102,
              border: "none",
              backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='16' ry='16' stroke='%23DADADA' stroke-width='1.25' stroke-dasharray='10%2c 8' stroke-linecap='round'/%3e%3c/svg%3e")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
              backgroundColor: "rgba(255, 255, 255, 0.25)",
              borderRadius: 16,
              position: "relative",
            }}
          >
            <textarea
              id="additional-info-textarea"
              className="additional-info-textarea"
              value={formData.additionalInfo}
              onChange={(e) => updateFormData({ additionalInfo: e.target.value })}
              placeholder="e.g Generate a question paper for 3 hour exam duration..."
              style={{
                width: "100%",
                flex: 1,
                border: "none",
                outline: "none",
                background: "transparent",
                fontSize: 14,
                fontWeight: 500,
                color: "#303030",
                letterSpacing: "-0.04em",
                lineHeight: "140%",
                fontFamily: "inherit",
                resize: "none",
                padding: 0,
                alignSelf: "stretch",
              }}
            />

            {/* Mic button: Frame 1984077290 */}
            <button
              className="create-details__mic"
              type="button"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: "0px 0.82px",
                gap: 8.18,
                width: 36,
                height: 36,
                background: "#F0F0F0",
                borderRadius: 18,
                border: "none",
                cursor: "pointer",
                flexShrink: 0,
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background = "#E0E0E0")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background = "#F0F0F0")
              }
            >
              <AdditionalInfoMicIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
