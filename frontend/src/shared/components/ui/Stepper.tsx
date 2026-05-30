"use client";

import React from "react";
import { Minus, Plus } from "lucide-react";

interface StepperProps {
  id: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

export default function Stepper({ id, value, onChange, min = 1, max = 50, className }: StepperProps) {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "11px 8px",
        borderRadius: 100,
        height: 44,
        width: 100,
        background: "#FFFFFF",
        flexShrink: 0,
        boxSizing: "border-box",
      }}
    >
      <button
        id={`${id}-dec`}
        onClick={() => onChange(Math.max(min, value - 1))}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
          color: "#DADADA",
          fontFamily: "inherit",
          flexShrink: 0,
          transition: "color 0.12s",
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.color = "#AAAAAA")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.color = "#DADADA")
        }
      >
        <Minus size={16} strokeWidth={1.5} />
      </button>
      <span
        style={{
          flex: 1,
          textAlign: "center",
          fontSize: 16,
          fontWeight: 500,
          color: "#303030",
          letterSpacing: "-0.04em",
          lineHeight: "140%",
        }}
      >
        {value}
      </span>
      <button
        id={`${id}-inc`}
        onClick={() => onChange(Math.min(max, value + 1))}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
          color: "#DADADA",
          fontFamily: "inherit",
          flexShrink: 0,
          transition: "color 0.12s",
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.color = "#AAAAAA")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.color = "#DADADA")
        }
      >
        <Plus size={16} strokeWidth={1.5} />
      </button>
    </div>
  );
}
