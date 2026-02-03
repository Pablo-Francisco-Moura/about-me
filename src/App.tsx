import {
  Box,
  Fade,
  Alert,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Works } from "./components/works";
import { Language } from "./components/Language";
import { Copyright } from "./components/Copyright";
import { useTranslation } from "react-i18next";
import { CONTACTS, SKILLS } from "./constants/app";
import { useEffect, useState } from "react";
import type { TypeLanguageCode } from "./types/app";
import i18n from "./settings/i18n";
import profile from "./assets/profile.jpg";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

function App() {
  const isMobile = useMediaQuery("(max-width: 500px)");
  const { t } = useTranslation();

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
        <Fade
          style={{
            maxHeight: !showAlert ? "150px" : "0px",
            transition: "max-height 3s ease-in-out",
          }}
          in={alert}
          timeout={3000}
        >
          <Alert
            sx={{
              mb: "20px",
              marginX: "auto",
              maxWidth: "530px",
              fontSize: isMobile ? "10px" : "14px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
              transition: "all 0.6s cubic-bezier(.4,0,.2,1)",
            }}
            severity="info"
          >
            {t("alert.message")}
          </Alert>
        </Fade>

        <section
          style={{
            position: "relative",
            textAlign: "center",
          }}
        >
          <img
            src={profile}
            alt="Avatar"
            style={{
              width: 150,
              height: 150,
              borderRadius: "50%",
              marginBottom: 16,
            }}
          />
          <h1>Pablo Francisco Moura</h1>
          <h2 style={{ color: "#646cff", fontWeight: 400 }}>
            {t("description.role")}
          </h2>
          <p>{t("description.welcome")}</p>
          <p>{t("description.intro")}</p>
        </section>

        <section
          style={{
            margin: "auto",
            border: "1px solid #ccc",
            padding: "12px",
            maxWidth: "1000px",
            borderRadius: "10px",
            backgroundColor: "#edeaeaff",
          }}
        >
          <h3>{t("skills")}</h3>
          <ul
            style={{
              gap: 12,
              display: "flex",
              padding: 0,
              flexWrap: "wrap",
              listStyle: "none",
            }}
          >
            {SKILLS.map((skill) => (
              <li
                key={skill}
                style={{
                  color: "#646cff",
                  padding: "8px 16px",
                  background: "#646cff22",
                  fontWeight: 500,
                  borderRadius: 8,
                }}
              >
                {skill}
              </li>
            ))}
          </ul>
        </section>

        <section
          style={{
            border: "1px solid #ccc",
            margin: "20px auto",
            padding: "12px",
            maxWidth: "1000px",
            borderRadius: "10px",
            backgroundColor: "#edeaeaff",
          }}
        >
          <h3>{t("works")}</h3>
          <Works />
        </section>

        <Typography
          sx={{
            mt: "auto",
            position: "relative",
          }}
          align="center"
          variant="h6"
        >
          {t("thanks")}
        </Typography>

        <section
          style={{
            gap: 8,
            display: "flex",
            flexWrap: "wrap",
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          {CONTACTS.map((contact) => (
            <Tooltip title={t(`${contact.tooltip}`)} arrow>
              <Box
                sx={{
                  width: `${isMobile ? 60 : 80}px`,
                  height: `${isMobile ? 60 : 80}px`,
                  border: "1px solid #646cff",
                  cursor: "pointer",
                  display: "flex",
                  padding: "12px",
                  alignItems: "center",
                  borderRadius: "12px",
                  flexDirection: "column",
                  justifyContent: "center",
                  ":hover": {
                    backgroundColor: "#646cff",
                  },
                  transition: "background-color 1s",
                }}
                key={contact.name}
                onClick={() => {
                  window.open(contact.link, "_blank");
                }}
              >
                <img
                  src={contact.image}
                  alt={contact.name}
                  style={{
                    width: "40px",
                    height: "40px",
                  }}
                />
                <Typography fontSize={isMobile ? 10 : 14}>
                  {contact.name}
                </Typography>
              </Box>
            </Tooltip>
          ))}
        </section>
      </SimpleBar>

      <Copyright isMobile={isMobile} />
    </div>
  );
}

export default App;
