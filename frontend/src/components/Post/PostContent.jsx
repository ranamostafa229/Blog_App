/* eslint-disable react/prop-types */
import { Box, Toolbar, Typography } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import RelatedPosts from "./RelatedPosts";
import ReplySection from "./ReplySection";

const PostContent = ({ sections }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "40px" }}>
      <Box
        sx={{
          marginLeft: "20px",
          bgcolor: "#fff",
          paddingY: "35px",
          paddingX: "45px",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          borderRadius: "20px",
          gap: "20px",
          border: "1px solid #f2f1ff",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
        }}
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
              //   WebkitBoxOrient: "vertical",
              //   WebkitLineClamp: 2,

              color: "#282424",
            }}
          >
            Crafting Engaging CSS Animations step by step guide
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
            Published: Jan 19, 2024
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "#494545", lineHeight: "30px" }}
          >
            In the realm of technology blogging, captivating your audience goes
            beyond just the written word. Incorporating eye-catching CSS
            animations can elevate your content and provide a dynamic user
            experience. In this tutorial, we’ll explore the art of creating CSS
            animations to add flair and interactivity to your technology blog.
          </Typography>
        </Box>
        {sections.map((section) => (
          <Box
            key={section.id}
            id={section.id}
            sx={{
              marginBottom: "50px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: "500" }}>
              {section.title}
            </Typography>
            <Typography variant="body1">Content for {section.body}</Typography>
          </Box>
        ))}
        <hr style={{ border: "1px solid #f2f1ff", width: "100%" }} />
      </Box>
      <RelatedPosts />
      <Box sx={{ height: 10 }} />
      <ReplySection />
    </Box>
  );
};

export default PostContent;
