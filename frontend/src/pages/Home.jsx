import React, {useState,useEffect} from "react";
import Charts from "../components/Charts";
import EventCalender from "../components/EventCalender";
import RecentAchievements from "../components/RecentAchievements";
import axios from "axios";
import Announcement from "../components/Announcement";
const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getAchievements = async () => {
      try {
        const response = await axios.get(
          "https://amgmt.onrender.com/api/achievements/60c72b2f9b1d8b001f8e4c23"
        );
        setEvents(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAchievements();
  }, []);
  console.log(events)
  return (
    <div className="px-2 sm:px-6">
      <Announcement speed={window.innerWidth > 768 ? 10000 : 20000}/>
      <div className="grid grid-cols-1 sm:grid-cols-12 w-full h-full justify-center items-center p-4 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 mb-4">
        <div className="col-span-8">
          <Charts events={events} />
        </div>
        {window.innerWidth > 768 && <div className="col-span-4">
          <EventCalender events={events} />
        </div>}
      </div>
      <RecentAchievements events={events} setEvents={setEvents} />
    </div>
  );
};

export default Home;
