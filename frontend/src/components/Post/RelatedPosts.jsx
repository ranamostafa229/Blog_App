/* eslint-disable react/prop-types */
import { Box, Button, Divider, Typography, useMediaQuery } from "@mui/material";
import useFetch from "../../hooks/useFetch";
import { useNavigate, useParams } from "react-router-dom";
import { icons } from "../../utils/icons";
import { useTheme } from "@emotion/react";

const RelatedPosts = ({ category }) => {
  const { postSlug } = useParams();
  const { data: posts } = useFetch(`/api/v1/post/related/${postSlug}`, []);
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const icon = icons.find(
    (icon) => icon.label.toLowerCase() === category?.toLowerCase()
  );
  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        flexDirection: "column",
        marginLeft: {
          xs: "0px",
          sm: "20px",
        },
        borderRadius: "20px",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
        padding: "35px",
        gap: "30px",
        bgcolor: theme.palette.background.banner,
      })}
    >
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          width: "100%",
        }}
      >
        <Box
          component="span"
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
              width: "60px",
              height: "60px",
            }}
          />
        </Box>
        <Typography
          component={"div"}
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
            gap: "6px",
            fontWeight: "500",
            color: "#656262",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "2px",
            }}
          >
            <span>
              More in this
              <Box
                component={"span"}
                sx={(theme) => ({
                  color: theme.palette.text.subtitle,
                  paddingLeft: "4px",
                })}
              >
                Category
              </Box>
            </span>
            <Typography
              variant="h5"
              sx={(theme) => ({
                color: theme.palette.text.primary,
                fontWeight: "bold",
              })}
            >
              {category}
            </Typography>
          </Box>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#227dff",
              fontSize: "14px",
            }}
            onClick={() => navigate(`/categories/${category}`)}
          >
            <span>{isSmallScreen ? "View All" : "View All Articles"}</span>
          </Button>
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "18px",
          pl: "15px",
        }}
      >
        {posts && posts.length > 0 ? (
          posts.map((post, index) => (
            <div key={post._id}>
              <Typography
                variant="h6"
                sx={(theme) => ({
                  display: "flex",
                  gap: "10px",
                  color: theme.palette.text.subtitle,
                  fontSize: "18px",
                  ":hover": {
                    color: theme.palette.text.primary,
                    cursor: "pointer",
                    textDecoration: "underline",
                  },
                })}
                onClick={() => navigate(`/post/${post.slug}`)}
              >
                <Box
                  sx={{
                    bgcolor: "#282424",
                    color: "white",
                    borderRadius: "5px",
                    paddingX: "9px",
                    fontSize: "15px",
                    alignSelf: "center",
                  }}
                >
                  {index + 1}
                </Box>
                {post.title}
              </Typography>
              <Divider></Divider>
            </div>
          ))
        ) : (
          <Typography
            variant="subtitle1"
            sx={(theme) => ({
              color: theme.palette.text.subtitle,
              textAlign: "center",
            })}
          >
            No related posts found
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default RelatedPosts;

const shapeCircleStyles = {
  width: 60,
  height: 60,
  borderRadius: "50%",
  boxshadow: "0 0 2px 2px rgba(0, 0, 0, 0.15)",
};
