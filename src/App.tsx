import { Works } from "./components/works";
import { Skills } from "./components/skills";
import { Thanks } from "./components/Thanks";
import { Contacts } from "./components/Contacts";
import { Copyright } from "./components/Copyright";
import { Description } from "./components/Description";
import { ThemeSwitch } from "./components/ThemeSwitch";
import { AlertMessage } from "./components/Alert";
import { LanguageSwitch } from "./components/LanguageSwitch";
import { useEffect, useState } from "react";
import { usePreferencesStore } from "./store/storePreferences";
import { useMediaQuery, useTheme } from "@mui/material";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width: 500px)");
  const { mode } = usePreferencesStore();

  const [alert, setAlert] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setAlert(true);
    const timer = setTimeout(() => setAlert(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setAlert(true);
    const timer = setTimeout(() => setShowAlert(true), 13500);
    return () => clearTimeout(timer);
  }, []);

  const padding: number = 20;

  return (
    <div
      style={{
        gap: "12px",
        padding: `${padding}px`,
        display: "flex",
        minWidth: "100vw",
        maxWidth: "100vw",
        overflow: "hidden",
        minHeight: "100vh",
        maxHeight: "100vh",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          maxHeight: "32px",
          marginLeft: "auto",
        }}
      >
        <ThemeSwitch />
        <LanguageSwitch />
      </div>
      <SimpleBar
        style={{
          flex: 1,
          border: `1px solid ${theme.palette.divider}`,
          padding: `${padding}px`,
          minHeight: `calc(100vh - ${padding * 2 + 44}px)`,
          maxHeight: `calc(100vh - ${padding * 2 + 44}px)`,
          borderRadius: "25px",
          backgroundColor: mode === "dark" ? "#232323" : "#f9f9f9",
        }}
      >
        <AlertMessage alert={alert} isMobile={isMobile} showAlert={showAlert} />
        <Description />
        <Skills />
        <Works />
        <Thanks />
        <Contacts isMobile={isMobile} />
      </SimpleBar>
      <Copyright isMobile={isMobile} />
    </div>
  );
}

export default App;
