import React, { useState,useEffect } from 'react'
import Requests from '../components/Mentor/Requests'
import axios from 'axios'


const Mentor = () => {
  const [requests,setRequests] = useState([])
  useEffect(()=>{
    const getRequests = async () => {
      try {
        const mentorId = '12345'
        const response = await axios.get(`http://localhost:3000/api/requests/${mentorId}`)
        console.log(response.data)
        setRequests(response.data)
      } catch (error) {
        console.log(error)
      }
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
