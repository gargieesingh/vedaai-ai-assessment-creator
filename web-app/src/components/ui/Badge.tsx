"use client";

import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  tone?: "default" | "success" | "warning" | "danger";
}

const TONE_STYLES: Record<string, { color: string; background: string }> = {
  default: { color: "#4B4B4B", background: "#F0F0F0" },
  success: { color: "#15803D", background: "#DCFCE7" },
  warning: { color: "#B45309", background: "#FEF3C7" },
  danger: { color: "#B91C1C", background: "#FEE2E2" },
};

export default function Badge({ children, tone = "default" }: BadgeProps) {
  const styles = TONE_STYLES[tone];
  return (
    <span
      style={{
        padding: "2px 8px",
        borderRadius: 999,
        fontSize: 11,
        fontWeight: 600,
        color: styles.color,
        background: styles.background,
      }}
    >
      {children}
    </span>
  );
}
