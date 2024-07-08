import React from 'react'
import Requests from '../components/Mentor/Requests'
import { requests } from '../constants'

const Mentor = () => {
  return (
    <div>
      <Requests requests={requests} />
    </div>
  )
}

export default Mentor
