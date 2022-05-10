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
import SignUp from "./pages/sign-up/SignUp";
import User from "./pages/user/User";
import WelcomePage from "./pages/welcome-page/WelcomePage";

function App() {
  const { token } = useSelector((state) => state.user);

  return (
    <Router>
      <Navbar />
      <div className="routes-wrapper">
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
          <Route
            path="/posts"
            element={token ? <Posts /> : <Navigate to="/login" />}
          />
          <Route
            path="/posts/:id"
            element={token ? <Post /> : <Navigate to="/login" />}
          />
          <Route
            path="/users/:id"
            element={token ? <User /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
