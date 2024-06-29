import React from 'react'
import Charts from '../components/Charts'
import EventCalender from '../components/EventCalender'

const Home = () => {
  return (
    <div className='h-screen w-screen flex justify-around'>
        <div className='h-1/2 w-2/3'>
      <Charts />
      </div>
        <div>
            <EventCalender />
      </div>
      
    </div>
  )
}

export default Home
