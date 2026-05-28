"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { MoreVertical } from "lucide-react";
import { useAssignmentStore } from "@/store/assignmentStore";

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
        <MoreVertical size={18} />
      </button>

      {dropdownOpen && (
        <div
          style={{
            position: "absolute",
            top: 32,
            right: 0,
            background: "#ffffff",
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            borderRadius: 10,
            minWidth: 160,
            zIndex: 50,
            border: "1px solid #F0F0F0",
            overflow: "hidden",
          }}
        >
          <button
            id={`view-${assignmentId}`}
            onClick={() => {
              setDropdownOpen(false);
              router.push("/assignments/output");
            }}
            style={{
              width: "100%",
              padding: "10px 16px",
              textAlign: "left",
              background: "none",
              border: "none",
              fontSize: 14,
              fontWeight: 500,
              color: "#1A1A1A",
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "background 0.12s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background = "#F8F8F8")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background = "transparent")
            }
          >
            View Assignment
          </button>
          <button
            id={`delete-${assignmentId}`}
            onClick={() => {
              setDropdownOpen(false);
              deleteAssignment(assignmentId);
            }}
            style={{
              width: "100%",
              padding: "10px 16px",
              textAlign: "left",
              background: "none",
              border: "none",
              fontSize: 14,
              fontWeight: 500,
              color: "#E53935",
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "background 0.12s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background = "#FFF5F5")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background = "transparent")
            }
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
