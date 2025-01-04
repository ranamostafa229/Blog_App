import useFetch from "../hooks/useFetch";
import { Alert, Box, CircularProgress } from "@mui/material";
import TableOfUsers from "../components/Dashboard/TableOfUsers";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DashboardUsers = () => {
  const { data, loading, error } = useFetch("/api/v1/user/all-users", []);
  const navigate = useNavigate();
  useEffect(() => {
    if (error === "You are not authorized") {
      navigate("/signin");
    }
  }, [error, navigate]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        paddingX: "35px",
        height: "100vh",
        paddingTop: "60px",
      }}
    >
      <>
        {loading ? (
          <CircularProgress
            size="3rem"
            sx={{ margin: "auto", color: "#6A4EE9" }}
          />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <TableOfUsers data={data} loading={loading} error={error} />
        )}
      </>
    </Box>
  );
};

export default DashboardUsers;
