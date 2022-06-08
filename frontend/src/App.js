import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/navbar/Navbar";
import NotFound from "./pages/404/NotFound";
import Login from "./pages/login/Login";
import Post from "./pages/post/Post";
import Posts from "./pages/posts/Posts";
import PostsAll from "./pages/posts/PostsAll";
import PostsHot from "./pages/posts/PostsHot";
import SignUp from "./pages/sign-up/SignUp";
import User from "./pages/user/User";
import WelcomePage from "./pages/welcome-page/WelcomePage";
import ScrollToTop from "./components/scroll-to-top/scrollToTop";
import Hashtag from "./pages/hashtag/Hashtag";
import Hashtags from "./pages/hashtags/Hashtags";

function App() {
  const { token } = useSelector((state) => state.user);

  return (
    <Router>
      <Navbar />
      <div className="routes-wrapper">
        <ScrollToTop />
        <Routes>
          <Route
            path="/"
            element={!token ? <WelcomePage /> : <Navigate to="/posts" />}
          />
          <Route
            path="/login"
            element={!token ? <Login /> : <Navigate to="/posts" />}
          />
          <Route
            path="/sign-up"
            element={!token ? <SignUp /> : <Navigate to="/posts" />}
          />
          <Route path="/posts" element={<Posts />}>
            <Route path="/posts" element={<PostsAll />} />
            <Route path="/posts/hot/6" element={<PostsHot hotNumber={6} />} />
            <Route path="/posts/hot/12" element={<PostsHot hotNumber={12} />} />
            <Route path="/posts/hot/24" element={<PostsHot hotNumber={24} />} />
          </Route>
          <Route path="/posts/:id" element={<Post />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/hashtags" element={<Hashtags />} />
          <Route path="/hashtags/:tagName" element={<Hashtag />} />
          <Route
            path="/followed"
            element={token ? <h1>Followed Users</h1> : <Navigate to="/login" />}
          />
          <Route
            path="/messages"
            element={token ? <h1>Messages</h1> : <Navigate to="/login" />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
