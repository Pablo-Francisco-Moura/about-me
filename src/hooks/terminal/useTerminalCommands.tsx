import { useRef } from "react";
import { executeTerminalCommand } from "../../utils/terminalCommands";
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
    executeTerminalCommand({
      cmd,
      history,
      sessionHistory,
      isDetached,
      t,
      onClose,
      onMinimize,
      onToggleDetached,
      setInput,
      setHistory,
      setHistoryIndex,
      setIsCursorActive,
      setSessionHistory,
    });
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
