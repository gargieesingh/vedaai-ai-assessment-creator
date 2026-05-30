"use client";

import React from "react";
import { Section } from "@/features/assignments/types/assignment";
import QuestionItem from "@/features/assignments/components/output/QuestionItem";

const inter = "'Inter', sans-serif";
const primaryColor = "#303030";

export default function QuestionSection({ section }: { section: Section }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 0,
        gap: 0,
        width: "100%",
      }}
    >
      {/* Frame 1984077301: "Section A" — 24px/600, centered, height 38px */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          padding: "0px",
          gap: 10,
          width: "100%",
          height: 38,
          marginBottom: 16,
        }}
      >
        <h2
          className="qs-title"
          style={{
            margin: 0,
            width: "100%",
            fontSize: 24,
            fontWeight: 600,
            lineHeight: "160%",
            textAlign: "center",
            letterSpacing: "-0.04em",
            color: primaryColor,
            fontFamily: inter,
          }}
        >
          {section.title}
        </h2>
      </div>

      {/* Frame 1984077302: Two-line instruction block, height 55px */}
      {/* Line 1: question type name — bold 18px */}
      {/* Line 2: instruction — italic 18px */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "0px",
          gap: 0,
          width: "100%",
          minHeight: 55,
          marginBottom: 8,
        }}
      >
        {section.questionType && (
          <p
            className="qs-subtitle"
            style={{
              margin: 0,
              fontSize: 18,
              fontWeight: 600,
              fontStyle: "normal",
              lineHeight: "160%",
              letterSpacing: "-0.04em",
              color: primaryColor,
              fontFamily: inter,
            }}
          >
            {section.questionType}
          </p>
        )}
        <p
          className="qs-instruction"
          style={{
            margin: 0,
            fontSize: 18,
            fontWeight: 200,
            fontStyle: "italic",
            lineHeight: "160%",
            letterSpacing: "-0.04em",
            color: primaryColor,
            fontFamily: inter,
          }}
        >
          {section.instruction}
        </p>
      </div>

      {/* Frame 1984077303: Questions list — 16px/400, line-height 240% */}
      <ol
        style={{
          margin: 0,
          padding: 0,
          width: "100%",
          listStyle: "none",
        }}
      >
        {section.questions.map((question, idx) => (
          <QuestionItem key={question.id} question={question} index={idx + 1} />
        ))}
      </ol>
    </div>
  );
}
