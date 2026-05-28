"use client";

import React from "react";
import { Question } from "@/types/assignment";

const DIFFICULTY_COLORS: Record<string, string> = {
  Easy: "#22C55E",
  Moderate: "#F59E0B",
  Challenging: "#E53935",
};

function DifficultyTag({ difficulty }: { difficulty: string }) {
  return (
    <span
      style={{
        fontSize: 11,
        fontWeight: 600,
        color: DIFFICULTY_COLORS[difficulty] ?? "#888888",
        background: `${DIFFICULTY_COLORS[difficulty] ?? "#888888"}18`,
        borderRadius: 4,
        padding: "1px 6px",
        marginRight: 6,
        display: "inline-block",
      }}
    >
      {difficulty}
    </span>
  );
}

export default function QuestionItem({ question }: { question: Question }) {
  return (
    <li
      style={{
        fontSize: 14,
        lineHeight: 1.7,
        color: "#1A1A1A",
        marginBottom: 12,
      }}
    >
      <DifficultyTag difficulty={question.difficulty} />
      {question.text}
      {question.marks && (
        <span style={{ color: "#888888", marginLeft: 4 }}>
          [{question.marks} Mark{question.marks > 1 ? "s" : ""}]
        </span>
      )}
      {question.options && (
        <ol
          type="a"
          style={{ paddingLeft: 20, marginTop: 6, listStyle: "lower-alpha" }}
        >
          {question.options.map((opt, oIdx) => (
            <li key={oIdx} style={{ fontSize: 13, color: "#4B4B4B" }}>
              {opt}
            </li>
          ))}
        </ol>
      )}
    </li>
  );
}
