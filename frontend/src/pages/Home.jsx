import React from "react";
import Charts from "../components/Charts";
import EventCalender from "../components/EventCalender";
import RecentAchievements from "../components/RecentAchievements";

const Home = () => {
  return (
    <div className="p-10">
      <div className="grid grid-cols-12 w-full h-full justify-center items-center">
        <div className="col-span-8">
          <Charts />
        </div>
        <div className="col-span-4">
          <EventCalender />
        </div>
      </div>
      <RecentAchievements />
    </div>
  );
};

export default Home;
