import { Box, Button } from "@mui/material";
import BgImg from "../assets/signupbg.png";
import { useNavigate } from "react-router-dom";

const AuthImg = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        flexGrow: 1,
        width: "30%",
        display: {
          xs: "none",
          md: "flex",
        },
        flexDirection: "column",
      }}
    >
      <img
        src={BgImg}
        alt="image"
        style={{
          objectFit: "cover",
          height: "100vh",
          position: "relative",
        }}
      />
      <Button
        variant="contained"
        size="large"
        sx={{
          position: "absolute",
          bgcolor: "#000000",
          color: "white",
          top: "6%",
          left: "5%",
        }}
        onClick={() => navigate("/")}
      >
        Go back to home
      </Button>
    </Box>
  );
};

export default AuthImg;
