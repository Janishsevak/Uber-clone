import React, { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import Locationsearchpanel from "../components/Locationsearchpanel";
import Vehiclepanel from "../components/Vehiclepanel";
import Confirmedride from "../components/Confirmedride";
import Lookingfordriver from "../components/Lookingfordriver";
import Waitingfordriver from "../components/Waitingfordriver";
import axios from "axios";
import { SocketContext } from "../context/SocketContext";
import { UserDataContext } from "../context/Usercontext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Livetracking from "../components/Livetracking";

export default function UserHome() {
  const [pickup, setpickup] = useState("");
  const [destination, setdestination] = useState("");
  const [panelopen, setpenalopen] = useState(false);
  const panelref = useRef(null);
  const [vehiclepanel, setvehiclepanel] = useState(false);
  const vehiclepanelref = useRef(null);
  const [confirmedridepanel, setconfirmedridepanel] = useState(false);
  const confirmedrideref = useRef(null);
  const [vehiclefound, setvehiclefound] = useState(false);
  const vehiclefoundref = useRef(null);
  const [waitingfordriver, setwaitingfordriver] = useState(false);
  const waitingfordriverref = useRef(null);
  const lookingfordriverpanelref = useRef(null);
  const [lookingfordriverpanel, setlookingfordriverpanel] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState({});
  const [vehicleimage, setvehicleimage] = useState(null);
  const [ride, setRide] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);

  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user._id });
  }, [user])

  socket.on("rideConfirmed",ride => {
    setvehiclepanel(false);
    setwaitingfordriver(true);
    setRide(ride);
  });

  socket.on("rideStarted", populatedRide => {
    console.log("populatedRide", populatedRide);
    navigate("/riding",{state: {populatedRide} });
    setwaitingfordriver(false);
     // Updated navigate to include ride data
  });

  socket.on("rideEnded", () => {
    navigate("/userhome");
  });

  async function createRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/ride/create`,
      {
        pickup,
        destination,
        vehicleType: selectedVehicle,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log("Ride created:", response.data);
  }

  const handlePickupChange = async (e) => {
    setpickup(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/maps/get-suggestions`,
        {
          params: { address: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPickupSuggestions(response.data.suggestions);
    } catch (error) {
      console.error("Error fetching pickup suggestions:", error);
    }
  };

  const handleDestinationChange = async (e) => {
    setdestination(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/maps/get-suggestions`,
        {
          params: { address: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setDestinationSuggestions(response.data.suggestions);
    } catch (error) {
      console.error("Error fetching destination suggestions:", error);
    }
  };

  const submithandler = (e) => {
    e.preventDefault();
  };

  useGSAP(
    function () {
      if (panelopen) {
        gsap.to(panelref.current, {
          height: "70%",
          padding: 20,
         
        });
      } else {
        gsap.to(panelref.current, {
          height: "0%",
          padding: 20,
          
        });
      }
    },
    [panelopen]
  );
  useEffect(() => {
    if (vehiclepanel) {
      gsap.to(vehiclepanelref.current, {
        y: 0,
        duration: 0.4,
        ease: "power3.out",
      });
    } else {
      gsap.to(vehiclepanelref.current, {
        y: "100%",
        duration: 0.4,
        ease: "power3.in",
      });
    }
  }, [vehiclepanel]);

  useEffect(() => {
    if (confirmedridepanel) {
      gsap.to(confirmedrideref.current, {
        y: 0,
        duration: 0.4,
        ease: "power3.out",
      });
    } else {
      gsap.to(confirmedrideref.current, {
        y: "100%",
        duration: 0.4,
        ease: "power3.in",
      });
    }
  }, [confirmedridepanel]);

  useEffect(() => {
    if (vehiclefound) {
      gsap.to(vehiclefoundref.current, {
        y: 0,
        duration: 0.4,
        ease: "power3.out",
      });
    } else {
      gsap.to(vehiclefoundref.current, {
        y: "100%",
        duration: 0.4,
        ease: "power3.in",
      });
    }
  }, [vehiclefound]);

  useEffect(() => {
    if (waitingfordriver) {
      gsap.to(waitingfordriverref.current, {
        y: 0,
        duration: 0.4,
        ease: "power3.out",
      });
    } else {
      gsap.to(waitingfordriverref.current, {
        y: "100%",
        duration: 0.4,
        ease: "power3.in",
      });
    }
  }, [waitingfordriver]);

  useEffect(() => {
    if (lookingfordriverpanel) {
      gsap.to(lookingfordriverpanelref.current, {
        y: 0,
        duration: 0.4,
        ease: "power3.out",
      });
    } else {
      gsap.to(lookingfordriverpanelref.current, {
        y: "100%",
        duration: 0.4,
        ease: "power3.in",
      });
    }
  }, [lookingfordriverpanel]);

  async function findtrip() {
    setvehiclepanel(true);
    setpenalopen(false);
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/ride/get-fare`,
      {
        pickup,
        destination,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log("Fare response:", response.data);
    setFare(response.data.allfare);
  }
  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt=""
      />  

      <div
        onClick={() => {
          setvehiclepanel(false);
        }}
        className="h-screen w-screen"
      >
        <Livetracking/>
      </div>

      <div className="h-screen flex flex-col justify-end absolute top-0 w-full">
        <div className="h-[30%] p-6 bg-white relative ">
          <h5
            onClick={() => {
              setpenalopen(false);
            }}
            className="absolute top-6 right-6 text-2xl"
          >
            <i className="ri-arrow-down-s-line"></i>
          </h5>

          <h4 className="text-3xl font-semibold">Find a trip</h4>
          <form
            onSubmit={(e) => {
              submithandler(e);
            }}
          >
            <div className="line absolute h-20 w-1 top-[45%] left-10 bg-black rounded-full"></div>
            <input
              onClick={() => {
                setpenalopen(true);
                setActiveField("pickup");
              }}
              value={pickup}
              onChange={handlePickupChange}
              className="bg-gray-200 px-12 py-2 text-base font-bold rounded-lg w-full mt-5 shadow-lg "
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              onClick={() => {
                setpenalopen(true);
                setActiveField("destination");
              }}
              value={destination}
              onChange={handleDestinationChange}
              className="bg-gray-200 px-12 py-2 text-base font-bold rounded-lg w-full mt-4 shadow-lg"
              type="text"
              placeholder="Add a Destination location"
            />
          </form>
          <button
            onClick={findtrip}
            className="text-white bg-black text-xl mt-3 mb-3 w-full rounded-md p-2 "
          >
            Find trip{" "}
          </button>
        </div>

        <div ref={panelref} className="h-[70%] p-5 bg-white shadow-lg"> 
          <Locationsearchpanel
            suggestions={
              activeField === "pickup"
                ? pickupSuggestions
                : destinationSuggestions
            }
            activefield={activeField}
            setpenalopen={setpenalopen}
            setpickup={setpickup}
            setdestination={setdestination}
            setvehiclepanel={setvehiclepanel}
            setactivefield={setActiveField}
          />
        </div>
      </div>
      <div
        ref={vehiclepanelref}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12  "
      >
        <Vehiclepanel
          setconfirmedridepanel={setconfirmedridepanel}
          setvehiclepanel={setvehiclepanel}
          selectedVehicle={selectedVehicle}
          setSelectedVehicle={setSelectedVehicle}
          vehicleimage={vehicleimage}
          setvehicleimage={setvehicleimage}
          fare={fare}
        />
      </div>
      <div
        ref={confirmedrideref}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12  "
      >
        <Confirmedride
          setconfirmedridepanel={setconfirmedridepanel}
          setvehiclefound={setvehiclefound}
          setvehiclepanel={setvehiclepanel}
          selectedVehicle={selectedVehicle}
          destination={destination}
          pickup={pickup}
          vehicleimage={vehicleimage}
          fare={fare}
          createRide={createRide}
          setlookingfordriverpanel={setlookingfordriverpanel}
        />
      </div>
      <div
        ref={lookingfordriverpanelref}
        className="fixed w-full h-[520px] z-50 bottom-0 translate-y-full bg-white px-3 py-6 pt-8  "
      >
        <Lookingfordriver
          setvehiclefound={setvehiclefound}
          setvehiclepanel={setvehiclepanel}
          setlookingfordriverpanel={setlookingfordriverpanel}
          lookingfordriverpanel={lookingfordriverpanel}
          selectedVehicle={selectedVehicle}
          destination={destination}
          pickup={pickup}
          vehicleimage={vehicleimage}
          fare={fare}
        />
        <div
          ref={waitingfordriverref}
          className="fixed w-full z-10 bottom-0  bg-white px-3 py-6 pt-14  "
        >
          <Waitingfordriver
            waitingfordriver={waitingfordriver}
            ride={ride}
            setvehiclefound={setvehiclefound}
            setwaitingfordriver={setwaitingfordriver}
          />
        </div>
      </div>
    </div>
  );
}
