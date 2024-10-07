import { Box, Container, Toolbar, Typography } from "@mui/material";
import TrendTopics from "../components/TrendTopics";
import PostCard from "../components/PostCard";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import JoinBanner from "../components/JoinBanner";

const Home = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Container sx={{ color: "#121111" }}>
        <TrendTopics />
        <Toolbar />
        <Container
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "40px",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontSize: "20px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <AutoAwesomeIcon sx={{ fontSize: "35px", color: "#ff2aac" }} />
            Recent Topics
          </Typography>
          <PostCard />
        </Container>
      </Container>
      <Toolbar />
      <JoinBanner />
    </Box>
  );
};

export default Home;
