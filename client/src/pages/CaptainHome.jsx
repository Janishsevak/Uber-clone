import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Captaindetails from "../components/Captaindetails";
import Ridepopup from "../components/Ridepopup";
import  {useGSAP} from '@gsap/react';
import gsap from "gsap";
import Confirmedridepopup from "../components/Confirmedridepopup";
import 'remixicon/fonts/remixicon.css'
import { useContext } from "react";
import { CaptainDatacontext } from "../context/Captaincontext";
import { SocketContext } from "../context/SocketContext";
import axios from "axios";


const CaptainHome = () => {
  const [ridepopuppanel,setridepopuppanel] = useState(false)
  const ridepopuppanelref = useRef(null);
  const [Confirmedridepopuppanel,setConfirmedridepopuppanel] = useState(false)
  const Confirmedridepopuppanelref = useRef(null);
  const [ride, setride] = useState(null);
  const { captain } = useContext(CaptainDatacontext);
  const { socket } = useContext(SocketContext);

useEffect(()=>{
  socket.emit("join", { userType: "captain", userId: captain._id })

  const updateLocation = () => {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        socket.emit("update-location-captain", {
          userId: captain._id,
          location: { 
            lat: latitude, 
            lng: longitude },
        });
      });
    } 
  }
  const interval = setInterval(updateLocation, 1000)
  updateLocation();
},[])
  
socket.on("newRide", (data) => {
  console.log("New ride request received:", data);
  setridepopuppanel(true);
  setride(data);
})

async function confirmride() {
  const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/ride/acceptride`,{
    rideId: ride._id,
    captainId: captain._id,
  },{
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
  console.log("Ride accepted:", response.data);
  setridepopuppanel(false);
  setConfirmedridepopuppanel(true);
 
}   


  useEffect(() => {
    if (ridepopuppanel) {
      gsap.to(ridepopuppanelref.current, {
        y: 0,
        duration: 0.4,
        ease: "power3.out",
      });
    } else {
      gsap.to(ridepopuppanelref.current, {
        y: "100%",
        duration: 0.4,
        ease: "power3.in",
      });
    }
  }, [ridepopuppanel]);

  useEffect(() => {
    if (Confirmedridepopuppanel) {
      gsap.to(Confirmedridepopuppanelref.current, {
        y: 0,
        duration: 0.4,
        ease: "power3.out",
      });
    } else {
      gsap.to(Confirmedridepopuppanelref.current, {
        y: "100%",
        duration: 0.4,
        ease: "power3.in",
      });
    }
  }, [Confirmedridepopuppanel]);



  return (
    <div className="h-screen">
      <div className="fixed p-3 top-0">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <Link
          to="/userhome"
          className="fixed h-10 w-10 top-2 right-2 bg-white flex items-center justify-center rounded-full"
        >
          <i className="ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-3/5">
        <img
          className="w-full h-full object-cover"
          src="https://www.medianama.com/wp-content/uploads/2018/06/Screenshot_20180619-112715.png.png"
          alt=""
        />
      </div>
      <div className="h-2/5 p-6">
        <Captaindetails/>
      </div>
      <div ref={ridepopuppanelref}  className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-14  ">
        <Ridepopup 
          setridepopuppanel={setridepopuppanel} 
          setConfirmedridepopuppanel={setConfirmedridepopuppanel}
          ride={ride}
          confirmride={confirmride}/>
      </div>
      <div ref={Confirmedridepopuppanelref}  className="fixed h-screen w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-14  ">
        <Confirmedridepopup setConfirmedridepopuppanel={setConfirmedridepopuppanel} 
         setridepopuppanel={setridepopuppanel}
         confirmride={confirmride}
         ride={ride}  />
      </div>
    </div>
  );
};

export default CaptainHome;
