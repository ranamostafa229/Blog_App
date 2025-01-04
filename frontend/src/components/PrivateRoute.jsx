import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // const tokenValue = Cookies.get("access_token");
    const tokenValue = document.cookie.match(/access_token=([^;]*)/);
    setToken(tokenValue);
  }, []);
  console.log(token);
  console.log(document.cookie.match(/access_token=([^;]*)/));
  return currentUser ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
