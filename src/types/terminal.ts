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
