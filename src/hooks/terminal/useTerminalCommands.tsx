import {
  CMDS,
  HELP_COMMAND,
  COMMAND_PRIORITY,
  TERMINAL_TIMINGS,
} from "../../constants/terminal";
import { Trans } from "react-i18next";
import { useRef } from "react";
import { Box, Typography } from "@mui/material";
import { CONTACTS, PROJECTS, SKILLS } from "../../constants/app";
import type { TypeCommandOutput, TypeTranslate } from "../../types/terminal";
import type { FormEvent, KeyboardEvent, RefObject } from "react";

interface Props {
  input: string;
  history: TypeCommandOutput[];
  inputRef: RefObject<HTMLInputElement | null>;
  isDetached: boolean;
  historyIndex: number;
  sessionHistory: TypeCommandOutput[];
  t: TypeTranslate;
  onClose: () => void;
  setInput: (input: string) => void;
  onMinimize: () => void;
  setHistory: (history: TypeCommandOutput[]) => void;
  setHistoryIndex: (index: number) => void;
  onToggleDetached: () => void;
  setCursorPosition: (position: number) => void;
  setIsCursorActive: (active: boolean) => void;
  setSessionHistory: (history: TypeCommandOutput[]) => void;
}

export function useTerminalCommands({
  t,
  history,
  setHistory,
  input,
  setInput,
  sessionHistory,
  setSessionHistory,
  historyIndex,
  setHistoryIndex,
  inputRef,
  setCursorPosition,
  setIsCursorActive,
  isDetached,
  onClose,
  onMinimize,
  onToggleDetached,
}: Props) {
  const draftInputRef = useRef("");

  const setInputFromHistory = (value: string) => {
    setInput(value);
    setCursorPosition(value.length);
    window.requestAnimationFrame(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(value.length, value.length);
    });
  };

  const resetVisibleHistory = () =>
    setHistory([
      { id: 1, type: "system", content: t("terminal.welcome_title") },
      { id: 2, type: "system", content: t("terminal.welcome_help") },
      { id: Date.now(), type: "user", content: "clear" },
    ]);

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
    const commands = sessionHistory
      .filter((item) => item.type === "user")
      .map((item) => String(item.content));
    if (!commands.length) return;
    event.preventDefault();
    if (event.key === "ArrowUp") {
      const nextIndex =
        historyIndex === -1
          ? commands.length - 1
          : Math.max(0, historyIndex - 1);

      if (historyIndex === -1) {
        draftInputRef.current = input;
      }

      setHistoryIndex(nextIndex);
      setInputFromHistory(commands[nextIndex]);

      return;
    }

    if (historyIndex === -1) {
      return;
    }

    const nextIndex = historyIndex + 1;

    if (nextIndex >= commands.length) {
      setHistoryIndex(-1);
      setInputFromHistory(draftInputRef.current);

      return;
    }

    setHistoryIndex(nextIndex);
    setInputFromHistory(commands[nextIndex]);
  };

  const executeCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();

    const [baseCommand, helpTopic] = cleanCmd.split(/\s+/);

    const matchedCommand = CMDS.find((command) =>
      command.name.includes(cleanCmd),
    );

    const commandName = matchedCommand?.name[0] ?? baseCommand;

    setHistoryIndex(-1);

    const timestamp = Date.now();

    const userEntry: TypeCommandOutput = {
      id: timestamp,
      type: "user",
      content: cmd,
      timestamp,
    };

    const nextSession = [...sessionHistory, userEntry];

    const nextHistory = [...history, userEntry];

    setSessionHistory(nextSession);

    setIsCursorActive(false);
    if (matchedCommand?.link) {
      nextHistory.push({
        id: Date.now() + 1,
        type: "system",
        content: t(matchedCommand.description),
      });

      setHistory(nextHistory);
      setInput("");
      window.open(matchedCommand.link, "_blank", "noopener,noreferrer");

      return;
    }

    switch (commandName) {
      case "help": {
        const commands = !helpTopic
          ? COMMAND_PRIORITY
          : helpTopic === "contacts"
            ? COMMAND_PRIORITY.filter((name) =>
                ["whatsapp", "linkedin", "github", "email"].includes(name),
              )
            : helpTopic === "send"
              ? COMMAND_PRIORITY.filter((name) => name.startsWith("send "))
              : helpTopic === "viewer"
                ? COMMAND_PRIORITY.filter((name) => name.startsWith("viewer "))
                : helpTopic === "terminal"
                  ? ["help", "clear", "quit", "restore", "detach"]
                  : [];
        nextHistory.push({
          id: Date.now() + 1,
          type: "system",
          content: (
            <Box sx={{ mt: 1, color: "#f2cc60" }}>
              <Typography
                variant="body2"
                sx={{ fontWeight: 700, color: "#f2cc60" }}
              >
                {t("terminal.available_commands")}
              </Typography>
              {commands.map((name) => {
                const command = CMDS.find((item) => item.name.includes(name));
                return (
                  <Typography key={name} variant="body2">
                    <span style={{ color: "#6076f2" }}>{name}</span> —{" "}
                    {t(command?.description ?? HELP_COMMAND.description)}
                  </Typography>
                );
              })}
            </Box>
          ),
        });

        break;
      }

      case "about":
        nextHistory.push({
          id: Date.now() + 1,
          type: "system",
          content: t("terminal.command.about.content"),
        });
        scheduleNavigation(onClose, "trajectory");

        break;

      case "projects":
        nextHistory.push({
          id: Date.now() + 1,
          type: "system",
          content: (
            <Box sx={{ color: "#d0d7de" }}>
              <Typography sx={{ color: "#f2cc60" }}>
                {t("terminal.projects_title")}
              </Typography>
              {PROJECTS.map((project, index) => (
                <Typography key={index}>
                  {index + 1}. {t(project.title)} — {t(project.description)}
                </Typography>
              ))}
            </Box>
          ),
        });
        scheduleNavigation(onClose, "projects");

        break;

      case "skills": {
        const names = SKILLS.map((skill) => skill.name);
        nextHistory.push({
          id: Date.now() + 1,
          type: "system",
          content:
            names.length <= 1
              ? (names[0] ?? "")
              : `${names.slice(0, -1).join(", ")} e ${names.at(-1)}`,
        });

        break;
      }

      case "contacts":
      case "contatos":
        nextHistory.push({
          id: Date.now() + 1,
          type: "system",
          content: (
            <Box sx={{ color: "#d0d7de" }}>
              <Typography sx={{ color: "#f2cc60" }}>
                {t("terminal.command.contacts.translation")}
              </Typography>
              {CONTACTS.map((contact) => (
                <Typography key={contact.name}>
                  {contact.name} — {contact.link}
                </Typography>
              ))}
            </Box>
          ),
        });

        break;

      case "clear":
        resetVisibleHistory();
        setInput("");
        setIsCursorActive(true);

        return;

      case "history": {
        const commands = nextSession
          .filter((item) => item.type === "user")
          .map((item, index) => (
            <Typography key={item.id} variant="body2">
              {index + 1}. [
              {new Date(item.timestamp ?? item.id).toLocaleString()}]{" "}
              {item.content}
            </Typography>
          ));
        nextHistory.push({
          id: Date.now() + 1,
          type: "system",
          content: (
            <Box sx={{ mt: 1, color: "#d0d7de" }}>
              <Typography sx={{ color: "#f2cc60", fontWeight: 700 }}>
                {t("terminal.command.history.translation")}
              </Typography>
              {commands.length ? (
                commands
              ) : (
                <Typography variant="body2">
                  {t("terminal.command.history.empty")}
                </Typography>
              )}
            </Box>
          ),
        });
        setHistory(nextHistory);
        setInput("");
        setIsCursorActive(true);

        return;
      }

      case "quit":
        nextHistory.push({
          id: Date.now() + 1,
          type: "system",
          content: t("terminal.command.quit.translation"),
        });
        setHistory(nextHistory);
        setInput("");
        onClose();
        return;

      case "minimize":
        setHistory(nextHistory);
        setInput("");
        onMinimize();

        return;

      case "detach":
        setHistory(nextHistory);
        setInput("");
        if (!isDetached) onToggleDetached();

        return;

      case "restore":
        setHistory(nextHistory);
        setInput("");
        if (isDetached) onToggleDetached();

        return;

      default:
        nextHistory.push({
          id: Date.now() + 1,
          type: "error",
          content: (
            <Typography sx={{ color: "#ff7b72" }}>
              <Trans
                i18nKey="terminal.errors.command_not_found"
                values={{ cmd }}
                components={[<span style={{ color: "#ffffff" }} />]}
              />
            </Typography>
          ),
        });
    }
    setHistory(nextHistory);
    setInput("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (input.trim()) executeCommand(input);
  };
  return {
    handleInputKeyDown,
    handleSubmit,
    handleQuickCommand: executeCommand,
  };
}

function scheduleNavigation(
  onClose: () => void,
  target: "trajectory" | "projects",
) {
  window.setTimeout(() => {
    onClose();
    window.setTimeout(
      () =>
        window.dispatchEvent(
          new CustomEvent("terminal:navigate", { detail: target }),
        ),
      TERMINAL_TIMINGS.waitNavigationAfterClosingTerminal,
    );
  }, TERMINAL_TIMINGS.waitClosingTerminal);
}
