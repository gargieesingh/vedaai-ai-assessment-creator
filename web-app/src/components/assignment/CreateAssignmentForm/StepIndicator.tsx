"use client";

import React from "react";

interface StepIndicatorProps {
  formStep: number;
}

export default function StepIndicator({ formStep }: StepIndicatorProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 6,
        marginBottom: 18,
      }}
    >
      {[1, 2].map((step) => (
        <div
          key={step}
          style={{
            height: 5,
            borderRadius: 999,
            background: formStep >= step ? "#1A1A1A" : "#DEDEDE",
            transition: "background 0.3s",
          }}
        />
      ))}
    </div>
  );
}
