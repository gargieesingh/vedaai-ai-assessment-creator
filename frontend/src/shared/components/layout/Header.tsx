"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Sparkles } from "lucide-react";

interface HeaderProps {
  title: string;
  showBack?: boolean;
  disableBack?: boolean;
  showTitleIcon?: boolean;
}

export default function Header({ title, showBack = true, disableBack = false, showTitleIcon = true }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isAssignmentsRoot = pathname === "/assignments";
  const { user } = useUser();
  const displayName =
    user?.firstName
      ? `${user.firstName}${user.lastName ? " " + user.lastName : ""}`
      : user?.emailAddresses?.[0]?.emailAddress?.split("@")[0] ?? "Teacher";

  const firstNameOnly = user?.firstName ?? displayName.split(" ")[0];

  return (
    /*
     * Frame 1618872397 — 1100×56px, padding 0px 12px 0px 24px, gap 10px
     * background: rgba(255,255,255,0.75), border-radius: 16px
     */
    <div
      className="app-header"
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
        className="app-header__inner"
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
        <div className="app-header__left" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {showBack && (
            <button
              className="app-header__back"
              id="header-back-btn"
              disabled={disableBack}
              onClick={() => {
                if (!disableBack) router.back();
              }}
              style={{
                background: "#ffffff",
                border: "none",
                cursor: disableBack ? "not-allowed" : "pointer",
                opacity: disableBack ? 0.5 : 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 40,
                height: 40,
                borderRadius: "50%",
                color: "#1A1A1A",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                transition: "background 0.14s",
              }}
              onMouseEnter={(e) => {
                if (!disableBack) (e.currentTarget as HTMLButtonElement).style.background = "#F4F4F4";
              }}
              onMouseLeave={(e) => {
                if (!disableBack) (e.currentTarget as HTMLButtonElement).style.background = "#ffffff";
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 12H4M4 12L10 18M4 12L10 6" stroke="#303030" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
          {showTitleIcon && (
            isAssignmentsRoot
              ? <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.5 11.6667H11.6667V17.5H17.5V11.6667Z" stroke="#A9A9A9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8.33333 11.6667H2.5V17.5H8.33333V11.6667Z" stroke="#A9A9A9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17.5 2.5H11.6667V8.33333H17.5V2.5Z" stroke="#A9A9A9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8.33333 2.5H2.5V8.33333H8.33333V2.5Z" stroke="#A9A9A9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            : <Sparkles size={18} color="#AAAAAA" />
          )}
          <span
            style={{
              fontSize: 16,
              fontWeight: 500,
              color: "#8A8A8A",
              fontFamily: "inherit",
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </span>
        </div>

        {/* ── Right: bell + user ── */}
        <div className="app-header__right" style={{ display: "flex", alignItems: "center", gap: 12 }}>

          {/* Bell with orange dot */}
          <div
            style={{
              position: "relative",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "#F5F5F5",
            }}
          >
            {/* Bell icon — Figma */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="#303030" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="#303030" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {/* Orange dot badge */}
            <span
              style={{
                position: "absolute",
                top: 4,
                right: 6,
                width: 8,
                height: 8,
                background: "#E8490F",
                borderRadius: "50%",
                border: "1.5px solid #ffffff",
              }}
            />
          </div>

          {/* User section */}
          <div
            className="app-header__user"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "auto",
              maxWidth: 157,
              height: 44,
              gap: 8,
              cursor: "pointer",
              padding: "6px 12px",
              borderRadius: 12,
              background: "linear-gradient(90deg, #ffffff 40.5%, rgba(255, 255, 255, 0) 64.5%)",
              boxShadow: "-8px 4px 12px rgba(0, 0, 0, 0.02)",
              transition: "box-shadow 0.14s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.background = "linear-gradient(90deg, #F9F9F9 40.5%, rgba(255, 255, 255, 0) 64.5%)";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "-8px 4px 16px rgba(0, 0, 0, 0.04)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.background = "linear-gradient(90deg, #ffffff 40.5%, rgba(255, 255, 255, 0) 64.5%)";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "-8px 4px 12px rgba(0, 0, 0, 0.02)";
            }}
          >
            {/* Avatar — circular image with fallback */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: 0,
                gap: 10,
                width: 32,
                height: 32,
                borderRadius: 100,
                overflow: "hidden",
                flexShrink: 0,
                background: "#F6F6F6",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/pfp.png"
                alt={displayName}
                width={32}
                height={32}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            <div
              className="app-header__user-text"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: 0,
                gap: 4,
                flex: 1,
                minWidth: 0,
                height: 24,
              }}
            >
              {/* Name */}
              <span
                className="app-header__user-name"
                style={{
                  flex: 1,
                  minWidth: 0,
                  height: 19,
                  fontFamily: "var(--font-bricolage), sans-serif",
                  fontWeight: 600,
                  fontSize: 16,
                  lineHeight: "19px",
                  display: "block",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  letterSpacing: "-0.04em",
                  color: "#303030",
                }}
              >
                {firstNameOnly}
              </span>

              {/* Chevron */}
              <svg
                className="app-header__user-chevron"
                width="14"
                height="8"
                viewBox="0 0 14 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0.75 0.75L6.75 6.75L12.75 0.75" stroke="#303030" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
