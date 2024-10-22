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
} from "@mui/material";
import { useEffect, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useSelector } from "react-redux";
const TableOfPosts = ({ data, loading }) => {
  const [showMore, setShowMore] = useState(true);
  const { currentUser } = useSelector((state) => state.user);
  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    if (data?.posts?.length > 0) {
      setCurrentData(data?.posts);
    }
  }, [data?.posts]);
  const handleShowMore = async () => {
    const startIndex = data?.posts?.length;
    console.log(startIndex);
    try {
      const res = await fetch(
        `/api/v1/post/all-posts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setCurrentData((prevData) => [...prevData, ...data.posts]);
        if (data?.posts?.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(data?.posts);
  return (
    <>
      {!loading && (
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: "10px",
            boxShadow: "0px 5px 10px  rgba(0, 0, 0, 0.1)",
            scrollbarColor: "#ede7f6#ffffff  ",
            height: "80%",
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
            {currentData && currentData.length > 0 && (
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
                      <DeleteForeverIcon />
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ color: "#22c55e", cursor: "pointer" }}
                    >
                      <ModeEditIcon />
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
    </>
  );
};

export default TableOfPosts;
