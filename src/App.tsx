import { Works } from "./components/works";
import { Skills } from "./components/Skills";
import { Thanks } from "./components/Thanks";
import { Contacts } from "./components/Contacts";
import { Language } from "./components/Language";
import { Copyright } from "./components/Copyright";
import { Description } from "./components/Description";
import { AlertMessage } from "./components/Alert";
import { useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import type { TypeLanguageCode } from "./types/app";
import i18n from "./settings/i18n";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

function App() {
  const isMobile = useMediaQuery("(max-width: 500px)");

  const [lang, setLang] = useState(i18n.language as TypeLanguageCode);

  const handleChangeLanguage = (lng: TypeLanguageCode) => {
    i18n.changeLanguage(lng);
    setLang(lng);
  };

  const [alert, setAlert] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  // Show alert on load.
  useEffect(() => {
    setAlert(true);
    const timer = setTimeout(() => setAlert(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  // Handle alert visibility.
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
      <Language lang={lang} handleChangeLanguage={handleChangeLanguage} />

      <SimpleBar
        style={{
          flex: 1,
          border: "1px solid #ccc",
          padding: `${padding}px`,
          minHeight: `calc(100vh - ${padding * 2 + 44}px)`,
          maxHeight: `calc(100vh - ${padding * 2 + 44}px)`,
          borderRadius: "25px",
          backgroundColor: "#f9f9f9",
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
