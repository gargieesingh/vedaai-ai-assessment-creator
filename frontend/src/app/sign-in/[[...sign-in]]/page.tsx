"use client";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="auth-root">

      {/* ── LEFT: Branding ── */}
      <div className="auth-left">
        <div className="auth-left__inner">

          {/* Floating logo */}
          <div className="auth-logo-wrap">
            <div className="auth-logo-glow" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo 2.svg" alt="VedaAI" className="auth-logo-icon" />
          </div>

          {/* Wordmark */}
          <h1 className="auth-wordmark">VedaAI</h1>

          {/* Tagline */}
          <p className="auth-tagline">
            The smartest way to create<br />
            <span className="auth-tagline__accent">question papers.</span>
          </p>

          {/* Feature chips */}
          <div className="auth-chips">
            {["✦ Smart Generation", "✦ Auto Answer Keys", "✦ Mobile Ready"].map((c) => (
              <span key={c} className="auth-chip">{c}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT: Clerk form ── */}
      <div className="auth-right">
        <SignIn
          appearance={{
            variables: {
              colorPrimary: "#E8490F",
              colorBackground: "#ffffff",
              colorText: "#303030",
              colorTextSecondary: "#8A8A8A",
              colorInputBackground: "#F7F7F7",
              colorInputText: "#303030",
              borderRadius: "12px",
              fontFamily: "var(--font-plus-jakarta), sans-serif",
              fontSize: "15px",
            },
            elements: {
              rootBox: { width: "100%" },
              card: {
                width: "100%",
                borderRadius: "20px",
                boxShadow: "0 8px 40px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)",
                border: "none",
                padding: "32px 28px",
              },
              headerTitle: {
                fontFamily: "var(--font-bricolage), sans-serif",
                fontWeight: "800",
                fontSize: "22px",
                letterSpacing: "-0.04em",
                color: "#1A1A1A",
              },
              headerSubtitle: { color: "#8A8A8A", fontSize: "14px" },
              formFieldInput: {
                border: "1.5px solid #E8E8E8",
                borderRadius: "12px",
                fontSize: "15px",
                height: "48px",
                background: "#F7F7F7",
                color: "#303030",
              },
              formFieldLabel: { color: "#5A5A5A", fontWeight: "600", fontSize: "13px" },
              formButtonPrimary: {
                background: "linear-gradient(135deg, #ff7243 0%, #c93d08 100%)",
                borderRadius: "12px",
                fontWeight: "600",
                fontSize: "15px",
                height: "48px",
                letterSpacing: "-0.02em",
                boxShadow: "0 4px 16px rgba(232, 73, 15, 0.28)",
                border: "none",
              },
              socialButtonsBlockButton: {
                border: "1.5px solid #E8E8E8",
                borderRadius: "12px",
                height: "48px",
                color: "#303030",
                fontWeight: "500",
              },
              footerActionLink: { color: "#E8490F", fontWeight: "600" },
              footer: { background: "#ffffff", borderTop: "none" },
              dividerLine: { background: "#EBEBEB" },
              dividerText: { color: "#B0B0B0", fontSize: "13px" },
              alertText: { color: "#D00" },
            },
          }}
        />
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50%       { transform: translateY(-10px) rotate(2deg); }
        }
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.45; transform: scale(1); }
          50%       { opacity: 0.85; transform: scale(1.12); }
        }

        /* Full-page split */
        .auth-root {
          min-height: 100vh;
          background: linear-gradient(160deg, #E9E9E9 0%, #D8D8D8 100%);
          display: flex;
          align-items: stretch;
          font-family: var(--font-plus-jakarta), sans-serif;
        }

        /* ── Left panel ── */
        .auth-left {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 48px;
          position: relative;
          overflow: hidden;
        }
        /* Subtle decorative circle behind */
        .auth-left::before {
          content: "";
          position: absolute;
          width: 480px;
          height: 480px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(232,73,15,0.10) 0%, transparent 70%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }

        .auth-left__inner {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 2px;
          max-width: 420px;
        }
        .auth-logo-wrap {
          position: relative;
          width: 220px;
          height: 220px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: -72px;
        }
        .auth-logo-glow {
          position: absolute;
          inset: -24px;
          background: radial-gradient(circle, rgba(232,73,15,0.22) 0%, transparent 68%);
          border-radius: 50%;
          animation: glow-pulse 3.5s ease-in-out infinite;
        }
        .auth-logo-icon {
          position: relative;
          z-index: 1;
          width: 200px;
          height: 200px;
          filter: drop-shadow(0 8px 24px rgba(232,73,15,0.35));
          animation: float 5s ease-in-out infinite;
          object-fit: contain;
        }

        /* Wordmark */
        .auth-wordmark {
          font-family: var(--font-bricolage), sans-serif;
          font-size: clamp(42px, 5vw, 58px);
          font-weight: 800;
          color: #1A1A1A;
          letter-spacing: -0.05em;
          margin: 0;
          line-height: 1;
        }

        /* Tagline */
        .auth-tagline {
          font-size: 18px;
          color: #7A7A7A;
          margin: 0;
          line-height: 1.6;
          letter-spacing: -0.02em;
          font-weight: 400;
        }
        .auth-tagline__accent {
          color: #E8490F;
          font-weight: 700;
        }

        /* Feature chips */
        .auth-chips {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 8px;
        }
        .auth-chip {
          display: inline-flex;
          align-items: center;
          padding: 6px 14px;
          background: rgba(255,255,255,0.55);
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 100px;
          font-size: 13px;
          font-weight: 500;
          color: #5A5A5A;
          letter-spacing: -0.01em;
          backdrop-filter: blur(8px);
          width: fit-content;
        }

        /* ── Right panel ── */
        .auth-right {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 40px;
        }

        /* Mobile: stack vertically */
        @media (max-width: 768px) {
          .auth-root { flex-direction: column; }
          .auth-left { padding: 48px 24px 24px; justify-content: center; }
          .auth-left__inner { align-items: center; text-align: center; }
          .auth-chips { align-items: center; }
          .auth-right {
            width: 100%;
            border-left: none;
            border-top: 1px solid rgba(255,255,255,0.6);
            padding: 32px 24px 48px;
          }
        }
      `}</style>
    </div>
  );
}
