import { ThemeSwitch } from "./ThemeSwitch";
import { LanguageSwitch } from "./LanguageSwitch";

export function Header() {
  return (
    <div
      style={{
        right: "12px",
        position: "absolute",
        maxHeight: "32px",
        marginLeft: "auto",
      }}
    >
      <ThemeSwitch />
      <LanguageSwitch />
    </div>
  );
}
