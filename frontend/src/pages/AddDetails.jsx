import React from 'react';
import { MdUpload } from "react-icons/md";
import { IconContext } from "react-icons/lib";

const AddDetails = () => {
  return (
    <div className="p-10 bg-gray-100 rounded-lg shadow-lg max-w-4xl mb-20 mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Enter the details of the event</h1>
      <form className="flex flex-col space-y-6">
        <div className='flex justify-between items-center space-x-4'>
          <fieldset className="flex flex-col space-y-2 w-2/3">
            <label className="text-lg font-medium text-gray-700">Event Name:</label>
            <input
              type="text"
              name="name"
              placeholder="Enter the name of the event"
              className="outline-none border-2 border-gray-300 px-4 py-2 rounded-md focus:border-blue-500 transition duration-150 ease-in-out"
            />
          </fieldset>
          <fieldset className="flex flex-col space-y-2 w-1/3">
            <label className="text-lg font-medium text-gray-700">Event Date:</label>
            <input
              type="date"
              name="date"
              placeholder="Enter the date of the event"
              className="outline-none border-2 border-gray-300 px-4 py-2 rounded-md focus:border-blue-500 transition duration-150 ease-in-out"
            />
          </fieldset>
        </div>
        <fieldset className="flex flex-col space-y-2">
          <label className="text-lg font-medium text-gray-700">Event Venue:</label>
          <textarea
            name="venue"
            placeholder="Enter the venue of the event"
            className="outline-none border-2 border-gray-300 px-4 py-2 rounded-md focus:border-blue-500 transition duration-150 ease-in-out"
          />
        </fieldset>
        <div className='flex justify-between items-center space-x-4'>
        <fieldset className="flex flex-col w-2/3 space-y-2">
          <label className="text-lg font-medium text-gray-700">A photo as proof:</label>
          <div className="relative flex justify-center items-center border-dashed border-2 border-gray-300 p-14 rounded-md">
            <input
              className="opacity-0 w-full h-full absolute inset-0 cursor-pointer"
              type="file"
              accept="image/*"
            />
            <button className="bg-blue-500 text-white px-4 py-2 text-lg rounded flex justify-center items-center gap-2 transition duration-150 ease-in-out hover:bg-blue-600">
              <IconContext.Provider value={{ color: "white", size: "25px" }}>
                <MdUpload />
              </IconContext.Provider>
              Browse
            </button>
          </div>
        </fieldset>
        <fieldset className="flex flex-col w-1/3 space-y-2 gap-4">
          <label className="text-lg font-medium text-gray-700">Result:</label>
          <div className="flex space-x-6">
            <label className="flex items-center space-x-2 text-gray-700">
              <input type="radio" name="result" value="won" className="form-radio text-blue-500 focus:ring-blue-500" />
              <span className="text-lg">Won</span>
            </label>
            <label className="flex items-center space-x-2 text-gray-700">
              <input type="radio" name="result" value="participated" className="form-radio text-blue-500 focus:ring-blue-500" />
              <span className="text-lg">Participated</span>
            </label>
          </div>
          <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition duration-200"
        >
          Submit
        </button>
        </fieldset>
        
        </div>
        
      </form>
    </div>
  );
};

export default AddDetails;
