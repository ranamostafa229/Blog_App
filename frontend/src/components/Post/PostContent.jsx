/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import RelatedPosts from "./RelatedPosts";
import ReplySection from "./ReplySection";
import useModifyHtmlWithIds from "../../hooks/useModifyHtmlWithIds ";
import "../../index.css";

const PostContent = ({ post, updatedAt }) => {
  const modifiedHtml = useModifyHtmlWithIds(post.content);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "40px" }}>
      <Box
        sx={(theme) => ({
          marginLeft: "20px",
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
              // color: "#282424",
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

        <Box
          sx={(theme) => ({
            color: theme.palette.text.subtitle,
          })}
          dangerouslySetInnerHTML={{ __html: post && modifiedHtml }}
        ></Box>

        <hr style={{ border: "1px solid #f2f1ff", width: "100%" }} />
      </Box>
      <RelatedPosts />
      <Box sx={{ height: 10 }} />
      <ReplySection />
    </Box>
  );
};

export default PostContent;
