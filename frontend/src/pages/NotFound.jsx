import { Box, Button, SvgIcon, Typography } from "@mui/material";
import ErrorImg from "../assets/error-404.svg";
import { useNavigate } from "react-router-dom";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        height: "100vh",
        color: "#121111",
      }}
    >
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
          src={ErrorImg}
          alt="404"
          style={{
            backgroundColor: "#6a4ee9",
            objectFit: "contain",
            height: "100vh",
          }}
        />
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "30px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <SvgIcon
            sx={{ fontSize: "40px", color: "#ff2aac" }}
            viewBox="0 0 35 35"
          >
            <path
              fill="currentColor"
              d="M14.666 13.25a2.093 2.093 0 0 0 2.912-.534l5.239-7.587a2.187 2.187 0 0 1 3.038-.557l3.994 2.757c.48.332.803.83.909 1.404a2.17 2.17 0 0 1-.352 1.635l-5.238 7.588a2.093 2.093 0 1 0 3.446 2.378l5.238-7.587a6.33 6.33 0 0 0 1.024-4.768 6.33 6.33 0 0 0-2.648-4.096l-3.994-2.757a6.379 6.379 0 0 0-8.863 1.624l-5.238 7.588a2.093 2.093 0 0 0 .533 2.912ZM17.956 25.168l-7.588 5.239c-.48.331-1.06.456-1.635.35a2.17 2.17 0 0 1-1.404-.907l-2.757-3.994a2.187 2.187 0 0 1 .557-3.04l7.587-5.238a2.093 2.093 0 1 0-2.378-3.445L2.75 19.37a6.38 6.38 0 0 0-1.624 8.864l2.757 3.994a6.33 6.33 0 0 0 4.096 2.647 6.327 6.327 0 0 0 4.768-1.024l7.588-5.238a2.093 2.093 0 1 0-2.379-3.446Z"
            ></path>
            <path
              fill="currentColor"
              d="M24.376 11.6a2.094 2.094 0 0 0-2.93.42l-4.04 5.386-5.387 4.04a2.094 2.094 0 0 0 2.512 3.35l5.626-4.22c.159-.12.3-.26.419-.419l4.22-5.625a2.094 2.094 0 0 0-.42-2.931ZM23.81 26.825l-.5 6.494a1.56 1.56 0 1 0 2.998-.479l-2.498-6.015ZM34.994 24.747a1.56 1.56 0 0 0-1.676-1.436l-6.494.5 6.015 2.497a1.561 1.561 0 0 0 2.155-1.561Z"
            ></path>
          </SvgIcon>
          <Typography variant="h3" sx={{ fontWeight: "bold" }}>
            Page not found
          </Typography>
        </Box>
        <Typography
          variant="body1"
          sx={{
            fontSize: "25px",
            width: {
              xs: "95%",
              md: "45%",
            },
            textAlign: "center",
          }}
        >
          Unfortunately the page you are looking for is not available.
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{ bgcolor: "#6a4ee9", ":hover": { bgcolor: "#000000" } }}
          onClick={() => navigate("/")}
        >
          Go back to home
        </Button>
      </Box>
    </Box>
  );
};

export default NotFound;
