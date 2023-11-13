import { Button } from "@mui/material";

export const StyledButton = ({ name, onClick }) => {
  return (
    <Button
      sx={{
        width: "148.663px",
        height: "50.21px",
        borderRadius: "9.414px",
        background: "#ffff",
        mt: 3,
        color: "#000",
        fontWeight: 500,

        "&:hover": {
          background: "#9C9C9C",
        },
      }}
      onClick={onClick}
    >
      {name}
    </Button>
  );
};

export const StyledButtonWhite = ({ name, onClick }) => {
  return (
    <Button
      sx={{
        borderRadius: "9.414px",
        background: "#FFF",
        width: { xs: "110px", md: "188px" },
        height: { xs: "45px", md: "50px" },
        color: "#000",
        fontWeight: 500,

        "&:hover": {
          background: "#9C9C9C",
          color: "#FFF",
        },
      }}
      onClick={onClick}
    >
      {name}
    </Button>
  );
};
export const StyledButtonDark = ({ name, onClick }) => {
  return (
    <Button
      sx={{
        borderRadius: "9.414px",
        background: "#000",
        width: { xs: "100px", md: "148px" },
        height: { xs: "45px", md: "50px" },
        color: "#fff",
        fontWeight: 500,

        "&:hover": {
          background: "#9C9C9C",
          color: "#FFF",
        },
      }}
      onClick={onClick}
    >
      {name}
    </Button>
  );
};

export const SmallButton = ({ name, onClick }) => {
  return (
    <Button
      sx={{
        width: "79px",
        height: "32px",
        borderRadius: "7px",
        background: "#ffff",
        color: "#000",
        textTransform: "none",
        fontWeight: 500,
        "&:hover": {
          background: "#9C9C9C",
        },
      }}
      onClick={onClick}
    >
      {name}
    </Button>
  );
};
