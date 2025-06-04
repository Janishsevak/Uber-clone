import React, { useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserDataContext } from "../context/Usercontext";


function UserLogin() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [ userData, setUserData ] = useState({})

  const { user, setUser } = useContext(UserDataContext)
  const navigate = useNavigate();

  const submithandler = async (e) => {
    e.preventDefault();
    const user = {
      email,
      password
    };

    try {
      console.log("Sending login request:", user);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/user/login`,
        user,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: false,
        }
        
      );
      console.log("Response from server:", response.data);
      if (response.data.success) {
        const { token, user } = response.data;
        setUser(user);
        localStorage.setItem('userId', user._id);
        console.log("User data:", user);
        localStorage.setItem('token', token);
        toast.success(response.data.message);
        setTimeout(() => navigate('/userhome'), 300); 
        
        console.log(response.data.success); // Check if success is true
         // ✅ will now be defined
        
      
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
        <img
          className="w-16 mb-10"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s"
          alt=""
        />
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
        <p className="text-center"> New here?  <Link to ='/signup' className="text-blue-600 font-semibold">Create an Account</Link> </p>
      </div>
      <div>
        <Link to="/cap-login" className="bg-yellow-200 flex items-center justify-center text-black font-semibold py-2 mt-4 rounded-md w-full text-xl">
        Sign in as Captain
        </Link>
      </div>
    </div>
  );
}

export default UserLogin;
