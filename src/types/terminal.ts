import type { ReactNode } from "react";

export type TypeCMD = {
  name: string[];
  tooltip: string;
  description: string;
  content?: string;
  link?: string;
  notShowBottom?: boolean;
};

export type TypeHelpCommand = {
  name: string;
  tooltip: string;
  description: string;
  commands: string[];
};

export type TypeCommandOutput = {
  id: number;
  type: "user" | "system" | "error";
  content: string | string[] | ReactNode;
  timestamp?: number;
};

export type TypeMinimizeAnimation = {
  x: number;
  y: number;
  width: number;
  height: number;
  opacity: number;
  borderRadius: number;
};

export type TypeMinimizedPosition = {
  x: number;
  y: number;
};

export type TypeMinimizedTransitionOrigin = {
  x: number;
  y: number;
} | null;

export type TypeTranslate = (key: string) => string;
