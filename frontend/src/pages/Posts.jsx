import { Container } from "@mui/material";
import PostCard from "../components/PostCard";

const Posts = () => {
  return (
    <Container>
      <PostCard cmd={10} csize={4} />
    </Container>
  );
};

export default Posts;
