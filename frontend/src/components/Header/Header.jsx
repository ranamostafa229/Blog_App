import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  useScrollTrigger,
  styled,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
// import Logo from "../../assets/logo4.png";
import ProfileIcon from "./ProfileIcon";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ModeButton from "./ModeButton";

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
  const navigate = useNavigate();
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
          }}
        >
          <SearchIcon style={{ color: "#6A4EE9" }} />
          <Typography
            sx={{ color: "#121111", display: { xs: "none", sm: "block" } }}
          >
            Quick Search…
          </Typography>
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
              lg: "10px",
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
