/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const ThemeProvider = ({ children }) => {
  const { theme } = useSelector((state) => state.theme);

  const muiTheme = createTheme({
    //#10172a 1A2027 121111 1E1E1E 121212 181818
    palette: {
      mode: theme,
      background: {
        default: theme === "light" ? "#faf8ff" : "#121212",
        paper: theme === "light" ? "#FFFFFF" : "#121111",
        banner: theme === "light" ? "#FFFFFF" : "#181818",
      },
      text: {
        primary: theme === "light" ? "#121111" : "#FFFFFF",
        secondary: theme === "light" ? "#f2f1ff" : "#121111",
        label: theme === "light" ? "#121111" : "#6a4ee9",
        subtitle: theme === "light" ? "#535051" : "#faf8ffcd",
        link: theme === "light" ? "#302d55" : "#faf8ffcd",
      },
    },
  });

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline enableColorScheme />
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
