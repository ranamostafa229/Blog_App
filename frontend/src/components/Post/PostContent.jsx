/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import RelatedPosts from "./RelatedPosts";
import ReplySection from "./ReplySection";
import useModifyHtmlWithIds from "../../hooks/useModifyHtmlWithIds ";
import "../../index.css";
import PostComments from "./PostComments";

const PostContent = ({ post, updatedAt, comments, setCurrentComments }) => {
  const modifiedHtml = useModifyHtmlWithIds(post.content);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "40px",
      }}
    >
      <Box
        sx={(theme) => ({
          marginLeft: {
            xs: "0px",
            sm: "20px",
          },
          marginRight: {
            xs: "20px",
            sm: "0px",
          },
          bgcolor: theme.palette.background.banner,
          paddingY: "35px",
          paddingX: "45px",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          borderRadius: "20px",
          gap: "20px",
          border: "1px solid ",
          borderColor: theme.palette.text.secondary,
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
          wordBreak: "break-word",
        })}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "600",
              textAlign: "center",
              fontSize: "40px",
              width: "80%",
              placeSelf: "center",
            }}
          >
            {post.title}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "15px",
              gap: "5px",
            }}
          >
            <CalendarTodayIcon sx={{ fontSize: "18px", color: "#6a4ee9" }} />
            Published: {updatedAt}
          </Typography>
        </Box>
        {post.image && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={post.image}
              alt={post.title}
              style={{
                width: "100%",
                maxHeight: "400px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          </Box>
        )}
        <Box
          sx={(theme) => ({
            color: theme.palette.text.subtitle,
          })}
          dangerouslySetInnerHTML={{ __html: post && modifiedHtml }}
        ></Box>

        <hr style={{ border: "1px solid #f2f1ff", width: "100%" }} />
      </Box>
      <RelatedPosts category={post.category} />
      <Box sx={{ height: 10 }} />
      <ReplySection postId={post._id} setCurrentComments={setCurrentComments} />
      <PostComments
        postId={post._id}
        comments={comments}
        setCurrentComments={setCurrentComments}
      />
    </Box>
  );
};

export default PostContent;
