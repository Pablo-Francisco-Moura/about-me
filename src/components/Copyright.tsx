import { COPYRIGHT } from "../constants/copyright";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface Props {
  isMobile: boolean;
}

export function Copyright({ isMobile }: Props) {
  const { t } = useTranslation();

  return (
    <div
      style={{
        gap: "12px",
        flex: 1,
        bottom: "0px",
        display: "flex",
        position: "fixed",
        minWidth: "calc(100% - 40px)",
        justifyContent: "space-between",
      }}
    >
      <Typography noWrap fontSize={10}>
        {`${t("copyright.developed_by")} ${COPYRIGHT.firstName} ${
          isMobile ? COPYRIGHT.lastName : COPYRIGHT.fullLastName
        } - ${COPYRIGHT.year}`}
      </Typography>

      <Typography
        noWrap
        fontSize={10}
      >{`${t("copyright.version")}: ${COPYRIGHT.version}${
        isMobile
          ? ""
          : ` - ${t("copyright.last_updated")}: ${COPYRIGHT.lastUpdated}`
      }`}</Typography>
    </div>
  );
}
