import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutSuccess } from "../../redux/userSlice";

const ProfileIcon = () => {
  const settings = [
    {
      name: "Profile",
      path: "/dashboard",
    },
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Logout",
      onClick: () => {
        handleLogout();
      },
    },
  ];

  const [anchorElUser, setAnchorElUser] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
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

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "end",
      }}
    >
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            alt="Profile Picture"
            src={currentUser.profilePicture}
            rounded="true"
          />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
            <Link
              to={setting.path}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <Typography
                sx={{
                  textAlign: "center",
                  textDecoration: "none",
                  color: "inherit",
                }}
                component={"span"}
                onClick={setting.onClick}
              >
                {setting.name}
              </Typography>
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default ProfileIcon;
