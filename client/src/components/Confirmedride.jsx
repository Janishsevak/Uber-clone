import React from "react";

const Confirmedride = (props) => {
  return (
    <div>
      <h3
        onClick={() => {
          props.setconfirmedridepanel(false);
        }}
        className="text-3xl text-center mb-3"
      >
        <i className="ri-skip-down-line"></i>
      </h3>
      <h3 className="text-2xl font-semibold mb-5">Confirmed your ride</h3>
      <div className="flex gap-2 justify-between items-center flex-col">
        <img
          className="h-20"
          src={props.vehicleimage}
          alt={props.selectedVehicle}
        />
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className=" text-lg ri-map-pin-fill"></i>
            <div>
              <h3 className="text-lg font-medium">Pick-up</h3>
              <p className="text-md text-gray-600 -mt-1 ">
                {props.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
          <i className=" text-lg ri-map-pin-fill"></i>
            <div>
              <h3 className="text-lg font-medium">Destination</h3>
              <p className="text-md text-gray-600 -mt-1 ">
                {props.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 ">
          <i className="ri-money-rupee-circle-line"></i>
            <div>
              <h3 className="text-lg font-medium">₹{props.fare?.[props.selectedVehicle]?.toFixed(2) || "0.00"}</h3>
              <p className="text-sm text-gray-600 -mt-1 ">
               Cash
              </p>
            </div>
          </div>
        </div>

        <button onClick={()=>{
          props.setvehiclefound(true)
          props.setvehiclepanel(false)
          props.setlookingfordriverpanel(true)
          props.createRide()
        }}
           className="w-full mt-5 bg-green-600 font-semibold text-white p-2 rounded-lg">
          Confirmed
        </button>
      </div>
    </div>
  );
};

export default Confirmedride;
