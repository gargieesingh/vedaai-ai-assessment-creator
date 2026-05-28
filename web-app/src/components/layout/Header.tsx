"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, LayoutGrid, ChevronDown } from "lucide-react";

interface HeaderProps {
  title: string;
  showBack?: boolean;
}

export default function Header({ title, showBack = true }: HeaderProps) {
  const router = useRouter();

  return (
    /*
     * The header is a FLOATING white card with rounded corners on ALL 4 sides.
     * It sits flush inside the right panel to match the 1100px width spec.
     */
    <div
      style={{
        margin: 0,
        background: "rgba(255, 255, 255, 0.75)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderRadius: 16,
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        border: "1px solid rgba(255,255,255,0.6)",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: 24,
          paddingRight: 12,
        }}
      >
        {/* ── Left: back arrow + breadcrumb ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {showBack && (
            <button
              id="header-back-btn"
              onClick={() => router.back()}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                padding: "4px 6px",
                borderRadius: 8,
                color: "#6B6B6B",
                transition: "background 0.14s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background = "#F4F4F4")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background = "transparent")
              }
            >
              <ArrowLeft size={17} strokeWidth={2} />
            </button>
          )}
          <LayoutGrid size={15} color="#AAAAAA" />
          <span
            style={{
              fontSize: 13,
              fontWeight: 400,
              color: "#AAAAAA",
              fontFamily: "inherit",
              letterSpacing: "0.01em",
            }}
          >
            {title}
          </span>
        </div>

        {/* ── Right: bell + user ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>

          {/* Bell with orange dot */}
          <div style={{ position: "relative", cursor: "pointer", display: "flex", alignItems: "center" }}>
            {/* Bell icon — outlined style */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4B4B4B"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            {/* Orange dot badge */}
            <span
              style={{
                position: "absolute",
                top: 1,
                right: 1,
                width: 6,
                height: 6,
                background: "#E8490F",
                borderRadius: "50%",
                border: "1.5px solid #ffffff",
              }}
            />
          </div>

          {/* Divider */}
          <div
            style={{
              width: 1,
              height: 20,
              background: "#EEEEEE",
            }}
          />

          {/* User section */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              cursor: "pointer",
              padding: "4px 6px",
              borderRadius: 10,
              transition: "background 0.14s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLDivElement).style.background = "#F7F7F7")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLDivElement).style.background = "transparent")
            }
          >
            {/* Avatar — circular image with fallback */}
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                overflow: "hidden",
                flexShrink: 0,
                border: "1.5px solid #EEEEEE",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=JohnDoe&backgroundColor=b6e3f4"
                alt="John Doe"
                width={30}
                height={30}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => {
                  // Fallback to gradient initial on error
                  const parent = (e.target as HTMLImageElement).parentElement;
                  if (parent) {
                    parent.innerHTML = `<div style="width:30px;height:30px;borderRadius:50%;background:linear-gradient(135deg,#f5a623,#e8490f);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:white;">J</div>`;
                  }
                }}
              />
            </div>

            {/* Name */}
            <span
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: "#1A1A1A",
                fontFamily: "inherit",
              }}
            >
              John Doe
            </span>

            {/* Chevron */}
            <ChevronDown size={13} color="#AAAAAA" strokeWidth={2.5} />
          </div>
        </div>
      </div>
    </div>
  );
}
