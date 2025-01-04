import { Alert, Box, CircularProgress } from "@mui/material";
import useFetch from "../hooks/useFetch";
import TableOfComments from "../components/Dashboard/TableOfComments";

const DashboardComments = () => {
  const { data, loading, error } = useFetch(`/api/v1/comment/all-comments`, []);
  console.log(loading);
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
          <TableOfComments data={data} loading={loading} error={error} />
        )}
      </>
    </Box>
  );
};

export default DashboardComments;
