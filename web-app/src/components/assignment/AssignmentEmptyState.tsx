"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

export default function AssignmentEmptyState() {
  const router = useRouter();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        gap: 14,
        padding: 32,
      }}
    >
      {/* Illustration */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/Illustrations.svg"
        alt="No assignments illustration"
        width={220}
        height={200}
        style={{ objectFit: "contain", pointerEvents: "none" }}
      />

      <h1
        style={{
          fontSize: 19,
          fontWeight: 700,
          color: "#1A1A1A",
          marginTop: 6,
          letterSpacing: "-0.3px",
        }}
      >
        No assignments yet
      </h1>
      <p
        style={{
          fontSize: 13.5,
          color: "#8C8C8C",
          maxWidth: 420,
          textAlign: "center",
          lineHeight: 1.6,
          margin: "0 auto",
        }}
      >
        Create your first assignment to start collecting and grading student
        submissions. You can set up rubrics, define marking criteria, and let AI
        assist with grading.
      </p>

      <button
        id="empty-state-create-btn"
        onClick={() => router.push("/assignments/create")}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          height: 46,
          padding: "0 26px",
          background: "linear-gradient(#1C1C1C, #1C1C1C) padding-box, linear-gradient(180deg, #FF7243 0%, #C93D08 100%) border-box",
          color: "#ffffff",
          borderRadius: 999,
          fontSize: 14.5,
          fontWeight: 600,
          cursor: "pointer",
          marginTop: 6,
          fontFamily: "inherit",
          transition: "opacity 0.18s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.opacity = "0.88";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.opacity = "1";
        }}
      >
        <Plus size={15} />
        Create Your First Assignment
      </button>
    </div>
  );
}
