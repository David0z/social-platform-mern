import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import NotFound from "./pages/404/NotFound";
import Login from "./pages/login/Login";
import Post from "./pages/post/Post";
import Posts from "./pages/posts/Posts";
import SignUp from "./pages/sign-up/SignUp";
import User from "./pages/user/User";
import WelcomePage from "./pages/welcome-page/WelcomePage";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="routes-wrapper">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<Post />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
