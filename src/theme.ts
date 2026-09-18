import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypeBackground {
    b1?: string;
    b2?: string;
    b3?: string;
  }
}

const primaryMain = "#646cff";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: primaryMain,
    },
    background: {
      default: "#f9f9f9",
      paper: "#fff",
      b1: "#edeaeaff",
      b2: "#e1dfdd",
      b3: "#cdcdcd",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: primaryMain,
    },
    background: {
      default: "#181818",
      paper: "#232323",
      b1: "#2c2c2c",
      b2: "#383838",
      b3: "#4a4a4a",
    },
  },
});
