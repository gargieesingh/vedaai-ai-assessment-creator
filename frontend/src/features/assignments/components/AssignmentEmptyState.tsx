"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

export default function AssignmentEmptyState() {
  const router = useRouter();

  return (
    <div className="empty-state">
      <div className="empty-state__frame">
        {/* Illustration */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/Illustrations.svg"
          alt="No assignments illustration"
          width={220}
          height={200}
          className="empty-state__illustration"
        />

        <div className="empty-state__copy">
          <h1 className="empty-state__title">No assignments yet</h1>
          <p className="empty-state__desc">
            Create your first assignment to start collecting and grading student
            submissions. You can set up rubrics, define marking criteria, and let AI
            assist with grading.
          </p>
        </div>

        <button
          id="empty-state-create-btn"
          onClick={() => router.push("/assignments/create")}
          className="empty-state__button"
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.opacity = "0.88";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.opacity = "1";
          }}
        >
          <Plus size={20} />
          Create Your First Assignment
        </button>
      </div>

      <style>{`
        .empty-state {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          padding: 32px;
          box-sizing: border-box;
        }
        .empty-state__frame {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 14px;
          width: 100%;
        }
        .empty-state__illustration {
          object-fit: contain;
          pointer-events: none;
        }
        .empty-state__copy {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          text-align: center;
        }
        .empty-state__title {
          font-size: 19px;
          font-weight: 700;
          color: #1a1a1a;
          margin-top: 6px;
          letter-spacing: -0.3px;
        }
        .empty-state__desc {
          font-size: 13.5px;
          color: #8c8c8c;
          max-width: 420px;
          line-height: 1.6;
          margin: 0 auto;
        }
        .empty-state__button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          height: 46px;
          padding: 0 26px;
          background: linear-gradient(#1c1c1c, #1c1c1c) padding-box,
            linear-gradient(180deg, #ff7243 0%, #c93d08 100%) border-box;
          color: #ffffff;
          border-radius: 999px;
          font-size: 14.5px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 6px;
          font-family: inherit;
          transition: opacity 0.18s;
        }
      `}</style>
    </div>
  );
}
