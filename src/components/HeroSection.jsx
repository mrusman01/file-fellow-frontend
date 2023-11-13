import { Box, Grid, Hidden, Stack, Typography } from "@mui/material";
import { CallMade, CallReceived } from "@mui/icons-material";
import { Apple, Adb } from "@mui/icons-material";

import { Link } from "react-router-dom";
import QRCode from "qrcode.react";

const HeroSection = () => {
  return (
    <Stack
      sx={{
        height: "100%",
      }}
    >
      <Grid container sx={{ height: { xs: "50vh", md: "100vh" } }}>
        <Grid item xs={12} md={6} sx={{ height: "100%" }}>
          <Link to="/send" style={{ textDecoration: "none", color: "#000" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
                height: "85%",
              }}
            >
              <CallMade sx={{ fontSize: { xs: "5rem", md: "8rem" } }} />
              <Typography variant="h1">Send</Typography>
            </Box>
          </Link>
        </Grid>

        <Grid item xs={12} md={6} bgcolor={"#000"} sx={{ height: "100%" }}>
          <Link to="/recived-file" style={{ textDecoration: "none" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
                height: "85%",
              }}
            >
              <CallReceived
                sx={{ fontSize: { xs: "5rem", md: "8rem" }, color: "#fff" }}
              />
              <Typography variant="h1" color={"#fff"}>
                RECEIVE
              </Typography>
            </Box>
          </Link>
        </Grid>
      </Grid>
      <Hidden mdDown>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              border: "7px solid #fff",
              marginTop: "-345px",
              borderRadius: "10px",
            }}
          >
            <Box sx={{ backgroundColor: "#000", borderRadius: "5px", p: 0.5 }}>
              <Box
                sx={{
                  borderRadius: "15px",
                  height: "110px",
                  width: "110px",
                }}
              >
                <QRCode
                  value={"https://filefellow.com/GoToStore"}
                  includeMargin
                  fgColor="#fff"
                  bgColor="#000"
                  style={{
                    height: "100%",
                    width: "100%",
                  }}
                />
              </Box>
              <Stack
                direction={"row"}
                justifyContent={"center"}
                bgcolor={"#000"}
                pb={1}
                gap={3}
              >
                <Apple sx={{ color: "#fff" }} />
                <Adb sx={{ color: "#fff" }} />
              </Stack>
            </Box>
          </Box>
        </Box>
      </Hidden>
    </Stack>
  );
};

export default HeroSection;
