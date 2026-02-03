import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypeBackground {
    b1?: string;
    b2?: string;
  }
}

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#646cff",
    },
    background: {
      default: "#f9f9f9",
      paper: "#fff",
      b1: "#edeaeaff",
      b2: "#e1dfdd",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#646cff",
    },
    background: {
      default: "#181818",
      paper: "#232323",
      b1: "#2c2c2c",
      b2: "#383838",
    },
  },
});
