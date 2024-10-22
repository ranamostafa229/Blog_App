import { Box, Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import TableOfPosts from "../components/Dashboard/TableOfPosts";
import useFetch from "../hooks/useFetch";
import AddIcon from "@mui/icons-material/Add";

const DashboardPosts = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { data, loading } = useFetch("/api/v1/post/all-posts", []);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        paddingX: "35px",
        height: "100vh",
      }}
    >
      {currentUser?.isAdmin && (
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            bgcolor: "#6A4EE9",
            color: "white",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
            display: "flex",
            width: "fit-content",
            alignSelf: "end",
            gap: "5px",
            borderRadius: "7px",
          }}
          onClick={() => navigate("/create-post")}
        >
          <AddIcon />
          Create Post
        </Button>
      )}
      <>
        {loading ? (
          <CircularProgress
            size="3rem"
            sx={{ margin: "auto", color: "#6A4EE9" }}
          />
        ) : (
          <TableOfPosts data={data} loading={loading} />
        )}
      </>
    </Box>
  );
};

export default DashboardPosts;
