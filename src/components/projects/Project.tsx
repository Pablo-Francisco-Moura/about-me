import { Tooltip } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { TypeProject } from "../../types/app";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardActionArea from "@mui/material/CardActionArea";

interface Props {
  project: TypeProject;
}

export function Project({ project }: Props) {
  const { t } = useTranslation();

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(project.link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card
      sx={{
        backgroundColor: "background.b2",
      }}
    >
      <CardActionArea
        style={{
          display: "flex",
          padding: "40px",
          flexDirection: "column",
        }}
        onClick={() => window.open(project.link, "_blank")}
      >
        <CardMedia
          alt={project.title}
          width="140"
          image={project.image}
          height="140"
          component="img"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {t(project.title)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t(project.description)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Tooltip title={t("project.share_info")} arrow>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Button size="small" color="primary" onClick={handleCopy}>
              {t("project.share")}
            </Button>
            {copied && (
              <Typography
                variant="caption"
                color="success.main"
                sx={{
                  textAlign: "center",
                  ml: "8px",
                  mt: "20px",
                  position: "absolute",
                }}
              >
                {t("project.link_copied")}
              </Typography>
            )}
          </div>
        </Tooltip>

        <Tooltip title={t("project.open_info")} arrow>
          <Button
            size="small"
            color="primary"
            onClick={() => window.open(project.link, "_blank")}
          >
            {t("project.open")}
          </Button>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
