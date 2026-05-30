"use client";

import React from "react";
import { Question } from "@/features/assignments/types/assignment";

const inter = "'Inter', sans-serif";
const primaryColor = "#303030";

// Figma: questions block is 16px/400, line-height 240%
// Format: [Easy] Question text here [2 Marks]
export default function QuestionItem({
  question,
  index,
}: {
  question: Question;
  index: number;
}) {
  const difficultyLabel =
    question.difficulty === "Easy"
      ? "Easy"
      : question.difficulty === "Moderate"
      ? "Moderate"
      : "Challenging";

  const marksLabel =
    question.marks === 1 ? "[1 Mark]" : `[${question.marks} Marks]`;

  return (
    <li
      style={{
        fontSize: 16,
        fontWeight: 400,
        lineHeight: "240%",
        letterSpacing: "-0.04em",
        color: primaryColor,
        fontFamily: inter,
        listStyle: "none",
      }}
    >
      {/* Main question line: 1. [Easy] Question text [2 Marks] */}
      <span>
        <span style={{ fontWeight: 400 }}>{index}. </span>
        <span style={{ fontWeight: 400 }}>[{difficultyLabel}] </span>
        <span>{question.text} </span>
        <span style={{ fontWeight: 400 }}>{marksLabel}</span>
      </span>

      {/* MCQ options */}
      {question.options && question.options.length > 0 && (
        <ol
          type="a"
          style={{
            margin: "0 0 0 24px",
            padding: 0,
            listStyle: "lower-alpha",
            fontSize: 16,
            lineHeight: "200%",
            fontWeight: 400,
            color: primaryColor,
            fontFamily: inter,
          }}
        >
          {question.options.map((opt, oIdx) => (
            <li key={oIdx}>{opt}</li>
          ))}
        </ol>
      )}
    </li>
  );
}
