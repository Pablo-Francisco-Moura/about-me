import { SKILLS } from "../constants/app";
import { useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

export function Skills() {
  const theme = useTheme();

  const { t } = useTranslation();

  return (
    <section
      style={{
        margin: "auto",
        border: `1px solid ${theme.palette.divider}`,
        padding: "12px",
        maxWidth: "1000px",
        borderRadius: "10px",
        backgroundColor: theme.palette.background.b1,
      }}
    >
      <h3>{t("skills")}</h3>
      <ul
        style={{
          gap: 12,
          display: "flex",
          padding: 0,
          flexWrap: "wrap",
          listStyle: "none",
        }}
      >
        {SKILLS.map((skill) => (
          <li
            key={skill}
            style={{
              color: "#646cff",
              padding: "8px 16px",
              background: "#646cff22",
              fontWeight: 500,
              borderRadius: 8,
            }}
          >
            {skill}
          </li>
        ))}
      </ul>
    </section>
  );
}
