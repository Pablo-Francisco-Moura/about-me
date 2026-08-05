import {
  Box,
  Stack,
  Dialog,
  Tooltip,
  InputBase,
  IconButton,
  Typography,
} from "@mui/material";
import type { FormEvent, ReactNode } from "react";
import { CMDS } from "../../constants/terminal";
import { useTranslation } from "react-i18next";
import { SKILLS, PROJECTS } from "../../constants/app";
import { X, Terminal as TerminalIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ICommandOutput {
  id: number;
  type: "user" | "system" | "error";
  content: string | string[] | ReactNode;
  timestamp?: number;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const getInitialHistory = (
  translate: (key: string) => string,
): ICommandOutput[] => [
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

  const [input, setInput] = useState("");
  const [isCursorActive, setIsCursorActive] = useState(false);
  const [sessionHistory, setSessionHistory] = useState<ICommandOutput[]>(() =>
    getInitialHistory(t),
  );
  const [history, setHistory] = useState<ICommandOutput[]>(() =>
    getInitialHistory(t),
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
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
    const newSessionHistory: ICommandOutput[] = [...sessionHistory, userEntry];
    const newHistory: ICommandOutput[] = [...history, userEntry];

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

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      scroll="paper"
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(2, 6, 23, 0.78)",
            backdropFilter: "blur(6px)",
          },
        },
      }}
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: "hidden",
          bgcolor: "transparent",
          boxShadow: "0 24px 80px rgba(0, 0, 0, 0.45)",
          width: { xs: "100%", sm: "min(92vw, 860px)" },
          maxHeight: "85vh",
          minHeight: "50vh",
          m: { xs: 1, sm: 3 },
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          minHeight: "50vh",
          maxHeight: "85vh",
          bgcolor: "#0d1117",
          color: "#f0f6fc",
          border: "1px solid #30363d",
          borderRadius: 3,
          overflow: "hidden",
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            py: 1.1,
            bgcolor: "#161b22",
            borderBottom: "1px solid #30363d",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                bgcolor: "#f85149",
              }}
            />
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                bgcolor: "#d29922",
              }}
            />
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                bgcolor: "#3fb950",
              }}
            />
            <TerminalIcon
              size={15}
              style={{ color: "#7ee787", marginLeft: 4 }}
            />
            <Typography
              variant="caption"
              sx={{ color: "#8b949e", letterSpacing: 1.2, fontWeight: 700 }}
            >
              {t("terminal.window_title")}
            </Typography>
          </Box>

          <Tooltip title={t("terminal.close")} placement="top">
            <IconButton
              onClick={onClose}
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

        <Box
          onClick={focusInput}
          sx={{
            flex: 1,
            minHeight: 0,
            px: 2.2,
            py: 2,
            pr: 1.2,
            overflowY: "auto",
            bgcolor: "#090c10",
            overscrollBehavior: "contain",
            cursor: "text",
            scrollbarWidth: "thin",
            scrollbarColor: "#3fb950 transparent",
            "&::-webkit-scrollbar": {
              width: 8,
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(63, 185, 80, 0.55)",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.08)",
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
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      flexWrap: "wrap",
                    }}
                  >
                    <Typography
                      component="span"
                      sx={{ color: "#7ee787", fontWeight: 700 }}
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
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                pt: 0.5,
              }}
            >
              <Typography
                component="span"
                sx={{ color: "#7ee787", fontWeight: 700, whiteSpace: "nowrap" }}
              >
                {promptLabel}
              </Typography>

              <Box
                sx={{
                  position: "relative",
                  flex: 1,
                  minWidth: 0,
                  display: "flex",
                  alignItems: "center",
                  minHeight: "1.2em",
                }}
              >
                <Box
                  component="span"
                  sx={{
                    color: "#f0f6fc",
                    fontFamily: "inherit",
                    fontSize: "0.95rem",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  {input}
                </Box>
                <Box
                  component="span"
                  sx={{
                    color: isCursorActive ? "#f0f6fc" : "transparent",
                    fontFamily: "inherit",
                    fontSize: "0.95rem",
                    lineHeight: 1,
                    ml: 0.2,
                  }}
                >
                  {cursorSymbol}
                </Box>
                <InputBase
                  inputRef={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onFocus={() => setIsCursorActive(true)}
                  onBlur={() => setIsCursorActive(false)}
                  autoFocus
                  fullWidth
                  onClick={() => inputRef.current?.focus()}
                  sx={{
                    position: "absolute",
                    inset: 0,
                    opacity: 0,
                    width: "100%",
                    color: "transparent",
                    caretColor: "#7ee787",
                    "& input": {
                      padding: 0,
                      outline: "none",
                      width: "100%",
                      color: "transparent",
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
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: 1,
            px: 2,
            py: 1.2,
            bgcolor: "#1f2937",
            borderTop: "1px solid #30363d",
            mt: "auto",
          }}
        >
          {CMDS.map((cmd) => (
            <Box
              key={cmd.name}
              component="button"
              onClick={() => handleQuickCommand(cmd.name)}
              sx={{
                border: 0,
                bgcolor: "transparent",
                color: "#f9fafb",
                cursor: "pointer",
                fontFamily: "inherit",
                fontWeight: 700,
                letterSpacing: 0.8,
                textTransform: "uppercase",
                padding: 0,
                "&:hover": { color: "#7ee787" },
              }}
            >
              {t(cmd.tooltip)}
            </Box>
          ))}
        </Box>
      </Box>
    </Dialog>
  );
}
