import { Box, Divider, Typography, useTheme } from "@mui/material";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useLocation } from "react-router-dom";
const Sidebar = () => {
  const theme = useTheme();
  const location = useLocation();
  const sidebarItems = [
    {
      icon: <PersonSharpIcon />,
      title: "Profile",
      link: "/dashboard",
    },
    {
      icon: <LogoutOutlinedIcon />,
      title: "Logout",
      link: "/logout",
    },
  ];
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        flexGrow: 0,
        bgcolor: theme.palette.background.banner,
        height: "100vh",
        gap: "10px",
        width: "300px",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h5"
        component="div"
        sx={{
          flexGrow: 0,
          justifySelf: "end",
          height: {
            xs: "60px",
          },
          display: "flex",
          alignItems: "center",
          fontWeight: "bold",
          fontSize: "25px",
        }}
      >
        <strong style={{ color: "#6A4EE9" }}>DEV</strong> JOURNEY
      </Typography>
      <Divider />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          mt: "20px",
        }}
      >
        {sidebarItems.map((item) => (
          <Box
            key={item.title}
            sx={{
              display: "flex",
              //   flexDirection: "column",
              gap: "20px",
              bgcolor:
                location.pathname === item.link ? "#ede7f6" : "transparent",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                color: theme.palette.text.subtitle,
                fontSize: "16px",
              }}
            >
              {item.icon}
              {item.title}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Sidebar;
