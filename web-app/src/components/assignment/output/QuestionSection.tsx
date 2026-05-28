"use client";

import React from "react";
import { Section } from "@/types/assignment";
import QuestionItem from "@/components/assignment/output/QuestionItem";

export default function QuestionSection({ section }: { section: Section }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <h2
        style={{
          fontSize: 18,
          fontWeight: 700,
          textAlign: "center",
          color: "#1A1A1A",
          marginBottom: 8,
        }}
      >
        {section.title}
      </h2>
      <p style={{ fontSize: 14, fontWeight: 600, color: "#1A1A1A", marginBottom: 4 }}>
        Questions
      </p>
      <p style={{ fontSize: 13, fontStyle: "italic", color: "#4B4B4B", marginBottom: 16 }}>
        {section.instruction}
      </p>

      <ol style={{ paddingLeft: 20, listStyle: "decimal" }}>
        {section.questions.map((question, idx) => (
          <QuestionItem key={`${section.title}-q-${idx}`} question={question} />
        ))}
      </ol>
    </div>
  );
}
