import { CONTACTS } from "../constants/app";
import { useTranslation } from "react-i18next";
import { Box, Tooltip, Typography } from "@mui/material";

interface Props {
  isMobile: boolean;
}

export function Contacts({ isMobile }: Props) {
  const { t } = useTranslation();

  return (
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
  );
}
