import { CONTACTS } from "../constants/app";
import { useTranslation } from "react-i18next";
import { usePreferencesStore } from "../store/storePreferences";
import { Box, Tooltip, Typography } from "@mui/material";
import type { TypeContact } from "../types/app";

interface Props {
  isMobile: boolean;
}

const getContactImage = (contact: TypeContact, mode: "light" | "dark") => {
  if (typeof contact.image === "string") {
    return contact.image;
  }

  return mode === "dark" ? contact.image.dark : contact.image.light;
};

export function Contacts({ isMobile }: Props) {
  const { t } = useTranslation();
  const { mode } = usePreferencesStore();

  return (
    <section
      style={{
        gap: 8,
        display: "flex",
        flexWrap: "wrap",
        textAlign: "center",
        marginBottom: "25px",
        justifyContent: "center",
      }}
    >
      {CONTACTS.map((contact, index) => (
        <Tooltip
          key={`${index}-${contact.name}`}
          title={t(`${contact.tooltip}`)}
          arrow
        >
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
            onClick={() => {
              window.open(contact.link, "_blank");
            }}
          >
            <img
              src={getContactImage(contact, mode)}
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
