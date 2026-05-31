"use client";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="auth-root">
      {/* ── CENTERED: Clerk form ── */}
      <div className="auth-right">
        <SignIn
          appearance={{
            variables: {
              colorPrimary: "#050505ff", 
              colorBackground: "#ffffff",
              colorText: "#303030",
              colorTextSecondary: "#8A8A8A",
              colorInputBackground: "#F7F7F7",
              colorInputText: "#303030",
              borderRadius: "5px",
              fontFamily: "var(--font-plus-jakarta), sans-serif",
              fontSize: "15px",
            },
            elements: {
              rootBox: { width: "100%", maxWidth: "440px" },
              card: {
                width: "100%",
                borderRadius: "5px",
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
                borderRadius: "5px",
                fontSize: "15px",
                height: "48px",
                background: "#F7F7F7",
                color: "#303030",
              },
              formFieldLabel: { color: "#5A5A5A", fontWeight: "600", fontSize: "13px" },
              formButtonPrimary: {
                background: "linear-gradient(135deg, #0f0f0fff 0%, #000000ff 100%)",
                borderRadius: "5px",
                fontWeight: "600", 
                fontSize: "15px",
                height: "48px",
                letterSpacing: "-0.02em",
                boxShadow: "0 4px 16px rgba(27, 18, 14, 0.28)",
                border: "none",
              },
              socialButtonsBlockButton: {
                border: "1.5px solid #E8E8E8",
                borderRadius: "5px",
                height: "48px",
                color: "#303030",
                fontWeight: "500",
              },
              footerActionLink: { color: "#000000", fontWeight: "600" },
              footer: { background: "#ffffff", borderTop: "none" },
              dividerLine: { background: "#EBEBEB" },
              dividerText: { color: "#B0B0B0", fontSize: "13px" },
              alertText: { color: "#B91C1C" },
            },
          }}
        />
      </div>

      <style>{`
        /* Full-page centered container */
        .auth-root {
          min-height: 100vh;
          background: linear-gradient(160deg, #E9E9E9 0%, #D8D8D8 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-plus-jakarta), sans-serif;
          padding: 24px;
          box-sizing: border-box;
        }

        .auth-right {
          width: 100%;
          max-width: 440px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}
