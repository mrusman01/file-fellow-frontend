import { Box } from "@mui/material";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Box sx={{ py: 2, bgcolor: "#000" }}>
      <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <Link to="/">
          <img src={logo} alt="" style={{ width: "100px" }} />
        </Link>
      </Box>
    </Box>
  );
};

export default Navbar;
