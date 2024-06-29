import React from 'react'

const AddDetails = () => {
  return (
    <div>
      <h1>Enter the details of the event</h1>
      <form className='flex flex-col justify-center'>
        <fieldset className='flex gap-3 items-center'>
        <label>Event Name:</label>
        <input type="text" name="name" placeholder="Enter the name of the event" className='outline-none border-2 border-gray-500 px-4 py-2 rounded-md' />
        </fieldset>
        <label>Event Date</label>
        <input type="date" name="date" placeholder="Enter the date of the event" />
        <label>Event Venue</label>
        <textarea type="text" name="venue" placeholder="Enter the venue of the event" />
        <labe>A photo as proof</labe>
        <input type="file" name="photo" placeholder="Enter the photo of the event" />
      </form>
    </div>
  )
}

export default AddDetails
