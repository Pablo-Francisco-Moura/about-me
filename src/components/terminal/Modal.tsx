import {
  frameSx,
  minimizedSx,
  animationSx,
  getInitialHistory,
} from "../../utils/terminal";
import { Content } from "./Content";
import { useTranslation } from "react-i18next";
import { useTerminalWindow } from "../../hooks/terminal/useTerminalWindow";
import { useTerminalCommands } from "../../hooks/terminal/useTerminalCommands";
import { Box, Dialog, Portal } from "@mui/material";
import { Terminal as TerminalIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { TypeCommandOutput } from "../../types/terminal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function Modal({ isOpen, onClose }: Props) {
  const { t } = useTranslation();

  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TypeCommandOutput[]>(() =>
    getInitialHistory(t),
  );
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [sessionHistory, setSessionHistory] = useState<TypeCommandOutput[]>(
    () => getInitialHistory(t),
  );
  const [cursorPosition, setCursorPosition] = useState(0);
  const [isCursorActive, setIsCursorActive] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const windowState = useTerminalWindow(isOpen);
  const commands = useTerminalCommands({
    t,
    input,
    history,
    inputRef,
    isDetached: windowState.isDetached,
    historyIndex,
    sessionHistory,
    onClose,
    setInput,
    setHistory,
    onMinimize: windowState.handleMinimize,
    setHistoryIndex,
    onToggleDetached: windowState.handleToggleDetached,
    setSessionHistory,
    setCursorPosition,
    setIsCursorActive,
  });

  // Focus the input when the modal opens and when the window is detached.
  useEffect(() => {
    if (!isOpen) return;
    inputRef.current?.focus();
    const timeout = window.setTimeout(() => inputRef.current?.focus(), 50);
    return () => window.clearTimeout(timeout);
  }, [isOpen, windowState.isDetached]);

  // Toggle the cursor active state every 600ms when the modal is open.
  useEffect(() => {
    if (!isOpen) return;
    const timer = window.setInterval(
      () => setIsCursorActive((active) => !active),
      600,
    );
    return () => window.clearInterval(timer);
  }, [isOpen]);

  // Scroll to the bottom of the terminal when the history changes.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const content = (
    <Content
      history={history}
      input={input}
      cursorPosition={cursorPosition}
      promptLabel={t("terminal.prompt")}
      cursorSymbol={t("terminal.cursor")}
      isCursorActive={isCursorActive}
      isDetached={windowState.isDetached}
      isMinimized={windowState.isMinimized}
      isMobile={windowState.isMobile}
      inputRef={inputRef}
      bottomRef={bottomRef}
      onInputChange={(value, position) => {
        setHistoryIndex(-1);
        setInput(value);
        setCursorPosition(position);
      }}
      onInputKeyDown={commands.handleInputKeyDown}
      onInputKeyUp={() =>
        setCursorPosition(inputRef.current?.selectionStart ?? input.length)
      }
      onInputSelect={() =>
        setCursorPosition(inputRef.current?.selectionStart ?? input.length)
      }
      onInputFocus={() => {
        setIsCursorActive(true);
        setCursorPosition(inputRef.current?.selectionStart ?? input.length);
      }}
      onInputBlur={() => setIsCursorActive(false)}
      onSubmit={commands.handleSubmit}
      onFocusInput={() => inputRef.current?.focus()}
      onDragStart={windowState.handleDragStart}
      onResizeStart={(event) => windowState.handleResizeStart(event, "se")}
      onMinimize={
        windowState.isMinimized
          ? windowState.handleRestore
          : windowState.handleMinimize
      }
      onToggleDetached={windowState.handleToggleDetached}
      onClose={onClose}
      onQuickCommand={commands.handleQuickCommand}
    />
  );

  if (!isOpen && !windowState.isMinimizing && !windowState.isMinimized) {
    return null;
  }

  if (windowState.isMinimizing) {
    return (
      <Portal>
        <Box sx={animationSx(windowState.minimizeAnimation)}>{content}</Box>
      </Portal>
    );
  }

  if (windowState.isMinimized) {
    return (
      <Portal>
        <Box
          onPointerDown={windowState.handleMinimizedDragStart}
          onPointerMove={windowState.handleMinimizedDragMove}
          onPointerUp={windowState.handleMinimizedDragEnd}
          onPointerCancel={windowState.handleMinimizedDragEnd}
          sx={minimizedSx(windowState.minimizedPosition)}
        >
          <TerminalIcon size={24} />
        </Box>
      </Portal>
    );
  }

  if (windowState.isDetached) {
    return (
      <Portal>
        <Box sx={frameSx(windowState.position, windowState.size)}>
          {content}
        </Box>
      </Portal>
    );
  }

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      scroll="paper"
      PaperProps={{
        sx: {
          ...frameSx(windowState.position, windowState.size),
          bgcolor: "transparent",
          maxWidth: "calc(100vw - 32px)",
          maxHeight: "calc(100vh - 32px)",
          transform: "none",
        },
      }}
    >
      {content}
    </Dialog>
  );
}
