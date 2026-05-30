"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/assignments");
  }, [router]);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #E7E7E7 0%, #DCDCDC 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <div style={{
        width: 36,
        height: 36,
        border: "3px solid rgba(0,0,0,0.1)",
        borderTopColor: "#E8490F",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
