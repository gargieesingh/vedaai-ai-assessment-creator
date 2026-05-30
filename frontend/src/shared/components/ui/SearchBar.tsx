"use client";

import React from "react";

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean;
}

export default function SearchBar({ fullWidth = false, style, ...props }: SearchBarProps) {
  return (
    <input
      {...props}
      style={{
        height: 36,
        padding: "0 14px",
        borderRadius: 999,
        border: "1px solid #E2E2E2",
        fontSize: 12.5,
        fontFamily: "inherit",
        width: fullWidth ? "100%" : undefined,
        ...style,
      }}
    />
  );
}
