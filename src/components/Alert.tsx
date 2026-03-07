import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Alert, Fade, useMediaQuery } from "@mui/material";

export function AlertMessage() {
  const { t } = useTranslation();
  const isMobile = useMediaQuery("(max-width: 500px)");

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

  return (
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
  );
}
