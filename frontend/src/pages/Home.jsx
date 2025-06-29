import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Skeleton,
  Toolbar,
  Typography,
} from "@mui/material";
import TrendTopics from "../components/TrendTopics";
import PostCard from "../components/PostCard";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import JoinBanner from "../components/JoinBanner";
import useFetch from "../hooks/useFetch";

const Home = () => {
  const { data, loading } = useFetch("/api/v1/post/all-posts", []);

  // if (loading) {
  //   return (
  //     <Box
  //       sx={{
  //         display: "flex",
  //         flex: 1,
  //         justifyContent: "center",
  //         alignItems: "center",
  //         minHeight: "100vh",
  //       }}
  //     >
  //       <Backdrop
  //         open={loading}
  //         sx={{ zIndex: 9999, animation: "fadeIn 0.5s" }}
  //       >
  //         <CircularProgress color="inherit" />
  //       </Backdrop>
  //     </Box>
  //   );
  // }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Container>
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
          {!loading ? (
            <>
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
              <PostCard posts={data.posts} loading={loading} />
            </>
          ) : null}
        </Container>
      </Container>
      {!loading && (
        <>
          <Toolbar />
          <JoinBanner />
        </>
      )}
    </Box>
  );
};

export default Home;
