"use client";

import { Works } from "./works";
import { Header } from "./Header";
import { Skills } from "./skills";
import { Thanks } from "./Thanks";
import { Profile } from "./Profile";
import { Contacts } from "./Contacts";
import { useState } from "react";
import { Copyright } from "./Copyright";
import { Description } from "./Description";
import { AlertMessage } from "./Alert";
import { useMediaQuery } from "@mui/material";
import { motion, useScroll, useMotionValueEvent } from "motion/react";

export default function MainLayout() {
  const isMobile = useMediaQuery("(max-width: 500px)");

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
          <Profile />
        </div>
      </motion.header>

      <main className="content">
        <section className="hero"></section>

        <Description />
        <Skills />
        <Works />
        <Thanks />
        <Contacts isMobile={isMobile} />
        <Copyright isMobile={isMobile} />
      </main>

      <StyleSheet />
    </div>
  );
}

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
                height: 350px;
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
                height: 250px;
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
