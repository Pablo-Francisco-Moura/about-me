import { Box } from "@mui/material";
import { CMDS, HELP_COMMAND } from "../../constants/terminal";
interface Props { onQuickCommand: (command: string) => void; translate: (key: string) => string; }
export function QuickCommands({ onQuickCommand, translate }: Props) {
  return <Box sx={footerSx}><QuickCommand command={HELP_COMMAND.name} label={translate(HELP_COMMAND.tooltip)} onClick={onQuickCommand} />{CMDS.filter((command) => !command.notShowBottom).map((command) => <QuickCommand key={command.name[0]} command={command.name[0]} label={translate(command.tooltip)} onClick={onQuickCommand} />)}</Box>;
}
function QuickCommand({ command, label, onClick }: { command: string; label: string; onClick: (command: string) => void }) { return <Box component="button" onClick={() => onClick(command)} sx={quickCommandSx}>{label}</Box>; }
const footerSx = { px: 2, py: 1.2, mt: "auto", gap: 1, bgcolor: "#1f2937", display: "flex", flexWrap: "wrap" as const, borderTop: "1px solid #30363d", alignItems: "center", justifyContent: "flex-start" };
const quickCommandSx = { color: "#f9fafb", border: 0, cursor: "pointer", bgcolor: "transparent", padding: 0, fontFamily: "inherit", fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" as const, "&:hover": { color: "#7ee787" } };