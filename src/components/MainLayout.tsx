"use client";

import { Works } from "./works";
import { Header } from "./Header";
import { Skills } from "./skills";
import { Thanks } from "./Thanks";
import { Contacts } from "./Contacts";
import { useState } from "react";
import { Description } from "./Description";
import { AlertMessage } from "./Alert";
import { usePreferencesStore } from "../store/storePreferences";
import { useMediaQuery, useTheme } from "@mui/material";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import SimpleBar from "simplebar-react";
import { Copyright } from "./Copyright";

export default function MainLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width: 500px)");

  const { mode } = usePreferencesStore();
  const { scrollY } = useScroll();

  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (current > previous && current > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const padding: number = 20;

  return (
    <div id="example">
      <motion.header
        className="header"
        animate={{
          y: hidden ? -240 : 0,
          opacity: hidden ? 0 : 1,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div
          className="header-content"
          style={{
            gap: "12px",
            display: "flex",
            marginTop: "12px",
            flexDirection: "column",
          }}
        >
          <Header />
          <AlertMessage />
          <Description />
        </div>
      </motion.header>

      <main className="content">
        <section className="hero">
          <p>
            Scroll down to hide header.
            <br />
            Scroll up to reveal header.
          </p>
        </section>

        {/* <SimpleBar
          style={{
            flex: 1,
            border: `1px solid ${theme.palette.divider}`,
            padding: `${padding}px`,
            minHeight: `calc(100vh - ${padding * 2 + 44}px)`,
            maxHeight: `calc(100vh - ${padding * 2 + 44}px)`,
            borderRadius: "25px",
            backgroundColor: mode === "dark" ? "#232323" : "#f9f9f9",
          }}
        > */}
        {/* <AlertMessage alert={alert} isMobile={isMobile} showAlert={showAlert} />
        <Description /> */}
        <Skills />
        <Works />
        <Thanks />
        <Contacts isMobile={isMobile} />
        {/* </SimpleBar> */}
        <Copyright isMobile={isMobile} />

        {/* {Array.from({ length: 6 }).map((_, i) => (
          <section key={i} className="placeholder-section">
            <MotionLogo className="placeholder-logo" />
          </section>
        ))} */}
      </main>

      <StyleSheet />
    </div>
  );
}

// function MotionLogo({ className }: { className?: string }) {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 1260 454"
//       className={className}
//       fill="currentColor"
//     >
//       <path d="M475.753 0L226.8 453.6L0 453.6L194.392 99.4116C224.526 44.5081 299.724 0 362.353 0L475.753 0Z" />
//       <path d="M1031.93 113.4C1031.93 50.7709 1082.7 0 1145.33 0C1207.96 0 1258.73 50.7709 1258.73 113.4C1258.73 176.029 1207.96 226.8 1145.33 226.8C1082.7 226.8 1031.93 176.029 1031.93 113.4Z" />
//       <path d="M518.278 0L745.078 0L496.125 453.6L269.325 453.6L518.278 0Z" />
//       <path d="M786.147 0L1012.95 0L818.555 354.188C788.422 409.092 713.223 453.6 650.594 453.6L537.194 453.6L786.147 0Z" />
//     </svg>
//   );
// }

/**
 * ==============   Styles   ================
 */

function StyleSheet() {
  return (
    <style>{`
            #example {
                height: auto;
                overflow: visible;
            }

            .header {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                background: rgba(11, 16, 17, 0.9);
                border-bottom: 1px solid #1d2628;
                z-index: 100;
                backdrop-filter: blur(12px);

            }

            .header-content {
                margin: 0 auto;
                height: 450px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 24px;
            }

            .logo {
                display: flex;
                align-items: center;
                color: #f5f5f5;
            }

            .logo-icon {
                height: 18px;
                width: auto;
            }

            nav {
                display: flex;
                gap: 32px;
            }

            nav a {
                color: #f5f5f5;
                text-decoration: none;
                font-size: 14px;
                opacity: 0.6;
                transition: opacity 0.2s;
            }

            nav a:hover {
                opacity: 1;
            }

            .content {
                padding-top: 140px;
            }

            .hero {
                height: 40vh;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                padding: 20px;
            }

            .hero p {
                font-size: 16px;
                color: #f5f5f5;
                margin: 0;
            }

            .placeholder-section {
                height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .placeholder-logo {
                width: clamp(200px, 40vw, 400px);
                height: auto;
                color: #f5f5f5;
                opacity: 0.04;
            }

            @media (max-width: 600px) {
                nav {
                    gap: 20px;
                }

                nav a {
                    font-size: 13px;
                }
            }

            @media (prefers-reduced-motion: reduce) {
                .header {
                    transition: none;
                }
            }
        `}</style>
  );
}
