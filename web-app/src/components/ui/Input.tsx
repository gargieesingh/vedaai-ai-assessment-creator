"use client";

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean;
}

export default function Input({ fullWidth = false, style, ...props }: InputProps) {
  return (
    <input
      {...props}
      style={{
        height: 40,
        padding: "0 12px",
        borderRadius: 10,
        border: "1px solid #E2E2E2",
        fontSize: 13,
        fontFamily: "inherit",
        width: fullWidth ? "100%" : undefined,
        ...style,
      }}
    />
  );
}
