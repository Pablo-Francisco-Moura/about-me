import { LANGUAGES } from "../constants/app";
import { Button, ButtonGroup } from "@mui/material";
import type { TypeLanguageCode } from "../types/app";

interface Props {
  lang: TypeLanguageCode;
  handleChangeLanguage: (lng: TypeLanguageCode) => void;
}

export function Language({ lang, handleChangeLanguage }: Props) {
  return (
    <ButtonGroup
      sx={{
        maxHeight: "32px",
        marginLeft: "auto",
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
            src={`/src/assets/flag-${language.countryCode}.svg`}
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

    // <div
    //   style={{
    //     gap: 2,
    //     display: "flex",
    //     marginBottom: 2,
    //     justifyContent: "flex-end",
    //     border: "1px solid red",
    //     maxHeight: "32px",
    //   }}
    // >
    //   <button
    //     onClick={() => handleChangeLanguage("pt")}
    //     style={{
    //       border: lang === "pt" ? "2px solid #3E9A00" : "1px solid #ccc",
    //       cursor: "pointer",
    //       display: "flex",
    //       padding: "4px 10px",
    //       boxShadow: lang === "pt" ? "0 2px 8px #3E9A0033" : "none",
    //       background: lang === "pt" ? "#eaffea" : "#f9f9f9",
    //       alignItems: "center",
    //       marginRight: "8px",
    //       borderRadius: "8px",
    //     }}
    //     aria-label="Português"
    //   >
    //     <img
    //       src="/src/assets/flag-br.svg"
    //       alt="PT"
    //       style={{ width: 24, height: 24, marginRight: 6 }}
    //     />
    //     <span style={{ fontWeight: 600, color: "#3E9A00" }}>PT</span>
    //   </button>
    //   <button
    //     onClick={() => handleChangeLanguage("en")}
    //     style={{
    //       padding: "4px 10px",
    //       borderRadius: "8px",
    //       border: lang === "en" ? "2px solid #3C3B6E" : "1px solid #ccc",
    //       background: lang === "en" ? "#eaf0ff" : "#f9f9f9",
    //       cursor: "pointer",
    //       display: "flex",
    //       alignItems: "center",
    //       boxShadow: lang === "en" ? "0 2px 8px #3C3B6E33" : "none",
    //     }}
    //     aria-label="English"
    //   >
    //     <img
    //       src="/src/assets/flag-us.svg"
    //       alt="EN"
    //       style={{ width: 24, height: 24, marginRight: 6 }}
    //     />
    //     <span style={{ fontWeight: 600, color: "#3C3B6E" }}>EN</span>
    //   </button>
    // </div>
  );
}
