import { Box, Container, Divider, Typography } from "@mui/material";
import PostCard from "../components/PostCard";
import JoinBanner from "../components/JoinBanner";
import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";
import { icons } from "../utils/icons";

const Category = () => {
  const { category } = useParams();
  const { data: posts } = useFetch(`/api/v1/post/categories/${category}`);

  const icon = icons.find(
    (icon) => icon.label.toLowerCase() === category.toLowerCase()
  );

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
              bgcolor: `${icon?.bg}`,
              borderRadius: "50%",
              cursor: "pointer",
            }}
          >
            <img
              src={icon?.img}
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
