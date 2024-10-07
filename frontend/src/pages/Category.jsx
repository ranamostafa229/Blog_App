import { Box, Container, Divider, Typography } from "@mui/material";
import CssIcon from "../assets/css-icon.png";
import PostCard from "../components/PostCard";
import JoinBanner from "../components/JoinBanner";

const Category = () => {
  const shapeCircleStyles = {
    width: 65,
    height: 65,
    borderRadius: "50%",
    boxshadow: "0 0 2px 2px rgba(0, 0, 0, 0.15)",
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        // textAlign: "center",
        color: "#121111",
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          width: {
            xs: "100%",
            lg: "60%",
          },
          gap: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "15px",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              ...shapeCircleStyles,
              bgcolor: "#227dff",
              borderRadius: "50%",
              cursor: "pointer",
            }}
          >
            <img
              src={CssIcon}
              alt="Trending"
              style={{
                width: "65px",
                height: "65px",
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              fontWeight: "bold",
              //   justifyContent: "end",
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", color: "#282424" }}
            >
              CSS
              <Typography variant="subtitle1">
                A collection of <b style={{ color: "#373333" }}>3 posts</b>
              </Typography>
            </Typography>
          </Box>
        </Box>
        <Divider orientation="vertical" flexItem />

        <Box
          sx={{
            color: "#4e4a4b",
            textAlign: "center",
          }}
        >
          <Typography variant="body1" sx={{ lineHeight: "30px" }}>
            CSS is a vital web development language for styling HTML elements.
            It ensures consistent, visually appealing designs through selectors,
            flexbox, and transitions, creating responsive and dynamic web
            interfaces.
          </Typography>
        </Box>
      </Container>
      <Box sx={{ height: "100px" }} />
      <Container>
        <PostCard cmd={6} csize={2} />
      </Container>
      <Box sx={{ height: "100px" }} />
      <JoinBanner />
    </Box>
  );
};

export default Category;
