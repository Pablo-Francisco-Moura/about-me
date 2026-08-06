import { useState } from "react";
import { TerminalModal } from "./TerminalModal";
import { useTranslation } from "react-i18next";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import TerminalIcon from "@mui/icons-material/Terminal";

export function Terminal() {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Tooltip title={t("terminal.open")} placement="top">
        <IconButton
          aria-label={t("terminal.open")}
          sx={{
            mr: 1,
            width: 45,
            color: "inherit",
            height: 45,
            bgcolor: "transparent",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 0 0 2px rgba(126, 231, 135, 0.16)",
            animation: "terminalPulse 1.4s infinite",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            borderRadius: "50%",
            "&:hover": {
              color: "inherit",
              bgcolor: "transparent",
              transform: "scale(1.04)",
              boxShadow: "0 0 0 3px rgba(126, 231, 135, 0.24)",
            },
            "@keyframes terminalPulse": {
              "0%, 100%": {
                boxShadow: "0 0 0 2px rgba(137, 246, 146, 0.1)",
                borderColor: "#6dfa79",
              },
              "50%": {
                boxShadow: "0 0 0 4px rgba(18, 232, 47, 0.46)",
                borderColor: "#3afb54",
              },
            },
          }}
          onClick={() => setIsOpen(true)}
        >
          <TerminalIcon
            fontSize="large"
            sx={{
              color: "#6dfa79",
            }}
          />
        </IconButton>
      </Tooltip>

      <TerminalModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
