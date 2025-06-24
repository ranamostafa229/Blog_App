import { Container, CircularProgress, Button } from "@mui/material";
import PostCard from "../components/PostCard";
import useFetch from "../hooks/useFetch";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Posts = () => {
  const [searchParams] = useSearchParams();
  const [showMore, setShowMore] = useState(true);

  const searchQuery = searchParams.toString();
  const { data, loading } = useFetch(
    `/api/v1/post/all-posts?${searchQuery}`,
    []
  );
  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    setCurrentData([]);
    setShowMore(true);
  }, [searchQuery]);
  useEffect(() => {
    if (data?.posts?.length > 0) {
      setCurrentData(data.posts);
    }
    if (data?.posts?.length < 9) {
      setShowMore(false);
    }
  }, [data?.posts]);
  const handleShowMore = async () => {
    const startIndex = currentData.length;
    try {
      const res = await fetch(
        `/api/v1/post/all-posts?startIndex=${startIndex}&${searchQuery}`
      );
      const newData = await res.json();
      if (res.ok) {
        setCurrentData((prevData) => [...prevData, ...newData.posts]);
        if (newData?.posts?.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        justifyContent: "space-between",
      }}
    >
      {!loading && currentData.length === 0 && (
        <h2
          style={{
            textAlign: "center",
            marginTop: "60px",
            fontFamily: "cursive",
          }}
        >
          No posts found
          <br />
          Please try a different
          <span style={{ color: "#6A4EE9" }}> search term.</span>
        </h2>
      )}
      {loading ? (
        <CircularProgress
          size="3rem"
          sx={{ margin: "auto", color: "#6A4EE9" }}
        />
      ) : (
        <PostCard cmd={10} csize={4} posts={currentData} />
      )}

      {showMore && (
        <Button
          sx={{
            width: "fit-content",
            alignSelf: "center",
            color: "#6a4ee9",
            fontWeight: "600",
            fontSize: "16px",
            marginTop: "30px",
          }}
          onClick={handleShowMore}
        >
          Show More
        </Button>
      )}
    </Container>
  );
};

export default Posts;
