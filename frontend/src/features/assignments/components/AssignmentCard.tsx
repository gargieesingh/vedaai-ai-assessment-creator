"use client";

import React, { useRef, useEffect, useState } from "react";
import { Assignment } from "@/features/assignments/types/assignment";
import AssignmentCardMenu from "@/features/assignments/components/AssignmentCardMenu";

interface AssignmentCardProps {
  assignment: Assignment;
}

export default function AssignmentCard({ assignment }: AssignmentCardProps) {
  const titleRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const displayTitle = `Class ${(assignment.class || "8th").replace(/^class\s+/i, "").trim()} ${(assignment.subject || "Science").trim()} Assignment`;

  useEffect(() => {
    const el = titleRef.current;
    const container = containerRef.current;
    if (el && container) {
      setIsOverflowing(el.scrollWidth > container.clientWidth);
    }
  }, [displayTitle]);

  return (
    /* Frame 40026 — 542×162px, padding 24px, border-radius 24px, background #FFFFFF */
    <div
      className="assignment-card"
      style={{
        background: "#FFFFFF",
        borderRadius: 24,
        padding: 24,
        position: "relative",
        width: "100%",
        minWidth: 0,
        height: 162,
        minHeight: 162,
        maxHeight: 162,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        boxSizing: "border-box",
        cursor: "pointer",
        transition: "box-shadow 0.15s, transform 0.15s",
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 6px 18px rgba(0,0,0,0.08)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
      }}
    >
      {/* Frame 1984077333 — flex-col, space-between, height 114px */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-start",
          padding: 0,
          width: "100%",
          height: 114,
          flexShrink: 0,
        }}
      >
        {/* Frame 1984077325 — title area, height 29px */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: 0,
            width: "100%",
            height: 29,
            flexShrink: 0,
          }}
        >
          {/* Frame 1618872420 — title row with 3-dots */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 0,
              gap: 8,
              width: "100%",
              height: 29,
              flexShrink: 0,
              position: "relative",
            }}
          >
            {/* Scrolling title container — fixed width, clips overflow */}
            <div
              ref={containerRef}
              style={{
                flex: 1,
                minWidth: 0,
                overflow: "hidden",
                height: "100%",
                display: "flex",
                alignItems: "center",
                position: "relative",
              }}
            >
              <span
                ref={titleRef}
                className={isOverflowing ? "assignment-card__title-scroll" : ""}
                style={{
                  fontSize: "var(--assignment-card-title-size, 24px)",
                  fontWeight: 800,
                  color: "#303030",
                  lineHeight: "120%",
                  letterSpacing: "-0.04em",
                  fontFamily: "inherit",
                  whiteSpace: "nowrap",
                  display: "inline-block",
                }}
              >
                {displayTitle}
                {/* Pad with space between repeats for seamless loop */}
                {isOverflowing && <span style={{ paddingLeft: 60 }}>{displayTitle}</span>}
              </span>
            </div>

            <AssignmentCardMenu assignmentId={assignment.id} />
          </div>
        </div>

        {/* Frame 1984077326 — dates row, height 19px */}
        {/* Frame 1618872443 — space-between, height 19px */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 0,
            gap: 10,
            width: "100%",
            height: 19,
          }}
        >
          {/* Assigned on: 16px/800, #303030, line-height 120%, letter-spacing -0.04em */}
          <span
            style={{
              fontSize: "var(--assignment-card-meta-size, 16px)",
              lineHeight: "120%",
              letterSpacing: "-0.04em",
              fontFamily: "inherit",
            }}
          >
            <span style={{ fontWeight: 800, color: "#303030" }}>Assigned on</span>
            <span style={{ fontWeight: 400, color: "#555555" }}> : {assignment.assignedOn}</span>
          </span>

          {assignment.dueDate && (
            <span
              style={{
                fontSize: "var(--assignment-card-meta-size, 16px)",
                lineHeight: "120%",
                letterSpacing: "-0.04em",
                fontFamily: "inherit",
              }}
            >
              <span style={{ fontWeight: 800, color: "#303030" }}>Due</span>
              <span style={{ fontWeight: 400, color: "#555555" }}> : {assignment.dueDate}</span>
            </span>
          )}
        </div>
      </div>

      {/* Marquee keyframe — scoped to this card */}
      <style>{`
        @keyframes card-title-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .assignment-card__title-scroll {
          animation: card-title-marquee 9s linear infinite;
          will-change: transform;
        }
        .assignment-card:hover .assignment-card__title-scroll {
          animation-play-state: running;
        }
      `}</style>
    </div>
  );
}

