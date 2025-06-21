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
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInFailure, signInStart, signInSuccess } from "../redux/userSlice";
import GoogleAuth from "../components/GoogleAuth";

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
const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { loading, error } = useSelector((state) => state.user) || {};

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
                  color: "#282424",
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
