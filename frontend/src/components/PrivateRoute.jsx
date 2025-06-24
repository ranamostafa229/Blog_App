import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { getTokenFromCookie } from "../utils/utils";
import { jwtDecode } from "jwt-decode";

const PrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.user) || {};
  const token = getTokenFromCookie();
  let isTokenValid = false;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert to seconds
      // Check if the token is expired (decoded.exp is in seconds)
      isTokenValid = decodedToken.exp > currentTime;
      // check if the user id matches the current user id
      if (isTokenValid) {
        isTokenValid = decodedToken.id === currentUser?._id;
      }
      console.log(isTokenValid, "Token is valid:", isTokenValid);
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  return currentUser && isTokenValid ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
