"use client";

import React from "react";
import { Assignment } from "@/features/assignments/types/assignment";
import AssignmentCardMenu from "@/features/assignments/components/AssignmentCardMenu";

interface AssignmentCardProps {
  assignment: Assignment;
}

export default function AssignmentCard({ assignment }: AssignmentCardProps) {
  return (
    /* Frame 40026 — 542×162px, padding 24px, border-radius 24px, background #FFFFFF */
    <div
      className="assignment-card"
      style={{
        background: "#FFFFFF",
        borderRadius: 24,
        padding: "var(--assignment-card-padding, 24px)",
        position: "relative",
        height: "var(--assignment-card-height, 162px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "var(--assignment-card-gap, 48px)",
        boxSizing: "border-box",
        cursor: "pointer",
        transition: "box-shadow 0.15s, transform 0.15s",
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
          gap: "var(--assignment-card-row-gap, 40px)",
          width: "100%",
          height: "var(--assignment-card-row-height, 114px)",
        }}
      >
        {/* Frame 1984077325 — title area, height 29px */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: 0,
            gap: 4,
            width: "100%",
            height: "var(--assignment-card-title-height, 29px)",
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
              gap: 39,
              width: "100%",
              height: "var(--assignment-card-title-height, 29px)",
            }}
          >
            {/* Title: 24px/800, #303030, line-height 120%, letter-spacing -0.04em */}
            <h3
              style={{
                margin: 0,
                fontSize: "var(--assignment-card-title-size, 24px)",
                fontWeight: 800,
                color: "#303030",
                lineHeight: "120%",
                letterSpacing: "-0.04em",
                fontFamily: "inherit",
                flex: 1,
                minWidth: 0,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {assignment.title}
            </h3>
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
    </div>
  );
}
