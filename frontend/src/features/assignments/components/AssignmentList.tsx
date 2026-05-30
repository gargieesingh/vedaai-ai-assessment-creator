"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAssignmentStore } from "@/features/assignments/hooks/assignmentStore";
import AssignmentCard from "@/features/assignments/components/AssignmentCard";
import AssignmentEmptyState from "@/features/assignments/components/AssignmentEmptyState";
import { ProgressiveBlur } from "@/shared/components/ui/progressive-blur";

export default function AssignmentList() {
  const assignments = useAssignmentStore((s) => s.assignments);
  const patchAssignment = useAssignmentStore((s) => s.patchAssignment);
  const router = useRouter();
  const [search, setSearch] = useState("");

  // Retroactively hydrate any stale assignments still using form defaults (8th/Science)
  useEffect(() => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:5000";
    assignments.forEach(async (a) => {
      if ((a.subject === "Science" || !a.subject) && (a.class === "8th" || !a.class)) {
        try {
          const res = await fetch(`${apiBase}/api/assignments/${a.id}`);
          if (!res.ok) return;
          const data = await res.json();
          const meta = data.result?.metadata;
          if (!meta) return;
          const finalClass = (meta.className || a.class || "8th").replace(/^class\s+/i, "").trim();
          const finalSubject = (meta.subject || a.subject || "Science").trim();
          const finalTitle = `Class ${finalClass} ${finalSubject} Assignment`;
          patchAssignment(a.id, { class: meta.className || a.class, subject: meta.subject || a.subject, title: finalTitle });
        } catch { /* silently skip if backend unavailable */ }
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = assignments.filter((a) => {
    const dynamicTitle = `Class ${(a.class || "8th").replace(/^class\s+/i, "").trim()} ${(a.subject || "Science").trim()} Assignment`;
    return dynamicTitle.toLowerCase().includes(search.toLowerCase()) ||
      (a.title || "").toLowerCase().includes(search.toLowerCase());
  });

  // Show empty state when there are no assignments at all
  if (assignments.length === 0) {
    return <AssignmentEmptyState />;
  }

  return (
    <div
      className="assignment-list"
      style={{
        position: "relative",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: "100%",
        overflowX: "hidden",
        boxSizing: "border-box",
      }}
    >

      {/* Scrollable content */}
      <div
        className="assignment-list__content"
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          paddingTop: 20,
          paddingBottom: 120,
          width: "100%",
          maxWidth: "100%",
          boxSizing: "border-box",
        }}
      >
        <div className="assignment-list__mobile-bar">
          <button
            className="assignment-list__mobile-back"
            type="button"
            onClick={() => router.back()}
            aria-label="Go back"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.7071 4.29289C11.0976 4.68342 11.0976 5.31658 10.7071 5.70711L5.41421 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H5.41421L10.7071 18.2929C11.0976 18.6834 11.0976 19.3166 10.7071 19.7071C10.3166 20.0976 9.68342 20.0976 9.29289 19.7071L2.29289 12.7071C1.90237 12.3166 1.90237 11.6834 2.29289 11.2929L9.29289 4.29289C9.68342 3.90237 10.3166 3.90237 10.7071 4.29289Z"
                fill="#303030"
              />
            </svg>
          </button>
          <div className="assignment-list__mobile-title">Assignments</div>
        </div>

        {/* Title — plain on grey background, no card */}
        <div
          className="assignment-list__title"
          style={{
            marginBottom: 12,
            paddingLeft: 8,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span
            className="assignment-list__title-dot"
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#4BC26D",
              display: "inline-block",
              flexShrink: 0,
              boxShadow: "0 0 0 4px rgba(75, 194, 109, 0.4), 0px 16px 48px rgba(0,0,0,0.12), 0px 32px 48px rgba(0,0,0,0.2)",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <h1
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "#303030",
                lineHeight: "140%",
                letterSpacing: "-0.04em",
                fontFamily: "inherit",
              }}
            >
              Assignments
            </h1>
            <p
              style={{
                margin: 0,
                fontSize: 14,
                fontWeight: 400,
                color: "rgba(94, 94, 94, 0.55)",
                lineHeight: "140%",
                letterSpacing: "-0.04em",
                fontFamily: "inherit",
              }}
            >
              Manage and create assignments for your classes.
            </p>
          </div>
        </div>


        {/* Card 2 — Filter row */}
        <div
          className="assignment-list__filter"
          style={{
            background: "#FFFFFF",
            borderRadius: 20,
            boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
            height: 64,
            width: "100%",
            marginBottom: 14,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0px 16px",
            gap: 36,
            flex: "none",
            order: 1,
            alignSelf: "stretch",
            flexGrow: 0,
            zIndex: 4,
            boxSizing: "border-box",
          }}
        >
          <button
            id="filter-btn"
            className="assignment-list__filter-btn"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 700,
              color: "#A9A9A9",
              letterSpacing: "-0.04em",
              lineHeight: "140%",
              fontFamily: "inherit",
              padding: 0,
            }}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M0 2.32153C0 1.03938 1.03938 0 2.32153 0H12.6785C13.9606 0 15 1.03938 15 2.32153C15 2.99412 14.7594 3.64453 14.3217 4.1552L11.9599 6.91062C11.0537 7.96787 10.5556 9.31442 10.5556 10.7069V12.5C10.5556 13.8807 9.43627 15 8.05556 15H6.94444C5.56373 15 4.44444 13.8807 4.44444 12.5V10.7069C4.44444 9.31442 3.94632 7.96787 3.04011 6.91062L0.678317 4.1552C0.240601 3.64453 0 2.99412 0 2.32153ZM2.32153 1.66667C1.95986 1.66667 1.66667 1.95986 1.66667 2.32153C1.66667 2.59627 1.76495 2.86195 1.94375 3.07054L4.30554 5.82597C5.47067 7.18529 6.11111 8.91657 6.11111 10.7069V12.5C6.11111 12.9602 6.48421 13.3333 6.94444 13.3333H8.05556C8.51579 13.3333 8.88889 12.9602 8.88889 12.5V10.7069C8.88889 8.91657 9.52933 7.18529 10.6945 5.82597L13.0563 3.07054C13.2351 2.86195 13.3333 2.59627 13.3333 2.32153C13.3333 1.95986 13.0401 1.66667 12.6785 1.66667H2.32153Z" fill="#A9A9A9" />
            </svg>
            Filter By
          </button>

          <div className="assignment-list__search" style={{ position: "relative", width: "100%", maxWidth: 380 }}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)" }}
            >
              <path fillRule="evenodd" clipRule="evenodd" d="M9.16675 3.33335C5.94509 3.33335 3.33341 5.94503 3.33341 9.16669C3.33341 12.3883 5.94509 15 9.16675 15C12.3884 15 15.0001 12.3883 15.0001 9.16669C15.0001 5.94503 12.3884 3.33335 9.16675 3.33335ZM1.66675 9.16669C1.66675 5.02455 5.02461 1.66669 9.16675 1.66669C13.3089 1.66669 16.6667 5.02455 16.6667 9.16669C16.6667 13.3088 13.3089 16.6667 9.16675 16.6667C5.02461 16.6667 1.66675 13.3088 1.66675 9.16669Z" fill="#A9A9A9" />
              <path fillRule="evenodd" clipRule="evenodd" d="M13.5776 13.5775C13.903 13.252 14.4306 13.252 14.7561 13.5775L18.0894 16.9108C18.4149 17.2362 18.4149 17.7639 18.0894 18.0893C17.764 18.4147 17.2363 18.4147 16.9109 18.0893L13.5776 14.756C13.2521 14.4305 13.2521 13.9029 13.5776 13.5775Z" fill="#A9A9A9" />
            </svg>
            <input
              className="assignment-list__search-input"
              id="assignment-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Assignment"
              style={{
                width: "100%",
                height: 44,
                paddingLeft: 44,
                paddingRight: 16,
                border: "1px solid rgba(0, 0, 0, 0.2)",
                borderRadius: 100,
                fontSize: 14,
                fontWeight: 700,
                color: "#A9A9A9",
                letterSpacing: "-0.04em",
                lineHeight: "140%",
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
          className="assignment-list__grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 16,
            paddingTop: 4,
            width: "100%",
            maxWidth: "100%",
            boxSizing: "border-box",
          }}
        >
          {filtered.map((assignment) => (
            <AssignmentCard key={assignment.id} assignment={assignment} />
          ))}
        </div>
      </div>

      {/* Bottom blur fade + centered button */}
      <div
        className="assignment-list__footer"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 110,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          paddingBottom: 24,
          pointerEvents: "none",
          zIndex: 10,
        }}
      >
        <ProgressiveBlur position="bottom" height="100%" />
        <button
          className="assignment-list__footer-button"
          id="list-create-btn"
          onClick={() => router.push("/assignments/create")}
          style={{
            pointerEvents: "all",
            position: "relative",
            zIndex: 20,
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
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M0 7.49996C0 7.03972 0.373096 6.66663 0.833333 6.66663H14.1667C14.6269 6.66663 15 7.03972 15 7.49996C15 7.9602 14.6269 8.33329 14.1667 8.33329H0.833333C0.373096 8.33329 0 7.9602 0 7.49996Z" fill="white" />
            <path fillRule="evenodd" clipRule="evenodd" d="M7.49992 -3.64262e-08C7.96016 -1.63085e-08 8.33325 0.373096 8.33325 0.833333L8.33325 14.1667C8.33325 14.6269 7.96016 15 7.49992 15C7.03968 15 6.66658 14.6269 6.66658 14.1667L6.66659 0.833333C6.66659 0.373096 7.03968 -5.65438e-08 7.49992 -3.64262e-08Z" fill="white" />
          </svg>
          Create Assignment
        </button>
      </div>

      <button
        className="assignment-list__fab"
        aria-label="Create assignment"
        onClick={() => router.push("/assignments/create")}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M2.5 9.99996C2.5 9.53972 2.8731 9.16663 3.33333 9.16663H16.6667C17.1269 9.16663 17.5 9.53972 17.5 9.99996C17.5 10.4602 17.1269 10.8333 16.6667 10.8333H3.33333C2.8731 10.8333 2.5 10.4602 2.5 9.99996Z" fill="#FF5623"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M10.0002 2.5C10.4604 2.5 10.8335 2.8731 10.8335 3.33333L10.8335 16.6667C10.8335 17.1269 10.4604 17.5 10.0002 17.5C9.53992 17.5 9.16683 17.1269 9.16683 16.6667L9.16683 3.33333C9.16683 2.8731 9.53993 2.5 10.0002 2.5Z" fill="#FF5623"/>
        </svg>
      </button>

      <style>{`
        .assignment-list__fab { display: none; }
        @media (min-width: 769px) {
          .assignment-list__mobile-bar { display: none; }
        }
      `}</style>
    </div>
  );
}

