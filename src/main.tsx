import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { lightTheme, darkTheme } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { StrictMode, useEffect, useMemo, useState } from "react";
import type { TypeMode } from "./types/app.ts";
import App from "./App.tsx";
import i18n from "./settings/i18n.ts";
import "./settings/i18n.ts";

function Main() {
  const [mode, setMode] = useState<TypeMode>(() => {
    const saved = localStorage.getItem("themeMode");
    return saved === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const theme = useMemo(
    () => (mode === "dark" ? darkTheme : lightTheme),
    [mode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <I18nextProvider i18n={i18n}>
        <App mode={mode} setMode={setMode} />
      </I18nextProvider>
    </ThemeProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Main />
  </StrictMode>,
);
