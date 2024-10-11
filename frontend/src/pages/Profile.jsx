import {
  Box,
  Button,
  Card,
  Divider,
  FormControl,
  Paper,
  styled,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";

const CssTextField = styled(TextField)(({ theme }) => ({
  "& label": {
    color: "#6e86b2",
  },
  "& label.Mui-focused": {
    color: "#2196f3",
  },
  "& .MuiFilledInput-underline:after": {
    borderBottom: "none",
  },
  "& .MuiFilledInput-underline:before": {
    borderBottom: "none",
  },
  "& .MuiFilledInput-underline:hover:not(.Mui-disabled):before": {
    borderBottom: "none",
  },
  "& .MuiFilledInput-root": {
    backgroundColor: theme.palette.background.default,
    border: "1px solid ",
    borderColor: " #d3d4d5",
    borderRadius: "10px",
    "&.Mui-focused ": {
      borderColor: "#2196f3",
    },
  },
}));
const Profile = () => {
  const theme = useTheme();
  const { currentUser } = useSelector((state) => state.user);
  return (
    <Paper
      sx={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Typography variant="h6">Account</Typography>
      <Divider />
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          gap: "20px",
        }}
      >
        <Card sx={{ borderRadius: "10px", padding: "20px", flexGrow: 0 }}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "500", pb: "10px" }}
          >
            Profile Picture
          </Typography>
          <Divider />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "15px",
              gap: "12px",
            }}
          >
            <img
              src={currentUser.profilePicture}
              alt="user avatar"
              width="100px"
              height="100px"
              style={{ borderRadius: "50%" }}
            />
            <Typography variant="subtitle1">
              Upload/Change Your Profile Image
            </Typography>
            <Button
              variant="contained"
              sx={{
                width: "fit-content",
                bgcolor: "#6a4ee9",
                color: "white",
                textTransform: "none",
              }}
            >
              Upload Avatar
            </Button>
          </Box>
        </Card>
        <Card
          sx={{
            borderRadius: "10px",
            border: "1px solid ",
            borderColor: theme.palette.text.secondary,
            padding: "20px",
            flexGrow: 1,
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "500", pb: "10px" }}
          >
            Edit Account Details
          </Typography>
          <Divider />
          <form>
            <FormControl sx={{ width: "100%", padding: "10px", gap: "20px" }}>
              <CssTextField
                label="Name"
                variant="filled"
                type="text"
                value={currentUser.username}
              />
              <CssTextField
                label="Email address"
                variant="filled"
                type="email"
                value={currentUser.email}
              />
              <CssTextField label="Password" variant="filled" type="password" />
              <Button
                variant="contained"
                sx={{
                  width: "fit-content",
                  bgcolor: "#6a4ee9",
                  color: "white",
                  textTransform: "none",
                }}
              >
                Change Details
              </Button>
            </FormControl>
          </form>
        </Card>
      </Box>
    </Paper>
  );
};

export default Profile;
