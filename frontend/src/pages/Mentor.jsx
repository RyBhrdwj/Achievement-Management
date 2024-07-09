import React, { useState,useEffect } from 'react'
import Requests from '../components/Mentor/Requests'
import axios from 'axios'


const Mentor = () => {
  const [requests,setRequests] = useState([])
  useEffect(()=>{
    const getRequests = async () => {
      const mentorId = '12345'
      const response = await axios.get(`https://amgmt.onrender.com/api/requests/${mentorId}`)
      console.log(response.data)
      setRequests(response.data)
    }
    getRequests()
  },[])
  return (
    <div>
      <Requests requests={requests} />
    </div>
  )
}

export default Mentor
