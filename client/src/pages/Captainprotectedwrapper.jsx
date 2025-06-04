import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Captaincontext, { CaptainDatacontext } from '../context/Captaincontext';
import axios from 'axios';

const Captainprotectedwrapper = ({children}) => {
    
    const token = localStorage.getItem('token')
    const navigate = useNavigate(); 
    const [ isLoading, setIsLoading ] = useState(true)
    const {captain,setCaptain} = useContext(CaptainDatacontext)

    
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log("TOKEN IN WRAPPER:", token);
        if (!token) {
          navigate('/cap-login')
        }
        axios.get(`${import.meta.env.VITE_BASE_URL}/api/captain/cap-profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            withCredentials: true,
        }).then(response => {
            if (response.status === 200) {
                setCaptain(response.data.captain)
                setIsLoading(false)
            }
        })
        .catch(err => {
            console.error("Protected route error:", err.response?.data || err.message);
            localStorage.removeItem('token');
            navigate('/cap-login');
            })
    }, [])

    

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }



    return (
        <>
            {children}
        </>
    )
}

export default Captainprotectedwrapper;
