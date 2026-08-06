import type { ReactNode } from "react";

export type TypeCMD = {
  name: string;
  tooltip: string;
  description: string;
  content?: string;
};

export type TypeCommandOutput = {
  id: number;
  type: "user" | "system" | "error";
  content: string | string[] | ReactNode;
  timestamp?: number;
};
