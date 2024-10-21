import { Box, Container, Divider, Typography } from "@mui/material";
import PostCard from "../components/PostCard";
import JoinBanner from "../components/JoinBanner";
import useFetch from "../hooks/useFetch";
import { useLocation, useParams } from "react-router-dom";

const Category = () => {
  const { category } = useParams();
  const { data: posts } = useFetch(`/api/v1/post/categories/${category}`);
  const location = useLocation();
  const { categoryImg, categoryBg } = location.state || {};
  console.log(categoryImg, categoryBg);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
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
              bgcolor: `${categoryBg}`,
              borderRadius: "50%",
              cursor: "pointer",
            }}
          >
            <img
              src={categoryImg}
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
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold" }}
              component={"div"}
            >
              {category}
              <Typography variant="subtitle1">
                A collection of{" "}
                <b style={{ color: "#373333" }}>{posts?.length} posts</b>
              </Typography>
            </Typography>
          </Box>
        </Box>
        <Divider orientation="vertical" flexItem />

        {/* <Box
          sx={(theme) => ({
            // color: "#4e4a4b",
            color: theme.palette.text.subtitle,
            textAlign: "center",
          })}
        >
          <Typography variant="body1" sx={{ lineHeight: "30px" }}>
            {posts?.map((post) => post.categoryBrief)}
          </Typography>
        </Box> */}
      </Container>
      <Box sx={{ height: "100px" }} />
      <Container>
        <PostCard cmd={6} csize={2} posts={posts} />
      </Container>
      <Box sx={{ height: "100px" }} />
      <JoinBanner />
    </Box>
  );
};

export default Category;

const shapeCircleStyles = {
  width: 65,
  height: 65,
  borderRadius: "50%",
  boxshadow: "0 0 2px 2px rgba(0, 0, 0, 0.15)",
};
