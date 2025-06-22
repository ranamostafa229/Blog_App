import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInFailure, signInStart, signInSuccess } from "../redux/userSlice";
import GoogleAuth from "../components/GoogleAuth";
import AuthImg from "../components/AuthImg";
import { CssTextField } from "./SignUp";

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { loading, error } = useSelector((state) => state.user) || {};
  const { theme } = useSelector((state) => state.theme);
  const isDarkMode = theme === "dark";
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInFailure(null));
      dispatch(signInStart());
      const res = await fetch("/api/v1/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      if (res.ok) {
        console.log(data);
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
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
          <Typography variant="h4" sx={{ fontWeight: "500", fontSize: "40px" }}>
            Hey,<strong style={{ color: "#6a4ee9" }}> Welcome back!</strong> 👋
          </Typography>
        </Box>
        <Typography
          variant="subtitle1"
          sx={{
            fontSize: "18px",
            width: {
              xs: "95%",
              md: "45%",
            },
            textAlign: "center",
          }}
        >
          Sign In into your <b>account</b> for full access:
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

            <Button
              variant="contained"
              sx={{
                bgcolor: "#6a4ee9",
                ":hover": { bgcolor: "#000000" },
                width: "90%",
                textTransform: "none",
                gap: "10px",
              }}
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <CircularProgress
                    sx={{
                      color: "white",
                    }}
                  />
                  Loading...
                </>
              ) : (
                "Login"
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
              Don&apos;t have an account yet?
              <Link
                to="/signup"
                style={{
                  textDecoration: "underline",
                  cursor: "pointer",
                  color: `${isDarkMode ? "#B2BAC2" : "#282424"}`,
                  fontWeight: "bold",
                }}
              >
                Sign Up
              </Link>
            </Typography>
            {error && (
              <Alert
                severity="error"
                sx={{
                  width: "55ch",
                  justifyContent: "center",
                }}
              >
                {error}
              </Alert>
            )}
          </FormControl>
        </form>
      </Box>
    </Box>
  );
};

export default SignIn;
