"use client";

import React from "react";
import { Minus, Plus } from "lucide-react";

interface StepperProps {
  id: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export default function Stepper({ id, value, onChange, min = 1, max = 50 }: StepperProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        border: "1px solid #E2E2E2",
        borderRadius: 10,
        height: 34,
        width: 100,
        overflow: "hidden",
        background: "#ffffff",
        flexShrink: 0,
      }}
    >
      <button
        id={`${id}-dec`}
        onClick={() => onChange(Math.max(min, value - 1))}
        style={{
          width: 32,
          height: "100%",
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#555",
          fontFamily: "inherit",
          flexShrink: 0,
          transition: "background 0.12s",
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.background = "#F4F4F4")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.background = "transparent")
        }
      >
        <Minus size={13} />
      </button>
      <span
        style={{
          flex: 1,
          textAlign: "center",
          fontSize: 13,
          fontWeight: 600,
          color: "#1A1A1A",
        }}
      >
        {value}
      </span>
      <button
        id={`${id}-inc`}
        onClick={() => onChange(Math.min(max, value + 1))}
        style={{
          width: 32,
          height: "100%",
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#555",
          fontFamily: "inherit",
          flexShrink: 0,
          transition: "background 0.12s",
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.background = "#F4F4F4")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.background = "transparent")
        }
      >
        <Plus size={13} />
      </button>
    </div>
  );
}
