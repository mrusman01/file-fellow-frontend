import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme1 = createTheme({
  palette: {
    background: {
      default: "#1E1E1E",
      color: "#fff",
    },
    text: {
      primary: "#fff",
      secondary: "rgba(255, 255, 255, 0.60)",
    },
    primary: {
      main: "#58C5DA",
    },
  },
  typography: {
    fontFamily: ["Jost"].join(","),
    h1: {
      fontFamily: "Jost",
      fontSize: "4.063rem", // Fix the font size value
      fontWeight: "500",
    },
    h2: {
      fontFamily: "Jost",
      fontSize: "42px",
      fontWeight: "500",
      color: "#000",
      textAlign: "center",
    },
    h3: {
      fontFamily: "Jost",
      fontSize: "28px",
      fontWeight: "500",
      color: "#9C9C9C",
      textAlign: "center",
    },
    h4: {
      fontFamily: "Jost",
      fontSize: "23px",
      fontWeight: "500",
      color: "#9C9C9C",
      textAlign: "center",
    },
    h5: {
      fontFamily: "Jost",
      fontSize: "20px",
      fontWeight: "500",
      textAlign: "center",
    },
    text1: {
      color: "#000",
      fontFamily: "Mulish",
      fontSize: "14px",
      fontWeight: 700,
    },
    body: {
      fontFamily: "Jost",
      fontSize: "16px",
    },
  },
  components: {
    // Change MuiButton to components
    MuiButton: {
      variants: [
        {
          props: { variant: "btn1" },
          style: {
            width: "8.041rem",
            height: "3.138rem",
            borderRadius: "9.414px",
            background: "#ffff",
            color: "#000",
            fontWeight: 500,

            "&:hover": {
              background: "#9C9C9C",
            },
          },
        },
      ],
    },
  },
});

theme1.overrides = {
  MuiCssBaseline: {
    "@global": {
      body: {
        fontFamily: "Jost, sans-serif",
        backgroundColor: "#080A0B",
        color: "#fff",
      },
      ".img-fluid": {
        maxWidth: "100%",
        height: "auto",
      },
    },
  },
};

const theme = responsiveFontSizes(theme1);

theme.typography.h1 = {
  fontFamily: "Jost",
  fontSize: "2.7rem",
  fontWeight: "500",
};

export default theme;
