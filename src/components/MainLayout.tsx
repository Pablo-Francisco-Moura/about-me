"use client";

import { Skills } from "./skills";
import { Thanks } from "./Thanks";
import { Header } from "./headers";
import { Projects } from "./projects";
import { Contacts } from "./Contacts";
import { Copyright } from "./Copyright";
import { Description } from "./Description";
import { useMediaQuery } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import banner from "../assets/banner.png";

export default function MainLayout() {
  const mainLayoutRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useMediaQuery("(max-width: 500px)");

  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const element = mainLayoutRef.current;
    if (!element) return;

    let previous = 0;

    const onScroll = () => {
      const current = element.scrollTop;
      if (current > previous && current > 150) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      previous = current;
    };

    element.addEventListener("scroll", onScroll, { passive: true });
    return () => element.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div id="main-layout" ref={mainLayoutRef}>
      <Header hidden={hidden} />

      <main className="content">
        <section className="hero" />

        <Description />
        <Skills />
        <Projects />
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
            body {
                overflow: hidden;
            }

            #main-layout {
                height: 100vh;
                width: 100vw;
                min-width: 100vw;
                max-width: 100vw;
                overflow-y: auto;
                overscroll-behavior: contain;
                scrollbar-width: thin;
                scrollbar-color: rgba(82, 120, 255, 0.65) transparent;
            }

            #main-layout::-webkit-scrollbar {
                width: 8px;
                height: 8px;
            }

            #main-layout::-webkit-scrollbar-button,
            #main-layout::-webkit-scrollbar-button:vertical:start,
            #main-layout::-webkit-scrollbar-button:vertical:end,
            #main-layout::-webkit-scrollbar-button:horizontal:start,
            #main-layout::-webkit-scrollbar-button,
            #main-layout::-webkit-scrollbar-button:horizontal:start,
            #main-layout::-webkit-scrollbar-button:horizontal:end,
            #main-layout::-webkit-scrollbar-button:vertical:start,
            #main-layout::-webkit-scrollbar-button:vertical:end {
                display: none !important;
                width: 0 !important;
                height: 0 !important;
                background: transparent !important;
            }

            #main-layout::-webkit-scrollbar-track {
                background: transparent;
            }

            #main-layout::-webkit-scrollbar-thumb {
                background-color: rgba(82, 120, 255, 0.65);
                border-radius: 999px;
                border: 1px solid rgba(255, 255, 255, 0.08);
            }

            #main-layout::-webkit-scrollbar-thumb:hover {
                background-color: rgba(118, 160, 255, 0.85);
            }

            .header {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                background: linear-gradient(
                    180deg,
                    rgba(11, 16, 17, 0.9) 0%,
                    rgba(11, 16, 17, 0.65) 35%,
                    rgba(11, 16, 17, 0.8) 100%
                ), url(${banner});
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
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
                display: flex;
                flex-direction: column;
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
