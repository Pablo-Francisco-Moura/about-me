import { Typography } from "@mui/material";

interface Props {
  isMobile: boolean;
}

export function Copyright({ isMobile }: Props) {
  return (
    <Typography
      sx={{
        color: "#fff",
      }}
      noWrap
      fontSize={10}
    >{`Versão 1.0.5${
      isMobile ? "" : " - Última atualização: 05/11/2025"
    }`}</Typography>
  );
}
