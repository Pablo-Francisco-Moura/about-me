import {
  Box,
  Stack,
  Dialog,
  Portal,
  Tooltip,
  InputBase,
  IconButton,
  Typography,
} from "@mui/material";
import type { TypeCommandOutput } from "../../types/terminal";
import type { FormEvent, MouseEvent as ReactMouseEvent } from "react";
import { CMDS } from "../../constants/terminal";
import { useTranslation } from "react-i18next";
import { SKILLS, PROJECTS } from "../../constants/app";
import { useEffect, useRef, useState } from "react";
import { X, Maximize2, Terminal as TerminalIcon } from "lucide-react";
import MinimizeIcon from "@mui/icons-material/Minimize";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const getInitialHistory = (
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

export function TerminalModal({ isOpen, onClose }: Props) {
  const { t } = useTranslation();

  const [size, setSize] = useState({ width: 700, height: 350 });
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TypeCommandOutput[]>(() =>
    getInitialHistory(t),
  );
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDetached, setIsDetached] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isCursorActive, setIsCursorActive] = useState(false);
  const [sessionHistory, setSessionHistory] = useState<TypeCommandOutput[]>(
    () => getInitialHistory(t),
  );
  const [minimizedPosition, setMinimizedPosition] = useState({
    x: 24,
    y: typeof window !== "undefined" ? window.innerHeight / 2 : 24,
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const dragStateRef = useRef<{ offsetX: number; offsetY: number } | null>(
    null,
  );
  const minimizedDragStateRef = useRef<{
    offsetX: number;
    offsetY: number;
  } | null>(null);
  const minimizedDragMovedRef = useRef(false);
  const resizeStateRef = useRef<{
    direction: "se" | "sw" | "ne" | "nw";
    startX: number;
    startY: number;
    startWidth: number;
    startHeight: number;
    startLeft: number;
    startTop: number;
  } | null>(null);
  const promptLabel = t("terminal.prompt");
  const cursorSymbol = t("terminal.cursor");

  useEffect(() => {
    if (!isOpen) return;

    const focusInput = () => {
      inputRef.current?.focus();
      setIsCursorActive(true);
    };

    focusInput();
    const timeout = window.setTimeout(focusInput, 50);

    return () => window.clearTimeout(timeout);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const timer = window.setInterval(() => {
      setIsCursorActive((prev) => !prev);
    }, 600);

    return () => window.clearInterval(timer);
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  useEffect(() => {
    if (!isOpen) {
      setIsDetached(false);
      setIsMinimized(false);
      return;
    }

    const clampPosition = (x: number, y: number) => {
      const margin = 24;
      const width = size.width;
      const height = size.height;
      const maxX = Math.max(0, window.innerWidth - width - margin);
      const maxY = Math.max(0, window.innerHeight - height - margin);

      return {
        x: Math.min(maxX, Math.max(margin, x)),
        y: Math.min(maxY, Math.max(margin, y)),
      };
    };

    setPosition(
      clampPosition(
        (window.innerWidth - size.width) / 2,
        (window.innerHeight - size.height) / 2,
      ),
    );
  }, [isOpen, size.width, size.height]);

  useEffect(() => {
    if (!isOpen) return;

    const handleMouseMove = (event: MouseEvent) => {
      if (minimizedDragStateRef.current) {
        minimizedDragMovedRef.current = true;
        const margin = 24;
        const width = 56;
        const height = 56;
        const maxX = Math.max(0, window.innerWidth - width - margin);
        const maxY = Math.max(0, window.innerHeight - height - margin);

        setMinimizedPosition({
          x: Math.min(
            maxX,
            Math.max(
              margin,
              event.clientX - minimizedDragStateRef.current.offsetX,
            ),
          ),
          y: Math.min(
            maxY,
            Math.max(
              margin,
              event.clientY - minimizedDragStateRef.current.offsetY,
            ),
          ),
        });
      }

      if (dragStateRef.current) {
        const nextPosition = {
          x: event.clientX - dragStateRef.current.offsetX,
          y: event.clientY - dragStateRef.current.offsetY,
        };

        setPosition(() => {
          const margin = 24;
          const width = size.width;
          const height = size.height;
          const maxX = Math.max(0, window.innerWidth - width - margin);
          const maxY = Math.max(0, window.innerHeight - height - margin);

          return {
            x: Math.min(maxX, Math.max(margin, nextPosition.x)),
            y: Math.min(maxY, Math.max(margin, nextPosition.y)),
          };
        });
      }

      if (resizeStateRef.current) {
        const resize = resizeStateRef.current;
        const deltaX = event.clientX - resize.startX;
        const deltaY = event.clientY - resize.startY;
        const nextWidth = Math.min(
          900,
          Math.max(320, resize.startWidth + deltaX),
        );
        const nextHeight = Math.min(
          700,
          Math.max(220, resize.startHeight + deltaY),
        );

        if (resize.direction.includes("e")) {
          setSize((current) => ({ ...current, width: nextWidth }));
        }

        if (resize.direction.includes("s")) {
          setSize((current) => ({ ...current, height: nextHeight }));
        }

        if (resize.direction.includes("w")) {
          const nextLeft = resize.startLeft + (resize.startWidth - nextWidth);
          setPosition((current) => ({ ...current, x: nextLeft }));
          setSize((current) => ({ ...current, width: nextWidth }));
        }

        if (resize.direction.includes("n")) {
          const nextTop = resize.startTop + (resize.startHeight - nextHeight);
          setPosition((current) => ({ ...current, y: nextTop }));
          setSize((current) => ({ ...current, height: nextHeight }));
        }
      }
    };

    const handleMouseUp = () => {
      dragStateRef.current = null;
      minimizedDragStateRef.current = null;
      resizeStateRef.current = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isOpen, size.width, size.height]);

  const resetVisibleHistory = () => {
    setHistory([
      {
        id: 1,
        type: "system",
        content: t("terminal.welcome_title"),
      },
      {
        id: 2,
        type: "system",
        content: t("terminal.welcome_help"),
      },
      {
        id: Date.now(),
        type: "user",
        content: "clear",
      },
    ]);
  };

  const focusInput = () => {
    inputRef.current?.focus();
    setIsCursorActive(true);
  };

  const executeCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    const timestamp = Date.now();
    const userEntry = {
      id: timestamp,
      type: "user" as const,
      content: cmd,
      timestamp,
    };
    const newSessionHistory: TypeCommandOutput[] = [
      ...sessionHistory,
      userEntry,
    ];
    const newHistory: TypeCommandOutput[] = [...history, userEntry];

    setSessionHistory(newSessionHistory);

    setIsCursorActive(false);

    switch (cleanCmd) {
      case "help":
        newHistory.push({
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
              {CMDS.map((cmd) => (
                <Typography key={cmd.name} variant="body2">
                  <span style={{ color: "#6076f2" }}>{cmd.name}</span> —{" "}
                  {t(cmd.description)}
                </Typography>
              ))}
            </Box>
          ),
        });
        break;

      case "about":
        newHistory.push({
          id: Date.now() + 1,
          type: "system",
          content: t("terminal.command.about.content"),
        });
        break;

      case "projects":
        newHistory.push({
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
        break;

      case "skills":
        newHistory.push({
          id: Date.now() + 1,
          type: "system",
          content: (() => {
            const skillNames = SKILLS.map((skill) => skill.name);

            if (skillNames.length <= 1) return skillNames[0] ?? "";

            return `${skillNames.slice(0, -1).join(", ")} e ${skillNames.at(-1)}`;
          })(),
        });
        break;

      case "clear":
        resetVisibleHistory();
        setInput("");
        setIsCursorActive(true);
        return;

      case "history": {
        const userCommands = [...newSessionHistory]
          .filter((item) => item.type === "user")
          .map((item, index) => {
            const executedAt = item.timestamp
              ? new Date(item.timestamp)
              : new Date(item.id);
            return (
              <Typography key={item.id} variant="body2">
                {index + 1}. [{executedAt.toLocaleString()}] {item.content}
              </Typography>
            );
          });

        newHistory.push({
          id: Date.now() + 1,
          type: "system",
          content: (
            <Box sx={{ mt: 1, color: "#d0d7de" }}>
              <Typography sx={{ color: "#f2cc60", fontWeight: 700 }}>
                {t("terminal.command.history.translation")}
              </Typography>
              {userCommands.length > 0 ? (
                userCommands
              ) : (
                <Typography variant="body2">
                  {t("terminal.command.history.empty")}
                </Typography>
              )}
            </Box>
          ),
        });

        setHistory(newHistory);
        setInput("");
        setIsCursorActive(true);
        return;
      }

      case "quit":
        newHistory.push({
          id: Date.now() + 1,
          type: "system",
          content: t("terminal.command.quit.translation"),
        });
        setHistory(newHistory);
        setInput("");
        onClose();
        return;

      default:
        newHistory.push({
          id: Date.now() + 1,
          type: "error",
          content: t("terminal.errors.command_not_found", {
            cmd,
            help: t("terminal.command.help.translation"),
          }),
        });
        break;
    }

    setHistory(newHistory);
    setInput("");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    executeCommand(input);
  };

  const handleQuickCommand = (cmd: string) => {
    executeCommand(cmd);
  };

  const handleResizeStart = (
    event: ReactMouseEvent<HTMLDivElement>,
    direction: "se" | "sw" | "ne" | "nw",
  ) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDetached(true);

    resizeStateRef.current = {
      direction,
      startX: event.clientX,
      startY: event.clientY,
      startWidth: size.width,
      startHeight: size.height,
      startLeft: position.x,
      startTop: position.y,
    };
  };

  const handleDragStart = (event: ReactMouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDetached(true);
    dragStateRef.current = {
      offsetX: event.clientX - position.x,
      offsetY: event.clientY - position.y,
    };
  };

  const handleToggleDetached = () => {
    if (isDetached) {
      setIsDetached(false);
      setIsMinimized(false);
      setSize({ width: 700, height: 350 });
      dragStateRef.current = null;
      resizeStateRef.current = null;
      return;
    }

    setIsDetached(true);
    setIsMinimized(false);
    dragStateRef.current = null;
    resizeStateRef.current = null;
  };

  const handleMinimize = () => {
    setIsMinimized(true);
    dragStateRef.current = null;
    resizeStateRef.current = null;
  };

  const handleRestore = () => {
    if (minimizedDragMovedRef.current) {
      minimizedDragMovedRef.current = false;
      minimizedDragStateRef.current = null;
      return;
    }

    setIsMinimized(false);
    minimizedDragMovedRef.current = false;
    dragStateRef.current = null;
    minimizedDragStateRef.current = null;
    resizeStateRef.current = null;
  };

  const handleMinimizedDragStart = (event: ReactMouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    minimizedDragMovedRef.current = false;
    minimizedDragStateRef.current = {
      offsetX: event.clientX - minimizedPosition.x,
      offsetY: event.clientY - minimizedPosition.y,
    };
  };

  const terminalContent = () => (
    <Box
      sx={{
        color: "#f0f6fc",
        width: "100%",
        border: "1px solid #30363d",
        height: "100%",
        display: "flex",
        bgcolor: "#0d1117",
        position: "relative",
        overflow: "hidden",
        minHeight: 0,
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        borderRadius: 3,
        flexDirection: "column",
      }}
    >
      <Box
        onMouseDown={handleDragStart}
        sx={{
          px: 2,
          py: 1.1,
          cursor: "grab",
          display: "flex",
          bgcolor: "#161b22",
          alignItems: "center",
          userSelect: "none",
          borderBottom: "1px solid #30363d",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: 12,
              height: 12,
              bgcolor: "#f85149",
              borderRadius: "50%",
            }}
          />
          <Box
            sx={{
              width: 12,
              height: 12,
              bgcolor: "#d29922",
              borderRadius: "50%",
            }}
          />
          <Box
            sx={{
              width: 12,
              height: 12,
              bgcolor: "#3fb950",
              borderRadius: "50%",
            }}
          />
          <TerminalIcon size={15} style={{ color: "#7ee787", marginLeft: 4 }} />
          <Typography
            sx={{ color: "#8b949e", letterSpacing: 1.2, fontWeight: 700 }}
            variant="caption"
          >
            {t("terminal.window_title")}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
          <Tooltip
            title={isMinimized ? "Restore terminal" : "Minimize terminal"}
            placement="top"
          >
            <IconButton
              onMouseDown={(event) => event.stopPropagation()}
              onClick={(event) => {
                event.stopPropagation();
                if (isMinimized) {
                  handleRestore();
                } else {
                  handleMinimize();
                }
              }}
              size="small"
              aria-label={
                isMinimized ? "Restore terminal" : "Minimize terminal"
              }
              sx={{
                color: "#8b949e",
                "&:hover": {
                  color: "#ffffff",
                  bgcolor: "rgba(255,255,255,0.08)",
                },
              }}
            >
              <MinimizeIcon />
            </IconButton>
          </Tooltip>

          <Tooltip
            title={isDetached ? "Restore terminal" : "Detach terminal"}
            placement="top"
          >
            <IconButton
              onMouseDown={(event) => event.stopPropagation()}
              onClick={(event) => {
                event.stopPropagation();
                handleToggleDetached();
              }}
              size="small"
              aria-label={isDetached ? "Restore terminal" : "Detach terminal"}
              sx={{
                color: "#8b949e",
                "&:hover": {
                  color: "#ffffff",
                  bgcolor: "rgba(255,255,255,0.08)",
                },
              }}
            >
              {isDetached ? <Maximize2 size={16} /> : <Maximize2 size={16} />}
            </IconButton>
          </Tooltip>

          <Tooltip title={t("terminal.close")} placement="top">
            <IconButton
              onMouseDown={(event) => event.stopPropagation()}
              onClick={(event) => {
                event.stopPropagation();
                onClose();
              }}
              size="small"
              aria-label={t("terminal.close")}
              sx={{
                color: "#8b949e",
                "&:hover": {
                  color: "#ffffff",
                  bgcolor: "rgba(255,255,255,0.08)",
                },
              }}
            >
              <X size={16} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Box
        onClick={focusInput}
        sx={{
          px: 2.2,
          py: 2,
          pr: 1.2,
          flex: 1,
          cursor: "text",
          bgcolor: "#090c10",
          minHeight: 0,
          overflowY: "auto",
          scrollbarColor: "#3fb950 transparent",
          scrollbarWidth: "thin",
          overscrollBehavior: "contain",
          "&::-webkit-scrollbar": {
            width: 8,
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 999,
            backgroundColor: "rgba(63, 185, 80, 0.55)",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "rgba(126, 231, 135, 0.8)",
          },
        }}
      >
        <Stack spacing={1}>
          {history.map((item) => (
            <Box key={item.id}>
              {item.type === "user" ? (
                <Box
                  sx={{
                    gap: 1,
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{ color: "#7ee787", fontWeight: 700 }}
                    component="span"
                  >
                    {promptLabel}
                  </Typography>
                  <Typography component="span" sx={{ color: "#f0f6fc" }}>
                    {item.content}
                  </Typography>
                </Box>
              ) : item.type === "error" ? (
                <Typography sx={{ color: "#ff7b72" }}>
                  {item.content}
                </Typography>
              ) : (
                <Box sx={{ color: "#d0d7de" }}>{item.content}</Box>
              )}
            </Box>
          ))}

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              pt: 0.5,
              gap: 0.5,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ color: "#7ee787", fontWeight: 700, whiteSpace: "nowrap" }}
              component="span"
            >
              {promptLabel}
            </Typography>

            <Box
              sx={{
                flex: 1,
                display: "flex",
                minWidth: 0,
                position: "relative",
                minHeight: "1.2em",
                alignItems: "center",
              }}
            >
              <Box
                component="span"
                sx={{
                  color: "#f0f6fc",
                  fontSize: "0.95rem",
                  wordBreak: "break-word",
                  fontFamily: "inherit",
                  whiteSpace: "pre-wrap",
                }}
              >
                {input}
              </Box>
              <Box
                component="span"
                sx={{
                  ml: 0.2,
                  color: isCursorActive ? "#f0f6fc" : "transparent",
                  fontSize: "0.95rem",
                  fontFamily: "inherit",
                  lineHeight: 1,
                }}
              >
                {cursorSymbol}
              </Box>
              <InputBase
                value={input}
                inputRef={inputRef}
                onChange={(e) => setInput(e.target.value)}
                onFocus={() => setIsCursorActive(true)}
                onBlur={() => setIsCursorActive(false)}
                autoFocus
                fullWidth
                onClick={() => inputRef.current?.focus()}
                sx={{
                  inset: 0,
                  width: "100%",
                  color: "transparent",
                  opacity: 0,
                  position: "absolute",
                  caretColor: "#7ee787",
                  "& input": {
                    width: "100%",
                    color: "transparent",
                    padding: 0,
                    outline: "none",
                    caretColor: "#7ee787",
                  },
                }}
              />
            </Box>
          </Box>
          <div ref={bottomRef} />
        </Stack>
      </Box>

      <Box
        sx={{
          px: 2,
          py: 1.2,
          mt: "auto",
          gap: 1,
          bgcolor: "#1f2937",
          display: "flex",
          flexWrap: "wrap",
          borderTop: "1px solid #30363d",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        {CMDS.map((cmd) => (
          <Box
            key={cmd.name}
            component="button"
            onClick={() => handleQuickCommand(cmd.name)}
            sx={{
              color: "#f9fafb",
              border: 0,
              cursor: "pointer",
              bgcolor: "transparent",
              padding: 0,
              fontFamily: "inherit",
              fontWeight: 700,
              letterSpacing: 0.8,
              textTransform: "uppercase",
              "&:hover": { color: "#7ee787" },
            }}
          >
            {t(cmd.tooltip)}
          </Box>
        ))}
      </Box>
      <Box
        onMouseDown={(event) => handleResizeStart(event, "se")}
        sx={{
          width: 16,
          right: 0,
          height: 16,
          bottom: 0,
          cursor: "nwse-resize",
          bgcolor: "transparent",
          position: "absolute",
        }}
      />
    </Box>
  );

  if (isMinimized) {
    return (
      <Portal>
        <Box
          onMouseDown={handleMinimizedDragStart}
          onClick={handleRestore}
          sx={{
            position: "fixed",
            left: minimizedPosition.x,
            top: minimizedPosition.y,
            transform: "translateY(-50%)",
            width: 56,
            height: 56,
            zIndex: 1400,
            borderRadius: "50%",
            bgcolor: "#161b22",
            border: "1px solid #30363d",
            boxShadow: "0 12px 40px rgba(0, 0, 0, 0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#7ee787",
            animation: "terminalPulse 1.4s infinite",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            "@keyframes terminalPulse": {
              "0%, 100%": {
                boxShadow: "0 0 0 2px rgba(137, 246, 146, 0.1)",
                borderColor: "#6dfa79",
                transform: "scale(1)",
              },
              "50%": {
                boxShadow: "0 0 0 4px rgba(18, 232, 47, 0.46)",
                borderColor: "#3afb54",
                transform: "scale(1.04)",
              },
            },
          }}
        >
          <TerminalIcon size={24} />
        </Box>
      </Portal>
    );
  }

  return isDetached ? (
    <Portal>
      <Box
        sx={{
          position: "fixed",
          top: position.y,
          left: position.x,
          width: `${size.width}px`,
          height: `${size.height}px`,
          zIndex: 1400,
          boxShadow: "0 24px 80px rgba(0, 0, 0, 0.45)",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        {terminalContent()}
      </Box>
    </Portal>
  ) : (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      scroll="paper"
      slotProps={{
        backdrop: {
          sx: {
            backdropFilter: "blur(6px)",
            backgroundColor: "rgba(2, 6, 23, 0.78)",
          },
        },
      }}
      PaperProps={{
        sx: {
          m: 0,
          top: position.y,
          left: position.x,
          width: `${size.width}px`,
          height: `${size.height}px`,
          bgcolor: "transparent",
          maxWidth: "calc(100vw - 32px)",
          overflow: "hidden",
          position: "fixed",
          boxShadow: "0 24px 80px rgba(0, 0, 0, 0.45)",
          maxHeight: "calc(100vh - 32px)",
          transform: "none",
          borderRadius: 3,
        },
      }}
    >
      {terminalContent()}
    </Dialog>
  );
}
