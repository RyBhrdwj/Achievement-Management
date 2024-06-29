import React from 'react'
import { events } from '../constants'

const EventCard = ({event}) => {
  return (
    <div className='bg-gray-100 p-4 border-2 border-gray-200 rounded-lg shadow-md grid grid-cols-3 items-center'>
      <div>
      <h3 className='text-lg font-semibold'>{event.eventName}</h3>
      <p className={`${event.result === 'won' ? 'text-green-700 font-bold': 'text-blue-800'}`}>{event.result}</p>
      </div>
      <p>{event.date}</p>
      <p className='font-thin text-lg'>{event.location}</p>
    </div>
  )
}

const RecentAchievements = () => {
  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold pb-4'>Recent Achievements</h1>
    <div className='flex flex-col gap-4 '>
      {
        events.map((event,idx)=>(
          <EventCard event={event} key={idx} />
        ))
      }
    </div>
    </div>
  )
}

export default RecentAchievements
