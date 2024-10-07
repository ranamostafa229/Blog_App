import { matchPath, useLocation } from "react-router-dom";
import Footer from "./Footer";

const RenderFooter = () => {
  const location = useLocation();
  const validPaths = [
    "/",
    "/search",
    "/post/:postId",
    "/categories",
    "/categories/:category",
  ];
  const showFooter = validPaths.some((path) =>
    matchPath(path, location.pathname)
  );
  return <>{showFooter && <Footer />}</>;
};

export default RenderFooter;
