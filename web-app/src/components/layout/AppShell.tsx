"use client";

import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

interface AppShellProps {
  children: React.ReactNode;
  headerTitle?: string;
  showBack?: boolean;
  footerSlot?: React.ReactNode;
}

export default function AppShell({
  children,
  headerTitle = "Assignment",
  showBack = true,
  footerSlot,
}: AppShellProps) {
  return (
    /*
     * Outer gray canvas — #E0E0E0, 12px padding on all sides, 12px gap.
     * Both sidebar and right panel float inside this canvas.
     */
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: "linear-gradient(180deg, #E7E7E7 0%, #DCDCDC 100%)",
        padding: 12,
        gap: 12,
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {/* ── LEFT: Sidebar — white floating card ── */}
      <aside
        style={{
          width: 304,
          minWidth: 304,
          height: "100%",
          background: "#ffffff",
          borderRadius: 16,
          boxShadow: "0px 16px 48px rgba(0, 0, 0, 0.12), 0px 32px 48px rgba(0, 0, 0, 0.2)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <Sidebar />
      </aside>

      {/*
       * ── RIGHT: layout container ──
       * Same bg as outer canvas — transparent to canvas.
       * No overflow:hidden needed — header is a self-contained floating card.
       */}
      <div
        style={{
          flex: 1,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "transparent",
          minWidth: 0,
        }}
      >
        {/* White header bar — its top corners are clipped by parent borderRadius */}
        <Header title={headerTitle} showBack={showBack} />

        {/* Scrollable content — sits directly on the outer/primary gray */}
        <main
          style={{
            flex: 1,
            overflow: "auto",
            minHeight: 0,
            paddingTop: 12,
            paddingBottom: 10,
          }}
        >
          {children}
        </main>

        {/* Optional pinned footer (e.g. form Prev/Next) */}
        {footerSlot}
      </div>
    </div>
  );
}
