import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
const GoogleAuth = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = async () => {
    provider.setCustomParameters({
      prompt: "select_account",
    });
    try {
      const result = await signInWithPopup(auth, provider);
      const res = await fetch("/api/v1/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      variant="outlined"
      sx={{
        color: "#282424",
        ":hover": {
          background: "linear-gradient(45deg, #6a4ee9 30%, #ff0081 90%)",
          color: "white",
        },
        border: "3px solid transparent",
        borderImage: "linear-gradient(45deg,  #6a4ee9,#ff0081) 1",
        fontSize: "14px",
        gap: "10px",
      }}
      onClick={handleClick}
    >
      <GoogleIcon sx={{ fontSize: "20px" }} />
      <span> Continue with Google</span>
    </Button>
  );
};

export default GoogleAuth;
