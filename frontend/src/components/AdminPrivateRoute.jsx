import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { getTokenFromCookie } from "../utils/utils";

const AdminPrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.user);
  const token = getTokenFromCookie();
  console.log(token);
  return currentUser && currentUser?.isAdmin && token !== "" ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default AdminPrivateRoute;
