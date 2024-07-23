import React from "react";
import EventForm from "../components/Form/EventForm";

const AddDetails = () => {

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
        <div className="p-4 sm:p-10 m-10 bg-gray-100 rounded-lg shadow-lg w-11/12 max-w-6xl mx-auto">
          <h1 className="text-3xl mb-10 font-bold text-center text-gray-800">
            Enter the details of the event
          </h1>
          <EventForm />
        </div>
    </div>
  );
};

export default AddDetails;
