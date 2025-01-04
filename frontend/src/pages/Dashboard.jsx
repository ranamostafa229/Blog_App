import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          padding: "20px",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Dashboard;
