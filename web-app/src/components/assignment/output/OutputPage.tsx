"use client";

import React from "react";
import { Download } from "lucide-react";
import { useAssignmentStore } from "@/store/assignmentStore";
import { GeneratedPaper } from "@/types/assignment";
import QuestionSection from "@/components/assignment/output/QuestionSection";
import StudentInfoSection from "@/components/assignment/output/StudentInfoSection";
import AnswerKeySection from "@/components/assignment/output/AnswerKeySection";

function PaperContent({ paper }: { paper: GeneratedPaper }) {
  return (
    <div
      style={{
        background: "#ffffff",
        padding: "32px 40px",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* School heading */}
      <h1
        style={{
          fontSize: 20,
          fontWeight: 700,
          textAlign: "center",
          color: "#1A1A1A",
          marginBottom: 6,
        }}
      >
        {paper.school}
      </h1>
      <p style={{ fontSize: 16, textAlign: "center", color: "#1A1A1A", marginBottom: 4 }}>
        Subject: {paper.subject}
      </p>
      <p style={{ fontSize: 16, textAlign: "center", color: "#1A1A1A", marginBottom: 20 }}>
        Class: {paper.class}
      </p>

      {/* Meta row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
          paddingBottom: 16,
          borderBottom: "1px solid #EBEBEB",
        }}
      >
        <span style={{ fontSize: 14, color: "#1A1A1A" }}>
          Time Allowed: {paper.timeAllowed}
        </span>
        <span style={{ fontSize: 14, color: "#1A1A1A" }}>
          Maximum Marks: {paper.maxMarks}
        </span>
      </div>

      {/* Rules */}
      <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, color: "#1A1A1A" }}>
        All questions are compulsory unless stated otherwise.
      </p>

      <StudentInfoSection />

      {paper.sections.map((section) => (
        <QuestionSection key={section.title} section={section} />
      ))}

      {/* End of paper */}
      <p style={{ textAlign: "center", fontWeight: 700, fontSize: 14, marginBottom: 28 }}>
        End of Question Paper
      </p>

      <AnswerKeySection paper={paper} />
    </div>
  );
}

export default function OutputPage() {
  const generatedOutput = useAssignmentStore((s) => s.generatedOutput);
  const isGenerating = useAssignmentStore((s) => s.isGenerating);

  const handleDownload = () => {
    window.print();
  };

  return (
    <div style={{ padding: "0" }}>
      {/* Outer gray container */}
      <div
        style={{
          background: "#5E5E5E",
          borderRadius: 32,
          padding: "20px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          boxShadow: "0 10px 24px rgba(0,0,0,0.18)",
        }}
      >
        {/* Dark header */}
        <div
          style={{
            background: "#2F2F2F",
            borderRadius: 18,
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 12,
          }}
        >
        <p
          style={{
            fontSize: 14,
            color: "#ffffff",
            lineHeight: 1.6,
            maxWidth: 760,
          }}
        >
          Certainly, Lakshya! Here are customized Question Paper for your CBSE Grade 8 Science
          classes on the NCERT chapters:
        </p>
        <button
          id="download-pdf-btn"
          onClick={handleDownload}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            height: 32,
            padding: "0 14px",
            background: "#ffffff",
            color: "#1A1A1A",
            border: "none",
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "inherit",
            whiteSpace: "nowrap",
            transition: "all 0.15s",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "#F2F2F2";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "#ffffff";
          }}
        >
          <Download size={14} />
          Download as PDF
        </button>
        </div>

        {/* White paper */}
        <div
          style={{
            background: "white",
            borderRadius: 18,
            overflow: "hidden",
            boxShadow: "0 6px 22px rgba(0,0,0,0.10)",
            marginTop: 12,
          }}
        >
          {generatedOutput ? (
            <PaperContent paper={generatedOutput} />
          ) : (
            <div style={{ padding: "48px 24px", textAlign: "center", color: "#8C8C8C" }}>
              {isGenerating ? "Generating your assignment..." : "No assignment generated yet."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
