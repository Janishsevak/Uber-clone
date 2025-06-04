import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CaptainLogin from "./pages/CaptainLogin";
import UserLogin from "./pages/UserLogin";
import UserSignUp from "./pages/UserSignUp";
import CaptainSignup from "./pages/CaptainSignup";
import { UserDataContext } from "./context/Usercontext";
import Userprotectedwrapper from "./pages/Userprotectedwrapper";
import Captainprotectedwrapper from "./pages/Captainprotectedwrapper";
import UserHome from "./pages/UserHome";
import Riding from "./pages/Riding";
import CaptainHome from "./pages/CaptainHome";
import Captainriding from "./pages/Captainriding";


const App = () => {
  const ans = useContext(UserDataContext);
  console.log(ans);
  return (
    <div>
      <Routes>
        <Route path="/login" element={<UserLogin />} />
        <Route
          path="/home"
          element={
            <Userprotectedwrapper key={localStorage.getItem('token')}>
              <Home />
            </Userprotectedwrapper>
          }
        />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/cap-login" element={<CaptainLogin />} />
        <Route
          path="/userhome"
          element={
            <Userprotectedwrapper>
              <UserHome />
            </Userprotectedwrapper>
          }
        />
        <Route path="/riding" element={<Riding />} />
        <Route path="/captain-riding" element={<Captainriding />} />
        <Route path="/cap-signup" element={<CaptainSignup />} />
        <Route
          path="/captain-home"
          element={
            <Captainprotectedwrapper>
              <CaptainHome />
            </Captainprotectedwrapper>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
