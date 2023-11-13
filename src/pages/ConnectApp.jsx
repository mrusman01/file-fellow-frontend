import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { StyledButtonWhite } from "../components/CustomComponent";
import JSZip from "jszip";

const ConnectApp = () => {
  const url = new URL(window.location.href);
  const fileId = url.searchParams.get("code");

  const handleDownloadButton = async () => {
    try {
      const headers = new Headers();
      headers.append(
        "authorization",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiY2xpZW50IiwiaWF0IjoxNjk3MTE3MjM5fQ.gzzKoft3oOz4uqJxdDJDuBNBCsgUadK8rLr47Z54Z8o"
      );

      let response = await fetch(
        `https://api.filefellow.com/uploads/${fileId}.zip`,
        {
          method: "GET",
          headers: headers,
        }
      );
      let getBlob = await response.blob();
      JSZip.loadAsync(getBlob).then((zip) => {
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

  const downloadFile = () => {
    try {
      const a = document.createElement("a");
      a.href = `myfile://file/${fileId}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  useEffect(() => {
    downloadFile();
  }, []);

  return (
    <div style={{ backgroundColor: "#000", height: "100%" }}>
      <Box
        sx={{
          height: "705px",
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
            height: "100%",
          }}
        >
          <Typography variant="h1" color={"#fff"} mb={3}>
            Download File
          </Typography>

          <StyledButtonWhite name={"Downlaod"} onClick={handleDownloadButton} />
        </Box>
      </Box>
    </div>
  );
};

export default ConnectApp;
