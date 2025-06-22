import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import GoogleAuth from "../components/GoogleAuth";
import { useSelector } from "react-redux";
import AuthImg from "../components/AuthImg";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { theme } = useSelector((state) => state.theme);
  const isDarkMode = theme === "dark";
  const { currentUser } = useSelector((state) => state.user) || {};

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.confirmPassword !== formData.password) {
      setError("Password and confirm password do not match");
      return;
    }
    const dataTosend = { ...formData, confirmPassword: undefined };
    try {
      setError("");
      setLoading(true);
      const res = await fetch("/api/v1/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataTosend),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      if (res.ok) {
        navigate("/signin");
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        height: "100vh",
        color: "#121111",
      }}
    >
      {/* Left side */}
      <AuthImg />
      {/* Right side */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "30px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Typography variant="h4" sx={{ fontWeight: "500" }}>
            Join now to <strong style={{ color: "#6a4ee9" }}>DEVJOURNEY</strong>{" "}
            👋
          </Typography>
        </Box>
        <Typography
          variant="subtitle1"
          sx={{
            fontSize: "20px",
            width: {
              xs: "95%",
              md: "45%",
            },
            textAlign: "center",
          }}
        >
          Create an <b>account</b> for full access:
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormControl
            sx={{
              width: "55ch",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: "20px",
              justifyContent: "center",
            }}
          >
            <CssTextField
              label="Enter your Username"
              variant="filled"
              type="text"
              name="username"
              value={formData.username}
              onChange={(e) => handleChange(e)}
              required
            />
            <CssTextField
              label="Enter your Email"
              variant="filled"
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => handleChange(e)}
              required
            />
            <CssTextField
              label="Password"
              variant="filled"
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) => handleChange(e)}
              required
            />
            <CssTextField
              label="Confirm Password"
              variant="filled"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) => handleChange(e)}
              required
            />
            <Button
              variant="contained"
              type="submit"
              sx={{
                bgcolor: "#6a4ee9",
                ":hover": { bgcolor: "#000000" },
                width: "100%",
                textTransform: "none",
                gap: "10px",
              }}
              disabled={loading}
            >
              {loading ? (
                <>
                  <CircularProgress color="inherit" size={20} />{" "}
                  <span>Loading ...</span>
                </>
              ) : (
                "Get Started"
              )}
            </Button>
            <Typography
              variant="subtitle1"
              sx={{
                fontSize: "14px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              or
              <GoogleAuth />
            </Typography>
            <Typography variant="subtitle1" sx={{}}>
              Already have an account?{" "}
              <Link
                to="/signin"
                style={{
                  textDecoration: "underline",
                  cursor: "pointer",
                  color: `${isDarkMode ? "#B2BAC2" : "#282424"}`,
                  fontWeight: "bold",
                }}
              >
                Sign In
              </Link>
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
          </FormControl>
        </form>
      </Box>
    </Box>
  );
};

export default SignUp;

export const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#A0AAB4",
    bgcolor: "red",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiFilledInput-root": {
    backgroundColor: "white",
    color: "#121111",
    "& fieldset": {
      borderColor: "#E0E3E7",
    },
    "&:hover fieldset": {
      borderColor: "#B2BAC2",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6F7E8C",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#A0AAB4",
  },
});
