import { Project } from "./Project";
import { PROJECTS } from "../../constants/app";
import { useTheme } from "@mui/material";
import { Subtitle } from "../Subtitle";
import { useTranslation } from "react-i18next";

export function Projects() {
  const theme = useTheme();

  const { t } = useTranslation();

  return (
    <section
      style={{
        border: `1px solid ${theme.palette.divider}`,
        margin: "auto 20px auto 25px",
        padding: "12px",
        maxWidth: "1000px",
        position: "relative",
        borderRadius: "10px",
        backgroundColor: theme.palette.background.b1,
      }}
    >
      <Subtitle
        subtitle={t("projects.title")}
        description={t("projects.description")}
      />
      <div
        style={{
          width: "100%",
          padding: "20px",
          maxWidth: "100%",
          overflow: "hidden",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            gap: "20px",
            width: "100%",
            display: "flex",
            maxWidth: "100%",
            flexWrap: "wrap",
            overflow: "hidden",
          }}
        >
          {PROJECTS.map((project, idx) => (
            <div key={project.title + idx} style={{ width: "100%" }}>
              <Project project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
