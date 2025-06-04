import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'


export const  Userlogout = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    axios.get(`${import.meta.env.VITE_BASE_URL}/user/logout`,
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        }).then((response)=>{
            if(response.status==200){
                localStorage.removeItem('token')
                navigate('/login')
            }
        })
  return (
    <div>
      userLogut
    </div>
  )
}
