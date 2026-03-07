import { t } from "i18next";
import { Button } from "@mui/material";

interface Props {
  url: string;
  onClose: () => void;
}

export function SkillSideBar({ url, onClose }: Props) {
  if (!url) return null;

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
        borderRight: "1px solid #eee",
        flexDirection: "column",
      }}
    >
      <Button
        color="error"
        style={{ alignSelf: "flex-end", margin: 8 }}
        variant="outlined"
        onClick={onClose}
      >
        {t("skills.close")}
      </Button>
      <iframe
        src={url}
        title="Skill Info"
        style={{ flex: 1, border: "none" }}
      />
    </aside>
  );
}
