import { useState } from "react";
import { TerminalModal } from "./TerminalModal";
import { useTranslation } from "react-i18next";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import TerminalIcon from "@mui/icons-material/Terminal";

export function Terminal() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <Tooltip title={t("terminal.open")} placement="top">
        <IconButton
          aria-label={t("terminal.open")}
          sx={{
            mt: -2,
            mr: 1,
            width: 33,
            height: 33,
            borderRadius: "50%",
            bgcolor: "transparent",
            color: "inherit",
            boxShadow: "0 0 0 2px rgba(126, 231, 135, 0.16)",
            position: "relative",
            overflow: "hidden",
            animation: "terminalPulse 1.4s infinite",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            "&:hover": {
              bgcolor: "transparent",
              color: "inherit",
              transform: "scale(1.04)",
              boxShadow: "0 0 0 3px rgba(126, 231, 135, 0.24)",
            },
            "@keyframes terminalPulse": {
              "0%, 100%": {
                borderColor: "#7ee787",
                boxShadow: "0 0 0 2px rgba(137, 246, 146, 0.1)",
              },
              "50%": {
                borderColor: "#3fb950",
                boxShadow: "0 0 0 6px rgba(18, 232, 47, 0.3)",
              },
            },
          }}
          onClick={() => setIsOpen(true)}
        >
          <TerminalIcon
            fontSize="small"
            sx={{
              color: "white",
            }}
          />
        </IconButton>
      </Tooltip>

      <TerminalModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
