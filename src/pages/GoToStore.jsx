import { useEffect } from "react";
import { Box, Button, Typography, styled } from "@mui/material";
import { Apple, Adb } from "@mui/icons-material";

const StyledBtn = styled(Button)({
  width: "230px",
  height: "51px",
  borderRadius: "9.414px",
  background: "#ffff",
  color: "#000",
  fontWeight: 500,
  marginTop: "20px",
  padding: "5px 10px",
  "&:hover": {
    background: "#9C9C9C",
  },
});

const GoToStore = () => {
  // const fileId = localStorage.getItem("fileId");

  function getBrowserType() {
    const test = (regexp) => {
      return regexp.test(navigator.userAgent);
    };

    console.log(navigator.userAgent);

    if (test(/opr\//i) || !!window.opr) {
      return "Opera";
    } else if (test(/edg/i)) {
      return "Microsoft Edge";
    } else if (test(/chrome|chromium|crios/i)) {
      return "Google Chrome";
    } else if (test(/firefox|fxios/i)) {
      return "Mozilla Firefox";
    } else if (test(/safari/i)) {
      return "Apple Safari";
    } else if (test(/trident/i)) {
      return "Microsoft Internet Explorer";
    } else if (test(/ucbrowser/i)) {
      return "UC Browser";
    } else if (test(/samsungbrowser/i)) {
      return "Samsung Browser";
    } else {
      return "Unknown browser";
    }
  }

  const browserType = getBrowserType();

  const downloadFile = () => {
    try {
      const a = document.createElement("a");
      a.href =
        browserType === "Apple Safari"
          ? `https://apps.apple.com/us/app/file-fellow-file-transfer-app/id6469783067`
          : `https://play.google.com/store/apps/details?id=flitchlabs.filefellow.android&pcampaignid=web_share`;

      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const iosStore = () => {
    try {
      try {
        const a = document.createElement("a");
        a.href =
          "https://apps.apple.com/us/app/file-fellow-file-transfer-app/id6469783067";

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } catch (error) {
        console.log(error);
        alert(error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const playStore = () => {
    try {
      try {
        const a = document.createElement("a");
        a.href =
          "https://play.google.com/store/apps/details?id=flitchlabs.filefellow.android&pcampaignid=web_share";

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } catch (error) {
        console.log(error);
        // alert(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    downloadFile();
  }, []);

  return (
    <div style={{ backgroundColor: "#000", height: "100vh" }}>
      <Box
        sx={{
          height: "100%",
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
            Go to Store
          </Typography>

          <StyledBtn
            onClick={iosStore}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            Go To AppStore <Apple sx={{ mb: "5px" }} />
          </StyledBtn>
          <StyledBtn
            onClick={playStore}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            Go To PlayStore <Adb sx={{ mb: "5px" }} />
          </StyledBtn>
        </Box>
      </Box>
    </div>
  );
};

export default GoToStore;
