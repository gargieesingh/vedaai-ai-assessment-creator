"use client";

import React from "react";

interface StepIndicatorProps {
  formStep: number;
}

export default function StepIndicator({ formStep }: StepIndicatorProps) {
  return (
    <div
      id="step-indicator-wrapper"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "0px",
        gap: "10px",
        width: "100%",
        alignSelf: "stretch",
        flex: "none",
        order: 1,
        flexGrow: 0,
        marginBottom: "24px",
      }}
    >
      <div
        id="step-indicator-row"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: "0px",
          gap: "12px",
          width: "100%",
          maxWidth: "815px",
          height: "5px",
          flex: "none",
          order: 0,
          flexGrow: 0,
        }}
      >
        {/* Step 1 Details */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: "0px",
            gap: "8px",
            flex: "none",
            order: 0,
            flexGrow: 1,
          }}
        >
          <div
            style={{
              width: "100%",
              height: "5px",
              borderRadius: "999px",
              background: formStep === 1 ? "#5E5E5E" : "#DADADA",
              transition: "background 0.3s ease",
              flex: "none",
              order: 0,
              flexGrow: 1,
            }}
          />
        </div>

        {/* Step 2 Review */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: "0px",
            gap: "8px",
            flex: "none",
            order: 1,
            flexGrow: 1,
          }}
        >
          <div
            style={{
              width: "100%",
              height: "5px",
              borderRadius: "999px",
              background: formStep === 2 ? "#5E5E5E" : "#DADADA",
              transition: "background 0.3s ease",
              flex: "none",
              order: 0,
              flexGrow: 1,
            }}
          />
        </div>
      </div>
    </div>
  );
}


