import { createTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import backgroundDot from "../assets/background_dot2x.png";

export const THEME = {
  primary: "#ff97cf",
  secondary: "#22d3ee",
  thirdary: "#5B58AD",
  bkg: "#f5f5f5",
  modalTitle: "#455EFF",
  submit: "#065f46",
  title: "#888888",
  text: "#A6A6A6",
  subtext: "#9a3412",
  done: "#15803d",
  gray: "#D9D9D9",
  error: "#f13a59",
  placeholder: "#AAA9C0",
};

const theme = createTheme({
  palette: {
    primary: { main: THEME.primary },
    secondary: { main: THEME.secondary },
    error: { main: THEME.error },
    background: {
      default: THEME.bkg,
      paper: THEME.gray,
    },
    text: {
      primary: THEME.text,
      secondary: THEME.subtext,
    },
    success: { main: THEME.done },
    info: { main: THEME.modalTitle },
  },
  typography: {
    fontFamily: "Neon, Arial, sans-serif",
    h1: {
      fontSize: "3rem",
      fontWeight: 900,
      color: THEME.thirdary,
      textShadow: "2px 2px 4px rgba(0,0,0,0.4)",
      textAlign: "center",
    },
    h6: {
      fontWeight: 900,
      color: THEME.thirdary,
    },
    body1: {
      color: THEME.text,
    },
    body2: {
      color: THEME.subtext,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        containedPrimary: {
          backgroundColor: THEME.primary,
          "&:hover": {
            backgroundColor: THEME.submit,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: THEME.primary,
          backgroundImage: `url(${backgroundDot})`,
          backgroundSize: "2vh",
          backgroundRepeat: "repeat",
        },
      },
    },
  },
});

export const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    padding: 24,
    minHeight: "100vh",
  },
  content: {
    marginTop: "64px",
    padding: "16px",
  },
  header: {
    flexGrow: 1,
  },
  gridContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  gridItem: {
    padding: 8,
  },
  savedItemTitle: {
    justifyContent: "center",
    color: THEME.subtext,
  },
  card: {
    padding: 16,
    marginBottom: 16,
    maxWidth: 600,
  },
  filterContainer: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  image: {
    height: 100,
    width: "100%",
    paddingRight: 16,
  },
  appBar: {
    width: "100%",
    padding: 10,
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: THEME.primary,
    backgroundImage: `url(${backgroundDot})`,
    backgroundSize: "2vh",
    backgroundRepeat: "repeat",
    zIndex: 1100,
  },
  toolBar: {
    color: THEME.thirdary,
    justifyContent: "space-between",
  },
  title: {
    fontWeight: 900,
    color: THEME.thirdary,
  },
  hackaStyle: {
    fontFamily: "Neon, sans-serif",
    fontSize: "44px",
    textShadow: "2px 2px 4px rgba(0,0,0,0.4)",
    textAlign: "center",
    flexGrow: 1,
    textEffect: "neon",
    color: THEME.thirdary,
  },
  menuButton: {
    color: THEME.thirdary,
  },
  drawerPaper: {
    width: 200,
    backgroundColor: THEME.primary,
    color: THEME.thirdary,
  },
  listItem: {
    color: THEME.thirdary,
  },
  listItemText: {
    color: THEME.thirdary,
  },
});

export default theme;
