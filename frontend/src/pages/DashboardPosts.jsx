import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const DashboardPosts = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  return (
    <Box>
      {currentUser?.isAdmin && (
        <Button onClick={() => navigate("/create-post")}>Create Post</Button>
      )}
    </Box>
  );
};

export default DashboardPosts;
