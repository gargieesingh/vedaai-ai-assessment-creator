"use client";

import React from "react";
import { Assignment } from "@/types/assignment";
import AssignmentCardMenu from "@/components/assignment/AssignmentCardMenu";

interface AssignmentCardProps {
  assignment: Assignment;
}

export default function AssignmentCard({ assignment }: AssignmentCardProps) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: 16,
        padding: "22px 20px 20px",
        position: "relative",
        minHeight: 162,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
        transition: "box-shadow 0.15s, transform 0.15s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 6px 18px rgba(0,0,0,0.10)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 1px 4px rgba(0,0,0,0.05)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
      }}
    >
      {/* Title row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <h3
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "#1A1A1A",
            flex: 1,
            marginRight: 8,
            lineHeight: 1.4,
          }}
        >
          {assignment.title}
        </h3>
        <AssignmentCardMenu assignmentId={assignment.id} />
      </div>

      {/* Meta row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 4,
        }}
      >
        <span style={{ fontSize: 12.5, color: "#555555" }}>
          <span style={{ fontWeight: 700, color: "#1A1A1A" }}>Assigned on</span>
          {" : "}
          {assignment.assignedOn}
        </span>
        {assignment.dueDate && (
          <span style={{ fontSize: 12.5, color: "#555555" }}>
            <span style={{ fontWeight: 700, color: "#1A1A1A" }}>Due</span>
            {" : "}
            {assignment.dueDate}
          </span>
        )}
      </div>
    </div>
  );
}
