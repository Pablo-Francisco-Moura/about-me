import { LANGUAGES } from "../../../constants/app";
import { Button, ButtonGroup } from "@mui/material";
import { usePreferencesStore } from "../../../store/storePreferences";
import type { TypeLanguageCode } from "../../../types/app";
import i18n from "../../../settings/i18n";

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
            transform: lang === language.code ? "scale(1.1)" : "scale(1)",
            transition:
              "background-color 600ms ease, border-color 600ms ease, transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 600ms ease",
            boxShadow:
              lang === language.code
                ? "0 4px 14px rgba(100, 108, 255, 0.28)"
                : "none",
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
              transform:
                lang === language.code
                  ? "scale(1.18) rotate(360deg)"
                  : "scale(1)",
              transition:
                "transform 1s cubic-bezier(0.34, 1.56, 0.64, 1), filter 600ms ease",
              marginRight: 6,
              borderRadius: "4px",
            }}
          />
          <span
            style={{
              color: lang === language.code ? "white" : language.color,
              fontWeight: 600,
              transition: "color 220ms ease",
            }}
          >
            {language.code}
          </span>
        </Button>
      ))}
    </ButtonGroup>
  );
}
