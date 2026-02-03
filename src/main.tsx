import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CssBaseline } from "@mui/material";
import { I18nextProvider } from "react-i18next";
import App from "./App.tsx";
import i18n from "./settings/i18n.ts";
import "./settings/i18n.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CssBaseline />
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </StrictMode>,
);
