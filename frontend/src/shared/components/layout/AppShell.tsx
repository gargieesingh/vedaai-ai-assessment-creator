"use client";

import React from "react";
import { useUser } from "@clerk/nextjs";
import Sidebar from "@/shared/components/layout/Sidebar";
import Header from "@/shared/components/layout/Header";
import MobileBottomNav from "@/shared/components/layout/MobileBottomNav";

interface AppShellProps {
  children: React.ReactNode;
  headerTitle?: string;
  showBack?: boolean;
  disableBack?: boolean;
  showTitleIcon?: boolean;
  footerSlot?: React.ReactNode;
}

export default function AppShell({
  children,
  headerTitle = "Assignment",
  showBack = true,
  disableBack = false,
  showTitleIcon = true,
  footerSlot,
}: AppShellProps) {
  const { isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, #E7E7E7 0%, #DCDCDC 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 36, height: 36, border: "3px solid rgba(0,0,0,0.1)", borderTopColor: "#E8490F", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div
      className="app-shell"
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        background: "linear-gradient(180deg, #E7E7E7 0%, #DCDCDC 100%)",
        overflow: "visible",
      }}
    >
      <div
        className="app-shell__inner"
        style={{
          display: "flex",
          width: "100%",
          maxWidth: 1440,
          height: "100vh",
          padding: 12,
          gap: 12,
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        {/* ── LEFT: Sidebar ── */}
        <div className="app-shell__sidebar-wrap" style={{ flexShrink: 0 }}>
          <aside
            className="app-shell__sidebar"
            style={{
              width: 304,
              minWidth: 304,
              height: "100%",
              background: "#ffffff",
              borderRadius: 16,
              boxShadow: "12px 16px 28px rgba(0, 0, 0, 0.16), 4px 6px 12px rgba(0, 0, 0, 0.08)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <Sidebar />
          </aside>
        </div>

        {/* ── RIGHT: content ── */}
        <div
          className="app-shell__content"
          style={{
            flex: 1,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            background: "transparent",
            minWidth: 0,
          }}
        >
          <Header title={headerTitle} showBack={showBack} disableBack={disableBack} showTitleIcon={showTitleIcon} />

          <main
            style={{
              flex: 1,
              overflow: "auto",
              minHeight: 0,
              paddingTop: 12,
              paddingBottom: 0,
            }}
          >
            {children}
          </main>

          {footerSlot}
        </div>
      </div>
      <MobileBottomNav />
    </div>
  );
}
