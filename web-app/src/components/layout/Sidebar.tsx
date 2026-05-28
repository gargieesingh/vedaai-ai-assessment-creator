"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutGrid,
  Users,
  FileText,
  BookOpen,
  Clock,
  Settings,
  Sparkles,
} from "lucide-react";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  badge?: number;
}

const NAV_ITEMS: NavItem[] = [
  { icon: <LayoutGrid size={17} />, label: "Home", href: "/" },
  { icon: <Users size={17} />, label: "My Groups", href: "/" },
  {
    icon: <FileText size={17} />,
    label: "Assignments",
    href: "/assignments",
  },
  { icon: <BookOpen size={17} />, label: "AI Teacher's Toolkit", href: "/" },
  { icon: <Clock size={17} />, label: "My Library", href: "/" },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (label: string) => {
    if (label === "Assignments") {
      return pathname.startsWith("/assignments");
    }
    return false;
  };

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 24,
        overflow: "hidden",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* ── Top Block (Frame 39962) ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 56, width: 254, margin: "0 auto", alignItems: "center" }}>
      {/* ── Logo ── */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          width: 251,
          height: 40,
        }}
      >
        <div
          style={{
            position: "relative",
            width: 40,
            height: 40,
            overflow: "hidden",
            flexShrink: 0,
            borderRadius: 15,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo 2.svg"
            alt="VedaAI logo"
            style={{
              position: "absolute",
              left: -19.7,
              top: -1.85,
              width: 80,
              height: 71,
              maxWidth: "none",
            }}
          />
        </div>
        <span className="sidebar-wordmark">VedaAI</span>
      </div>

      {/* ── Create Assignment button ── */}
      <button
        id="sidebar-create-btn"
        onClick={() => router.push("/assignments/create")}
        style={{
          width: 251,
          height: 42,
          background: "linear-gradient(#1C1C1C, #1C1C1C) padding-box, linear-gradient(180deg, #FF7243 0%, #C93D08 100%) border-box",
          color: "#ffffff",
          border: "4px solid transparent",
          borderRadius: 999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          fontWeight: 600,
          fontSize: 13.5,
          cursor: "pointer",
          transition: "opacity 0.18s",
          fontFamily: "inherit",
          flexShrink: 0,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.opacity = "0.88";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.opacity = "1";
        }}
      >
        <Sparkles size={14} color="#E8490F" />
        Create Assignment
      </button>

      {/* ── Nav items ── */}
      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.label);
          return (
            <button
              key={item.label}
              id={`nav-${item.label.replace(/\s+/g, "-").toLowerCase()}`}
              onClick={() => router.push(item.href)}
              style={{
                width: 254,
                height: 40,
                borderRadius: 8,
                padding: "9px 12px",
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: active ? "#EFEFEF" : "transparent",
                color: active ? "#1A1A1A" : "#6B6B6B",
                fontWeight: active ? 600 : 500,
                fontSize: 13,
                border: "none",
                cursor: "pointer",
                transition: "background 0.14s ease",
                fontFamily: "inherit",
                textAlign: "left",
              }}
              onMouseEnter={(e) => {
                if (!active)
                  (e.currentTarget as HTMLButtonElement).style.background = "#F7F7F7";
              }}
              onMouseLeave={(e) => {
                if (!active)
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              }}
            >
              <span
                style={{
                  color: active ? "#1A1A1A" : "#7A7A7A",
                  display: "flex",
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </span>
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.badge !== undefined && (
                <span
                  style={{
                    background: "#E8490F",
                    color: "#ffffff",
                    fontSize: 11,
                    fontWeight: 600,
                    borderRadius: 10,
                    padding: "0 6px",
                    minWidth: 20,
                    height: 20,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>
      </div>

      {/* ── Bottom Block (Frame 1984077460) ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 256, margin: "0 auto" }}>
      {/* ── Settings ── */}
      <button
        id="nav-settings"
        style={{
          width: 256,
          height: 38,
          borderRadius: 8,
          padding: "8px 12px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: "transparent",
          color: "#6B6B6B",
          fontWeight: 500,
          fontSize: 12.5,
          border: "none",
          cursor: "pointer",
          fontFamily: "inherit",
          transition: "background 0.14s",
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.background = "#F7F7F7")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.background = "transparent")
        }
      >
        <Settings size={16} color="#7A7A7A" />
        Settings
      </button>

      {/* ── School card ── */}
      <div
        style={{
          width: 256,
          height: 80,
          background: "#F0F0F0",
          borderRadius: 16,
          padding: 12,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          flexShrink: 0,
        }}
      >
        {/* Profile Info Row (232x56) */}
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 8, width: 232, height: 56 }}>
        {/* Avatar */}
        <div
          style={{
            width: 59,
            height: 56,
            borderRadius: 8,
            background: "linear-gradient(135deg, #f5a623, #e8490f)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            fontSize: 18,
          }}
        >
          🏫
        </div>
        <div style={{ display: "flex", flexDirection: "column", width: 165, height: 44, justifyContent: "center" }}>
          <div
            style={{
              fontWeight: 700,
              fontSize: 16,
              color: "#303030",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              height: 22,
              display: "flex",
              alignItems: "center",
            }}
          >
            Delhi Public School
          </div>
          <div
            style={{
              fontSize: 14,
              fontWeight: 400,
              color: "#5E5E5E",
              height: 20,
              display: "flex",
              alignItems: "center",
            }}
          >
            Bokaro Steel City
          </div>
        </div>
        </div>
      </div>
      </div>
    </div>
  );
}
