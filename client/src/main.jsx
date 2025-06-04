import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import Usercontext from "./context/Usercontext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Captaincontext from "./context/Captaincontext.jsx";
import SocketProvider from "./context/SocketContext.jsx";

const rootElement = document.getElementById("root");

const root = createRoot(rootElement);

root.render(

    <Captaincontext>
      <Usercontext>
       <SocketProvider>
         <BrowserRouter>
          <ToastContainer position="top-center" />
          <App />
         </BrowserRouter>
       </SocketProvider>
      </Usercontext>
    </Captaincontext>

);
