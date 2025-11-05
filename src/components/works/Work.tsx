import { useState } from "react";
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
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(work.link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card>
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
            {work.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {work.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={handleCopy}>
          Compartilhar
        </Button>
        {copied && (
          <Typography variant="body2" color="success.main" sx={{ ml: 2 }}>
            Link copiado!
          </Typography>
        )}
      </CardActions>
    </Card>
  );
}
