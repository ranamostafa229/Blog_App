/* eslint-disable react/prop-types */
import {
  Alert,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import MyModal from "../MyModal";

const TableOfComments = ({ data, loading }) => {
  const [showMore, setShowMore] = useState(true);
  const [showModel, setShowModel] = useState(false);
  const [currentData, setCurrentData] = useState([]);
  const [error, setError] = useState(null);
  const [commentId, setCommentId] = useState("");

  useEffect(() => {
    if (data?.comments?.length > 0) {
      setCurrentData(data?.comments);
    }
    if (data?.comments?.length < 9) {
      setShowMore(false);
    }
  }, [data?.comments]);
  console.log(data?.comments?.length);
  const handleShowMore = async () => {
    const startIndex = currentData?.length;

    try {
      const res = await fetch(
        `/api/v1/comment/all-comments?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setCurrentData((prevData) => [...prevData, ...data.comments]);
        if (data?.comments?.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(currentData);
  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/v1/comment/delete/${commentId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
        setShowModel(false);
      } else {
        setCurrentData((prevData) =>
          prevData.filter((item) => item._id !== commentId)
        );
        setShowModel(false);
      }
    } catch (error) {
      setShowModel(false);
      setError(error.message);
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
                <TableCell>Date Updated</TableCell>
                <TableCell>Comment Content</TableCell>
                <TableCell>Number of likes</TableCell>
                <TableCell>POSTID</TableCell>
                <TableCell>USERID</TableCell>
                <TableCell align="right">Delete</TableCell>
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
                    <TableCell sx={{ color: "#656b72", fontWeight: "400" }}>
                      {new Date(row.updatedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        color: "#656b72",
                        fontWeight: "600",
                      }}
                    >
                      {row.content}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ color: "#656b72", fontWeight: "400" }}
                    >
                      {row.likes.length}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ color: "#656b72", fontWeight: "400" }}
                    >
                      {row.postId}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ color: "#656b72", fontWeight: "400" }}
                    >
                      {row.userId}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ color: "#f1556c", cursor: "pointer" }}
                    >
                      <DeleteForeverIcon
                        onClick={() => {
                          setShowModel(true);
                          setCommentId(row._id);
                        }}
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
        title={"Are you sure you want to delete this user?"}
      />
    </>
  );
};

export default TableOfComments;
