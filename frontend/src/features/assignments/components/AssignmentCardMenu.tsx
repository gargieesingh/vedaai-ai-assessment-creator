"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAssignmentStore } from "@/features/assignments/hooks/assignmentStore";

interface AssignmentCardMenuProps {
  assignmentId: string;
}

export default function AssignmentCardMenu({ assignmentId }: AssignmentCardMenuProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const deleteAssignment = useAssignmentStore((s) => s.deleteAssignment);
  const router = useRouter();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div style={{ position: "relative" }} ref={dropdownRef}>
      <button
        id={`card-menu-${assignmentId}`}
        onClick={(e) => {
          e.stopPropagation();
          setDropdownOpen((v) => !v);
        }}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 4,
          borderRadius: 6,
          color: "#888888",
          display: "flex",
          transition: "background 0.15s",
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.background = "#F4F4F4")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.background = "transparent")
        }
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10Z" fill="#A9A9A9"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M12 17C13.1046 17 14 17.8954 14 19C14 20.1046 13.1046 21 12 21C10.8954 21 10 20.1046 10 19C10 17.8954 10.8954 17 12 17Z" fill="#A9A9A9"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M12 3C13.1046 3 14 3.89543 14 5C14 6.10457 13.1046 7 12 7C10.8954 7 10 6.10457 10 5C10 3.89543 10.8954 3 12 3Z" fill="#A9A9A9"/>
        </svg>
      </button>

      {dropdownOpen && (
        <div
          style={{
            position: "absolute",
            top: 36,
            right: 0,
            width: 140,
            height: 84,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 8,
            gap: 4,
            background: "#FFFFFF",
            boxShadow: "0px 16px 48px rgba(0, 0, 0, 0.2), 0px 32px 48px rgba(0, 0, 0, 0.05)",
            borderRadius: 16,
            zIndex: 50,
            boxSizing: "border-box",
          }}
        >
          <button
            id={`view-${assignmentId}`}
            onClick={() => {
              setDropdownOpen(false);
              router.push("/assignments/output");
            }}
            style={{
              width: 124,
              height: 32,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "0 8px",
              gap: 10,
              background: "none",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              transition: "background 0.12s",
              boxSizing: "border-box",
              flex: "none",
              order: 0,
              alignSelf: "stretch",
              flexGrow: 0,
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background = "#F4F4F4")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background = "transparent")
            }
          >
            <span
              style={{
                width: 108,
                height: 20,
                fontFamily: "var(--font-bricolage), sans-serif",
                fontWeight: 500,
                fontSize: 14,
                lineHeight: "20px",
                display: "flex",
                alignItems: "center",
                letterSpacing: "-0.04em",
                color: "#303030",
                whiteSpace: "nowrap",
              }}
            >
              View Assignment
            </span>
          </button>
          <button
            id={`delete-${assignmentId}`}
            onClick={() => {
              setDropdownOpen(false);
              deleteAssignment(assignmentId);
            }}
            style={{
              width: 124,
              height: 32,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "0 8px",
              gap: 10,
              background: "#F6F6F6",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              transition: "background 0.12s",
              boxSizing: "border-box",
              flex: "none",
              order: 1,
              alignSelf: "stretch",
              flexGrow: 0,
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background = "#EBEBEB")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background = "#F6F6F6")
            }
          >
            <span
              style={{
                width: 108,
                height: 20,
                fontFamily: "var(--font-bricolage), sans-serif",
                fontWeight: 500,
                fontSize: 14,
                lineHeight: "20px",
                display: "flex",
                alignItems: "center",
                letterSpacing: "-0.04em",
                color: "#C53535",
                whiteSpace: "nowrap",
              }}
            >
              Delete
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
