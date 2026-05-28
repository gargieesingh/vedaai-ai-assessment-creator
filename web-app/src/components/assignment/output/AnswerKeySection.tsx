"use client";

import React from "react";
import { GeneratedPaper } from "@/types/assignment";

export default function AnswerKeySection({ paper }: { paper: GeneratedPaper }) {
  return (
    <div style={{ borderTop: "2px solid #1A1A1A", paddingTop: 20 }}>
      <p style={{ fontWeight: 700, fontSize: 15, color: "#1A1A1A", marginBottom: 12 }}>
        Answer Key:
      </p>
      <ol style={{ paddingLeft: 20, listStyle: "decimal" }}>
        {paper.answerKey.map((ans, idx) => (
          <li
            key={`ans-${idx}`}
            style={{ fontSize: 14, lineHeight: 1.7, color: "#4B4B4B", marginBottom: 8 }}
          >
            {ans.text}
          </li>
        ))}
      </ol>
    </div>
  );
}
