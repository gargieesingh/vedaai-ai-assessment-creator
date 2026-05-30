"use client";

import React from "react";

interface FileUploadZoneProps {
  onFileSelect: (file: File) => void;
}

export default function FileUploadZone({ onFileSelect }: FileUploadZoneProps) {
  return (
    <label
      style={{
        display: "block",
        border: "2px dashed #D8D8D8",
        borderRadius: 12,
        padding: "20px",
        textAlign: "center",
        cursor: "pointer",
      }}
    >
      <input
        type="file"
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFileSelect(file);
        }}
      />
      <span style={{ fontSize: 13, color: "#4B4B4B" }}>Upload file</span>
    </label>
  );
}
