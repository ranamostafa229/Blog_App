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
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProfileIcon = () => {
  const settings = [
    {
      name: "Profile",
      path: "/profile",
    },
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Logout",
      path: "/logout",
    },
  ];

  const [anchorElUser, setAnchorElUser] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
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
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography sx={{ textAlign: "center" }} component={Link}>
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
