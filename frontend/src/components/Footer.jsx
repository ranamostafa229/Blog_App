import { Box, Container, Divider, Typography } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import XIcon from "@mui/icons-material/X";
import FacebookSharpIcon from "@mui/icons-material/FacebookSharp";
import GitHubIcon from "@mui/icons-material/GitHub";
const Footer = () => {
  const date = new Date();
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        // bgcolor: "#faf8ff",
        // color: "#282424",
        padding: "20px",
        pt: "80px",
        gap: "60px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          gap: {
            lg: "120px",
            xs: "20px",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            flexGrow: 1,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontWeight: "bold",
            }}
          >
            <AutoAwesomeIcon sx={{ fontSize: "25px", color: "#ff2aac" }} />
            Follow me!
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              ml: "45px",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                ":hover": { color: "#6a4ee9" },
              }}
            >
              Follow me on Twitter
              <XIcon sx={{ fontSize: "20px" }} />
            </Typography>
            <Divider />
            <Typography
              variant="subtitle1"
              sx={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                ":hover": { color: "#6a4ee9" },
              }}
            >
              Follow me on Facebook
              <FacebookSharpIcon sx={{ fontSize: "20px", color: "#175beb" }} />
            </Typography>
            <Divider />
            <Typography
              variant="subtitle1"
              sx={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                ":hover": { color: "#6a4ee9" },
              }}
            >
              Contribute on Github
              <GitHubIcon sx={{ fontSize: "20px" }} />
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            flexGrow: 1,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontWeight: "bold",
            }}
          >
            <AutoAwesomeIcon sx={{ fontSize: "25px", color: "#ff2aac" }} />
            Quick Links
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              ml: "45px",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ cursor: "pointer", ":hover": { color: "#6a4ee9" } }}
            >
              Home
            </Typography>
            <Divider />
            <Typography
              variant="subtitle1"
              sx={{ cursor: "pointer", ":hover": { color: "#6a4ee9" } }}
            >
              Categories
            </Typography>
            <Divider />
            <Typography
              variant="subtitle1"
              sx={{ cursor: "pointer", ":hover": { color: "#6a4ee9" } }}
            >
              Profile
            </Typography>
          </Box>
        </Box>
      </Box>
      <Typography
        variant="subtitle1"
        sx={{
          display: "flex",
          padding: "20px",
          justifyContent: "center",
        }}
      >
        <span>
          Copyright © {date.getFullYear()} by
          <strong> Rana Mostafa</strong>
        </span>
      </Typography>
    </Container>
  );
};

export default Footer;
