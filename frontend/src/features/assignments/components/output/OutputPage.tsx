"use client";

import React from "react";
import dynamic from "next/dynamic";
import generatingAnimation from "../../../../../public/468219d6-629f-11ee-8be4-7b2cd99be2c5.json";
import { useAssignmentStore } from "@/features/assignments/hooks/assignmentStore";
import { GeneratedPaper } from "@/features/assignments/types/assignment";
import QuestionSection from "@/features/assignments/components/output/QuestionSection";
import AnswerKeySection from "@/features/assignments/components/output/AnswerKeySection";
import { useUser } from "@clerk/nextjs";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

// ── Shared tokens ─────────────────────────────────────────────────────────────
const inter = "'Inter', sans-serif";
const bricolage = "'Bricolage Grotesque', sans-serif";
const primary = "#303030";

// ── Paper content: Frame 1618872449 ──────────────────────────────────────────
function PaperContent({ paper }: { paper: GeneratedPaper }) {
  return (
    <div
      className="output-paper paper-font"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 32,
        gap: 24,
        width: 1060,
        maxWidth: "100%",
        minHeight: 1465,
        background: "#FFFFFF",
        borderRadius: 32,
        boxSizing: "border-box",
        fontFamily: inter,
        margin: "0 auto",
      }}
    >
      {/* ── Delhi Public School Header ── */}
      <div
        className="output-paper__title"
        style={{
          width: "100%",
          maxWidth: 996,
          minHeight: 124,
          fontSize: 32,
          fontWeight: 700,
          lineHeight: "160%",
          textAlign: "center",
          letterSpacing: "-0.04em",
          color: primary,
          fontFamily: inter,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span>{paper.school}</span>
        <span style={{ fontSize: 24, fontWeight: 600, lineHeight: "160%", letterSpacing: "-0.04em" }}>Subject: {paper.subject}</span>
        <span style={{ fontSize: 24, fontWeight: 600, lineHeight: "160%", letterSpacing: "-0.04em" }}>Class: {(paper.class || "").replace(/^class\s+/i, "").trim() || "____"}</span>
      </div>

      {/* ── Frame 1984077298: Time Allowed + Maximum Marks ── */}
      <div
        className="output-paper__meta"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 0,
          gap: 10,
          width: "100%",
          maxWidth: 996,
          height: 29,
        }}
      >
        <span
          className="output-paper__meta-item"
          style={{
            fontSize: 18,
            fontWeight: 600,
            lineHeight: "160%",
            letterSpacing: "-0.04em",
            color: primary,
            fontFamily: inter,
            display: "flex",
            alignItems: "center",
          }}
        >
          Time Allowed: {paper.timeAllowed}
        </span>
        <span
          className="output-paper__meta-item"
          style={{
            fontSize: 18,
            fontWeight: 600,
            lineHeight: "160%",
            letterSpacing: "-0.04em",
            color: primary,
            fontFamily: inter,
            display: "flex",
            alignItems: "center",
          }}
        >
          Maximum Marks: {paper.maxMarks}
        </span>
      </div>

      {/* ── Frame 1984077299: General instruction ── */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 0,
          gap: 10,
          width: "100%",
          maxWidth: 996,
          height: 29,
        }}
      >
        <span
          className="output-paper__compulsory-text"
          style={{
            width: "100%",
            fontSize: 18,
            fontWeight: 600,
            lineHeight: "160%",
            letterSpacing: "-0.04em",
            color: primary,
            fontFamily: inter,
            display: "flex",
            alignItems: "center",
          }}
        >
          All questions are compulsory unless stated otherwise.
        </span>
      </div>

      {/* ── Frame 1984077300: Student info fields ── */}
      <div
        className="output-paper__student"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: 0,
          width: "100%",
          maxWidth: 996,
          height: 116,
        }}
      >
        {[
          "Name: ______________________",
          "Roll Number: ________________",
          `Class: ${(paper.class || "").replace(/^class\s+/i, "").trim() || "____"}`,
          "Section: ____________________",
        ].map((line) => (
          <span
            key={line}
            className="output-paper__student-line"
            style={{
              fontSize: 18,
              fontWeight: 600,
              lineHeight: "160%",
              letterSpacing: "-0.04em",
              color: primary,
              fontFamily: inter,
              display: "flex",
              alignItems: "center",
              height: 29,
            }}
          >
            {line}
          </span>
        ))}
      </div>

      {/* ── Sections ── */}
      {paper.sections
        .filter((s) => s.questions.length > 0)
        .map((section) => (
          <QuestionSection key={section.title} section={section} />
        ))}

      {/* ── Answer Key ── */}
      <AnswerKeySection paper={paper} />
    </div>
  );
}

// ── Main output page ──────────────────────────────────────────────────────────
export default function OutputPage() {
  const generatedOutput = useAssignmentStore((s) => s.generatedOutput);
  const isGenerating = useAssignmentStore((s) => s.isGenerating);
  const formData = useAssignmentStore((s) => s.formData);

  const handleDownload = () => {
    const paperEl = document.querySelector<HTMLElement>(".output-paper");
    if (!paperEl) { window.print(); return; }

    const paperHTML = paperEl.outerHTML;
    const iframe = document.createElement("iframe");
    iframe.style.cssText = "position:fixed;top:-9999px;left:-9999px;width:210mm;height:297mm;border:none;";
    document.body.appendChild(iframe);

    const doc = iframe.contentDocument!;
    doc.open();
    doc.write(
      '<!DOCTYPE html><html><head><meta charset="utf-8"/><title>Question Paper</title>' +
      '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"/>' +
      '<style>' +
      '* { box-sizing: border-box; margin: 0; padding: 0; }' +
      'body { font-family: Inter, sans-serif; font-size: 13px; color: #000; background: #fff; padding: 20mm 18mm; }' +
      '@page { margin: 0; size: A4; }' +
      '@media print { body { padding: 12mm 14mm; } }' +
      '</style></head><body>' + paperHTML + '</body></html>'
    );
    doc.close();

    iframe.onload = () => {
      setTimeout(() => {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
        setTimeout(() => document.body.removeChild(iframe), 1000);
      }, 600);
    };
  };

  const { user } = useUser();
  const firstName = user?.firstName || user?.fullName?.split(" ")[0] || "there";

  // Intro message — "Certainly, [Name]! Here are customised Question Paper for your [Grade] [Subject] classes."
  const introText = isGenerating
    ? `Generating your question paper…`
    : generatedOutput
      ? (() => {
        const cleanBannerClass = (generatedOutput.class || "").replace(/^class\s+/i, "").trim();
        return `Certainly, ${firstName}! Here are customized Question Paper for your${cleanBannerClass ? ` ${cleanBannerClass}` : ""
          }${generatedOutput.subject ? ` ${generatedOutput.subject}` : ""} classes.`;
      })()
      : "No assignment generated yet.";

  // ── Empty state: not generating, no output ──────────────────────────────
  if (!isGenerating && !generatedOutput) {
    return (
      <div className="output-page-container" style={{ height: "100%" }}>
        <div
          className="output-outer"
          style={{
            background: "#5E5E5E",
            borderRadius: 32,
            paddingTop: 20,
            paddingRight: 20,
            paddingBottom: 32,
            paddingLeft: 20,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            boxSizing: "border-box",
          }}
        >
          <div
            className="output-header"
            style={{
              background: "rgba(24, 24, 24, 0.8)",
              borderRadius: 32,
              padding: "24px 32px",
              display: "flex",
              flexDirection: "column",
              gap: 24,
              alignItems: "flex-start",
            }}
          >
            <p
              className="output-header__intro"
              style={{
                margin: 0,
                width: "100%",
                fontSize: 20,
                fontWeight: 700,
                color: "#FFFFFF",
                letterSpacing: "-0.04em",
                lineHeight: "140%",
                fontFamily: bricolage,
              }}
            >
              No assignment generated yet.
            </p>
          </div>
          <div
            style={{
              padding: "48px 32px",
              textAlign: "center",
              color: "#8C8C8C",
              fontFamily: inter,
              fontSize: 16,
              background: "#FFFFFF",
              borderRadius: 32,
            }}
          >
            Generate an assignment to see your question paper here.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="output-page-container" style={{ height: "100%" }}>
      {isGenerating ? (
        /* ── Full-height generating state ── */
        <div
          className="output-generating"
          style={{
            background: "#5E5E5E",
            borderRadius: 32,
            width: "100%",
            height: "100%",
            minHeight: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "stretch",
            boxSizing: "border-box",
            padding: 20,
          }}
        >
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: 32,
              flex: 1,
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 24,
              padding: 40,
              boxSizing: "border-box",
            }}
          >
            <Lottie
              animationData={generatingAnimation}
              loop
              autoplay
              style={{ width: 200, height: 200 }}
            />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <p
                style={{
                  margin: 0,
                  fontSize: 22,
                  fontWeight: 700,
                  color: primary,
                  letterSpacing: "-0.04em",
                  lineHeight: "140%",
                  fontFamily: bricolage,
                  textAlign: "center",
                }}
              >
                Generating your question paper…
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  fontWeight: 400,
                  color: "#8C8C8C",
                  letterSpacing: "-0.02em",
                  lineHeight: "150%",
                  fontFamily: inter,
                  textAlign: "center",
                }}
              >
                This may take a few moments. Please don&apos;t close the tab.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* ── Outer dark container: Frame 1618872395 ── */
        <div
          className="output-outer"
          style={{
            background: "#5E5E5E",
            borderRadius: 32,
            paddingTop: 20,
            paddingRight: 20,
            paddingBottom: 32,
            paddingLeft: 20,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            boxSizing: "border-box",
          }}
        >
          {/* ── Dark header bar: Frame 1618872450 ── */}
          {/* Figma: column layout, rgba(24,24,24,0.8), 32px radius, 24px/32px padding, gap 24px */}
          <div
            className="output-header"
            style={{
              background: "rgba(24, 24, 24, 0.8)",
              borderRadius: 32,
              padding: "24px 32px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              gap: 24,
              boxSizing: "border-box",
              width: "100%",
              minHeight: 164,
            }}
          >
            {/* Frame 1618872453 > Frame 1984077288 — title text */}
            <p
              className="output-header__intro"
              style={{
                margin: 0,
                width: "100%",
                fontSize: 20,
                fontWeight: 700,
                lineHeight: "140%",
                letterSpacing: "-0.04em",
                color: "#FFFFFF",
                fontFamily: bricolage,
              }}
            >
              {introText}
            </p>

            {/* Frame 1618872463 > Frame 1618872346 — Download button */}
            <div
              className="output-download-desktop"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "flex-start",
                gap: 16,
              }}
            >
              <button
                id="download-pdf-btn"
                onClick={handleDownload}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "0 24px",
                  gap: 4,
                  width: 200,
                  height: 44,
                  background: "#FFFFFF",
                  color: primary,
                  border: "none",
                  borderRadius: 100,
                  cursor: "pointer",
                  fontFamily: bricolage,
                  transition: "opacity 0.15s",
                  flexShrink: 0,
                  boxSizing: "border-box",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.opacity = "0.9";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.opacity = "1";
                }}
              >
                {/* Frame 1984077260 */}
                <span
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M13.224 5.05526C13.0206 5.00643 12.7929 5 12.0116 5H9.7998C8.94322 5 8.36092 5.00078 7.91083 5.03755C7.47242 5.07337 7.24821 5.1383 7.09181 5.21799C6.71549 5.40974 6.40953 5.7157 6.21778 6.09202C6.13809 6.24842 6.07317 6.47262 6.03735 6.91104C6.00057 7.36113 5.9998 7.94342 5.9998 8.8V12H3.9998L3.99979 8.7587C3.99978 7.95373 3.99977 7.28937 4.04399 6.74818C4.08991 6.18608 4.18848 5.66938 4.43577 5.18404C4.81926 4.43139 5.43118 3.81947 6.18383 3.43598C6.66917 3.18869 7.18587 3.09012 7.74797 3.0442C8.28916 2.99998 8.95353 2.99999 9.7585 3L12.0116 3C12.046 3 12.0799 2.99999 12.1135 2.99997C12.7484 2.99967 13.2282 2.99944 13.6909 3.11052C14.0991 3.20851 14.4893 3.37013 14.8471 3.58944C15.2529 3.83807 15.592 4.17749 16.0408 4.62672C16.0645 4.65043 16.0885 4.67445 16.1128 4.69878L18.301 6.88701C18.3253 6.91134 18.3494 6.93534 18.3731 6.95903C18.8223 7.40782 19.1617 7.74693 19.4104 8.15265C19.6297 8.51054 19.7913 8.90072 19.8893 9.30886C20.0004 9.77155 20.0001 10.2513 19.9998 10.8863C19.9998 10.9199 19.9998 10.9538 19.9998 10.9882V15.2413C19.9998 16.0463 19.9998 16.7106 19.9556 17.2518C19.9097 17.8139 19.8111 18.3306 19.5638 18.816C19.1803 19.5686 18.5684 20.1805 17.8158 20.564C17.3304 20.8113 16.8137 20.9099 16.2516 20.9558C15.7104 21 15.0461 21 14.2411 21H12.9998V19H14.1998C15.0564 19 15.6387 18.9992 16.0888 18.9625C16.5272 18.9266 16.7514 18.8617 16.9078 18.782C17.2841 18.5903 17.5901 18.2843 17.7818 17.908C17.8615 17.7516 17.9264 17.5274 17.9622 17.089C17.999 16.6389 17.9998 16.0566 17.9998 15.2V10.9882C17.9998 10.2069 17.9934 9.97916 17.9445 9.77575C17.8955 9.57168 17.8147 9.37659 17.7051 9.19765C17.5958 9.01929 17.4393 8.85373 16.8868 8.30122L14.6986 6.113C14.1461 5.56048 13.9805 5.40402 13.8022 5.29472C13.6232 5.18506 13.4281 5.10426 13.224 5.05526Z" fill="#303030" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M5.52545 16.5257L6.43059 13.8103H7.56901L8.47414 16.5257L11.1895 17.4308V18.5692L8.47414 19.4743L7.56901 22.1897H6.43059L5.52545 19.4743L2.81006 18.5692V17.4308L5.52545 16.5257Z" fill="#303030" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M13.9998 5V9H17.9998V11H12.9998C12.4475 11 11.9998 10.5523 11.9998 10V5H13.9998Z" fill="#303030" />
                  </svg>
                  <span
                    style={{
                      fontSize: 16,
                      fontWeight: 500,
                      lineHeight: "22px",
                      letterSpacing: "-0.04em",
                      color: primary,
                      fontFamily: bricolage,
                      whiteSpace: "nowrap",
                    }}
                  >
                    Download as PDF
                  </span>
                </span>
              </button>
            </div>

            {/* Mobile icon-only download button */}
            <button
              className="output-download-mobile"
              id="download-pdf-btn-mobile"
              onClick={handleDownload}
              style={{
                display: "none",
                width: 36,
                height: 36,
                background: "rgba(246, 246, 246, 0.1)",
                borderRadius: 100,
                border: "none",
                cursor: "pointer",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M13.224 5.05526C13.0206 5.00643 12.7929 5 12.0116 5H9.7998C8.94322 5 8.36092 5.00078 7.91083 5.03755C7.47242 5.07337 7.24821 5.1383 7.09181 5.21799C6.71549 5.40974 6.40953 5.7157 6.21778 6.09202C6.13809 6.24842 6.07317 6.47262 6.03735 6.91104C6.00057 7.36113 5.9998 7.94342 5.9998 8.8V12H3.9998L3.99979 8.7587C3.99978 7.95373 3.99977 7.28937 4.04399 6.74818C4.08991 6.18608 4.18848 5.66938 4.43577 5.18404C4.81926 4.43139 5.43118 3.81947 6.18383 3.43598C6.66917 3.18869 7.18587 3.09012 7.74797 3.0442C8.28916 2.99998 8.95353 2.99999 9.7585 3L12.0116 3C12.046 3 12.0799 2.99999 12.1135 2.99997C12.7484 2.99967 13.2282 2.99944 13.6909 3.11052C14.0991 3.20851 14.4893 3.37013 14.8471 3.58944C15.2529 3.83807 15.592 4.17749 16.0408 4.62672C16.0645 4.65043 16.0885 4.67445 16.1128 4.69878L18.301 6.88701C18.3253 6.91134 18.3494 6.93534 18.3731 6.95903C18.8223 7.40782 19.1617 7.74693 19.4104 8.15265C19.6297 8.51054 19.7913 8.90072 19.8893 9.30886C20.0004 9.77155 20.0001 10.2513 19.9998 10.8863C19.9998 10.9199 19.9998 10.9538 19.9998 10.9882V15.2413C19.9998 16.0463 19.9998 16.7106 19.9556 17.2518C19.9097 17.8139 19.8111 18.3306 19.5638 18.816C19.1803 19.5686 18.5684 20.1805 17.8158 20.564C17.3304 20.8113 16.8137 20.9099 16.2516 20.9558C15.7104 21 15.0461 21 14.2411 21H12.9998V19H14.1998C15.0564 19 15.6387 18.9992 16.0888 18.9625C16.5272 18.9266 16.7514 18.8617 16.9078 18.782C17.2841 18.5903 17.5901 18.2843 17.7818 17.908C17.8615 17.7516 17.9264 17.5274 17.9622 17.089C17.999 16.6389 17.9998 16.0566 17.9998 15.2V10.9882C17.9998 10.2069 17.9934 9.97916 17.9445 9.77575C17.8955 9.57168 17.8147 9.37659 17.7051 9.19765C17.5958 9.01929 17.4393 8.85373 16.8868 8.30122L14.6986 6.113C14.1461 5.56048 13.9805 5.40402 13.8022 5.29472C13.6232 5.18506 13.4281 5.10426 13.224 5.05526Z" fill="white" />
                <path fillRule="evenodd" clipRule="evenodd" d="M5.52545 16.5257L6.43059 13.8103H7.56901L8.47414 16.5257L11.1895 17.4308V18.5692L8.47414 19.4743L7.56901 22.1897H6.43059L5.52545 19.4743L2.81006 18.5692V17.4308L5.52545 16.5257Z" fill="white" />
                <path fillRule="evenodd" clipRule="evenodd" d="M13.9998 5V9H17.9998V11H12.9998C12.4475 11 11.9998 10.5523 11.9998 10V5H13.9998Z" fill="white" />
              </svg>
            </button>
          </div>

          {/* ── White paper card: Frame 1618872449 ── */}
          <div
            style={{
              borderRadius: 32,
              overflow: "hidden",
            }}
          >
            {generatedOutput ? (
              <PaperContent paper={generatedOutput} />
            ) : (
              <div
                style={{
                  padding: "48px 32px",
                  textAlign: "center",
                  color: "#8C8C8C",
                  fontFamily: inter,
                  fontSize: 16,
                  background: "#FFFFFF",
                  borderRadius: 32,
                }}
              >
                No assignment generated yet.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
