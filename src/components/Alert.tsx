import { Alert, Fade } from "@mui/material";
import { useTranslation } from "react-i18next";

interface Props {
  alert: boolean;
  isMobile: boolean;
  showAlert: boolean;
}

export function AlertMessage({ alert, isMobile, showAlert }: Props) {
  const { t } = useTranslation();
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
  );
}
