"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { useClerk } from "@clerk/nextjs";

interface NavItem {
  icon: (props: { color: string; opacity: number }) => React.ReactNode;
  label: string;
  href: string;
  badge?: number;
}

const HomeIcon = ({ color, opacity }: { color: string; opacity: number }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.5 11.6667H11.6667V17.5H17.5V11.6667Z" stroke={color} strokeOpacity={opacity} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8.33333 11.6667H2.5V17.5H8.33333V11.6667Z" stroke={color} strokeOpacity={opacity} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17.5 2.5H11.6667V8.33333H17.5V2.5Z" stroke={color} strokeOpacity={opacity} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8.33333 2.5H2.5V8.33333H8.33333V2.5Z" stroke={color} strokeOpacity={opacity} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const GroupsIcon = ({ color, opacity }: { color: string; opacity: number }) => (
  <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.0053 0C19.1069 0 20 0.867353 20 1.93727V12.0627C20 12.8063 19.5687 13.452 18.9357 13.7767C18.7114 13.0842 18.552 12.599 18.4574 12.321C18.403 12.1608 18.3777 12.011 18.2979 11.8819C18.2236 11.7617 18.1006 11.6182 17.9791 11.4747L17.9521 11.4428C17.5516 10.968 17.0414 10.3553 16.609 9.82839C16.1946 9.32331 15.8524 8.89639 15.7181 8.78227C15.3989 8.51105 14.9468 8.21401 14.2686 8.21401H9.66755C9.62487 8.2067 9.53035 8.1911 9.41489 8.14943C8.91888 7.97045 7.88479 7.51948 7.36702 7.30995C6.21465 6.13586 5.35029 5.25332 4.77394 4.66235C4.72638 4.61361 4.61117 4.49397 4.42827 4.30347C4.20391 4.06978 3.83109 4.04594 3.57713 4.24907C3.32508 4.45067 3.28322 4.81013 3.48253 5.06133C5.29064 7.33994 6.21755 8.50276 6.2633 8.5498C6.37468 8.66433 6.70673 8.87699 7.11436 9.1439C7.53415 9.41875 8.03354 9.75 8.41755 10.0092C8.77511 10.2505 8.97606 10.3192 9.01596 10.655C9.10394 11.3955 9.21032 12.5105 9.33511 14H1.99468C0.893058 14 0 13.1326 0 12.0627V1.93727C0 0.867353 0.893058 0 1.99468 0H18.0053ZM15.7979 11.7915C15.9066 11.7819 16.0276 11.915 16.0771 11.9594C16.2486 12.1131 16.3003 12.1721 16.4096 12.2694C16.5691 12.4114 16.7331 12.5764 16.7553 12.6051C16.9727 12.99 17.2919 13.7639 17.4073 14L15.4654 14C15.5489 13.0617 15.6021 12.459 15.625 12.1919C15.6516 11.8819 15.6891 11.8011 15.7979 11.7915ZM12.4734 3.06088C11.1955 3.06088 10.1596 4.06699 10.1596 5.30811C10.1596 6.54922 11.1955 7.55534 12.4734 7.55534C13.7513 7.55534 14.7872 6.54922 14.7872 5.30811C14.7872 4.06699 13.7513 3.06088 12.4734 3.06088Z"
      fill={color}
      fillOpacity={opacity}
    />
  </svg>
);

const AssignmentsIcon = ({ color, opacity }: { color: string; opacity: number }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.5 14.1667H12.5" stroke={color} strokeOpacity={opacity} strokeWidth="2" strokeLinecap="round"/>
    <path d="M7.5 10.8333H12.5" stroke={color} strokeOpacity={opacity} strokeWidth="2" strokeLinecap="round"/>
    <path d="M7.5 7.5H8.33333" stroke={color} strokeOpacity={opacity} strokeWidth="2" strokeLinecap="round"/>
    <path d="M4.16667 5C4.16667 3.61929 5.28596 2.5 6.66667 2.5H10.9763C11.4183 2.5 11.8423 2.67559 12.1548 2.98816L15.3452 6.17851C15.6577 6.49107 15.8333 6.915 15.8333 7.35702V15C15.8333 16.3807 14.7141 17.5 13.3333 17.5H6.66667C5.28596 17.5 4.16667 16.3807 4.16667 15V5Z" stroke={color} strokeOpacity={opacity} strokeWidth="2"/>
    <path d="M10.8333 2.5V4.16667C10.8333 6.00762 12.3257 7.5 14.1667 7.5H15.8333" stroke={color} strokeOpacity={opacity} strokeWidth="2"/>
  </svg>
);

const ToolkitIcon = ({ color, opacity }: { color: string; opacity: number }) => (
  <svg width="20" height="20" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 15.5833C1 15.0308 1.21949 14.5009 1.61019 14.1102C2.00089 13.7195 2.5308 13.5 3.08333 13.5H14.3333M1 15.5833C1 16.1359 1.21949 16.6658 1.61019 17.0565C2.00089 17.4472 2.5308 17.6667 3.08333 17.6667H14.3333V1H3.08333C2.5308 1 2.00089 1.21949 1.61019 1.61019C1.21949 2.00089 1 2.5308 1 3.08333V15.5833Z" stroke={color} strokeOpacity={opacity} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LibraryIcon = ({ color, opacity }: { color: string; opacity: number }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.675 13.2417C17.1449 14.4954 16.3157 15.6002 15.2599 16.4594C14.2041 17.3187 12.954 17.9062 11.6187 18.1707C10.2834 18.4351 8.90369 18.3685 7.60013 17.9765C6.29656 17.5845 5.10886 16.8792 4.14086 15.9222C3.17285 14.9652 2.45402 13.7856 2.0472 12.4866C1.64039 11.1876 1.55797 9.80874 1.80717 8.47053C2.05637 7.13232 2.62959 5.87553 3.47671 4.81003C4.32384 3.74453 5.41907 2.90277 6.66667 2.35834" stroke={color} strokeOpacity={opacity} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18.3333 10C18.3333 8.90567 18.1178 7.82204 17.699 6.81099C17.2802 5.79994 16.6664 4.88129 15.8926 4.10746C15.1187 3.33364 14.2001 2.71981 13.189 2.30102C12.178 1.88224 11.0943 1.66669 10 1.66669V10H18.3333Z" stroke={color} strokeOpacity={opacity} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SettingsIcon = ({ color, opacity }: { color: string; opacity: number }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.99984 8.33335C9.07936 8.33335 8.33317 9.07955 8.33317 10C8.33317 10.9205 9.07936 11.6667 9.99984 11.6667C10.9203 11.6667 11.6665 10.9205 11.6665 10C11.6665 9.07955 10.9203 8.33335 9.99984 8.33335ZM6.6665 10C6.6665 8.15907 8.15889 6.66669 9.99984 6.66669C11.8408 6.66669 13.3332 8.15907 13.3332 10C13.3332 11.841 11.8408 13.3334 9.99984 13.3334C8.15889 13.3334 6.6665 11.841 6.6665 10Z"
      fill={color}
      fillOpacity={opacity}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.27463 3.78422C7.27463 2.61474 8.22268 1.66669 9.39216 1.66669H10.6077C11.7772 1.66669 12.7252 2.61474 12.7252 3.78422C12.7252 3.9537 12.8421 4.17983 13.1215 4.33153C13.2074 4.37822 13.2922 4.42677 13.3757 4.47712C13.6543 4.64507 13.9159 4.63429 14.0694 4.54643C15.0892 3.96291 16.3888 4.31112 16.9803 5.32637L17.5673 6.33399C18.1599 7.35119 17.8102 8.6564 16.7884 9.24104C16.6402 9.3258 16.501 9.54139 16.5077 9.86221C16.5087 9.90804 16.5092 9.95398 16.5092 10C16.5092 10.0461 16.5087 10.092 16.5077 10.1379C16.501 10.4587 16.6402 10.6743 16.7884 10.759C17.8102 11.3436 18.1599 12.6488 17.5673 13.666L16.9803 14.6737C16.3888 15.6889 15.0892 16.0371 14.0694 15.4536C13.9158 15.3658 13.6543 15.355 13.3757 15.5229C13.2922 15.5733 13.2074 15.6218 13.1215 15.6685C12.8421 15.8202 12.7252 16.0463 12.7252 16.2158C12.7252 17.3853 11.7772 18.3334 10.6077 18.3334H9.39216C8.22268 18.3334 7.27463 17.3853 7.27463 16.2158C7.27463 16.0463 7.15775 15.8202 6.87841 15.6685C6.79245 15.6218 6.70768 15.5733 6.62415 15.5229C6.34556 15.355 6.08403 15.3658 5.93048 15.4536C4.91066 16.0371 3.61108 15.6889 3.01963 14.6737L2.43259 13.666C1.84 12.6488 2.18972 11.3436 3.2115 10.759C3.35964 10.6742 3.49892 10.4587 3.49214 10.1379C3.49117 10.092 3.49068 10.0461 3.49068 10C3.49068 9.95398 3.49117 9.90805 3.49214 9.86222C3.49892 9.5414 3.35963 9.32581 3.21149 9.24105C2.18969 8.65641 1.83997 7.35119 2.43257 6.33399L3.01959 5.32637C3.61105 4.31113 4.91063 3.96292 5.93046 4.54644C6.08401 4.6343 6.34554 4.64507 6.62414 4.47713C6.70768 4.42677 6.79245 4.37822 6.87841 4.33153C7.15775 4.17983 7.27463 3.9537 7.27463 3.78422ZM9.39216 3.33335C9.14316 3.33335 8.9413 3.53521 8.9413 3.78422C8.9413 4.70592 8.3534 5.42707 7.67384 5.79614C7.60988 5.83088 7.54678 5.86701 7.4846 5.90449C6.82172 6.30411 5.90337 6.45114 5.10275 5.99305C4.87745 5.86414 4.59036 5.94106 4.45969 6.16535L3.87268 7.17297C3.74599 7.39042 3.82075 7.66945 4.03919 7.79444C4.84112 8.25328 5.17479 9.12392 5.15843 9.89746C5.15771 9.93155 5.15735 9.96573 5.15735 10C5.15735 10.0343 5.15771 10.0685 5.15843 10.1026C5.17479 10.8761 4.84113 11.7468 4.03921 12.2056C3.82078 12.3306 3.74602 12.6096 3.8727 12.8271L4.45973 13.8347C4.59039 14.059 4.87748 14.1359 5.10278 14.007C5.90339 13.5489 6.82173 13.6959 7.48461 14.0955C7.54679 14.133 7.60988 14.1692 7.67384 14.2039C8.3534 14.573 8.9413 15.2941 8.9413 16.2158C8.9413 16.4648 9.14316 16.6667 9.39216 16.6667H10.6077C10.8567 16.6667 11.0586 16.4648 11.0586 16.2158C11.0586 15.2941 11.6465 14.573 12.326 14.2039C12.39 14.1692 12.4531 14.133 12.5153 14.0956C13.1781 13.6959 14.0965 13.5489 14.8971 14.007C15.1224 14.1359 15.4095 14.059 15.5401 13.8347L16.1272 12.8271C16.2539 12.6096 16.1791 12.3306 15.9607 12.2056C15.1587 11.7468 14.8251 10.8761 14.8414 10.1026C14.8422 10.0685 14.8425 10.0343 14.8425 10C14.8425 9.96573 14.8422 9.93154 14.8414 9.89745C14.8251 9.12391 15.1588 8.25327 15.9607 7.79443C16.1791 7.66945 16.2539 7.39042 16.1272 7.17296L15.5402 6.16534C15.4095 5.94106 15.1224 5.86413 14.8971 5.99304C14.0965 6.45113 13.1782 6.3041 12.5153 5.90449C12.4531 5.86701 12.39 5.83088 12.326 5.79614C11.6465 5.42707 11.0586 4.70592 11.0586 3.78422C11.0586 3.53521 10.8567 3.33335 10.6077 3.33335H9.39216Z"
      fill={color}
      fillOpacity={opacity}
    />
  </svg>
);

const CreateAssignmentIcon = () => (
  <svg width="20" height="20" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M4.63783 8.63783L6.18377 4H7.13246L8.6784 8.63783L13.3162 10.1838V11.1325L8.6784 12.6784L7.13246 17.3162H6.18377L4.63783 12.6784L0 11.1325V10.1838L4.63783 8.63783Z" fill="white"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M13.3878 2.38783L14.1838 0H15.1325L15.9284 2.38783L18.3162 3.18377V4.13246L15.9284 4.9284L15.1325 7.31623H14.1838L13.3878 4.9284L11 4.13246V3.18377L13.3878 2.38783Z" fill="white"/>
  </svg>
);

const OutputLogoIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="10" fill="#303030"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M22.7271 28.3583C22.7271 28.3583 23.4545 30.3003 24.1212 30.4218H15.6969C13.9998 30.4218 12.485 29.4508 11.9997 27.6299L7.09074 13.0637C7.09074 13.0637 6.66669 11.3035 6 11.0001H14.6062C16.3033 11.0609 17.4548 11.6677 18.1215 13.9136L22.7271 28.3583Z" fill="white"/>
    <path opacity="0.2" fillRule="evenodd" clipRule="evenodd" d="M22.7271 28.3583C22.7271 28.3583 23.4545 30.3003 24.1212 30.4218H15.6969C13.9998 30.4218 12.485 29.4508 11.9997 27.6299L7.09074 13.0637C7.09074 13.0637 6.66669 11.3035 6 11.0001H14.6062C16.3033 11.0609 17.4548 11.6677 18.1215 13.9136L22.7271 28.3583Z" fill="url(#paint0_linear_2_10645)"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M17.3336 28.3585C17.3336 28.3585 16.6061 30.3005 15.9395 30.4221H24.3638C26.0609 30.4221 27.5756 29.4511 28.0609 27.6302L32.9096 13.0643C32.9096 13.0643 33.3336 11.3042 34.0003 11.0008H25.4545C23.7574 11.0008 22.6666 11.6076 22 13.8535L17.3336 28.3585Z" fill="white"/>
    <defs>
      <linearGradient id="paint0_linear_2_10645" x1="15.0606" y1="9.34907" x2="15.0606" y2="32.1338" gradientUnits="userSpaceOnUse">
        <stop stopColor="white" stopOpacity="0"/>
        <stop offset="0.33" stopColor="white" stopOpacity="0"/>
        <stop offset="0.76" stopColor="#0E1513"/>
        <stop offset="1" stopColor="#0E1513"/>
      </linearGradient>
    </defs>
  </svg>
);

const NAV_ITEMS: NavItem[] = [
  { icon: HomeIcon, label: "Home", href: "/" },
  { icon: GroupsIcon, label: "My Groups", href: "/" },
  { icon: AssignmentsIcon, label: "Assignments", href: "/assignments" },
  { icon: ToolkitIcon, label: "AI Teacher's Toolkit", href: "/" },
  { icon: LibraryIcon, label: "My Library", href: "/" },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const isOutput = pathname.startsWith("/assignments/output");
  const { signOut } = useClerk();

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
      <div style={{ display: "flex", flexDirection: "column", gap: 56, width: "100%", margin: "0 auto", alignItems: "stretch", boxSizing: "border-box" }}>
        {/* ── Logo ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: 8,
            width: "100%",
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
            {isOutput ? (
              <OutputLogoIcon />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
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
            )}
          </div>
          <span className="sidebar-wordmark">VedaAI</span>
        </div>

        {/* ── Create Assignment button ── */}
        <button
          id="sidebar-create-btn"
          onClick={() => router.push("/assignments/create")}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: "8px 16px",
            marginBottom: 40,
            gap: 10,
            width: "100%",
            height: 42,
            background: "linear-gradient(#272727, #272727) padding-box, linear-gradient(180deg, #FF7243 0%, #C93D08 100%) border-box",
            border: "4px solid transparent",
            borderRadius: 100,
            cursor: "pointer",
            transition: "opacity 0.18s",
            flexShrink: 0,
            boxSizing: "border-box",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.opacity = "0.88";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.opacity = "1";
          }}
        >
          <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 20, height: 20 }}>
            <CreateAssignmentIcon />
          </span>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: 16,
              lineHeight: "28px",
              letterSpacing: "-0.04em",
              color: "#FFFFFF",
              whiteSpace: "nowrap",
            }}
          >
            {isOutput ? "AI Teacher's Toolkit" : "Create Assignment"}
          </span>
        </button>

        {/* ── Nav items ── */}
        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.label);
            const iconColor = active ? "#303030" : "#5E5E5E";
            const iconOpacity = active ? 1 : 0.8;
            return (
              <button
                key={item.label}
                id={`nav-${item.label.replace(/\s+/g, "-").toLowerCase()}`}
                onClick={() => router.push(item.href)}
                style={{
                  width: "100%",
                  height: 40,
                  borderRadius: 8,
                  padding: "9px 12px",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  background: active ? "#EFEFEF" : "transparent",
                  color: active ? "#1A1A1A" : "#6B6B6B",
                  fontWeight: active ? 600 : 500,
                  fontSize: 14,
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
                  {item.icon({ color: iconColor, opacity: iconOpacity })}
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
      <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%", boxSizing: "border-box" }}>
        {/* ── Settings ── */}
        <button
          id="nav-settings"
          style={{
            width: "100%",
            height: 38,
            borderRadius: 8,
            padding: "8px 12px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "transparent",
            color: "#6B6B6B",
            fontWeight: 500,
            fontSize: 14,
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
          <SettingsIcon color="#5E5E5E" opacity={0.8} />
          Settings
        </button>

        {/* ── School card ── */}
        <div
          style={{
            width: "100%",
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
          {/* Profile Info Row (fluid width) */}
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 8, width: "100%", height: 56 }}>
            {/* Avatar */}
            <div
              style={{
                width: 59,
                height: 56,
                borderRadius: 8,
                background: "#F5F5F5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                overflow: "hidden",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/DPS.png" alt="Delhi Public School" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0, height: 44, justifyContent: "center" }}>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 16,
                  color: "#303030",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  height: 22,
                  lineHeight: "22px",
                  display: "block",
                }}
              >
                Delhi Public School
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: "#5E5E5E",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  height: 20,
                  lineHeight: "20px",
                  display: "block",
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
