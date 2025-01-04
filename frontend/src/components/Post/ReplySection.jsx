/* eslint-disable react/prop-types */
import {
  Alert,
  Box,
  Button,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ReplySection = ({ postId, setCurrentComments }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }
    try {
      const res = await fetch("/api/v1/comment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          userId: currentUser?._id,
          postId,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setSuccess("Comment added successfully");
        setComment("");
        setError(null);
        setCurrentComments((prev) => [data, ...prev]);
        console.log(data, "gett");
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <Box
      sx={{
        marginLeft: "22px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <Typography
        variant="h6"
        sx={(theme) => ({
          fontWeight: "600",
          color: theme.palette.text.primary,
        })}
      >
        Leave a Reply
      </Typography>
      {currentUser ? (
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
          onSubmit={handleSubmit}
        >
          <CustomTextField
            label="Comment"
            multiline
            rows={4}
            variant="outlined"
            name="comment"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
              setSuccess("");
            }}
            required
          />

          {comment.length > 0 && (
            <Typography variant="subtitle2" sx={{ color: "#6a4ee9" }}>
              {200 - comment.length <= 0
                ? "You have reached the limit"
                : 200 - comment.length}{" "}
              characters remaining
            </Typography>
          )}
          <Button
            variant="contained"
            sx={{ bgcolor: "#6a4ee9", width: "fit-content" }}
            type="submit"
            disabled={comment.length > 200}
          >
            Post Comment
          </Button>
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}
        </form>
      ) : (
        <Box
          sx={(theme) => ({
            fontWeight: "600",
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.background.banner,
            padding: "20px",
            borderRadius: "10px",
            display: "flex",
            gap: "5px",
          })}
        >
          You must be logged in to comment.
          <Link to="/signin">Login</Link>
        </Box>
      )}
    </Box>
  );
};

export default ReplySection;

const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "none",
    },
  },
  "& .MuiInputLabel-root": {
    color: theme.palette.text.subtitle,
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#6a4ee9",
  },
  backgroundColor: theme.palette.background.banner,
  width: "100%",
  borderRadius: "10px",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
  color: theme.palette.text.primary,
}));
