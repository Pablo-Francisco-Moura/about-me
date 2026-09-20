import { TITLE_BAR_SX } from "../../constants/terminal";
import { useTranslation } from "react-i18next";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { Maximize2, Terminal as TerminalIcon, X } from "lucide-react";
import type { PointerEvent } from "react";
import MinimizeIcon from "@mui/icons-material/Minimize";

interface Props {
  isDetached: boolean;
  isMinimized: boolean;
  onDragStart: (event: PointerEvent<HTMLDivElement>) => void;
  onMinimize: () => void;
  onToggleDetached: () => void;
  onClose: () => void;
}
const actionButtonSx = {
  color: "#8b949e",
  "&:hover": { color: "#ffffff", bgcolor: "rgba(255,255,255,0.08)" },
};

export function TitleBar({
  isDetached,
  isMinimized,
  onClose,
  onMinimize,
  onDragStart,
  onToggleDetached,
}: Props) {
  const { t } = useTranslation();

  return (
    <Box onPointerDown={onDragStart} sx={TITLE_BAR_SX}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {["#f85149", "#d29922", "#3fb950"].map((color) => (
          <Box
            key={color}
            sx={{ width: 12, height: 12, bgcolor: color, borderRadius: "50%" }}
          />
        ))}
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
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation();
              onMinimize();
            }}
            size="small"
            aria-label={isMinimized ? "Restore terminal" : "Minimize terminal"}
            sx={actionButtonSx}
          >
            <MinimizeIcon />
          </IconButton>
        </Tooltip>
        <Tooltip
          title={
            isDetached
              ? t("terminal.command.restore.translation")
              : t("terminal.command.detach.translation")
          }
          placement="top"
        >
          <IconButton
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation();
              onToggleDetached();
            }}
            size="small"
            aria-label={
              isDetached
                ? t("terminal.command.restore.translation")
                : t("terminal.command.detach.translation")
            }
            sx={actionButtonSx}
          >
            <Maximize2 size={16} />
          </IconButton>
        </Tooltip>
        <Tooltip title={t("terminal.close")} placement="top">
          <IconButton
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation();
              onClose();
            }}
            size="small"
            aria-label={t("terminal.close")}
            sx={actionButtonSx}
          >
            <X size={16} />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}
