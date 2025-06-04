import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { CaptainDatacontext } from '../context/Captaincontext';

function CaptainLogin() {
  const [email,setemail] = useState("");
  const [password,setpassword] = useState("");
  const { captain, setCaptain } = useContext(CaptainDatacontext);

  const navigate = useNavigate();

  const submithandler = async (e)=>{
    e.preventDefault();
    const captaindata = {
      email:email,
      password:password
    }   
    try {
          const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/api/captain/cap-login`,
            captaindata,
            {
              headers: { 'Content-Type': 'application/json' },
              // withCredentials: true,
            }
          );
      
          if (response.data.success) {
            const { token, captain } = response.data;
            setCaptain(captain);
            console.log("Captain data:", captain);
            localStorage.setItem('token', token);
            navigate('/captain-home');
            toast.success(response.data.message);

            console.log(response.data.success); // Check if success is true
          
          }
           else {
            toast.error(response.data.message); 
          }
        } catch (error) {
          // Handle HTTP errors (like 400, 500)
          const message = error.response?.data?.message;
          toast.error(message);
        }
      
        setemail("");
        setpassword("");
      };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
      <img className='w-20 mb-3' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />
        <form onSubmit={(e)=>{
          submithandler(e)
        }} >
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            required
            value={email}
            onChange={(e)=>{
              setemail(e.target.value)
            }}
            className="bg-gray-100 rounded px-4 py-3 mb-3 border-rounded- border-2 w-full text-lg"
            type="email"
            placeholder="Enter your email"
          />

          <h3 className="text-lg font-medium mb-2">What's your password</h3>
          <input
            required
            value={password}
            onChange={(e)=>{
              setpassword(e.target.value)
            }}
            className="bg-gray-100 rounded px-4 py-2 border-rounded- border-2 w-full text-lg"
            type="password"
            placeholder="Enter your password"
          />
          <button className="bg-black text-white font-semibold py-2 mt-4 mb-3 rounded-md w-full text-xl">
            Login
          </button>
          
        </form>
        <p className="text-center"> join a fleet?  <Link to ='/cap-signup' className="text-blue-600 font-semibold">Register as a Captain</Link> </p>
      </div>
      <div>
        <Link to="/login" className="bg-yellow-200 flex items-center justify-center text-black font-semibold py-2 mt-4 rounded-md w-full text-xl">
        Sign in as User
        </Link>
      </div>
    </div>
  );
}

export default CaptainLogin
