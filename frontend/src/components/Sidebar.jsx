import { Box, Divider, Typography, useTheme } from "@mui/material";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DonutSmallRoundedIcon from "@mui/icons-material/DonutSmallRounded";
import PeopleIcon from "@mui/icons-material/People";
import PostAddSharpIcon from "@mui/icons-material/PostAddSharp";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import MyModal from "./MyModal";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  logoutSuccess,
} from "../redux/userSlice";

const Sidebar = () => {
  const theme = useTheme();
  const location = useLocation();
  const sidebarItems = [
    {
      icon: <DonutSmallRoundedIcon />,
      title: "Dashboard",
      link: "/dashboard",
    },
    {
      icon: <PersonSharpIcon />,
      title: "Profile",
      link: "/dashboard/profile",
    },
    {
      icon: <CommentRoundedIcon />,
      title: "Comments",
      link: "/comments",
    },
    {
      icon: <PeopleIcon />,
      title: "Users",
      link: "/users",
    },
    {
      icon: <PostAddSharpIcon />,
      title: "Posts",
      link: "/posts",
    },
    {
      icon: <LogoutOutlinedIcon />,
      title: "Logout",
      link: "/logout",
    },
    {
      icon: <DeleteForeverIcon />,
      title: "Delete Account",
      link: "/delete-account",
    },
  ];
  const { currentUser } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleOpen = () => {
    setOpen(true);
    dispatch(deleteUserFailure(null));
  };
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const handleDelete = async () => {
    setOpen(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/v1/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(deleteUserSuccess(data));
      } else {
        dispatch(deleteUserFailure(data.message));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/v1/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(logoutSuccess());
        navigate("/signin");
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = ({ title, link }) => {
    if (title === "Logout") {
      handleLogout();
    } else if (title === "Delete Account") {
      handleOpen();
    } else {
      navigate(link);
    }
  };

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
              gap: "20px",
              bgcolor:
                location.pathname === item.link ? "#ede7f6" : "transparent",
              padding: "10px",
              borderRadius: "10px",
              cursor: "pointer",
              "&:hover": {
                bgcolor: "#faf8ff",
              },
            }}
            onClick={() => handleClick(item)}
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
      <MyModal
        open={open}
        handleClose={handleClose}
        handleDelete={handleDelete}
      />
    </Box>
  );
};

export default Sidebar;
