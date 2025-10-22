import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import SettingPage from "./pages/SettingPage";
import ProfilePage from "./pages/ProfilePage";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./slices/auth/slice.auth.thunk.js";
import { useEffect } from "react";

const App = () => {
  const user = useSelector((state)=>{state.auth.authUser})
  // this fun gives you function where you can dispatch the action(what you want to do)
  const dispatch = useDispatch();
  useEffect(() => {
     dispatch(checkAuth())
  }, [checkAuth]);
  console.log(user);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SettingPage" element={<SettingPage />} />
        <Route path="/ProfilePage" element={<ProfilePage />} />
      </Routes>
    </>
  );
};

export default App;
