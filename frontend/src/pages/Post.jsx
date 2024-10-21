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
import { useParams } from "react-router-dom";
import useExtractHeadings from "../hooks/useExtractHeadings";
import useFetch from "../hooks/useFetch";
function Post() {
  const [activeSection, setActiveSection] = useState("");
  // const [post, setPost] = useState({});
  const { postSlug } = useParams();
  const { data: post } = useFetch(`/api/v1/post/${postSlug}`, []);
  const sections = useExtractHeadings(post.content);

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
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) observer.unobserve(element);
      });
    };
  }, [sections]);

  // useEffect(() => {
  //   const fetchPost = async () => {
  //     try {
  //       const res = await fetch(`/api/v1/post/${postSlug}`, {
  //         method: "GET",
  //       });
  //       const data = await res.json();
  //       if (res.ok) {
  //         setPost(data);
  //         console.log(data);
  //       } else {
  //         console.log(`Error: ${res.status} - ${res.statusText}`);
  //         console.log(await res.text());
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchPost();
  // }, [postSlug]);
  const formattedDate = new Date(post?.updatedAt)
    .toDateString()
    .split(" ")
    .slice(1)
    .join(" ");
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
        {/* ******************* Info card**********************  */}
        <PostInfoCard
          category={post?.category}
          updatedAt={formattedDate}
          userId={post?.userId}
          content={post?.content}
        />

        {/* ******************* Table of contents**********************  */}
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
              key={section}
              selected={activeSection === section}
              onClick={() => {
                document
                  .getElementById(section)
                  .scrollIntoView({ behavior: "smooth" });
              }}
              sx={(theme) => ({
                padding: "4px 0",
                cursor: "pointer",
                color:
                  activeSection === section
                    ? "#6A4EE9"
                    : theme.palette.text.link,
                borderLeft:
                  activeSection === section
                    ? "2px solid #6A4EE9"
                    : "2px solid #e9e8ff",
                paddingLeft: "11px",
              })}
            >
              <ListItemText primary={section} />
            </ListItem>
          ))}
        </List>
      </Box>
      <PostContent post={post} updatedAt={formattedDate} sections={sections} />
    </Container>
  );
}

export default Post;
