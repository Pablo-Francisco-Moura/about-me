import { SKILLS } from "../constants/app";
import { useTranslation } from "react-i18next";
import { Button, useTheme } from "@mui/material";

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
        {SKILLS.map((skill, index) => (
          <Button
            key={`${index}-${skill.name}`}
            variant="outlined"
            color="primary"
            size="small"
            style={{
              display: "flex",
              flexDirection: "column",
              fontWeight: 500,
              borderRadius: 8,
              textTransform: "none",
            }}
            onClick={() => {
              window.open(skill.link, "_blank");
            }}
          >
            <img
              src={skill.image}
              alt={skill.name}
              style={{
                width: "40px",
                height: "40px",
              }}
            />
            {skill.name}
          </Button>
        ))}
      </ul>
    </section>
  );
}
