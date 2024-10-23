import useFetch from "../hooks/useFetch";
import { Box, CircularProgress } from "@mui/material";
import TableOfUsers from "../components/Dashboard/TableOfUsers";

const DashboardUsers = () => {
  const { data, loading } = useFetch("/api/v1/user/all-users", []);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        paddingX: "35px",
        height: "100vh",
        justifyContent: "space-around",
      }}
    >
      <>
        {loading ? (
          <CircularProgress
            size="3rem"
            sx={{ margin: "auto", color: "#6A4EE9" }}
          />
        ) : (
          // <></>
          <TableOfUsers data={data} loading={loading} />
        )}
      </>
    </Box>
  );
};

export default DashboardUsers;
