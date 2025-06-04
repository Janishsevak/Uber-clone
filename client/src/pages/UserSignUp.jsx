import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import toast from "react-hot-toast";
import { UserDataContext } from "../context/Usercontext"

function UserSignUp() {
  const [email, setemail] = useState("");
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [password, setpassword] = useState("");
  const [usedata, setusedata] = useState("");

  const navigate = useNavigate();

  const { user , setuser} = useContext(UserDataContext)

  const submithandler = async (e) => {
    e.preventDefault();
    const newuser = {
      email: email,
      password: password,
      fullname:{
       firstname:firstname,
       lastname:lastname,
      } 
    }
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/register`,newuser,{
        headers:{
        'Content-Type':'application/json'
      },
      withCredentials:true});

      if(response.data.success){
        const data = response.data
        setuser(data.user)
        localStorage.setItem('token',data.token)
        navigate("/login");
        toast.success(response.data.message);
    }
    console.log(usedata);
    setemail("");
    setpassword("");
    setfirstname("");
    setlastname("");
    
  };
  

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
          <h3 className="text-lg font-medium mb-2">What's your Name</h3>
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

          <h3 className="text-lg font-medium mb-2">What's your email</h3>
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

          <h3 className="text-lg font-medium mb-2">What's your password</h3>
          <input
            required
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            className="bg-gray-100 rounded px-4 py-2 border-rounded- border-2 w-full text-lg"
            type="password"
            placeholder="Enter your password"
          />
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

export default UserSignUp;
