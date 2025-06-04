import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import gsap from "gsap";
import Finishride from "../components/Finishride";
import Livetracking from "../components/Livetracking";

function Captainriding() {
  const [finishridePanel, setFinishridePanel] = useState(false);
  const finishridePanelref = useRef(null);
  const location = useLocation()
  const ride = location.state?.ride || {};

  useEffect(() => {
    if (finishridePanel) {
      gsap.to(finishridePanelref.current, {
        y: 0,
        duration: 0.4,
        ease: "power3.out",
      });
    } else {
      gsap.to(finishridePanelref.current, {
        y: "100%",
        duration: 0.4,
        ease: "power3.in",
      });
    }
  }, [finishridePanel]);
  return (
    <div className="h-screen">
      <div className="fixed p-3 top-0">
        <Livetracking/>
        <Link
          to="/captain-home"
          className="fixed h-10 w-10 top-2 right-2 bg-white flex items-center justify-center rounded-full"
        >
          <i className="ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-4/5">
        <img
          className="w-full h-full object-cover"
          src="https://www.medianama.com/wp-content/uploads/2018/06/Screenshot_20180619-112715.png.png"
          alt=""
        />
      </div>
      <div className="h-1/5 p-6 items-center bg-yellow-400 relative flex justify-between ">
     
        <h3 className="p-1 text-center w-[93%] absolute top-0">
          <i className=" text-3xl ri-skip-down-line"></i>
        </h3>
        <h4 className="text-xl font-semibold">4 km away</h4>
        <button
         className="bg-green-600 font-semibold text-white px-4 p-3 rounded-lg"
         onClick={() => setFinishridePanel(true)}>
         Complete Ride
         </button>
      </div>
      <div ref={finishridePanelref} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12 ">
        <Finishride setFinishridePanel={setFinishridePanel}
         ride={ride}/>

      </div>
    </div>
  );
}

export default Captainriding;
