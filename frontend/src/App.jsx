import Navbar from "./components/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import SettingPage from "./pages/SettingPage";
import ProfilePage from "./pages/ProfilePage";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./slices/auth/slice.auth.thunk.js";
import { Loader } from "lucide-react";
import { useEffect } from "react";

const App = () => {
  const { isCheckingAuth, authUser } = useSelector((state) => state.auth);
  
  // this fun gives you function where you can dispatch the action(what you want to do)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/Login" />}
        />
        <Route
          path="/SignUp"
          element={!authUser ? <SignUp /> : <Navigate to="/" />}
        />
        <Route
          path="/Login"
          element={!authUser ? <Login /> : <Navigate to="/" />}
        />
        <Route path="/SettingPage" element={<SettingPage />} />
        <Route
          path="/ProfilePage"
          element={authUser ? <ProfilePage /> : <Navigate to="/Login" />}
        />
      </Routes>
    </>
  );
};

export default App;
