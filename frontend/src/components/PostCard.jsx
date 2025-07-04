/* eslint-disable react/prop-types */
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  Grid2,
  Rating,
  Skeleton,
  SvgIcon,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import { icons } from "../utils/icons";
import useFetch from "../hooks/useFetch";
import { useTheme } from "@emotion/react";

const AuthorInfo = ({ userId }) => {
  const { data: user } = useFetch(
    userId ? `/api/v1/user/get/${userId}` : null,
    []
  );

  return (
    <>
      <Avatar
        alt="Jemy Sharp"
        src={
          !user?.profilePicture
            ? "/static/images/avatar/1.jpg"
            : user?.profilePicture
        }
        sx={{ width: 18, height: 18, objectFit: "cover" }}
      />
      <Typography variant="caption" sx={{ color: "#727070" }}>
        {user?.username}
      </Typography>
    </>
  );
};
const PostCard = ({ cmd, csize, posts, loading }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const numWords = isSmallScreen ? 100 : 200;
  return (
    <Grid2
      container
      sx={{ display: "flex", justifyContent: "center" }}
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 1, sm: 8, md: cmd }}
    >
      {loading &&
        Array.from({ length: posts?.length }).map((_, index) => (
          <Grid2 key={index} xs={12} sm={4} md={3}>
            <Skeleton
              variant="rectangular"
              height={300}
              animation="wave"
              sx={{ backgroundColor: "#6a4ee9" }}
            />
          </Grid2>
        ))}
      {posts?.length > 0 &&
        posts?.map((post) => (
          <Grid2 key={post?._id} size={{ xs: 2, sm: 4, md: csize }}>
            {/* {loading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <Grid2 key={index} xs={12} sm={4} md={3}>
                  <Skeleton
                    variant="rectangular"
                    // height={300}
                    animation="wave"
                  />
                </Grid2>
              ))
            ) : ( */}
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px",
                paddingLeft: "0px",
                position: "relative",
                height: "300px",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box sx={{ display: "flex", paddingBottom: "14px" }}>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      color: "#fff",
                      paddingX: "25px",
                      paddingY: "5px",
                      position: "absolute",
                      left: "0",
                      fontSize: "14px",
                      borderRadius: "0 25px 25px 0",
                      bgcolor: `${
                        icons.find(
                          (e) =>
                            e.label.toLowerCase() ===
                            post?.category.trim().toLowerCase()
                        )?.bg
                      }`,
                    }}
                  >
                    {post?.category}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      position: "absolute",
                      right: "0",
                      paddingRight: "10px",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "#7587a1", fontSize: "14px" }}
                    >
                      Difficulty:
                    </Typography>

                    <Rating
                      name="read-only"
                      value={+post?.difficulty}
                      max={3}
                      readOnly
                      size="small"
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Link
                    to={`/post/${post.slug}`}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={(theme) => ({
                        fontWeight: "bold",
                        color: theme.palette.text.label,
                        textAlign: "center",
                        paddingX: "24px",
                        fontSize: "22px",
                        lineHeight: "1.5",
                        cursor: "pointer",
                        ":hover": {
                          textDecoration: "underline",
                        },
                      })}
                    >
                      {post.title.slice(0, 40)}
                    </Typography>
                  </Link>
                  <Typography
                    variant="body2"
                    sx={{
                      textAlign: "center",
                      height: "30%",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: post.content.slice(0, numWords) + "...",
                    }}
                  ></Typography>
                </Box>
              </CardContent>
              <CardActions
                sx={{
                  display: "flex",
                }}
              >
                <AuthorInfo userId={post?.userId} />
                <SvgIcon sx={{ color: "#5751FF", fontSize: "20px" }}>
                  <path
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    d="M6.382 5.968A8.962 8.962 0 0 1 12 4c2.125 0 4.078.736 5.618 1.968l1.453-1.453 1.414 1.414-1.453 1.453A9 9 0 1 1 3 13c0-2.125.736-4.078 1.968-5.618L3.515 5.93l1.414-1.414 1.453 1.453ZM12 20a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm1-8h3l-5 6.5V14H8l5-6.505V12ZM8 1h8v2H8V1Z"
                  />
                </SvgIcon>
                <Typography
                  variant="caption"
                  sx={{ color: "#8292aa", fontWeight: "500" }}
                >
                  {`${(post.content?.length / 1000).toFixed(0)} Mins`}
                </Typography>
              </CardActions>
            </Card>
            {/* )} */}
          </Grid2>
        ))}
    </Grid2>
  );
};

export default PostCard;
