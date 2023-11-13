import { useState } from "react";
import {
  Box,
  Button,
  Container,
  IconButton,
  Input,
  InputBase,
  InputLabel,
  LinearProgress,
  Stack,
  Typography,
  linearProgressClasses,
  styled,
} from "@mui/material";
import { Link } from "react-router-dom";

import darkLogo from "../assets/darkLogo.png";
import darkUpload from "../assets/darkUpload.png";
import { SmallButton, StyledButton } from "../components/CustomComponent";
import JSZip from "jszip";
import { Decoder } from "@nuintun/qrcode";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 23,
  borderRadius: 8,
  [theme.breakpoints.down("md")]: {
    height: 10,
  },
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#9C9C9C",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#fff" : "red",
  },
}));

const ReciedFiles = () => {
  const [files, setFiles] = useState([]);
  const [passCode, setPassCode] = useState("");
  const [dataUrl, setDataUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);

  const qrcode = new Decoder();

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(droppedFiles);
  };
  // console.log(files.length, "----");

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    console.log(URL.createObjectURL(selectedFiles[0]));
    setDataUrl(URL.createObjectURL(selectedFiles[0]));
    setFiles(selectedFiles);
  };

  const handleQrCode = () => {
    try {
      qrcode
        .scan(dataUrl)
        .then((result) => {
          // console.log(result.data, "------");

          let decodedData = new URL(result.data).searchParams.get("code");
          localStorage.setItem("fileId", decodedData);
          setPassCode(decodedData);
          handlePassCode(decodedData);

          console.log(decodedData);
          // setOpen(false);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handlePassCode = async (code) => {
    // setOpen(true);
    try {
      setShowProgress(true);
      const headers = new Headers();
      headers.append(
        "authorization",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiY2xpZW50IiwiaWF0IjoxNjk3MTE3MjM5fQ.gzzKoft3oOz4uqJxdDJDuBNBCsgUadK8rLr47Z54Z8o"
      );

      let response = await fetch(
        `https://api.filefellow.com/uploads/${code}.zip`,
        {
          method: "GET",
          headers: headers,
        }
      );

      if (!response?.body) return;

      const contentLength = response.headers.get("Content-Length");
      const totalLength =
        typeof contentLength === "string" && parseInt(contentLength);

      const reader = response.body.getReader();
      const chunks = [];
      let recivedLength = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          // console.log("done");
          break;
        }

        chunks.push(value);

        recivedLength = recivedLength + value.length;

        if (typeof totalLength === "number") {
          // console.log("recived length", recivedLength);

          const step = (recivedLength / totalLength) * 100;
          // console.log(step, "step$$$$");
          setUploadProgress(step);
        }
      }

      const blobs = new Blob(chunks);
      JSZip.loadAsync(blobs).then((zip) => {
        zip.forEach((relativePath, zipEntry) => {
          zipEntry.async("blob").then((blob) => {
            const a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            const url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = zipEntry.name;
            a.click();
            window.URL.revokeObjectURL(url);
          });
        });
      });
      localStorage.removeItem("fileId");
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileAll = () => {
    if (files.length > 0) {
      handleQrCode();
      // console.log("-----qr dowload");
    } else {
      // handlePassCode();
      handlePassCode(passCode);

      // console.log("-----pass");
    }
  };

  const pasteCode = () => {
    navigator.clipboard.readText().then((pastedData) => {
      setPassCode(pastedData);
    });
  };

  return (
    <div style={{ backgroundColor: "#000", height: "100vh" }}>
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
              <img src={darkLogo} alt="" style={{ width: "100px" }} />
            </Link>
          </Box>
          <Link to="/send">
            <Button
              sx={{
                borderRadius: "9.414px",
                background: "#000",
                width: { xs: "100px", md: "148px" },
                height: { xs: "45px", md: "50px" },
                color: "#ffff",
                "&:hover": {
                  background: "#9C9C9C",
                },
              }}
            >
              Send
            </Button>
          </Link>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: "#000",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          py: 5,
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h2" color={"#fff"} mt={5}>
            Upload Qr File
          </Typography>

          <Box
            sx={{
              width: "80%",
              mt: 7,
              padding: 3,
              backgroundImage:
                "url(\"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='5' ry='5' stroke='%238A8989FF' stroke-width='3' stroke-dasharray='2%2c7' stroke-dashoffset='10' stroke-linecap='square'/%3e%3c/svg%3e\")",
              borderRadius: "5px",
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <InputLabel htmlFor="file-input">
                <IconButton aria-label="upload picture" component="span">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexDirection: "column",
                    }}
                  >
                    <img src={darkUpload} alt="" style={{ width: "80px" }} />
                    <Typography variant="h4" color={"#9C9C9C"} mt={2}>
                      Drag your QR Code
                    </Typography>
                  </Box>
                </IconButton>
              </InputLabel>
              <Input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </Box>
          </Box>
          <ul>
            {files.map((file, index) => (
              <Typography key={index} color={"#fff"}>
                {index + 1} - {file.name}
              </Typography>
            ))}
          </ul>
          {showProgress && (
            <Box width={"80%"}>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                my={{ xs: 2, md: 3 }}
              >
                <Typography variant="text1" color="#fff">
                  Uploading process
                </Typography>
                <Typography variant="text1" color="#fff">
                  {uploadProgress.toFixed(1)}%
                </Typography>
              </Stack>
              <BorderLinearProgress
                variant="determinate"
                value={uploadProgress}
              />
            </Box>
          )}

          {files.length > 0 && (
            <Typography variant="h5" color={" #626262"} my={1}>
              or
            </Typography>
          )}

          <Typography variant="h4" color={"#fff"} my={2}>
            Enter Passcode
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
              placeholder="Enter your Passcode"
              value={passCode}
              onChange={(e) => setPassCode(e.target.value)}
            />
            <SmallButton name={"Paste"} onClick={pasteCode} />
          </Box>
          <StyledButton
            name={"Download File"}
            // onClick={() => handlePassCode(passCode)}
            onClick={handleFileAll}
          />
          {/* <Button variant="contained" onClick={handleFileAll}>
          File download
        </Button> */}
          <Link to="/">
            <Button
              sx={{
                width: "128.663px",
                height: "50.21px",
                borderRadius: "9.414px",
                border: "1px solid #fff",
                mt: 3,
                color: "#fff",
                fontWeight: 500,
              }}
            >
              Go Back
            </Button>
          </Link>
        </Container>
      </Box>
    </div>
  );
};

export default ReciedFiles;
