import React, { useState,useEffect } from 'react'
import Requests from '../components/Mentor/Requests'
import axios from 'axios'


const Mentor = () => {
  const [requests,setRequests] = useState([])
  useEffect(()=>{
    
    getRequests()
  },[])
  const getRequests = async () => {
    try {
      const mentorId = '6692351e76002fc8b2ab2b35'
      const response = await axios.get(`https://amgmt.onrender.com/api/requests/${mentorId}`)
      console.log(response.data)
      setRequests(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <Requests requests={requests} getRequests={getRequests} />
    </div>
  )
}

export default Mentor
