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
import BgImg from "../assets/signupbg.png";
import GoogleIcon from "@mui/icons-material/Google";
import { useState } from "react";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#A0AAB4",
    bgcolor: "red",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiFilledInput-root": {
    backgroundColor: "white",
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
});

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
      <Box
        sx={{
          flexGrow: 1,
          width: "30%",
          display: {
            xs: "none",
            md: "flex",
          },
          flexDirection: "column",
        }}
      >
        <img
          src={BgImg}
          alt="image"
          style={{
            objectFit: "cover",
            height: "100vh",
            position: "relative",
          }}
        />
        <Button
          variant="contained"
          size="large"
          sx={{
            position: "absolute",
            bgcolor: "#000000",
            // ":hover": { bgcolor: "#000000" },
            top: "6%",
            left: "5%",
          }}
          onClick={() => navigate("/")}
        >
          Go back to home
        </Button>
      </Box>
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
              sx={{
                "& .MuiFilledInput-root": {},
              }}
              name="username"
              value={formData.username}
              onChange={(e) => handleChange(e)}
              required
            />
            <CssTextField
              label="Enter your Email"
              variant="filled"
              type="email"
              sx={{
                "& .MuiFilledInput-root": {},
              }}
              name="email"
              value={formData.email}
              onChange={(e) => handleChange(e)}
              required
            />
            <CssTextField
              label="Password"
              variant="filled"
              type="password"
              sx={{
                "& .MuiFilledInput-root": {},
              }}
              name="password"
              value={formData.password}
              onChange={(e) => handleChange(e)}
              required
            />
            <CssTextField
              label="Confirm Password"
              variant="filled"
              type="password"
              sx={{
                "& .MuiFilledInput-root": {},
              }}
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
              <Button
                variant="outlined"
                sx={{
                  color: "#282424",
                  ":hover": {
                    background:
                      "linear-gradient(45deg, #6a4ee9 30%, #ff0081 90%)",
                    color: "white",
                  },
                  border: "3px solid transparent",
                  borderImage: "linear-gradient(45deg,  #6a4ee9,#ff0081) 1",
                  fontSize: "14px",
                  gap: "10px",
                }}
              >
                <GoogleIcon sx={{ fontSize: "20px" }} />
                <span> Continue with Google</span>
              </Button>
            </Typography>
            <Typography variant="subtitle1" sx={{}}>
              Already have an account?{" "}
              <Link
                to="/signin"
                style={{
                  textDecoration: "underline",
                  cursor: "pointer",
                  color: "#282424",
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
