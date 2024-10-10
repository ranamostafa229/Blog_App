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

const ProfileIcon = () => {
  const settings = ["Profile", "Dashboard", "Logout"];

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
          <MenuItem key={setting} onClick={handleCloseUserMenu}>
            <Typography sx={{ textAlign: "center" }}>{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default ProfileIcon;
