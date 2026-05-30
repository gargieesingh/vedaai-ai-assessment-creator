"use client";

import React from "react";

export default function StudentInfoSection() {
  return (
    <div style={{ marginBottom: 24 }}>
      {["Name", "Roll Number", "Class"].map((field) => (
        <div
          key={field}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 8,
            fontSize: 14,
          }}
        >
          <span style={{ color: "#1A1A1A", minWidth: 120 }}>{field}:</span>
          <div
            style={{
              flex: 1,
              maxWidth: 200,
              borderBottom: "1px solid #1A1A1A",
              height: 20,
            }}
          />
        </div>
      ))}
    </div>
  );
}
