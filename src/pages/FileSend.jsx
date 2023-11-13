import { useState } from "react";
import {
  Box,
  Button,
  Container,
  IconButton,
  Input,
  InputLabel,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

import { Link, useNavigate } from "react-router-dom";
import JSZip from "jszip";

import logo from "../assets/logo.png";
import upload from "../assets/upload.png";

import axios from "axios";
import Delete from "../assets/Delete.svg";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 18,
  borderRadius: 8,
  [theme.breakpoints.down("md")]: {
    height: 10,
  },
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#E3E3E3",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#000" : "red",
  },
}));

const FileSend = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    const newFiles = Array.from(e.dataTransfer.files);
    setFiles([...files, ...newFiles]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
  };

  const handleRemoveFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const config = {
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      let percent = Math.round((loaded * 100) / total);
      // console.log(`${loaded}kb of ${total}kb | ${percent}%`);
      setUploadProgress(percent);
    },
  };

  // http://localhost:5173/connect?code=3454334543

  const uploadHandler = async () => {
    try {
      const zip = new JSZip();
      for (const file of files) {
        zip.file(file.name, file);
      }

      if (Object.keys(zip.files).length === 0) {
        console.log("No files to zip.");
      } else {
        const zipFiles = await zip.generateAsync({ type: "blob" });
        console.log(zipFiles, "zipFiles");
        const data = new FormData();

        setShowProgress(true);
        data.append("file", zipFiles);
        const response = await axios.post(
          "https://api.filefellow.com/api/v1/sotrage/store",
          data,
          {
            headers: {
              authorization:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiY2xpZW50IiwiaWF0IjoxNjk3MTE3MjM5fQ.gzzKoft3oOz4uqJxdDJDuBNBCsgUadK8rLr47Z54Z8o",
            },
            onUploadProgress: config.onUploadProgress,
          }
        );
        console.log("File uploaded successfully:", response);
        const { fileId } = response.data.data;
        await localStorage.setItem("fileId", fileId);
        if (response.data.success) {
          // setTimeout(() => {
          navigate("/downlaod-file");
          // }, 2000);
        }
      }
    } catch (error) {
      console.error("File upload failed:", error);
    }
  };
  return (
    <div>
      <Box
        sx={{ py: { xs: 1.4, md: 2 }, px: { xs: 2, md: 4 }, bgcolor: "#000" }}
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
            <Button
              sx={{
                borderRadius: "9.414px",
                background: "#fff",
                width: { xs: "100px", md: "148px" },
                height: { xs: "45px", md: "50px" },
                color: "#000",
                "&:hover": {
                  background: "#9C9C9C",
                },
              }}
            >
              Receive
            </Button>
          </Link>
        </Box>
      </Box>

      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          height: "95vh",
        }}
      >
        <Typography variant="h2" mt={-3}>
          Upload File
        </Typography>

        <Box width="80%" pb={2}>
          <Box
            sx={{
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
              onDragLeave={handleDragLeave}
            >
              <InputLabel htmlFor="file-input">
                <IconButton
                  aria-label="upload picture"
                  component="span"
                  sx={{
                    ":hover": {
                      background: "none",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexDirection: "column",
                    }}
                  >
                    <img src={upload} alt="" style={{ width: "80px" }} />
                    <Typography variant="h4" mt={2}>
                      Drag your file and folder
                    </Typography>
                  </Box>
                </IconButton>
              </InputLabel>
              <Input
                id="file-input"
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setFiles([...files, ...e.target.files])}
                style={{ display: "none" }}
              />
            </Box>
          </Box>

          {showProgress && (
            <>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                my={{ xs: 2, md: 3 }}
              >
                <Typography variant="text1">Uploading process</Typography>
                <Typography variant="text1">
                  {uploadProgress.toFixed(1)}%
                </Typography>
              </Stack>

              <BorderLinearProgress
                variant="determinate"
                value={uploadProgress}
              />
            </>
          )}

          <Typography
            sx={{
              color: "#676767",
              textAlign: "center",
              fontFamily: "Mulish",
              fontSize: { xs: "15px", md: "20px" },
              fontWeight: 700,
              mt: { xs: 2, md: 4 },
              mb: { xs: 1, md: 2 },
            }}
          >
            Uploaded Files
          </Typography>

          {!showProgress && (
            <Stack direction={"row"} flexDirection={"column"}>
              {files.map((file, index) => (
                <Box
                  key={index}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  width={"100%"}
                  border={"1px solid #11AF22"}
                  borderRadius={"5px"}
                  p={1}
                  my={1}
                  overflow="auto"
                >
                  <Typography
                    sx={{
                      color: "#0F0F0F",
                      fontFamily: "Mulish",
                      fontSize: { xs: "11px", md: "17px" },
                    }}
                  >
                    {file.name}
                  </Typography>

                  <Box
                    sx={{
                      ":hover": {
                        cursor: "pointer",
                      },
                    }}
                    onClick={handleRemoveFile}
                  >
                    <img src={Delete} alt="" />
                  </Box>
                </Box>
              ))}
            </Stack>
          )}

          <Stack alignItems={"center"} justifyContent={"center"}>
            <Button
              onClick={(e) => uploadHandler(e)}
              sx={{
                width: { xs: "115px", md: "128.663px" },
                height: { xs: "40px", md: "50.21px" },
                borderRadius: "9.414px",
                background: "#000",
                mt: 3,
                color: "#FFF",
                "&:hover": {
                  background: "#9C9C9C",
                },
              }}
            >
              Upload
            </Button>
          </Stack>
        </Box>
      </Container>
    </div>
  );
};

export default FileSend;
