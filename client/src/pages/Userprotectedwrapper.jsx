import React, { useEffect, useState,useContext} from "react";
import { UserDataContext } from "../context/Usercontext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Userprotectedwrapper = ({ children }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { user, setUser } = useContext(UserDataContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found, redirecting to login...");
      navigate("/login");
      return;
    }
     axios.get(`${import.meta.env.VITE_BASE_URL}/api/user/profile`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },withCredentials: true,
      })
      .then((response) => {
        console.log("API response:", response);
        if (response.status === 200) {
            setUser(response.data.user);
            console.log("User data:", response.data.user);
            setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("token");
        setIsLoading(false);
        navigate("/login");
      });
  }, [navigate, setUser]);

  if (isLoading) {
    return <div>Checking authentication...</div>;
  }
  return <> {children} </>;
};

export default Userprotectedwrapper;
