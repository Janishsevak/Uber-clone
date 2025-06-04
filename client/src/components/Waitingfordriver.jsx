import React from "react";

function Waitingfordriver(props) {
  return (
    <div>
      <h3
        onClick={() => {
          props.setwaitingfordriver(false);
        }}
        className="text-3xl text-center mb-3"
      >
        <i className="ri-skip-down-line"></i>
      </h3>
      <div className="flex items-center justify-between">
        <img
          className="h-12"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkrqh-tdo6G74wgxIGoFQYk4owC0X5vrXUZA&s"
          alt=""
        />
        <div className="text-right mr-6">
          <h2 className="text-lg font-medium ">{props.ride?.captain?.fullname?.firstname ?? "Unknown"} {props.ride?.captain?.fullname?.lastname ?? "User"}</h2>
          <h4 className="text-xl font-semibold -mt-1 -mb-1">{props.ride?.captain.vehicle.plate}</h4>
          <p className="text-sm text-gray-600">Swift Dzire</p>
          <h1 className="text-lg font-medium ">{props.ride?.otp}</h1>
        </div>
      </div>

      <div className="flex gap-2 justify-between items-center flex-col">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className=" text-lg ri-map-pin-fill"></i>
            <div>
              <h3 className="text-lg font-medium">Pickup</h3>
              <p className="text-sm text-gray-600 -mt-1 ">
                {props.ride?.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className=" text-lg ri-map-pin-fill"></i>
            <div>
              <h3 className="text-lg font-medium">Destination</h3>
              <p className="text-sm text-gray-600 -mt-1 ">
                {props.ride?.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 ">
            <i className="ri-money-rupee-circle-line"></i>
            <div>
              <h3 className="text-lg font-medium">{props.ride?.fare}</h3>
              <p className="text-sm text-gray-600 -mt-1 ">Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Waitingfordriver;
