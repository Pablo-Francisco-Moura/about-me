import { TERMINAL_TIMINGS } from "../constants/terminal";
import type { TypeCommandOutput } from "../types/terminal";

export const getInitialHistory = (
  translate: (key: string) => string,
): TypeCommandOutput[] => [
  {
    id: 1,
    type: "system",
    content: translate("terminal.welcome_title"),
  },
  {
    id: 2,
    type: "system",
    content: translate("terminal.welcome_help"),
  },
];

export const getResponsiveTerminalSize = (isMobileView: boolean) => {
  if (typeof window === "undefined") {
    return { width: 700, height: 350 };
  }

  if (isMobileView) {
    const width = Math.round(window.innerWidth * 0.7);
    const height = Math.round(window.innerHeight * 0.4);

    return {
      width: Math.min(width, window.innerWidth - 48),
      height: Math.min(height, window.innerHeight - 48),
    };
  }

  return { width: 700, height: 350 };
};

export const frameSx = (
  position: { x: number; y: number },
  size: { width: number; height: number },
) => ({
  position: "fixed",
  top: position.y,
  left: position.x,
  width: `${size.width}px`,
  height: `${size.height}px`,
  zIndex: 1400,
  overflow: "hidden",
  boxShadow: "0 24px 80px rgba(0, 0, 0, 0.45)",
  borderRadius: 3,
});

export const animationSx = (animation: {
  x: number;
  y: number;
  width: number;
  height: number;
  borderRadius: number;
  opacity: number;
}) => ({
  ...frameSx(
    { x: animation.x, y: animation.y },
    { width: animation.width, height: animation.height },
  ),
  opacity: animation.opacity,
  borderRadius: animation.borderRadius,
  pointerEvents: "none",
  transition: `all ${TERMINAL_TIMINGS.minimizeAnimationDuration}ms cubic-bezier(0.2, 0.8, 0.2, 1.1)`,
});

export const minimizedSx = (position: { x: number; y: number }) => ({
  position: "fixed",
  top: position.y,
  left: position.x,
  width: 56,
  height: 56,
  zIndex: 1400,
  transform: "translate(-50%, -50%)",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#7ee787",
  bgcolor: "#161b22",
  border: "1px solid #30363d",
  boxShadow: "0 12px 40px rgba(0, 0, 0, 0.35)",
  cursor: "pointer",
  touchAction: "none",
});
