"use client";

import React from "react";

interface DropdownProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  fullWidth?: boolean;
}

export default function Dropdown({ fullWidth = false, style, children, ...props }: DropdownProps) {
  return (
    <select
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
    >
      {children}
    </select>
  );
}
