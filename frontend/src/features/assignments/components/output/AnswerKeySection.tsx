"use client";

import React from "react";
import { GeneratedPaper } from "@/features/assignments/types/assignment";

const inter = "'Inter', sans-serif";
const primaryColor = "#303030";

export default function AnswerKeySection({ paper }: { paper: GeneratedPaper }) {
  const validAnswers = paper.answerKey.filter(
    (a) =>
      a.text &&
      a.text !== "Answer not available." &&
      !a.text.startsWith("Answer key for") &&
      !a.text.startsWith("Answer not")
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: 0,
        gap: 0,
        width: "100%",
      }}
    >
      {/* "End of Question Paper" — bold, left in questions flow, then centered */}
      {/* Figma: part of the questions text block, 16px/400 */}
      <p
        style={{
          margin: "0 0 24px 0",
          width: "100%",
          fontSize: 16,
          fontWeight: 600,
          lineHeight: "240%",
          textAlign: "left",
          letterSpacing: "-0.04em",
          color: primaryColor,
          fontFamily: inter,
        }}
      >
        End of Question Paper
      </p>

      {/* Only render answer key if we have real answers */}
      {validAnswers.length > 0 && (
        <>
          {/* "Answer Key:" — bold 18px */}
          <p
            className="ak-label"
            style={{
              margin: "0 0 12px 0",
              fontSize: 18,
              fontWeight: 700,
              lineHeight: "160%",
              letterSpacing: "-0.04em",
              color: primaryColor,
              fontFamily: inter,
            }}
          >
            Answer Key:
          </p>

          {/* Answers — 16px/400, line-height 175% */}
          <ol
            style={{
              margin: 0,
              padding: 0,
              width: "100%",
              listStyle: "none",
            }}
          >
            {validAnswers.map((ans, idx) => (
              <li
                key={ans.id}
                style={{
                  fontSize: 16,
                  fontWeight: 400,
                  lineHeight: "175%",
                  letterSpacing: "-0.04em",
                  color: primaryColor,
                  fontFamily: inter,
                  marginBottom: 10,
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 6,
                }}
              >
                <span style={{ fontWeight: 600, flexShrink: 0 }}>{idx + 1}.</span>
                <span style={{ flex: 1 }}>{ans.text}</span>
              </li>
            ))}
          </ol>
        </>
      )}
    </div>
  );
}
