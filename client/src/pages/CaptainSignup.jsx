import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { CaptainDatacontext } from '../context/Captaincontext';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CaptainSignup() {
  const [email, setemail] = useState("");
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [password, setpassword] = useState("");
  const [ vehicleColor, setVehicleColor ] = useState('')
  const [ vehiclePlate, setVehiclePlate ] = useState('')
  const [ vehicleCapacity, setVehicleCapacity ] = useState('')
  const [ vehicleType, setVehicleType ] = useState('')
  const navigate = useNavigate();

  const {captain,setCaptain} = React.useContext(CaptainDatacontext)

  const submithandler = async (e) => {
    e.preventDefault();
    const captainData = {
      fullname: {
        firstname: firstname,
        lastname: lastname
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType
      }
    }
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/captain/captain-register`, captainData)
    if (response.data.success) {
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      toast.success(response.data.message);
      navigate('/cap-login')
    }
   
    setemail('')
    setfirstname('')
    setlastname('')
    setpassword('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleCapacity('')
    setVehicleType('')
  }
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s"
          alt=""
        />
        <form
          onSubmit={(e) => {
            submithandler(e);
          }}
        >
          <h3 className="text-lg font-medium mb-2">What's our Captain Name</h3>
          <div className="flex gap-3 mb-3">
            <input
              required
              value={firstname}
              onChange={(e) => {
                setfirstname(e.target.value);
              }}
              className="bg-gray-100 w-1/2 rounded px-4 py-3 mb-3 border-rounded- border-2  text-lg"
              type="text"
              placeholder="Firstname"
            />

            <input
              required
              value={lastname}
              onChange={(e) => {
                setlastname(e.target.value);
              }}
              className="bg-gray-100 w-1/2 rounded px-4 py-3 mb-3 border-rounded- border-2  text-lg"
              type="text"
              placeholder="Lastname"
            />
          </div>

          <h3 className="text-lg font-medium mb-2">What's our Captain email</h3>
          <input
            required
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
            className="bg-gray-100 rounded px-4 py-3 mb-3 border-rounded- border-2 w-full text-lg"
            type="email"
            placeholder="Enter your email"
          />

          <h3 className="text-lg font-medium mb-2"> Enter password</h3>
          <input
            required
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            className="bg-gray-100 rounded px-4 py-2 mb-3 border-rounded- border-2 w-full text-lg"
            type="password"
            placeholder="Enter your password"
          />

          <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
          <div>
          <div className="flex gap-3 mb-3">
            <input
              required
              value={vehicleColor}
              onChange={(e) => {
                setVehicleColor(e.target.value);
              }}
              className="bg-gray-100 w-1/2 rounded px-4 py-3 mb-3 border-rounded- border-2  text-lg"
              type="text"
              placeholder="Vehicle Color"
            />

            <input
              required
              value={vehiclePlate}
              onChange={(e) => {
                setVehiclePlate(e.target.value);
              }}
              className="bg-gray-100 w-1/2 rounded px-4 py-3 mb-3 border-rounded- border-2  text-lg"
              type="text"
              placeholder="Vehicle plate"
            />
            </div>
            <div className='flex gap-4 mb-7'>
             <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="number"
              placeholder='Vehicle Capacity'
              value={vehicleCapacity}
              onChange={(e) => {
                setVehicleCapacity(e.target.value)
              }}
            />
            <select
            required
            className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-md placeholder:text-base'
            value={vehicleType}
            onChange={(e) => {
              setVehicleType(e.target.value)
            }}
            >
              <option value="" disabled>Select Vehicle type </option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>

            </div>
          </div>








          <button className="bg-black text-white font-semibold py-2 mt-4 mb-3 rounded-md w-full text-xl">
            Signup
          </button>
        </form>
        <p className="text-center"> Already have a account? <Link to="/login" className="text-blue-600 font-semibold">Login here</Link></p>
      </div>
      <div>
          <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
            Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
        </div>
    </div>
  );
}


export default CaptainSignup

