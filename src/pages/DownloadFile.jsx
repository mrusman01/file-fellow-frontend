import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  InputBase,
  Snackbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../assets/darkLogo.png";

import {
  SmallButton,
  StyledButton,
  StyledButtonDark,
} from "../components/CustomComponent";

import QRCode from "qrcode.react";

const Download = () => {
  const fileId = localStorage.getItem("fileId");
  const [open, setOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [error, setError] = useState(null);

  const downloadQRCode = () => {
    const qrCodeURL = document
      .getElementById("qrCodeEl")
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    console.log(qrCodeURL);
    let aEl = document.createElement("a");
    aEl.href = qrCodeURL;
    let png = fileId.toString();
    aEl.download = `${png}.png`;
    document.body.appendChild(aEl);
    aEl.click();
    document.body.removeChild(aEl);
  };

  const copyCode = () => {
    const fileId = localStorage.getItem("fileId");
    const textToCopy = fileId;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setResponseMessage(textToCopy);
        setOpen(true);
        console.log("Text copied to clipboard:", textToCopy);
      })
      .catch((error) => {
        console.error("Error copying text:", error);
        setError("Error copying text:", error);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div style={{ backgroundColor: "#000", height: "100vh" }}>
      {/*header   */}

      <Box
        sx={{ py: { xs: 1.4, md: 2 }, px: { xs: 2, md: 4 }, bgcolor: "#fff" }}
      >
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Box>
            <Link to="/">
              <img src={logo} alt="" style={{ width: "100px" }} />
            </Link>
          </Box>

          <Link to="/recived-file">
            <StyledButtonDark name={"Receive"} />
          </Link>
        </Box>
      </Box>

      {/*
       */}

      <Box
        sx={{
          backgroundColor: "#000",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            height: "700px",
          }}
        >
          <Typography variant="h1" color={"#fff"} my={1}>
            Download File
          </Typography>

          <Box
            sx={{
              height: "200px",
              margin: "2rem",
              backgroundColor: "#fff",
              padding: "1rem",
              borderRadius: "10px",
            }}
          >
            <QRCode
              value={`https://filefellow.com/connect?code=${fileId}`}
              renderAs="canvas"
              id="qrCodeEl"
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </Box>

          <StyledButton onClick={downloadQRCode} name={"Downlaod QR "} />

          <Typography variant="h4" color={"#fff"} mt={3} mb={2}>
            Your Passcode
          </Typography>

          <Box
            sx={{
              borderRadius: "10px",
              border: "1px solid #000",
              background: "#2C2C2C",
              p: 2,
              display: "flex",
              alignItems: "center",
              flexDirection: { md: "row", xs: "column" },
              gap: { xs: "10px", md: "105px" },
            }}
          >
            <InputBase
              sx={{
                width: "100%",
                color: "#989898",
                fontFamily: "Jost",
                fontSize: "16px",
                fontWeight: 500,
                "& input": {
                  textAlign: { xs: "center", md: "left" },
                },
              }}
              value={fileId}
              placeholder="Your Passcode"
            />
            <SmallButton onClick={copyCode} name={"copy"} />
          </Box>

          <Link to="/send">
            <Button
              sx={{
                width: { xs: "90px", md: "100px" },
                height: { xs: "40px", md: "45.21px" },
                borderRadius: "9px",
                border: "1px solid #fff",
                color: "#fff",
                fontWeight: 500,
                fontSize: "14px",
                mt: 4,
              }}
            >
              Go Back
            </Button>
          </Link>
        </Box>
      </Box>

      <Snackbar
        open={open}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handleClose}
      >
        {error ? (
          <Alert onClose={handleClose} severity="error" sx={{ width: "auto" }}>
            {responseMessage}
          </Alert>
        ) : (
          <Alert
            onClose={handleClose}
            sx={{
              width: "auto",
              backgroundColor: "#000",
              color: "#fff",

              ".MuiAlert-icon ": {
                color: "#fff",
              },
            }}
          >
            {responseMessage}
          </Alert>
        )}
      </Snackbar>
    </div>
  );
};

export default Download;
