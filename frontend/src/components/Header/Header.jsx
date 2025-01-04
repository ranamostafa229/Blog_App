import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  useScrollTrigger,
  styled,
  Button,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ProfileIcon from "./ProfileIcon";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ModeButton from "./ModeButton";
import { useEffect, useState } from "react";

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

const Header = () => {
  const trigger = useScrollTrigger();
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const { search } = useLocation();
  const navigate = useNavigate();
  console.log(searchTerm);
  useEffect(() => {
    const urlParams = new URLSearchParams(search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [search]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

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
            gap: "10px",
            alignItems: "center",
          }}
        >
          <SearchIcon style={{ color: "#6A4EE9" }} />
          <form onSubmit={handleSubmit}>
            <TextField
              // required
              placeholder="Quick Search…"
              variant="standard"
              sx={{
                color: "#121111",
                display: { xs: "none", sm: "block" },
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
