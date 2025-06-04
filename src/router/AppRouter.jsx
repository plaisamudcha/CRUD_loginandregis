import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "../components/Layout";
import Post from "../pages/Post";
import CreatePost from "../pages/CreatePost";
import Login from "../pages/Login";
import Register from "../pages/Register";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Post />} />
          <Route path="createpost" element={<CreatePost />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<p>Page Not Found</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
