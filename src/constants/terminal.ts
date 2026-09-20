import type {
  TypeCMD,
  TypeHelpCommand,
  TypeMinimizeAnimation,
  TypeMinimizedPosition,
} from "../types/terminal";
import { CONTACTS } from "./app";

export const HELP_COMMAND: TypeHelpCommand = {
  name: "help",
  tooltip: "terminal.command.help.translation",
  description: "terminal.command.help.description",
  commands: [
    "help",
    "help contacts",
    "help send",
    "help viewer",
    "help terminal",
  ],
};

export const COMMAND_PRIORITY = [
  "help",
  "about",
  "projects",
  "skills",
  "contacts",
  "clear",
  "history",
  "quit",
  "whatsapp",
  "linkedin",
  "github",
  "email",
  "help contacts",
  "help send",
  "help viewer",
  "help terminal",
  "send whatsapp",
  "viewer linkedin",
  "viewer github",
  "send email",
  "minimize",
  "detach",
  "restore",
] as const;

export const CMDS: TypeCMD[] = [
  {
    name: ["about"],
    tooltip: "terminal.command.about.translation",
    description: "terminal.command.about.description",
    content: "terminal.command.about.content",
  },
  {
    name: ["projects"],
    tooltip: "terminal.command.projects.translation",
    description: "terminal.command.projects.description",
  },
  {
    name: ["skills"],
    tooltip: "terminal.command.skills.translation",
    description: "terminal.command.skills.description",
  },
  {
    name: ["contacts"],
    tooltip: "terminal.command.contacts.translation",
    description: "terminal.command.contacts.description",
  },
  {
    name: ["clear"],
    tooltip: "terminal.command.clear.translation",
    description: "terminal.command.clear.description",
  },
  {
    name: ["history"],
    tooltip: "terminal.command.history.translation",
    description: "terminal.command.history.description",
  },
  ...CONTACTS.map((contact) => ({
    name: (() => {
      const contactName = contact.name.toLowerCase();
      const action = ["whatsapp", "email"].includes(contactName)
        ? "send"
        : "viewer";

      return [contactName, `${action} ${contactName}`];
    })(),
    tooltip: contact.tooltip,
    description: contact.tooltip,
    link: contact.link,
    notShowBottom: true,
  })),
  {
    name: ["minimize"],
    tooltip: "terminal.command.minimize.translation",
    description: "terminal.command.minimize.description",
    notShowBottom: true,
  },
  {
    name: ["detach"],
    tooltip: "terminal.command.detach.translation",
    description: "terminal.command.detach.description",
    notShowBottom: true,
  },
  {
    name: ["restore"],
    tooltip: "terminal.command.restore.translation",
    description: "terminal.command.restore.description",
    notShowBottom: true,
  },
  {
    name: ["quit"],
    tooltip: "terminal.command.quit.translation",
    description: "terminal.command.quit.description",
  },
] as const;

export const TERMINAL_TIMINGS = {
  waitClosingTerminal: 2000, // Wait 2s before closing the terminal.

  waitNavigationAfterClosingTerminal: 500, // Performs the navigation 350 ms after closing the terminal.

  minimizeAnimationDuration: 1000, // Duration of the minimize animation in 1s.
} as const;

export const MINIMIZE_ANIMATION: TypeMinimizeAnimation = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  opacity: 1,
  borderRadius: 12,
} as const;

export const MINIMIZED_POSITION: TypeMinimizedPosition = {
  x: 24,
  y: typeof window !== "undefined" ? window.innerHeight / 2 : 24,
} as const;
