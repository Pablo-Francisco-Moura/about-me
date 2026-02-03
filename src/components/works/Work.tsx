import { Tooltip } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { TypeWork } from "../../types/app";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardActionArea from "@mui/material/CardActionArea";

interface Props {
  work: TypeWork;
}

export function Work({ work }: Props) {
  const { t } = useTranslation();

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(work.link);
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
        onClick={() => window.open(work.link, "_blank")}
      >
        <CardMedia
          alt={work.title}
          width="140"
          image={work.image}
          height="140"
          component="img"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {t(work.title)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t(work.description)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Tooltip title={t("work.share_info")} arrow>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Button size="small" color="primary" onClick={handleCopy}>
              {t("work.share")}
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
                {t("work.link_copied")}
              </Typography>
            )}
          </div>
        </Tooltip>

        <Tooltip title={t("work.open_info")} arrow>
          <Button
            size="small"
            color="primary"
            onClick={() => window.open(work.link, "_blank")}
          >
            {t("work.open")}
          </Button>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
