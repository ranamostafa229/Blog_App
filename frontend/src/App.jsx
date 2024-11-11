import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ExtendedWidthAppBar from "./components/Header/ExtendedWidthAppBar";
import Posts from "./pages/Posts";
import Post from "./pages/Post";
import Categories from "./pages/Categories";
import Category from "./pages/Category";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import RenderFooter from "./components/RenderFooter";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import DashboardContent from "./pages/DashboardContent";
import DashboardPosts from "./pages/DashboardPosts";
import AdminPrivateRoute from "./components/AdminPrivateRoute";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import DashboardUsers from "./pages/DashboardUsers";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ExtendedWidthAppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/search" element={<Posts />} />
        <Route path="/post/:postSlug" element={<Post />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:category" element={<Category />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="content" element={<DashboardContent />} />
            <Route path="profile" element={<Profile />} index />
            <Route path="posts" element={<DashboardPosts />} />
            <Route path="users" element={<DashboardUsers />} />
          </Route>
        </Route>
        <Route element={<AdminPrivateRoute />}>
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/edit-post/:postId" element={<EditPost />} />
        </Route>

        <Route path="/*" element={<NotFound />} />
      </Routes>
      <RenderFooter />
    </BrowserRouter>
  );
}

export default App;
