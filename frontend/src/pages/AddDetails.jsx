import React, { useState } from "react";
import { BsFillSendCheckFill } from "react-icons/bs";
import { IconContext } from "react-icons/lib";
import EventForm from "../components/EventForm";

const AddDetails = () => {
  const [submit, setSubmit] = useState(false);

  return (
    <div>
      {submit ? (
        <div className="mx-auto max-w-2xl max-h-lg bg-gray-200 flex justify-center p-8 rounded-lg items-center gap-4 shadow">
          <span className=""><IconContext.Provider value={{ color: "green", size: "40px" }}>
        <BsFillSendCheckFill />
        </IconContext.Provider></span>
       <h1 className="text-md font-medium  flex border-l-2 border-gray-400 pl-4">Your details have been sent to the mentor for verification. Your achievement will be reflected on your dashboard once the mentor verifies it.</h1>
        </div>
      ) : (
        <div className="p-10 bg-gray-100 rounded-lg shadow-lg max-w-3xl mx-auto">
          <h1 className="text-3xl mb-10 font-bold text-center text-gray-800">
            Enter the details of the event
          </h1>
          <EventForm setSubmit={setSubmit} />
        </div>
      )}
    </div>
  );
};

export default AddDetails;
