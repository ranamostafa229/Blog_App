import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = Cookies.get("access_token");
    setToken(token);
    console.log(token);
  }, [token]);

  return currentUser ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
