/* eslint-disable react/prop-types */
import {
  Alert,
  Avatar,
  Box,
  Button,
  Divider,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import useFetch from "../../hooks/useFetch";
import moment from "moment";
import { useSelector } from "react-redux";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { useState } from "react";
import MyModal from "../MyModal";
import { useNavigate } from "react-router-dom";

const UserInfo = ({ userId, createdAt }) => {
  const { data: user } = useFetch(
    userId ? `/api/v1/user/get/${userId}` : null,
    []
  );

  return (
    <Box sx={{ display: "flex", columnGap: "10px", alignItems: "center" }}>
      <Avatar alt="Remy Sharp" src={user.profilePicture} />
      <Box sx={{ display: "flex", alignItems: "center", gap: "2px" }}>
        <Typography
          variant="subtitle2"
          sx={(theme) => ({ color: theme.palette.text.primary })}
        >
          {user ? `@${user.username}` : "anonymous user"}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "#6A4EE9" }}>
          {moment(createdAt).fromNow()}
        </Typography>
      </Box>
    </Box>
  );
};

const PostComments = ({ comments, setCurrentComments }) => {
  // const { data } = useFetch(`/api/v1/comment/get/${postId}`, []);
  const { currentUser } = useSelector((state) => state.user);
  const [showModel, setShowModel] = useState(false);
  const [error, setError] = useState(null);
  const [commentId, setCommentId] = useState("");
  const [isEditting, setIsEditting] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/v1/comment/delete/${commentId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(res);
      if (!res.ok) {
        setError(data.message);
        setShowModel(false);
      } else {
        setCurrentComments((prevData) =>
          prevData.filter((item) => item._id !== commentId)
        );
        setShowModel(false);
      }
    } catch (error) {
      setShowModel(false);
      setError(error.message);
    }
  };
  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate("/signin");
        return;
      }
      const res = await fetch(`/api/v1/comment/like/${commentId}`, {
        method: "PUT",
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
        setShowModel(false);
      } else {
        setCurrentComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data?.likes,
                  numberOfLikes: data?.likes?.length,
                }
              : comment
          )
        );
        setShowModel(false);
      }
    } catch (error) {
      setShowModel(false);
      setError(error.message);
    }
  };

  const handleEdit = (commentId, editedContent) => {
    setCurrentComments(
      comments.map((c) =>
        c._id === commentId
          ? {
              ...c,
              content: editedContent,
            }
          : c
      )
    );
  };
  const handleSave = async () => {
    try {
      const res = await fetch(`/api/v1/comment/edit/${commentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: editedContent,
        }),
      });
      const data = await res.json();
      console.log(res);
      if (!res.ok) {
        setError(data.message);
      } else {
        setIsEditting(false);
        handleEdit(commentId, editedContent);
      }
    } catch (error) {
      setShowModel(false);
      setError(error.message);
    }
  };

  return (
    <CustomBoxStyled>
      <Typography
        variant="h6"
        sx={(theme) => ({
          fontWeight: "600",
          color: theme.palette.text.primary,
        })}
      >
        Comments
      </Typography>
      {comments.length === 0 && (
        <Typography variant="body1" sx={{ color: "#5e5b5b" }}>
          No comments yet 😔, be first to comment
        </Typography>
      )}
      {comments?.length > 0 &&
        comments?.map((comment) => (
          <Box key={comment?._id}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <UserInfo
                userId={comment?.userId}
                createdAt={comment?.createdAt}
              />
              {isEditting &&
              currentUser &&
              currentUser?._id === comment?.userId &&
              comment?._id === commentId ? (
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    paddingLeft: "52px",
                    alignItems: "center",
                  }}
                >
                  <TextField
                    type="text"
                    variant="filled"
                    value={editedContent}
                    multiline
                    onChange={(e) => setEditedContent(e.target.value)}
                    sx={{ width: "80%" }}
                  />
                  <Button
                    type="button"
                    size="small"
                    sx={{
                      height: "fit-content",
                      color: "#6A4EE9",
                    }}
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                  <Button
                    type="button"
                    size="small"
                    variant="outlined"
                    onClick={() => setIsEditting(false)}
                    sx={{
                      height: "fit-content",
                      color: "#6A4EE9",
                      borderColor: "#6A4EE9",
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              ) : (
                <Typography
                  variant="body1"
                  sx={{
                    paddingLeft: "52px",
                    pb: "15px",
                    color: "#5e5b5b",
                    wordBreak: "break-word",
                  }}
                >
                  {comment?.content}
                </Typography>
              )}

              <Divider
                sx={{
                  width: "100px",
                  marginInlineStart: "52px",
                }}
              />
              <Box
                sx={{
                  marginInlineStart: "52px",
                  width: "fit-content",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  paddingY: "10px",
                }}
              >
                <CustomButtonStyled
                  size="small"
                  type="button"
                  sx={{ gap: "2px" }}
                  onClick={() => handleLike(comment?._id)}
                >
                  <ThumbUpAltIcon
                    sx={{
                      color:
                        currentUser && comment.likes.includes(currentUser._id)
                          ? "#3012b3"
                          : "#6A4EE9",
                      fontSize: "15px",
                      ":hover": { color: "#401ae7" },
                      cursor: "pointer",
                    }}
                  />
                  {comment?.numberOfLikes > 1
                    ? `${comment?.numberOfLikes} Likes`
                    : comment?.numberOfLikes !== 0 &&
                      `${comment?.numberOfLikes} Like`}
                </CustomButtonStyled>
                {((currentUser && currentUser?._id === comment?.userId) ||
                  currentUser?.isAdmin) && (
                  <Box
                    sx={{
                      display: "flex",
                      gap: "10px",
                    }}
                  >
                    <CustomButtonStyled
                      size="small"
                      sx={{
                        ":hover": {
                          color: "#401ae7",
                          backgroundColor: "transparent",
                        },
                      }}
                      onClick={() => {
                        setIsEditting(true);
                        setEditedContent(comment?.content);
                        setCommentId(comment?._id);
                      }}
                    >
                      Edit
                    </CustomButtonStyled>
                    <CustomButtonStyled
                      size="small"
                      sx={{
                        ":hover": {
                          color: "#cf2040",
                          backgroundColor: "transparent",
                        },
                      }}
                      onClick={() => {
                        setShowModel(true);
                        setCommentId(comment?._id);
                      }}
                    >
                      Delete
                    </CustomButtonStyled>
                  </Box>
                )}
              </Box>
              {error && <Alert severity="error">{error}</Alert>}
              <Divider />
            </Box>
          </Box>
        ))}
      <MyModal
        open={showModel}
        handleClose={() => setShowModel(false)}
        handleDelete={handleDelete}
        title={"Are you sure you want to delete this comment?"}
      />
    </CustomBoxStyled>
  );
};

export default PostComments;

const CustomBoxStyled = styled(Box)(({ theme }) => ({
  color: "#121111",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  marginLeft: "22px",
  paddingBlock: "27px",
  width: "100%",
  [theme.breakpoints.down("md")]: {
    width: "90%",
  },
}));
const CustomButtonStyled = styled(Button)(() => ({
  textTransform: "none",
  color: "#6A4EE9",
  paddingBlock: "0px",
  paddingInline: "0px",
  minWidth: "fit-content",
}));
