import type { TypeCMD } from "../types/terminal";

export const CMDS: TypeCMD[] = [
  {
    name: "help",
    tooltip: "terminal.command.help.translation",
    description: "terminal.command.help.description",
  },
  {
    name: "about",
    tooltip: "terminal.command.about.translation",
    description: "terminal.command.about.description",
    content: "terminal.command.about.content",
  },
  {
    name: "projects",
    tooltip: "terminal.command.projects.translation",
    description: "terminal.command.projects.description",
  },
  {
    name: "skills",
    tooltip: "terminal.command.skills.translation",
    description: "terminal.command.skills.description",
  },
  {
    name: "clear",
    tooltip: "terminal.command.clear.translation",
    description: "terminal.command.clear.description",
  },
] as const;
