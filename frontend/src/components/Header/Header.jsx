import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  useScrollTrigger,
  styled,
  Button,
  TextField,
  useMediaQuery,
  Popover,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ProfileIcon from "./ProfileIcon";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ModeButton from "./ModeButton";
import { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";

const Header = () => {
  const trigger = useScrollTrigger();
  const { currentUser } = useSelector((state) => state.user) || {};
  const [searchTerm, setSearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const { search } = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const urlParams = new URLSearchParams(search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [search]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <RoundedAppBar
      position="sticky"
      sx={{
        borderRadius: {
          xs: "5px",
          lg: trigger ? "5px" : "40px",
        },
        width: {
          xs: "99vw",
          lg: trigger ? "99vw" : "78vw",
        },
        paddingInline: {
          xs: "10px",
          lg: trigger ? "100px" : "",
        },
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box
          sx={{
            display: "flex",
            gap: "xs:4px sm:10px",
            alignItems: "center",
            mr: { xs: "10px", sm: "0px" },
          }}
        >
          <SearchIcon style={{ color: "#6A4EE9" }} onClick={handleClick} />
          <form onSubmit={handleSubmit}>
            {!isSmallScreen && (
              <TextField
                placeholder={isSmallScreen ? "" : "Quick Search…"}
                variant={"standard"}
                sx={{
                  color: "#121111",
                  display: { xs: "none", sm: "block" },
                  minWidth: "60px",
                  outline: "none",
                  "& .MuiInputBase-root": {
                    border: "none",
                  },
                  "& .MuiInput-underline:before": {
                    borderBottom: "none",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottom: "none",
                  },
                  "& .MuiInputBase-input:focus": {
                    backgroundColor: "transparent",
                  },
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            )}

            {isSmallScreen && (
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                slotProps={{
                  paper: {
                    sx: {
                      mt: 1,
                    },
                  },
                }}
              >
                <TextField
                  required
                  placeholder={isSmallScreen ? "Search..." : "Quick Search…"}
                  variant={"standard"}
                  sx={{
                    color: "#121111",
                    minWidth: "60px",
                    padding: "8px",
                    outline: "none",
                    "& .MuiInputBase-root": {
                      border: "none",
                    },
                    "& .MuiInput-underline:before": {
                      borderBottom: "none",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottom: "none",
                    },
                    "& .MuiInputBase-input:focus": {
                      backgroundColor: "transparent",
                    },
                  }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                />
              </Popover>
            )}
          </form>
        </Box>
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
            marginRight: {
              lg: "100px",
              sm: "50px",
              xs: "0px",
            },

            fontWeight: "bold",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          <strong style={{ color: "#6A4EE9" }}>DEV</strong> JOURNEY
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {currentUser ? (
            <ProfileIcon />
          ) : (
            <Link to={"/signin"}>
              <Button
                size="large"
                sx={{ textTransform: "none", color: "#6A4EE9" }}
              >
                Login
              </Button>
            </Link>
          )}
          <ModeButton />
        </Box>
      </Toolbar>
    </RoundedAppBar>
  );
};

export default Header;

const RoundedAppBar = styled(AppBar)(({ theme }) => ({
  marginInline: "auto",
  marginTop: "25px",
  padding: "10px",
  backgroundColor: theme.palette.background.paper,
  color: "black",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));
