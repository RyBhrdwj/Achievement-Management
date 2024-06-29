import React from "react";
import Charts from "../components/Charts";
import EventCalender from "../components/EventCalender";

const Home = () => {
  return (
    <div className="flex justify-around p-10">
      <div className="grid grid-cols-12 w-full h-full justify-center items-center">
        <div className="col-span-8">
          <Charts />
        </div>
        <div className="col-span-4">
          <EventCalender />
        </div>
      </div>
    </div>
  );
};

export default Home;
