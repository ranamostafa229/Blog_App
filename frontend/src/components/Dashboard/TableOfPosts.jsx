/* eslint-disable react/prop-types */
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useSelector } from "react-redux";
import MyModal from "../MyModal";
import { useNavigate } from "react-router-dom";
const TableOfPosts = ({ data, loading }) => {
  const [showMore, setShowMore] = useState(true);
  const [showModel, setShowModel] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [currentData, setCurrentData] = useState([]);
  const [error, setError] = useState(null);
  const [postId, setPostId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.posts?.length > 0) {
      setCurrentData((prevData) => [...prevData, ...data.posts]);
    }
    if (data?.posts?.length < 9) {
      setShowMore(false);
    }
  }, [data?.posts]);

  const handleShowMore = async () => {
    const startIndex = currentData.length;
    try {
      const res = await fetch(
        `/api/v1/post/all-posts?userId=${currentUser._id}&startIndex=${startIndex}`
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
  const handleDelete = async () => {
    try {
      const res = await fetch(
        `/api/v1/post/delete/${postId}/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        setShowModel(false);
      } else {
        setCurrentData((prevData) =>
          prevData.filter((item) => item._id !== postId)
        );
        setShowModel(false);
      }
    } catch (error) {
      setShowModel(false);
      setError(error.message);
      console.log(error);
    }
  };

  return (
    <>
      {!loading && (
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: "10px",
            boxShadow: "0px 5px 10px  rgba(0, 0, 0, 0.1)",
            scrollbarColor: "#ede7f6#ffffff  ",
            height: "fit-content",
          }}
        >
          <Table sx={{ minWidth: 500 }} aria-label="simple table">
            <TableHead
              sx={{ bgcolor: "#ede7f6", position: "sticky", top: "0" }}
            >
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell align="center">Image</TableCell>
                <TableCell>Title</TableCell>
                <TableCell align="left">Category</TableCell>
                <TableCell align="right">Delete</TableCell>
                <TableCell align="right">Edit</TableCell>
              </TableRow>
            </TableHead>
            {currentData && currentData?.length > 0 && (
              <TableBody>
                {currentData?.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      // color: "#656b72",
                    }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ color: "#656b72", fontWeight: "600" }}
                    >
                      {new Date(row.updatedAt)
                        .toDateString()
                        .split(" ")
                        .slice(1)
                        .join(" ")}
                    </TableCell>
                    <TableCell align="right">
                      <img
                        src={row.image}
                        style={{
                          width: "70px",
                          height: "50px",
                          borderRadius: "10px",
                        }}
                        alt="post image"
                      />
                    </TableCell>
                    <TableCell sx={{ color: "#656b72", fontWeight: "400" }}>
                      {row.title}
                    </TableCell>
                    <TableCell sx={{ color: "#656b72", fontWeight: "400" }}>
                      {row.category}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ color: "#f1556c", cursor: "pointer" }}
                    >
                      <DeleteForeverIcon
                        onClick={() => {
                          setShowModel(true);
                          setPostId(row._id);
                        }}
                      />
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ color: "#22c55e", cursor: "pointer" }}
                    >
                      <ModeEditIcon
                        onClick={() => navigate(`/edit-post/${row._id}`)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      )}
      {showMore && (
        <Button
          sx={{
            width: "fit-content",
            alignSelf: "center",
            color: "#6a4ee9",
            fontWeight: "600",
            fontSize: "16px",
          }}
          onClick={handleShowMore}
        >
          Show More
        </Button>
      )}
      {error && <Alert severity="error">{error}</Alert>}
      <MyModal
        open={showModel}
        handleClose={() => setShowModel(false)}
        handleDelete={handleDelete}
        title={"Are you sure you want to delete this post?"}
      />
    </>
  );
};

export default TableOfPosts;
