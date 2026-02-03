import { Typography } from "@mui/material";

interface Props {
  isMobile: boolean;
}

export function Copyright({ isMobile }: Props) {
  return (
    <div
      style={{
        gap: "12px",
        flex: 1,
        bottom: "0px",
        display: "flex",
        position: "fixed",
        minWidth: "calc(100% - 40px)",
        justifyContent: "space-between",
      }}
    >
      <Typography noWrap fontSize={10}>
        {`Desenvolvido por Pablo ${
          isMobile ? "Moura" : "Francisco Moura"
        } - 2025`}
      </Typography>

      <Typography noWrap fontSize={10}>{`Versão 1.0.5${
        isMobile ? "" : " - Última atualização: 05/11/2025"
      }`}</Typography>
    </div>
  );
}
