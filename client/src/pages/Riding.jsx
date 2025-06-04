import React from "react";
import{ Link, useLocation, useNavigate } from "react-router-dom"


const Riding = () => {
  const location = useLocation()
  const ride = location.state?.populatedRide || {};


  
  return (
    <div className="h-screen">
        <Link to ="/userhome"  className="fixed h-10 w-10 top-2 right-2 bg-white flex items-center justify-center rounded-full">
          <i className=" text-lg font-medium ri-home-7-fill"></i>
        </Link>

        
      <div className="h-1/2">
        <img
          className="w-full h-full object-cover"
          src="https://www.medianama.com/wp-content/uploads/2018/06/Screenshot_20180619-112715.png.png"
          alt=""
        />
      </div>
      <div className="h-1/2 p-4">
        <div className="flex items-center justify-between">
          <img
            className="h-12"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkrqh-tdo6G74wgxIGoFQYk4owC0X5vrXUZA&s"
            alt=""
          />
          <div className="text-right mr-6">
            <h2 className="text-lg font-medium ">{ride?.captain?.fullname.firstname}</h2>
            <h4 className="text-xl font-semibold -mt-1 -mb-1">{ride?.captain?.vehicle.plate}</h4>
            <p className="text-sm text-gray-600">Swift Dzire</p>
          </div>
        </div>

        <div className="flex gap-2 justify-between items-center flex-col">
          <div className="w-full mt-5">
            <div className="flex items-center gap-5 p-3 border-b-2">
              <i className=" text-lg ri-map-pin-fill"></i>
              <div>
                <h3 className="text-lg font-medium">Pickup</h3>
                <p className="text-sm text-gray-600 -mt-1 ">
                  {ride?.pickup}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5 p-3 ">
              <i className="ri-money-rupee-circle-line"></i>
              <div>
                <h3 className="text-lg font-medium">{ride?.fare}</h3>
                <p className="text-sm text-gray-600 -mt-1 ">Cash</p>
              </div>
            </div>
          </div>
        </div>
        <button className="w-full mt-5 bg-green-600 font-semibold text-white p-2 rounded-lg">Make a payment</button>
      </div>
    </div>
  );
};

export default Riding;
