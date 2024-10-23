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
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MyModal from "../MyModal";

const TableOfUsers = ({ data, loading }) => {
  const [showMore, setShowMore] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [currentData, setCurrentData] = useState([]);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (data?.users?.length > 0) {
      setCurrentData(data?.users);
    }
    if (data?.users?.length > 9) {
      setShowMore(true);
    }
  }, [data?.users]);
  const handleShowMore = async () => {
    const startIndex = data?.users?.length;

    try {
      const res = await fetch(
        `/api/v1/post/all-users?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setCurrentData((prevData) => [...prevData, ...data.users]);
        if (data?.posts?.length <= 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/v1/user/delete/${userId}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        setShowModel(false);
      } else {
        setCurrentData((prevData) =>
          prevData.filter((item) => item._id !== userId)
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
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="right">Admin</TableCell>
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
                    <TableCell>
                      <img
                        src={row.profilePicture}
                        style={{
                          width: "35px",
                          height: "35px",
                          borderRadius: "50%",
                        }}
                        alt="post image"
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        color: "#656b72",
                        fontWeight: "600",
                      }}
                    >
                      {row.username}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ color: "#656b72", fontWeight: "400" }}
                    >
                      {row.email}
                    </TableCell>
                    <TableCell sx={{ color: "#656b72", fontWeight: "400" }}>
                      {new Date(row.updatedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="right">
                      {row.isAdmin ? (
                        <CheckCircleIcon sx={{ color: "#22c55e" }} />
                      ) : (
                        <CancelIcon sx={{ color: "#f1556c" }} />
                      )}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ color: "#f1556c", cursor: "pointer" }}
                    >
                      <DeleteForeverIcon
                        onClick={() => {
                          setShowModel(true);
                          setUserId(row._id);
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

export default TableOfUsers;
