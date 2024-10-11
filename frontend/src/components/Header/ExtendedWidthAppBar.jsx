import { Toolbar } from "@mui/material";
import Header from "./Header";
import { useLocation, matchPath } from "react-router-dom";

const ExtendedWidthAppBar = (props) => {
  const location = useLocation();
  const validPaths = [
    "/",
    "/search",
    "/post/:postId",
    "/categories",
    "/categories/:category",
    "/dashboard",
  ];
  const showHeader = validPaths.some((path) =>
    matchPath(path, location.pathname)
  );
  return (
    <>
      {showHeader && (
        <>
          <Header {...props} />
          <Toolbar />
        </>
      )}
    </>
  );
};

export default ExtendedWidthAppBar;
