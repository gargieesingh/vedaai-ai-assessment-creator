"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { useAssignmentStore } from "@/store/assignmentStore";
import AssignmentCard from "@/components/assignment/AssignmentCard";
import AssignmentEmptyState from "@/components/assignment/AssignmentEmptyState";

export default function AssignmentList() {
  const assignments = useAssignmentStore((s) => s.assignments);
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filtered = assignments.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  // Show empty state when there are no assignments at all
  if (assignments.length === 0) {
    return <AssignmentEmptyState />;
  }

  return (
    <div style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column" }}>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: "auto", paddingTop: 20, paddingBottom: 120 }}>

        {/* Title — plain on grey background, no card */}
        <div style={{ marginBottom: 12, paddingLeft: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#22C55E",
                display: "inline-block",
                flexShrink: 0,
                boxShadow: "0 0 0 3px rgba(34,197,94,0.18)",
              }}
            />
            <h1 style={{ fontSize: 19, fontWeight: 700, color: "#1A1A1A" }}>
              Assignments
            </h1>
          </div>
          <p style={{ fontSize: 12.5, color: "#8C8C8C", marginLeft: 18 }}>
            Manage and create assignments for your classes.
          </p>
        </div>

        {/* Card 2 — Filter row */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: 16,
            boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
            height: 64,
            marginBottom: 14,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 16px",
            gap: 16,
          }}
        >
          <button
            id="filter-btn"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 13,
              color: "#4B4B4B",
              fontWeight: 500,
              fontFamily: "inherit",
              padding: "6px 10px",
              borderRadius: 10,
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background = "#F4F4F4")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background = "transparent")
            }
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
            </svg>
            Filter By
          </button>

          <div style={{ position: "relative", width: 260 }}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#AAAAAA"
              strokeWidth="2"
              style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}
            >
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              id="assignment-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Assignment"
              style={{
                width: "100%",
                height: 36,
                paddingLeft: 36,
                paddingRight: 12,
                border: "1px solid #E2E2E2",
                borderRadius: 999,
                fontSize: 12.5,
                color: "#1A1A1A",
                background: "#ffffff",
                outline: "none",
                fontFamily: "inherit",
                transition: "border-color 0.15s",
                boxSizing: "border-box",
              }}
              onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = "#E8490F")}
              onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = "#E2E2E2")}
            />
          </div>
        </div>

        {/* Grid */}
        <div
          style={{
          display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 14,
            paddingTop: 4,
          }}
        >
          {filtered.map((assignment) => (
            <AssignmentCard key={assignment.id} assignment={assignment} />
          ))}
        </div>
      </div>

      {/* Bottom blur fade + centered button */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 110,
          background: "linear-gradient(to top, rgba(220,220,220,0.98) 30%, rgba(220,220,220,0) 100%)",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          paddingBottom: 24,
          pointerEvents: "none",
          zIndex: 10,
        }}
      >
        <button
          id="list-create-btn"
          onClick={() => router.push("/assignments/create")}
          style={{
            pointerEvents: "all",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            height: 46,
            padding: "0 28px",
            background: "linear-gradient(#1C1C1C, #1C1C1C) padding-box, linear-gradient(180deg, #FF7243 0%, #C93D08 100%) border-box",
            color: "#ffffff",
            borderRadius: 999,
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "inherit",
            transition: "opacity 0.18s",
            boxShadow: "0 4px 20px rgba(0,0,0,0.22)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.opacity = "0.88";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.opacity = "1";
          }}
        >
          <Plus size={17} />
          Create Assignment
        </button>
      </div>
    </div>
  );
}
