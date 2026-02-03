import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export function Thanks() {
  const { t } = useTranslation();

  return (
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
  );
}
