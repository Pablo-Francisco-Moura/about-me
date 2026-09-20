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
