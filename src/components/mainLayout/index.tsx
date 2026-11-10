"use client";

import { Style } from "./Style";
import { Skills } from "../skills";
import { Thanks } from "../Thanks";
import { Header } from "../headers";
import { Projects } from "../projects";
import { Contacts } from "../Contacts";
import { Copyright } from "../Copyright";
import { Trajectory } from "../Trajectory";
import { Description } from "../Description";
import { useMediaQuery } from "@mui/material";
import { useEffect, useRef, useState } from "react";

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

  useEffect(() => {
    const handleTerminalNavigation = (event: Event) => {
      const target = (event as CustomEvent<string>).detail;
      if (target !== "trajectory" && target !== "projects") return;

      const container = mainLayoutRef.current;
      const targetElement = document.getElementById(target);
      if (!container || !targetElement) return;

      const scrollToTarget = () => {
        const containerRect = container.getBoundingClientRect();
        const targetRect = targetElement.getBoundingClientRect();
        const top = Math.max(
          0,
          container.scrollTop + targetRect.top - containerRect.top - 24,
        );

        container.scrollTo({ top, behavior: "smooth" });
      };

      requestAnimationFrame(scrollToTarget);
      window.setTimeout(scrollToTarget, 400);
    };

    window.addEventListener("terminal:navigate", handleTerminalNavigation);
    return () =>
      window.removeEventListener("terminal:navigate", handleTerminalNavigation);
  }, []);

  return (
    <div id="main-layout" ref={mainLayoutRef}>
      <Header hidden={hidden} />

      <main
        className="content"
        style={{
          gap: "20px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <section className="hero" />

        <Description />

        <Skills />

        <Projects />

        <Trajectory />

        <Thanks />

        <Contacts isMobile={isMobile} />

        <Copyright isMobile={isMobile} />
      </main>

      <Style />
    </div>
  );
}
