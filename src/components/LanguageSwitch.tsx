import { LANGUAGES } from "../constants/app";
import { Button, ButtonGroup } from "@mui/material";
import type { TypeLanguageCode } from "../types/app";

interface Props {
  lang: TypeLanguageCode;
  handleChangeLanguage: (lng: TypeLanguageCode) => void;
}

export function LanguageSwitch({ lang, handleChangeLanguage }: Props) {
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
