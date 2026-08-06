import { Terminal } from "../../Terminal";
import { ThemeSwitch } from "./ThemeSwitch";
import { LanguageSwitch } from "./LanguageSwitch";

export function Controls() {
  return (
    <div
      style={{
        top: "12px",
        gap: "8px",
        right: "24px",
        display: "flex",
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Terminal />

      <ThemeSwitch />

      <LanguageSwitch />
    </div>
  );
}
