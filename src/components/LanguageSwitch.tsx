import { LANGUAGES } from "../constants/app";
import { Button, ButtonGroup } from "@mui/material";
import { usePreferencesStore } from "../store/storePreferences";
import type { TypeLanguageCode } from "../types/app";
import i18n from "../settings/i18n";

export function LanguageSwitch() {
  const { lang, setLang } = usePreferencesStore();

  const handleChangeLanguage = (lng: TypeLanguageCode) => {
    i18n.changeLanguage(lng);
    setLang(lng);
  };

  return (
    <ButtonGroup
      sx={{
        maxHeight: "32px",
      }}
    >
      {LANGUAGES.map((language) => (
        <Button
          key={language.code}
          sx={{
            px: "5px",
          }}
          onClick={() => handleChangeLanguage(language.code)}
          variant={lang === language.code ? "contained" : "outlined"}
        >
          <img
            src={language.image}
            alt={language.label}
            style={{
              width: 24,
              height: 24,
              marginRight: 6,
              borderRadius: "4px",
            }}
          />
          <span
            style={{
              fontWeight: 600,
              color: lang === language.code ? "white" : language.color,
            }}
          >
            {language.code}
          </span>
        </Button>
      ))}
    </ButtonGroup>
  );
}
