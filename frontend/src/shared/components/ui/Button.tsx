"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
}

export default function Button({ fullWidth = false, style, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      style={{
        padding: "8px 16px",
        borderRadius: 999,
        border: "1px solid #D8D8D8",
        background: "#ffffff",
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer",
        width: fullWidth ? "100%" : undefined,
        fontFamily: "inherit",
        ...style,
      }}
    />
  );
}
