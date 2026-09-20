import { QuickCommands } from "./QuickCommands";
import { useTranslation } from "react-i18next";
import { TitleBar } from "./TitleBar";
import { Box, Stack, InputBase, Typography } from "@mui/material";
import type {
  FormEvent,
  RefObject,
  PointerEvent as ReactPointerEvent,
  KeyboardEvent as ReactKeyboardEvent,
} from "react";
import type { TypeCommandOutput } from "../../types/terminal";

interface Props {
  input: string;
  history: TypeCommandOutput[];
  isMobile: boolean;
  inputRef: RefObject<HTMLInputElement | null>;
  bottomRef: RefObject<HTMLDivElement | null>;
  isDetached: boolean;
  promptLabel: string;
  isMinimized: boolean;
  cursorSymbol: string;
  isCursorActive: boolean;
  cursorPosition: number;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onMinimize: () => void;
  onInputBlur: () => void;
  onDragStart: (event: ReactPointerEvent<HTMLDivElement>) => void;
  onInputKeyUp: () => void;
  onInputFocus: () => void;
  onFocusInput: () => void;
  onInputChange: (value: string, cursorPosition: number) => void;
  onInputSelect: () => void;
  onResizeStart: (event: ReactPointerEvent<HTMLDivElement>) => void;
  onInputKeyDown: (event: ReactKeyboardEvent<HTMLInputElement>) => void;
  onQuickCommand: (command: string) => void;
  onToggleDetached: () => void;
}

export function Content({
  input,
  history,
  isMobile,
  inputRef,
  bottomRef,
  isDetached,
  isMinimized,
  promptLabel,
  cursorSymbol,
  isCursorActive,
  cursorPosition,
  onClose,
  onSubmit,
  onMinimize,
  onInputBlur,
  onDragStart,
  onInputKeyUp,
  onInputFocus,
  onFocusInput,
  onInputChange,
  onResizeStart,
  onInputSelect,
  onInputKeyDown,
  onQuickCommand,
  onToggleDetached,
}: Props) {
  const { t } = useTranslation();

  return (
    <Box sx={{ ...terminalSx, flexDirection: "column" }}>
      <TitleBar
        isDetached={isDetached}
        isMinimized={isMinimized}
        onDragStart={onDragStart}
        onMinimize={onMinimize}
        onToggleDetached={onToggleDetached}
        onClose={onClose}
      />

      <Box onClick={onFocusInput} sx={outputSx}>
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
            onSubmit={onSubmit}
            sx={{ pt: 0.5, gap: 0.5, display: "flex", alignItems: "center" }}
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
              <Typography component="span" sx={inputTextSx}>
                {input.slice(0, cursorPosition)}
              </Typography>
              <Typography
                component="span"
                sx={{
                  ...inputTextSx,
                  ml: 0.2,
                  color: isCursorActive ? "#f0f6fc" : "transparent",
                  lineHeight: 1,
                }}
              >
                {cursorSymbol}
              </Typography>
              <Typography component="span" sx={inputTextSx}>
                {input.slice(cursorPosition)}
              </Typography>
              <InputBase
                value={input}
                inputRef={inputRef}
                onChange={(event) =>
                  onInputChange(
                    event.target.value,
                    event.target.selectionStart ?? event.target.value.length,
                  )
                }
                onKeyDown={onInputKeyDown}
                onKeyUp={onInputKeyUp}
                onSelect={onInputSelect}
                onFocus={onInputFocus}
                onBlur={onInputBlur}
                autoFocus
                fullWidth
                onClick={() => inputRef.current?.focus()}
                sx={hiddenInputSx}
              />
            </Box>
          </Box>
          <div ref={bottomRef} />
        </Stack>
      </Box>

      <QuickCommands onQuickCommand={onQuickCommand} translate={t} />
      {!isMobile && <Box onPointerDown={onResizeStart} sx={resizeHandleSx} />}
    </Box>
  );
}

const terminalSx = {
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
};
const outputSx = {
  px: 2.2,
  py: 2,
  pr: 1.2,
  flex: 1,
  cursor: "text",
  bgcolor: "#090c10",
  minHeight: 0,
  overflowY: "auto" as const,
  scrollbarColor: "#3fb950 transparent",
  scrollbarWidth: "thin" as const,
  overscrollBehavior: "contain" as const,
  "&::-webkit-scrollbar": { width: 8 },
  "&::-webkit-scrollbar-track": { background: "transparent" },
  "&::-webkit-scrollbar-thumb": {
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 999,
    backgroundColor: "rgba(63, 185, 80, 0.55)",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "rgba(126, 231, 135, 0.8)",
  },
};
const inputTextSx = {
  color: "#f0f6fc",
  fontSize: "0.95rem",
  wordBreak: "break-word" as const,
  fontFamily: "inherit",
  whiteSpace: "pre-wrap" as const,
};
const hiddenInputSx = {
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
};
const resizeHandleSx = {
  width: 16,
  right: 0,
  height: 16,
  bottom: 0,
  cursor: "nwse-resize",
  bgcolor: "transparent",
  position: "absolute" as const,
  touchAction: "none",
};
