import { useEffect, useState } from "react";
import {
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import PostContent from "../components/Post/PostContent";
import PostInfoCard from "../components/Post/PostInfoCard";

const sections = [
  {
    id: "prerequisites",
    title: "Prerequisites",
    body: "Before we dive into the world of CSS animations, ensure the following:",
  },
  {
    id: "step1",
    title: "Step 1: Planning Your Animation",
    body: "Before writing any code, sketch out the type of animation you want. Consider the mood and tone of your blog, ensuring the animation complements your content.",
  },
  {
    id: "step2",
    title: "Step 2: Setting Up Your HTML",
    body: "In your blog post or webpage, identify the element you want to animate. Add a class to this element for easy targeting in your CSS.",
  },
  {
    id: "step3",
    title: "Step 3: Writing the CSS Animation",
    body: "Open your blog’s CSS stylesheet and add the following code:",
  },
  {
    id: "step4",
    title: "Step 4: Triggering the Animation with JavaScript (Optional)",
    body: "If you want the animation to occur on a specific event, like when the user scrolls to the element, you can use JavaScript. Add the following script to your blog:",
  },
  {
    id: "step5",
    title: "Step 5: Preview and Publish",
    body: "Preview your blog post to see the CSS animation in action. Tweak the animation properties as needed to achieve the desired look and feel. Once satisfied, publish your post and let your readers enjoy the visually enhanced content.",
  },
  {
    id: "conclusion",
    title: "Conclusion",
    body: "By incorporating CSS animations into your technology blog, you add a layer of engagement that captivates your audience. Experiment with different animations and effects to find the perfect fit for your blog’s style. Elevate your content and make a lasting impression with the power of CSS animations.",
  },
];

function Post() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.8 }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  return (
    <Container sx={{ display: "flex", gap: "58px" }}>
      <Box
        sx={{
          width: "650px",
          position: "sticky",
          top: "0",
          height: "100vh",
          display: {
            xs: "none",
            md: "block",
          },
        }}
      >
        <PostInfoCard />

        <Typography
          variant="h6"
          sx={(theme) => ({
            color: theme.palette.text.primary,
            fontbold: "bold",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          })}
        >
          <AutoAwesomeIcon sx={{ fontSize: "25px", color: "#ff2aac" }} />
          Table of Contents
        </Typography>
        <List>
          {sections.map((section) => (
            <ListItem
              //   button
              key={section.id}
              selected={activeSection === section.id}
              onClick={() => {
                document
                  .getElementById(section.id)
                  .scrollIntoView({ behavior: "smooth" });
              }}
              sx={(theme) => ({
                padding: "4px 0",
                cursor: "pointer",
                color:
                  activeSection === section.id
                    ? "#6A4EE9"
                    : theme.palette.text.link,
                borderLeft:
                  activeSection === section.id
                    ? "2px solid #6A4EE9"
                    : "2px solid #e9e8ff",
                paddingLeft: "11px",
              })}
            >
              <ListItemText primary={section.title} />
            </ListItem>
          ))}
        </List>
      </Box>
      <PostContent sections={sections} />
    </Container>
  );
}

export default Post;
