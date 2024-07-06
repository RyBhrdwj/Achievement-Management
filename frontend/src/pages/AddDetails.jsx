import React, { useState } from "react";
import { BsFillSendCheckFill } from "react-icons/bs";
import { IconContext } from "react-icons/lib";
import EventForm from "../components/EventForm";

const AddDetails = () => {
  const [submit, setSubmit] = useState(false);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      {submit ? (
        <div className="w-full max-w-3xl mx-auto p-8">
          <div className="bg-gray-200 rounded-lg shadow-lg p-8 flex flex-col sm:flex-row items-center gap-4">
            <span className="">
              <IconContext.Provider value={{ color: "green", size: "40px" }}>
                <BsFillSendCheckFill />
              </IconContext.Provider>
            </span>
            <h1 className="text-md font-medium">
              Your details have been sent to the mentor for verification. Your achievement will be reflected on your dashboard once the mentor verifies it.
            </h1>
          </div>
        </div>
      ) : (
        <div className="p-4 sm:p-10 m-10 bg-gray-100 rounded-lg shadow-lg w-11/12 sm:max-w-3xl mx-auto">
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
