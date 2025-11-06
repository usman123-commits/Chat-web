import Navbar from "./components/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import SettingPage from "./pages/SettingPage";
import ProfilePage from "./pages/ProfilePage";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./slices/auth/slice.auth.thunk.js";
import {connectSocketClient,disconnectSocketClient} from "./socket/socketClient.js";
import {registerSocketEvents} from "./socket/socketEvents.js";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

const baseUrl = import.meta.env.VITE_MODE=="development"?import.meta.env.VITE_BASE_URL_DEVELOPMENT:"/";
const App = () => {
  // selecting states from auth slice
  const { isCheckingAuth, authUser } = useSelector((state) => state.auth);
  // selecting states from Theme slice
  const { theme } = useSelector((state) => state.theme);
  // this fun gives you function where you can dispatch the action(what you want to do)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, [checkAuth]);

   useEffect(() => {
    if (authUser) {
      const socket = connectSocketClient(baseUrl, authUser);
      registerSocketEvents(socket);
    } else {
      disconnectSocketClient();
    }
  }, [authUser]);
  // this is used when data is loading

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }
  return (
    <>
      <div data-theme={theme}>
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
        <Toaster />
      </div>
    </>
  );
};

export default App;
