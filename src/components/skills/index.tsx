import { SKILLS } from "../../constants/app";
import { Subtitle } from "../Subtitle";
import { useState } from "react";
import { SkillSideBar } from "./SkillSideBar";
import { useTranslation } from "react-i18next";
import { Button, useTheme } from "@mui/material";
import type { TypeSkill } from "../../types/app";

export function Skills() {
  const theme = useTheme();
  const { t } = useTranslation();

  const [sideBarSkill, setSideBarSkill] = useState<TypeSkill>();

  const handleSideBarSkill = (skill: TypeSkill) => {
    if (skill === sideBarSkill) {
      handleCloseSideBar();
    } else {
      setSideBarSkill(skill);
    }
  };

  const handleCloseSideBar = () => {
    setSideBarSkill(undefined);
  };

  return (
    <>
      {sideBarSkill && (
        <SkillSideBar skill={sideBarSkill} onClose={handleCloseSideBar} />
      )}
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
        <Subtitle
          subtitle={t("skills.title")}
          description={t("skills.description")}
        />
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
              size="small"
              color="primary"
              style={{
                display: "flex",
                flexDirection: "column",
                fontWeight: 500,
                borderRadius: 8,
                textTransform: "none",
              }}
              variant="outlined"
              onClick={() => handleSideBarSkill(skill)}
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
    </>
  );
}
