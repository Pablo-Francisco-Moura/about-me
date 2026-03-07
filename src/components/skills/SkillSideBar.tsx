import { t } from "i18next";
import { useEffect, useState } from "react";
import { Button, CircularProgress, Box } from "@mui/material";
import type { TypeSkill } from "../../types/app";

interface Props {
  skill: TypeSkill;
  onClose: () => void;
}

export function SkillSideBar({ skill, onClose }: Props) {
  const [visible, setVisible] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    if (skill) {
      // A slight delay is needed to ensure the entrance animation occurs smoothly.
      const timer = setTimeout(() => setVisible(true), 10);
      setIframeLoaded(false);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [skill]);

  if (!skill) return null;

  return (
    <aside
      style={{
        top: 0,
        left: 0,
        width: "400px",
        height: "100vh",
        zIndex: 1000,
        display: "flex",
        position: "fixed",
        boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
        transform: visible ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.6s cubic-bezier(.4,0,.2,1)",
        background: "#fff",
        borderRight: "1px solid #eee",
        flexDirection: "column",
      }}
    >
      <Button
        color="error"
        style={{ alignSelf: "flex-end", margin: 8 }}
        variant="outlined"
        onClick={() => {
          setVisible(false);
          // Wait for the exit animation before actually closing.
          setTimeout(onClose, 600);
        }}
      >
        {t("skills.close")}
      </Button>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          position: "relative",
          flexDirection: "column",
        }}
      >
        {!skill.blocked && !iframeLoaded && (
          <Box
            sx={{
              inset: 0,
              zIndex: 2,
              display: "flex",
              position: "absolute",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fff",
            }}
          >
            <CircularProgress />
          </Box>
        )}

        {skill.blocked ? (
          <div
            style={{
              flex: 1,
              display: "flex",
              padding: 24,
              textAlign: "center",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <p style={{ color: "#c00", fontWeight: 500, marginBottom: 16 }}>
              {`${t("skills.the_website_of")} ${skill.name} ${t("skills.cannot_displayed")}  `}
            </p>
            <Button
              color="primary"
              variant="contained"
              onClick={() => window.open(skill.link, "_blank")}
            >
              {t("skills.open_in_new_tab")}
            </Button>
          </div>
        ) : (
          <iframe
            src={skill.link}
            title={`Skill ${skill.name}`}
            style={{
              flex: 1,
              border: "none",
              visibility: iframeLoaded ? "visible" : "hidden",
            }}
            onLoad={() => setIframeLoaded(true)}
          />
        )}
      </Box>
    </aside>
  );
}
