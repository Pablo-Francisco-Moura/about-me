import { t } from "i18next";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

interface Props {
  url: string;
  onClose: () => void;
}

export function SkillSideBar({ url, onClose }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    return () => setVisible(false);
  }, [url]);

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
        transform: visible ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 1s cubic-bezier(.4,0,.2,1)",
        background: "#fff",
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
